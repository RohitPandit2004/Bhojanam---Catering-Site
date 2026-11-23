from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.food import Food
from app.models.order import Order, OrderItem
from app.models.user import User
from app.core.deps import get_current_user, require_admin
from app.schemas.order import OrderOut, OrderCreate, OrderItemOut

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("/", response_model=OrderOut, status_code=201)
def create_order(payload: OrderCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    # Validate that all food_ids exist and compute total
    items_data = payload.items  # list of {foodId, qty}
    total = 0
    order_items = []

    for item in items_data:
        food_id = item.food_id
        qty = item.qty or 1
        food = db.query(Food).filter(Food.id == food_id).first()
        if not food:
            raise HTTPException(status_code=404, detail=f"Food {food_id} not found")
        if not food.availability:
            raise HTTPException(status_code=400, detail=f"Food {food_id} is unavailable")
        unit_price = food.price
        total += unit_price * qty
        order_items.append(
            OrderItem(
                order_id="",  # will be set after order creation
                food_id=food_id,
                qty=qty,
                unit_price=unit_price,
            )
        )

    # Add delivery fee (30 ₹ as in frontend Checkout)
    DELIVERY_FEE = 30
    total += DELIVERY_FEE

    # Generate order ID: BH + 4 digits (matching frontend seed format)
    import random
    order_id = f"BH{random.randint(1000, 9999)}"

    # Use current user if authenticated, else guest order
    user_id = None
    if current_user and current_user.get("id"):
        user_id = int(current_user["id"])

    order = Order(
        id=order_id,
        user_id=user_id,
        customer_name=payload.customer.get("name", "") if payload.customer else "",
        customer_phone=payload.customer.get("phone", "") if payload.customer else "",
        customer_email=payload.customer.get("email", "") if payload.customer else "",
        customer_address=payload.customer.get("address", "") if payload.customer else "",
        total=total,
        date="2026-11-24",  # today's date; in prod use real date
        status="Placed",
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    # Persist order items with correct order_id
    for item in order_items:
        item.order_id = order.id
        db.add(item)

    db.commit()

    # Return the order with items
    return {
        "id": order.id,
        "items": [
            {"foodId": item.food_id, "qty": item.qty}
            for item in order_items
        ],
        "total": order.total,
        "status": order.status,
        "date": order.date,
        "customer": {
            "name": order.customer_name,
            "phone": order.customer_phone,
            "email": order.customer_email,
            "address": order.customer_address,
        },
    }


@router.get("/me")
def get_my_orders(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["id"]) if current_user.get("id") else None
    query = db.query(Order).filter(Order.user_id == user_id) if user_id else db.query(Order).filter(Order.user_id == None)
    orders = query.all()

    result = []
    for o in orders:
        items = (
            db.query(OrderItem)
            .filter(OrderItem.order_id == o.id)
            .all()
        )
        result.append(
            {
                "id": o.id,
                "items": [
                    {"foodId": item.food_id, "qty": item.qty}
                    for item in items
                ],
                "total": o.total,
                "status": o.status,
                "date": o.date,
                "customer": {
                    "name": o.customer_name,
                    "phone": o.customer_phone,
                    "email": o.customer_email,
                    "address": o.customer_address,
                },
            }
        )
    return result


@router.patch("/{order_id}/status")
def update_order_status(
    order_id: str,
    status: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    valid_statuses = ["Placed", "Confirmed", "Preparing", "Ready", "Delivered"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")

    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = status
    db.commit()
    db.refresh(order)
    return {"id": order.id, "status": order.status}