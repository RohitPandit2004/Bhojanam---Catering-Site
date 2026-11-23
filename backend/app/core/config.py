import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend/ (parent of app/)
load_dotenv(dotenv_path=Path(__file__).parent.parent / ".env")

BASE_DIR = Path(__file__).resolve().parent.parent

# Database
SQLITE_URL = "sqlite:///" + str(BASE_DIR / "app.db")
POSTGRES_URL = "postgresql://user:password@localhost/bhojanam"

# Choose DATABASE_URL env var, fall back to SQLite for dev
DATABASE_URL = os.getenv("DATABASE_URL", SQLITE_URL)

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "change-me-dev-only")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 1 week

# CORS
# Frontend runs on 5173 by default; make overridable via env
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")


def to_camel(value: str) -> str:
    """Convert snake_case string to camelCase."""
    parts = value.split("_")
    return parts[0] + "".join(p.title() for p in parts[1:])