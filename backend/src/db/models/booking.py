# Example SQLAlchemy model snippet
from sqlalchemy import Column, Integer, String, DateTime, Enum

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    anny_booking_id = Column(String, unique=True, nullable=True)  # link to Anny
    resource_id = Column(String, nullable=False)
    user_id = Column(Integer, nullable=True)  # if you have users
    starts_at = Column(DateTime, nullable=False)
    ends_at = Column(DateTime, nullable=False)
    title = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    status = Column(String, nullable=False, default="confirmed")
    source = Column(String, nullable=False, default="local")  # "local" | "anny"
