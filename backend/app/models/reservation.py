from sqlalchemy import Column, DateTime, Integer, String

from app.core.config import BASE_DIR
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(String, primary_key=True, index=True)  # e.g. "CR204"
    user_id = Column(Integer, nullable=True)
    customer_name = Column(String)
    customer_phone = Column(String)
    customer_email = Column(String)
    customer_address = Column(String)
    event_type = Column(String)  # "Wedding", "Birthday", etc.
    event_date = Column(String)  # YYYY-MM-DD
    guests = Column(Integer, default=1)
    location = Column(String)
    service_type = Column(String)  # "Buffet", "Table Service", "Food Delivery"
    amount = Column(Integer, default=0)  # in rupees, guests * pricePerGuest
    status = Column(String, default="Requested")  # Requested → Confirmed → Preparing → Completed

    # Also accepts legacy statuses: "Pending Confirmation", "Rejected"
    @property
    def id_str(self) -> str:
        return self.id


class ReservationItem(Base):
    __tablename__ = "reservation_items"

    id = Column(Integer, primary_key=True, index=True)
    reservation_id = Column(String, index=True)  # FK to reservations.id
    food_id = Column(String, index=True)  # FK to foods.id