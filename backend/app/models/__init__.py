from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Model classes (imported for Side-effects / registration)
from app.models.user import User  # noqa: F401
from app.models.category import Category  # noqa: F401
from app.models.food import Food  # noqa: F401
from app.models.order import Order, OrderItem  # noqa: F401
from app.models.reservation import Reservation, ReservationItem  # noqa: F401

# Re-export all model modules so 'from app.models import Base' works
from app.models import user  # noqa: F401
from app.models import category  # noqa: F401
from app.models import food  # noqa: F401
from app.models import order  # noqa: F401
from app.models import reservation  # noqa: F401