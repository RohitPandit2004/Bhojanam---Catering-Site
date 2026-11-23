from sqlalchemy import Boolean, Column, Integer, String

from app.core.config import BASE_DIR
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Food(Base):
    __tablename__ = "foods"

    id = Column(String, primary_key=True, index=True)  # e.g. "f1"
    name = Column(String, index=True)
    category_id = Column(String, index=True)  # FK to categories.id
    price = Column(Integer, default=0)
    veg = Column(Boolean, default=True)
    popular = Column(Boolean, default=False)
    desc = Column(String)  # frontend uses "desc", not "description"
    ingredients = Column(String)
    image = Column(String)
    availability = Column(Boolean, default=True)  # pages test `f.availability !== false`
    created_at = Column(String, default="now")  # stored as YYYY-MM-DD string or "now"

    # camelCase alias support - the API will return camelCase keys
    # but the DB column names stay snake_case; we'll handle serialization separately