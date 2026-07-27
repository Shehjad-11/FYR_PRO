"""
StoreMind Pro - Mart & Retail API Endpoints
Products, Categories, Customers, Inventory, and POS Bills
"""

import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_

from app.database import get_db
from app.models.auth import User
from app.models.mart import Product, Category, Customer, Bill, BillItem
from app.schemas.mart import (
    ProductCreate, ProductUpdate, ProductResponse,
    CategoryCreate, CategoryResponse,
    CustomerCreate, CustomerResponse,
    BillCreate, BillResponse
)
from app.api.v1.auth import get_current_user

router = APIRouter()


# --- Categories ---
@router.post("/categories", response_model=CategoryResponse)
async def create_category(
    data: CategoryCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    category = Category(
        organization_id=current_user.organization_id,
        name=data.name,
        description=data.description
    )
    db.add(category)
    await db.commit()
    await db.refresh(category)
    return CategoryResponse.model_validate(category)


@router.get("/categories", response_model=List[CategoryResponse])
async def list_categories(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Category).where(Category.organization_id == current_user.organization_id)
    )
    categories = result.scalars().all()
    return [CategoryResponse.model_validate(c) for c in categories]


# --- Products ---
@router.post("/products", response_model=ProductResponse)
async def create_product(
    data: ProductCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    product = Product(
        organization_id=current_user.organization_id,
        **data.model_dump()
    )
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return ProductResponse.model_validate(product)


@router.get("/products", response_model=List[ProductResponse])
async def list_products(
    search: Optional[str] = None,
    category_id: Optional[str] = None,
    low_stock_only: bool = False,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(Product).where(Product.organization_id == current_user.organization_id, Product.is_active == True)
    
    if search:
        query = query.where(
            or_(
                Product.name.ilike(f"%{search}%"),
                Product.barcode == search
            )
        )
    if category_id:
        query = query.where(Product.category_id == category_id)
    if low_stock_only:
        query = query.where(Product.stock_quantity <= Product.min_stock_alert)

    result = await db.execute(query)
    products = result.scalars().all()
    return [ProductResponse.model_validate(p) for p in products]


@router.get("/products/barcode/{barcode}", response_model=ProductResponse)
async def get_product_by_barcode(
    barcode: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Product).where(
            Product.organization_id == current_user.organization_id,
            Product.barcode == barcode
        )
    )
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product with specified barcode not found")
    return ProductResponse.model_validate(product)


# --- Customers ---
@router.post("/customers", response_model=CustomerResponse)
async def create_customer(
    data: CustomerCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    customer = Customer(
        organization_id=current_user.organization_id,
        **data.model_dump()
    )
    db.add(customer)
    await db.commit()
    await db.refresh(customer)
    return CustomerResponse.model_validate(customer)


@router.get("/customers", response_model=List[CustomerResponse])
async def list_customers(
    search: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(Customer).where(Customer.organization_id == current_user.organization_id)
    if search:
        query = query.where(
            or_(
                Customer.name.ilike(f"%{search}%"),
                Customer.phone.ilike(f"%{search}%")
            )
        )
    result = await db.execute(query)
    customers = result.scalars().all()
    return [CustomerResponse.model_validate(c) for c in customers]


# --- Billing / POS ---
@router.post("/bills", response_model=BillResponse)
async def create_bill(
    data: BillCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if not data.items:
        raise HTTPException(status_code=400, detail="Bill must contain at least one item")

    subtotal = 0.0
    bill_items_to_create = []

    # Process items and verify stock
    for item in data.items:
        prod_res = await db.execute(
            select(Product).where(
                Product.id == item.product_id,
                Product.organization_id == current_user.organization_id
            )
        )
        product = prod_res.scalar_one_or_none()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")

        if product.stock_quantity < item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for {product.name}. Available: {product.stock_quantity}")

        # Reduce stock
        product.stock_quantity -= item.quantity
        item_total = product.selling_price * item.quantity
        subtotal += item_total

        bill_items_to_create.append({
            "product_id": product.id,
            "product_name": product.name,
            "quantity": item.quantity,
            "unit_price": product.selling_price,
            "total_price": item_total
        })

    tax_amount = round(subtotal * 0.05, 2)  # 5% GST calculation
    total_amount = round(subtotal + tax_amount - data.discount_amount, 2)
    invoice_no = f"INV-{int(datetime.utcnow().timestamp())}"

    bill = Bill(
        organization_id=current_user.organization_id,
        customer_id=data.customer_id,
        user_id=current_user.id,
        invoice_number=invoice_no,
        subtotal=subtotal,
        tax_amount=tax_amount,
        discount_amount=data.discount_amount,
        total_amount=total_amount,
        payment_mode=data.payment_mode,
        status="Completed"
    )
    db.add(bill)
    await db.flush()

    # Save items
    created_items = []
    for bi_data in bill_items_to_create:
        item_obj = BillItem(
            bill_id=bill.id,
            **bi_data
        )
        db.add(item_obj)
        created_items.append(item_obj)

    # Update Customer totals if linked
    if data.customer_id:
        cust_res = await db.execute(select(Customer).where(Customer.id == data.customer_id))
        customer = cust_res.scalar_one_or_none()
        if customer:
            customer.total_spent += total_amount
            if data.payment_mode == "Udhar":
                customer.credit_balance += total_amount
            customer.loyalty_points += int(total_amount // 100)  # 1 point per ₹100

    await db.commit()
    await db.refresh(bill)

    response_data = BillResponse.model_validate(bill)
    response_data.items = [
        {
            "id": item_obj.id,
            "product_id": item_obj.product_id,
            "product_name": item_obj.product_name,
            "quantity": item_obj.quantity,
            "unit_price": item_obj.unit_price,
            "total_price": item_obj.total_price
        } for item_obj in created_items
    ]
    return response_data


@router.get("/bills", response_model=List[BillResponse])
async def list_bills(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Bill).where(Bill.organization_id == current_user.organization_id).order_by(Bill.created_at.desc())
    )
    bills = result.scalars().all()
    res = []
    for b in bills:
        items_res = await db.execute(select(BillItem).where(BillItem.bill_id == b.id))
        items = items_res.scalars().all()
        b_dict = BillResponse.model_validate(b)
        b_dict.items = [
            {
                "id": it.id,
                "product_id": it.product_id,
                "product_name": it.product_name,
                "quantity": it.quantity,
                "unit_price": it.unit_price,
                "total_price": it.total_price
            } for it in items
        ]
        res.append(b_dict)
    return res
