from typing import Optional, List
from pydantic import BaseModel, Field


def to_camel(value: str) -> str:
    parts = value.split("_")
    return parts[0] + "".join(p.title() for p in parts[1:])


class ReservationItemBase(BaseModel):
    food_id: str = Field(alias="foodId")

    class Config:
        alias_generator = to_camel
        populate_by_name = True


class ReservationItemCreate(ReservationItemBase):
    pass


class ReservationItemOut(ReservationItemBase):
    class Config:
        from_attributes = True


class ReservationBase(BaseModel):
    event_type: str
    event_date: str
    guests: int
    location: str
    service_type: str
    menu: List[str] = Field(alias="menu", default=[])  # list of food ids
    amount: int = Field(alias="amount", default=0)
    status: str = Field(alias="status", default="Requested")

    class Config:
        alias_generator = to_camel
        populate_by_name = True


class ReservationCreate(ReservationBase):
    pass


class ReservationOut(ReservationBase):
    id: str = Field(alias="id")

    class Config:
        from_attributes = True