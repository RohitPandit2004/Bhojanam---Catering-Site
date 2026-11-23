from typing import Optional
from pydantic import BaseModel, Field

from app.core.config import to_camel


# Alias generator: convert snake_case to camelCase
# e.g. "food_id" -> "foodId", "event_type" -> "eventType"
def to_camel(value: str) -> str:
    parts = value.split("_")
    return parts[0] + "".join(p.title() for p in parts[1:])


class FoodBase(BaseModel):
    id: str
    name: str
    category_id: str
    price: int = Field(alias="price")
    veg: bool = True
    popular: bool = False
    desc: str  # frontend uses "desc", not "description"
    ingredients: Optional[str] = None
    image: str
    availability: bool = True

    class Config:
        alias_generator = to_camel
        populate_by_name = True


class FoodCreate(FoodBase):
    pass


class FoodOut(FoodBase):
    class Config:
        from_attributes = True  # enable ORM mode


# Alias generator for other schemas
def to_camel_str(value: str) -> str:
    """Convert snake_case string to camelCase."""
    if "_" not in value:
        return value
    parts = value.split("_")
    return parts[0] + "".join(p.title() for p in parts[1:])