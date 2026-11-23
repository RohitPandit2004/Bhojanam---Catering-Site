"""
Bridge so the /api/v1/meta endpoint can serve the same constants the frontend
imports directly from src/data/mockData.js. Keeps the API surface identical
while the real backend owns the data.
"""

from typing import List, Dict

categories: List[Dict] = [
    {"id": "starters", "name": "Starters", "blurb": "Small plates to open the meal"},
    {"id": "mains", "name": "Main Course", "blurb": "The heart of the thali"},
    {"id": "biryani", "name": "Rice & Biryani", "blurb": "Layered, slow-cooked rice"},
    {"id": "breads", "name": "Breads", "blurb": "Fresh off the tawa and tandoor"},
    {"id": "desserts", "name": "Desserts", "blurb": "A sweet close to the meal"},
    {"id": "beverages", "name": "Beverages", "blurb": "Cooling drinks and chai"},
]

eventTypes: List[str] = ["Wedding", "Birthday", "Corporate", "Anniversary", "Other"]
serviceTypes: List[str] = ["Buffet", "Table Service", "Food Delivery"]
pricePerGuest: int = 450

orderStatusFlow: List[str] = [
    "Placed", "Confirmed", "Preparing", "Ready", "Delivered"
]

reservationStatusFlow: List[str] = [
    "Requested", "Confirmed", "Preparing", "Completed"
]