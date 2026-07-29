"""
StoreMind Pro - Mart Pydantic Schemas
Products, Categories, Customers, Bills, and POS transactions
"""

from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime


# --- Category ---
class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    description: Optional[str] = None


class CategoryResponse(CategoryCreate):
    id: str
    organization_id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


# --- Product ---
class ProductCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    category_id: Optional[str] = None
    barcode: Optional[str] = None
    cost_price: float = Field(0.0, ge=0.0)
    selling_price: float = Field(..., ge=0.0)
    mrp: float = Field(..., ge=0.0)
    stock_quantity: int = Field(0, ge=0)
    min_stock_alert: int = Field(5, ge=0)
    unit: str = "pcs"
    image_url: Optional[str] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category_id: Optional[str] = None
    barcode: Optional[str] = None
    cost_price: Optional[float] = None
    selling_price: Optional[float] = None
    mrp: Optional[float] = None
    stock_quantity: Optional[int] = None
    min_stock_alert: Optional[int] = None
    unit: Optional[str] = None
    image_url: Optional[str] = None


class ProductResponse(ProductCreate):
    id: str
    organization_id: str
    is_active: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


# --- Customer ---
class CustomerCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    email: Optional[str] = None


class CustomerResponse(CustomerCreate):
    id: str
    organization_id: str
    total_spent: float
    credit_balance: float
    loyalty_points: int
    segment: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


# --- Billing / POS ---
class BillItemCreate(BaseModel):
    product_id: str
    quantity: int = Field(..., gt=0)


class BillCreate(BaseModel):
    customer_id: Optional[str] = None
    items: List[BillItemCreate]
    payment_mode: str = "Cash"  # Cash, UPI, Card, Udhar
    discount_amount: float = 0.0


class BillItemResponse(BaseModel):
    id: str
    product_id: str
    product_name: str
    quantity: int
    unit_price: float
    total_price: float
    model_config = ConfigDict(from_attributes=True)


class BillResponse(BaseModel):
    id: str
    organization_id: str
    customer_id: Optional[str] = None
    user_id: str
    invoice_number: str
    subtotal: float
    tax_amount: float
    discount_amount: float
    total_amount: float
    payment_mode: str
    status: str
    created_at: datetime
    items: List[BillItemResponse] = []

    model_config = ConfigDict(from_attributes=True)


# --- Udhar & Reports ---
class UdharPaymentCreate(BaseModel):
    amount: float = Field(..., gt=0.0)
    note: Optional[str] = None


class CustomerDetailResponse(CustomerResponse):
    bills: List[BillResponse] = []


class PaymentModeSummary(BaseModel):
    mode: str
    amount: float
    count: int


class TopProductSummary(BaseModel):
    product_id: str
    product_name: str
    units_sold: int
    revenue: float


class SalesTimelinePoint(BaseModel):
    date: str
    sales: float
    orders: int


class ReportSummaryResponse(BaseModel):
    total_sales: float
    total_bills: int
    avg_order_value: float
    total_udhar_pending: float
    payment_modes: List[PaymentModeSummary] = []
    top_products: List[TopProductSummary] = []
    timeline: List[SalesTimelinePoint] = []

