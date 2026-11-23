from typing import Optional, List
from pydantic import BaseModel, Field


def to_camel(value: str) -> str:
    parts = value.split("_")
    return parts[0] + "".join(p.title() for p in parts[1:])


class OrderItemBase(BaseModel):
    food_id: str = Field(alias="foodId")
    qty: int = Field(alias="qty", default=1)

    class Config:
        alias_generator = to_camel
        populate_by_name = True


class OrderItemCreate(OrderItemBase):
    pass


class OrderItemOut(OrderItemBase):
    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    items: List[OrderItemBase]
    total: int = Field(alias="total")
    customer: Optional[dict] = None  # {name, phone, email, address}
    status: str = Field(alias="status", default="Placed")

    class Config:
        alias_generator = to_camel
        populate_by_name = True


class OrderCreate(OrderBase):
    pass


class OrderOut(OrderBase):
    id: str = Field(alias="id")

    class Config:
        from_attributes = True