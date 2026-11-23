from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.food import Food
from app.models.reservation import Reservation, ReservationItem
from app.models.user import User
from app.schemas.reservation import ReservationOut, ReservationCreate
from app.core.deps import get_current_user, require_admin

router = APIRouter(prefix="/reservations", tags=["reservations"])


@router.post("/", response_model=ReservationOut, status_code=201)
def create_reservation(payload: ReservationCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    # Validate that all food_ids in menu exist and are available
    menu_ids = payload.menu or []
    total = 0

    for food_id in menu_ids:
        food = db.query(Food).filter(Food.id == food_id).first()
        if not food:
            raise HTTPException(status_code=404, detail=f"Food {food_id} not found")
        if not food.availability:
            raise HTTPException(status_code=400, detail=f"Food {food_id} is unavailable")
        total += food.price  # per-item price; final amount = guests * pricePerGuest

    # Generate reservation ID: CR + 3 digits (matching frontend seed format)
    import random
    res_id = f"CR{random.randint(100, 999)}"

    # Compute amount: guests * pricePerGuest (450 from mockData)
    guests = payload.guests
    price_per_guest = 450  # from mockData.py: pricePerGuest = 450
    amount = guests * price_per_guest

    # Use current user if authenticated, else guest reservation
    user_id = None
    if current_user and current_user.get("id"):
        user_id = int(current_user["id"])

    reservation = Reservation(
        id=res_id,
        user_id=user_id,
        customer_name=payload.customer.get("name", "") if payload.customer else "",
        customer_phone=payload.customer.get("phone", "") if payload.customer else "",
        customer_email=payload.customer.get("email", "") if payload.customer else "",
        customer_address=payload.customer.get("address", "") if payload.customer else "",
        event_type=payload.event_type,
        event_date=payload.event_date,
        guests=guests,
        location=payload.location,
        service_type=payload.service_type,
        amount=amount,
        status=payload.status or "Requested",
    )
    db.add(reservation)
    db.commit()
    db.refresh(reservation)

    # Persist reservation items
    for food_id in menu_ids:
        db.add(
            ReservationItem(
                reservation_id=reservation.id,
                food_id=food_id,
            )
        )

    db.commit()

    return {
        "id": reservation.id,
        "event_type": reservation.event_type,
        "event_date": reservation.event_date,
        "guests": reservation.guests,
        "location": reservation.location,
        "service_type": reservation.service_type,
        "menu": menu_ids,
        "amount": reservation.amount,
        "status": reservation.status,
        "customer": {
            "name": reservation.customer_name,
            "phone": reservation.customer_phone,
            "email": reservation.customer_email,
            "address": reservation.customer_address,
        },
    }


@router.get("/me")
def get_my_reservations(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["id"]) if current_user.get("id") else None
    query = (
        db.query(Reservation).filter(Reservation.user_id == user_id)
        if user_id
        else db.query(Reservation).filter(Reservation.user_id == None)
    )
    reservations = query.all()

    result = []
    for r in reservations:
        items = (
            db.query(ReservationItem)
            .filter(ReservationItem.reservation_id == r.id)
            .all()
        )
        menu_ids = [item.food_id for item in items]
        result.append(
            {
                "id": r.id,
                "event_type": r.event_type,
                "event_date": r.event_date,
                "guests": r.guests,
                "location": r.location,
                "service_type": r.service_type,
                "menu": menu_ids,
                "amount": r.amount,
                "status": r.status,
                "customer": {
                    "name": r.customer_name,
                    "phone": r.customer_phone,
                    "email": r.customer_email,
                    "address": r.customer_address,
                },
            }
        )
    return result


@router.patch("/{reservation_id}/status")
def update_reservation_status(
    reservation_id: str,
    status: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    # Accept the flow: Requested → Confirmed → Preparing → Completed
    # Also accept legacy: Pending Confirmation, Rejected
    valid_statuses = ["Requested", "Confirmed", "Preparing", "Completed", "Pending Confirmation", "Rejected"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Must be one of: {valid_statuses}",
        )

    reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")

    reservation.status = status
    db.commit()
    db.refresh(reservation)
    return {"id": reservation.id, "status": reservation.status}