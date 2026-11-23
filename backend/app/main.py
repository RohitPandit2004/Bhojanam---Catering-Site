from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.auth import router as auth_router
from app.api.v1.foods import router as foods_router
from app.api.v1.orders import router as orders_router
from app.api.v1.reservations import router as reservations_router

app = FastAPI(
    title="Bhojanam Backend",
    description="FastAPI backend for Bhojanam catering reservation & food ordering app",
    version="0.1.0",
)

# CORS – allow the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API versioned routes
app.include_router(auth_router, prefix="/api/v1")
app.include_router(foods_router, prefix="/api/v1")
app.include_router(orders_router, prefix="/api/v1")
app.include_router(reservations_router, prefix="/api/v1")


@app.get("/health", tags=["root"])
def health():
    return {"status": "ok", "message": "Bhojanam API is running"}


@app.get("/api/v1/meta", tags=["meta"])
def meta():
    """Return domain constants that the frontend currently imports from mockData.js."""
    from app.data.mockdata_bridge import (
    categories,
    eventTypes,
    serviceTypes,
    pricePerGuest,
    orderStatusFlow,
    reservationStatusFlow,
)

    return {
        "categories": categories,
        "eventTypes": eventTypes,
        "serviceTypes": serviceTypes,
        "pricePerGuest": pricePerGuest,
        "orderStatusFlow": orderStatusFlow,
        "reservationStatusFlow": reservationStatusFlow,
    }