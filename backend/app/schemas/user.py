from typing import Optional
from pydantic import BaseModel, Field


def to_camel(value: str) -> str:
    parts = value.split("_")
    return parts[0] + "".join(p.title() for p in parts[1:])


class UserOut(BaseModel):
    id: str = Field(alias="id")
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None
    role: str
    created_at: Optional[str] = None

    class Config:
        alias_generator = to_camel
        populate_by_name = True


class UserRegister(BaseModel):
    name: str
    email: str = Field(alias="email")
    phone: Optional[str] = None
    address: Optional[str] = None
    password: str
    confirm: str
    role: Optional[str] = "CUSTOMER"

    class Config:
        alias_generator = to_camel
        populate_by_name = True


class UserLogin(BaseModel):
    email: str = Field(alias="email")
    password: str

    class Config:
        alias_generator = to_camel
        populate_by_name = True