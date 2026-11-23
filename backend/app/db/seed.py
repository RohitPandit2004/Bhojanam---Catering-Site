"""
Seed script: ports the data from the frontend mockData.js into the backend SQLite DB.

Run from repo root: python -m app.db.seed
"""
import random
from pathlib import Path

# Ensure app package is importable
import sys
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker, declarative_base

from app.models import Base, User, Category, Food, Order, OrderItem, Reservation, ReservationItem

# Build the SQLite DB path right next to this file
DB_PATH = Path(__file__).parent.parent / "app.db"
engine = create_engine(
    "sqlite:///" + str(DB_PATH),
    connect_args={"check_same_thread": False},
)

Base.metadata.create_all(bind=engine)  # create tables fresh each run (idempotent)

SessionLocal = sessionmaker(bind=engine)


def seed_categories(db: Session):
    cats = [
        {"id": "starters", "name": "Starters", "blurb": "Small plates to open the meal"},
        {"id": "mains", "name": "Main Course", "blurb": "The heart of the thali"},
        {"id": "biryani", "name": "Rice & Biryani", "blurb": "Layered, slow-cooked rice"},
        {"id": "breads", "name": "Breads", "blurb": "Fresh off the tawa and tandoor"},
        {"id": "desserts", "name": "Desserts", "blurb": "A sweet close to the meal"},
        {"id": "beverages", "name": "Beverages", "blurb": "Cooling drinks and chai"},
    ]
    for c in cats:
        exists = db.query(Category).filter(Category.id == c["id"]).first()
        if not exists:
            db.add(Category(id=c["id"], name=c["name"], blurb=c["blurb"]))
    db.commit()
    print(f"✅ Categories seeded: {db.query(Category).count()} rows")


def seed_foods(db: Session):
    from app.data.mockdata_bridge import categories as db_categories

    cat_map = {c.id: c.id for c in db.query(Category).all()}

    foods = [
        # f1 - f30 as in mockData.js
        {"id": "f1", "name": "Paneer Butter Masala", "category": "mains", "price": 180, "veg": True, "popular": True,
         "desc": "Rich tomato-cashew gravy with soft paneer cubes, finished with cream.",
         "ingredients": "Paneer, tomato, butter, cashew, cream, garam masala",
         "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80"},
        {"id": "f2", "name": "Veg Hyderabadi Biryani", "category": "biryani", "price": 150, "veg": True, "popular": True,
         "desc": "Basmati rice layered with spiced vegetables and saffron, dum-cooked.",
         "ingredients": "Basmati rice, mixed vegetables, saffron, fried onions, mint",
         "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80"},
        {"id": "f3", "name": "Chicken Dum Biryani", "category": "biryani", "price": 220, "veg": False, "popular": True,
         "desc": "Marinated chicken layered with fragrant rice, slow-cooked in a sealed handi.",
         "ingredients": "Chicken, basmati rice, yogurt, saffron, fried onions",
         "image": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&q=80"},
        {"id": "f4", "name": "Gulab Jamun", "category": "desserts", "price": 80, "veg": True, "popular": True,
         "desc": "Warm milk dumplings soaked in cardamom-scented sugar syrup.",
         "ingredients": "Khoya, maida, sugar, cardamom, rose water",
         "image": "/images/Gulab Jamun.jpeg"},
        {"id": "f5", "name": "Hara Bhara Kebab", "category": "starters", "price": 140, "veg": True, "popular": False,
         "desc": "Spinach and green pea patties, shallow-fried till crisp.",
         "ingredients": "Spinach, green peas, potato, chana dal, spices",
         "image": "/images/Hara-Bhara-Kabab.jpg"},
        {"id": "f6", "name": "Chicken Seekh Kebab", "category": "starters", "price": 190, "veg": False, "popular": False,
         "desc": "Minced chicken skewers grilled over coals with ginger and green chili.",
         "ingredients": "Minced chicken, ginger, green chili, roasted gram flour",
         "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80"},
        {"id": "f7", "name": "Butter Naan", "category": "breads", "price": 45, "veg": True, "popular": False,
         "desc": "Leavened flatbread baked in the tandoor, brushed with butter.",
         "ingredients": "Maida, yeast, yogurt, butter",
         "image": "/images/Garlic-Butter-nan-recipe.jpg"},
        {"id": "f8", "name": "Tandoori Roti", "category": "breads", "price": 30, "veg": True, "popular": False,
         "desc": "Whole-wheat flatbread, cooked over an open flame.",
         "ingredients": "Whole wheat flour, water, salt",
         "image": "/images/Tandoori-Butter-Roti.jpg"},
        {"id": "f9", "name": "Masala Chai", "category": "beverages", "price": 40, "veg": True, "popular": False,
         "desc": "Spiced milk tea brewed with cardamom, ginger and cloves.",
         "ingredients": "Tea leaves, milk, ginger, cardamom, cloves",
         "image": "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80"},
        {"id": "f10", "name": "Sweet Lassi", "category": "beverages", "price": 60, "veg": True, "popular": True,
         "desc": "Chilled churned yogurt drink, lightly sweetened.",
         "ingredients": "Yogurt, sugar, cardamom",
         "image": "/images/lassi-recipe.jpg"},
        {"id": "f11", "name": "Dal Makhani", "category": "mains", "price": 160, "veg": True, "popular": False,
         "desc": "Black lentils simmered overnight with butter and cream.",
         "ingredients": "Black urad dal, rajma, butter, cream, tomato",
         "image": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80"},
        {"id": "f12", "name": "Mutton Rogan Josh", "category": "mains", "price": 260, "veg": False, "popular": False,
         "desc": "Slow-braised mutton in a Kashmiri red chili and yogurt gravy.",
         "ingredients": "Mutton, yogurt, Kashmiri chili, fennel, ginger",
         "image": "https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80"},
        {"id": "f13", "name": "Paneer Tikka", "category": "starters", "price": 170, "veg": True, "popular": False,
         "desc": "Marinated paneer cubes grilled in a smoky tandoor spice mix.",
         "ingredients": "Paneer, yogurt, bell pepper, onion, tandoori masala",
         "image": "/images/Paneer-Tikka.jpg"},
        {"id": "f14", "name": "Vegetable Samosa", "category": "starters", "price": 80, "veg": True, "popular": False,
         "desc": "Crisp pastry parcels filled with spiced potatoes and peas.",
         "ingredients": "Potato, green peas, maida, cumin, garam masala",
         "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"},
        {"id": "f15", "name": "Aloo Tikki", "category": "starters", "price": 90, "veg": True, "popular": False,
         "desc": "Shallow-fried spiced potato patties, crisp outside and soft within.",
         "ingredients": "Potato, green chili, coriander, chaat masala",
         "image": "/images/Aloo tikki.jpg"},
        {"id": "f16", "name": "Shahi Paneer", "category": "mains", "price": 190, "veg": True, "popular": False,
         "desc": "Paneer simmered in a mildly sweet, creamy cashew gravy.",
         "ingredients": "Paneer, cashew, cream, tomato, mild spices",
         "image": "/images/ShahiPaneer.jpg"},
        {"id": "f17", "name": "Chana Masala", "category": "mains", "price": 140, "veg": True, "popular": False,
         "desc": "Chickpeas simmered in a tangy onion-tomato masala.",
         "ingredients": "Chickpeas, onion, tomato, amchur, garam masala",
         "image": "/images/Chana Masala.jpeg"},
        {"id": "f18", "name": "Butter Chicken", "category": "mains", "price": 240, "veg": False, "popular": False,
         "desc": "Tandoori chicken simmered in a velvety butter-tomato gravy.",
         "ingredients": "Chicken, butter, tomato, cream, fenugreek",
         "image": "/images/Nutter Chicken.jpeg"},
        {"id": "f19", "name": "Mutton Biryani", "category": "biryani", "price": 280, "veg": False, "popular": False,
         "desc": "Tender mutton layered with fragrant basmati rice, dum-cooked.",
         "ingredients": "Mutton, basmati rice, saffron, fried onions, yogurt",
         "image": "/images/Mutton Biryani.jpeg"},
        {"id": "f20", "name": "Jeera Rice", "category": "biryani", "price": 110, "veg": True, "popular": False,
         "desc": "Basmati rice tempered with roasted cumin seeds.",
         "ingredients": "Basmati rice, cumin seeds, ghee, bay leaf",
         "image": "/images/Jeera-_rice.jpg"},
        {"id": "f21", "name": "Vegetable Pulao", "category": "biryani", "price": 120, "veg": True, "popular": False,
         "desc": "Lightly spiced rice cooked with mixed seasonal vegetables.",
         "ingredients": "Basmati rice, mixed vegetables, whole spices, ghee",
         "image": "/images/Veg Pulao.jpg"},
        {"id": "f22", "name": "Garlic Naan", "category": "breads", "price": 60, "veg": True, "popular": False,
         "desc": "Tandoor-baked naan topped with roasted garlic and coriander.",
         "ingredients": "Maida, yeast, garlic, butter, coriander",
         "image": "/images/Garlic Naan.jpeg"},
        {"id": "f23", "name": "Laccha Paratha", "category": "breads", "price": 55, "veg": True, "popular": False,
         "desc": "Flaky, layered flatbread cooked on the tawa.",
         "ingredients": "Whole wheat flour, ghee, maida",
         "image": "/images/Lachha-Paratha.jpg"},
        {"id": "f24", "name": "Butter Roti", "category": "breads", "price": 35, "veg": True, "popular": False,
         "desc": "Whole-wheat flatbread finished with a brush of butter.",
         "ingredients": "Whole wheat flour, water, butter",
         "image": "/images/Butter Roti.jpg"},
        {"id": "f25", "name": "Rasmalai", "category": "desserts", "price": 100, "veg": True, "popular": False,
         "desc": "Soft cottage-cheese dumplings soaked in sweetened, cardamom milk.",
         "ingredients": "Paneer, milk, sugar, cardamom, pistachio",
         "image": "/images/Rasmalai.jpeg"},
        {"id": "f26", "name": "Kheer", "category": "desserts", "price": 80, "veg": True, "popular": False,
         "desc": "Slow-simmered rice pudding finished with saffron and nuts.",
         "ingredients": "Rice, milk, sugar, saffron, cashew, pistachio",
         "image": "/images/Kheer.jpeg"},
        {"id": "f27", "name": "Jalebi", "category": "desserts", "price": 70, "veg": True, "popular": False,
         "desc": "Crisp, syrup-soaked spirals of fermented batter.",
         "ingredients": "Maida, yogurt, sugar syrup, saffron",
         "image": "/images/jalebi.jpeg"},
        {"id": "f28", "name": "Mango Lassi", "category": "beverages", "price": 80, "veg": True, "popular": False,
         "desc": "Chilled yogurt drink blended with ripe mango pulp.",
         "ingredients": "Yogurt, mango pulp, sugar",
         "image": "/images/Mango Lassi.jpg"},
        {"id": "f29", "name": "Fresh Lime Soda", "category": "beverages", "price": 60, "veg": True, "popular": False,
         "desc": "A refreshing mix of fresh lime, soda and a touch of salt or sugar.",
         "ingredients": "Lime, soda water, sugar/salt",
         "image": "/images/Fresh Lime Soda.jpg"},
        {"id": "f30", "name": "Masala Buttermilk", "category": "beverages", "price": 50, "veg": True, "popular": False,
         "desc": "Spiced, churned buttermilk with curry leaves and ginger.",
         "ingredients": "Buttermilk, ginger, curry leaves, roasted cumin",
         "image": "/images/Masala Buttermilk.jpeg"},
    ]

    for f in foods:
        cat_id = f["category"]
        resolved_cat = cat_map.get(cat_id, db_categories[0].id if db_categories else "starters")

        exists = db.query(Food).filter(Food.id == f["id"]).first()
        if not exists:
            db.add(Food(
                id=f["id"],
                name=f["name"],
                category_id=resolved_cat,
                price=f["price"],
                veg=f["veg"],
                popular=f["popular"],
                desc=f["desc"],
                ingredients=f["ingredients"],
                image=f["image"],
                availability=True,
            ))
    db.commit()
    print(f"✅ Foods seeded: {db.query(Food).count()} rows")


def seed_orders(db: Session):
    orders_data = [
        {
            "id": "BH1024",
            "items": [{"foodId": "f2", "qty": 2}, {"foodId": "f1", "qty": 1}],
            "total": 480,
            "date": "2026-09-15",
            "status": "Confirmed",
        },
        {
            "id": "BH1031",
            "items": [{"foodId": "f4", "qty": 4}],
            "total": 320,
            "date": "2026-09-18",
            "status": "Preparing",
        },
    ]

    for od in orders_data:
        exists = db.query(Order).filter(Order.id == od["id"]).first()
        if not exists:
            computed_total = 0
            item_rows = []
            for item in od["items"]:
                food = db.query(Food).filter(Food.id == item["foodId"]).first()
                if food:
                    computed_total += food.price * item["qty"]
                    item_rows.append(OrderItem(
                        order_id="",
                        food_id=item["foodId"],
                        qty=item["qty"],
                        unit_price=food.price,
                    ))

            user = db.query(User).filter(User.email == "admin@bhojanam.com").first()
            order = Order(
                id=od["id"],
                user_id=user.id if user else None,
                customer_name="",
                customer_phone="",
                customer_email="",
                customer_address="",
                total=computed_total + 30,  # delivery fee
                date=od["date"],
                status=od["status"],
            )
            db.add(order)
            db.commit()
            db.refresh(order)

            for item in item_rows:
                item.order_id = order.id
                db.add(item)

            db.commit()
            print(f"✅ Order seeded: {od['id']} (total={order.total})")


def seed_reservations(db: Session):
    res_data = [
        {
            "id": "CR204",
            "eventType": "Birthday",
            "eventDate": "2026-09-25",
            "guests": 150,
            "location": "Rajahmundry, AP",
            "serviceType": "Buffet",
            "menu": ["f1", "f2", "f4", "f9"],
            "amount": 67500,  # 150 * 450
            "status": "Pending Confirmation",
        },
        {
            "id": "CR198",
            "eventType": "Wedding",
            "eventDate": "2026-10-12",
            "guests": 250,
            "location": "Hyderabad, TS",
            "serviceType": "Table Service",
            "menu": ["f3", "f12", "f7", "f4", "f10"],
            "amount": 112500,  # 250 * 450
            "status": "Confirmed",
        },
    ]

    for rd in res_data:
        exists = db.query(Reservation).filter(Reservation.id == rd["id"]).first()
        if not exists:
            user = db.query(User).filter(User.email == "admin@bhojanam.com").first()

            reservation = Reservation(
                id=rd["id"],
                user_id=user.id if user else None,
                customer_name="",
                customer_phone="",
                customer_email="",
                customer_address="",
                event_type=rd["eventType"],
                event_date=rd["eventDate"],
                guests=rd["guests"],
                location=rd["location"],
                service_type=rd["serviceType"],
                amount=rd["amount"],
                status=rd["status"],
            )
            db.add(reservation)
            db.commit()
            db.refresh(reservation)

            for food_id in rd["menu"]:
                db.add(ReservationItem(
                    reservation_id=reservation.id,
                    food_id=food_id,
                ))
            db.commit()
            print(f"✅ Reservation seeded: {rd['id']} (guests={rd['guests']}, amount={rd['amount']})")


def seed_admin_user(db: Session):
    admin_email = "admin@bhojanam.com"
    exists = db.query(User).filter(User.email == admin_email).first()
    if not exists:
        from app.core.security import get_password_hash
        db.add(User(
            name="Admin",
            email=admin_email,
            phone="",
            address="",
            password_hash=get_password_hash("password"),
            role="ADMIN",
        ))
        db.commit()
        print("✅ Admin user seeded: admin@bhojanam.com (password: password)")


def main():
    db = SessionLocal()

    try:
        seed_categories(db)
        seed_foods(db)
        seed_orders(db)
        seed_reservations(db)
        seed_admin_user(db)
    finally:
        db.close()

    print("\n🌱 DB fully seeded. Run `uvicorn app.main:app --reload` to start the API.\n")


if __name__ == "__main__":
    main()