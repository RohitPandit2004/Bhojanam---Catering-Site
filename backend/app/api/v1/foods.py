from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.food import Food
from app.models.category import Category
from app.core.deps import require_admin
from app.schemas.food import FoodOut, FoodCreate, FoodOut

router = APIRouter(prefix="/foods", tags=["foods"])


@router.get("/", response_model=list[FoodOut])
def list_foods(
    category: str | None = None,
    veg: bool | None = None,
    q: str | None = None,
    sort: str | None = "popularity",
    db: Session = Depends(get_db),
):
    query = db.query(Food)

    if category:
        query = query.filter(Food.category_id == category)
    if veg is not None:
        query = query.filter(Food.veg == veg)
    if q:
        query = query.filter(Food.name.ilike(f"%{q}%"))

    # sort
    if sort == "price-low":
        query = query.order_by(Food.price.asc())
    elif sort == "price-high":
        query = query.order_by(Food.price.desc())
    else:  # popularity
        query = query.order_by(Food.popular.desc())

    return query.all()


@router.get("/{food_id}")
def get_food(food_id: str, db: Session = Depends(get_db)):
    food = db.query(Food).filter(Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    return food


@router.post("/", response_model=FoodOut, status_code=201)
def create_food(payload: FoodCreate, db: Session = Depends(get_db), current_user: dict = Depends(require_admin)):
    # Verify category exists
    cat = db.query(Category).filter(Category.id == payload.category_id).first()
    if not cat:
        raise HTTPException(status_code=400, detail="Invalid category_id")

    food = Food(
        id=payload.id,
        name=payload.name,
        category_id=payload.category_id,
        price=payload.price,
        veg=payload.veg,
        popular=payload.popular,
        desc=payload.desc,
        ingredients=payload.ingredients or "",
        image=payload.image,
        availability=payload.availability if payload.availability is not None else True,
    )
    db.add(food)
    db.commit()
    db.refresh(food)
    return food


@router.patch("/{food_id}")
def update_food(food_id: str, payload: FoodCreate, db: Session = Depends(get_db), current_user: dict = Depends(require_admin)):
    food = db.query(Food).filter(Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")

    # Update fields
    food.name = payload.name
    food.category_id = payload.category_id
    food.price = payload.price
    food.veg = payload.veg
    food.popular = payload.popular
    food.desc = payload.desc
    food.ingredients = payload.ingredients or food.ingredients
    food.image = payload.image
    food.availability = payload.availability if payload.availability is not None else food.availability

    db.commit()
    db.refresh(food)
    return food


@router.delete("/{food_id}", status_code=204)
def delete_food(food_id: str, db: Session = Depends(get_db), current_user: dict = Depends(require_admin)):
    food = db.query(Food).filter(Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    db.delete(food)
    db.commit()
    return None