from sqlalchemy import Column, String

from app.core.config import BASE_DIR
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, index=True)  # e.g. "starters"
    name = Column(String, index=True)
    blurb = Column(String)

    # camelCase alias support
    @property
    def id_str(self) -> str:
        return self.id