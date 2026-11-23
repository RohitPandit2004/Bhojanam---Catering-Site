from sqlalchemy import Column, DateTime, Integer, String

from app.core.config import BASE_DIR
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True)  # e.g. "BH1024"
    user_id = Column(Integer, nullable=True)  # FK to users.id, nullable for guest orders
    customer_name = Column(String)
    customer_phone = Column(String)
    customer_email = Column(String)
    customer_address = Column(String)
    total = Column(Integer, default=0)  # in rupees, includes delivery fee
    date = Column(String)  # YYYY-MM-DD
    status = Column(String, default="Placed")  # Placed → Confirmed → Preparing → Ready → Delivered

    # camelCase alias support
    @property
    def id_str(self) -> str:
        return self.id


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(String, index=True)  # FK to orders.id
    food_id = Column(String, index=True)  # FK to foods.id
    qty = Column(Integer, default=1)
    unit_price = Column(Integer, default=0)  # snapshot at order time