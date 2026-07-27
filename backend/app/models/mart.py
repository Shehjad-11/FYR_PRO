"""
StoreMind Pro - Mart & Retail Management Models
Products, Categories, Inventory, Customers, Bills, and Transactions
"""

import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, Text, ForeignKey, JSON
from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class Category(Base):
    __tablename__ = "categories"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Product(Base):
    __tablename__ = "products"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    category_id = Column(String(36), ForeignKey("categories.id"), nullable=True)
    name = Column(String(150), nullable=False)
    barcode = Column(String(50), nullable=True, index=True)
    sku = Column(String(50), nullable=True)
    cost_price = Column(Float, nullable=False, default=0.0)
    selling_price = Column(Float, nullable=False, default=0.0)
    mrp = Column(Float, nullable=False, default=0.0)
    stock_quantity = Column(Integer, nullable=False, default=0)
    min_stock_alert = Column(Integer, nullable=False, default=5)
    unit = Column(String(20), default="pcs")  # pcs, kg, ltr, pkt
    image_url = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Customer(Base):
    __tablename__ = "customers"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False, index=True)
    email = Column(String(100), nullable=True)
    total_spent = Column(Float, default=0.0)
    credit_balance = Column(Float, default=0.0)  # Udhar / Khata account balance
    loyalty_points = Column(Integer, default=0)
    segment = Column(String(50), default="Regular")  # High Value, Frequent, At-Risk, Regular
    created_at = Column(DateTime, default=datetime.utcnow)


class Bill(Base):
    __tablename__ = "bills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    customer_id = Column(String(36), ForeignKey("customers.id"), nullable=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)  # Cashier/Admin
    invoice_number = Column(String(50), nullable=False, unique=True)
    subtotal = Column(Float, nullable=False, default=0.0)
    tax_amount = Column(Float, nullable=False, default=0.0)
    discount_amount = Column(Float, nullable=False, default=0.0)
    total_amount = Column(Float, nullable=False, default=0.0)
    payment_mode = Column(String(30), default="Cash")  # Cash, UPI, Card, Udhar/Khata
    status = Column(String(20), default="Completed")  # Completed, Cancelled
    created_at = Column(DateTime, default=datetime.utcnow)


class BillItem(Base):
    __tablename__ = "bill_items"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    bill_id = Column(String(36), ForeignKey("bills.id"), nullable=False)
    product_id = Column(String(36), ForeignKey("products.id"), nullable=False)
    product_name = Column(String(150), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Float, nullable=False, default=0.0)
    total_price = Column(Float, nullable=False, default=0.0)
