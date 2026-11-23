from sqlalchemy import Boolean, Column, DateTime, Integer, String

from app.core.config import BASE_DIR
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    address = Column(String)
    password_hash = Column(String)
    role = Column(String, default="CUSTOMER")  # "ADMIN" or "CUSTOMER"
    created_at = Column(DateTime, default="now")

    # For camelCase alias compatibility (e.g. Pydantic schemas use id)
    @property
    def id_str(self) -> str:
        return str(self.id)