"""
StoreMind Pro - Offline-to-Online Bi-Directional Sync API Router
Handles batch sync pushes from merchant local SQLite to cloud storage.
"""

from typing import List, Dict, Any, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.auth import User
from app.models.mart import Bill, BillItem, Product, Customer
from app.api.v1.auth import get_current_user

router = APIRouter()


@router.post("/push")
async def push_offline_batch(
    payload: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Receive queued offline transactions (bills, customer credit updates) from merchant device
    and sync into central database.
    """
    offline_bills = payload.get("bills", [])
    synced_bill_ids = []

    for b_data in offline_bills:
        inv_no = b_data.get("invoice_number")
        if not inv_no:
            continue

        # Check if already synced to avoid duplicate bills
        existing = await db.execute(
            select(Bill).where(Bill.invoice_number == inv_no, Bill.organization_id == current_user.organization_id)
        )
        if existing.scalar_one_or_none():
            synced_bill_ids.append(b_data.get("local_id", inv_no))
            continue

        bill = Bill(
            organization_id=current_user.organization_id,
            customer_id=b_data.get("customer_id"),
            user_id=current_user.id,
            invoice_number=inv_no,
            subtotal=b_data.get("subtotal", 0.0),
            tax_amount=b_data.get("tax_amount", 0.0),
            discount_amount=b_data.get("discount_amount", 0.0),
            total_amount=b_data.get("total_amount", 0.0),
            payment_mode=b_data.get("payment_mode", "Cash"),
            status="Completed",
            created_at=datetime.fromisoformat(b_data.get("created_at")) if b_data.get("created_at") else datetime.utcnow()
        )
        db.add(bill)
        await db.flush()

        # Save line items
        for item in b_data.get("items", []):
            item_obj = BillItem(
                bill_id=bill.id,
                product_id=item.get("product_id"),
                product_name=item.get("product_name", "Item"),
                quantity=item.get("quantity", 1),
                unit_price=item.get("unit_price", 0.0),
                total_price=item.get("total_price", 0.0)
            )
            db.add(item_obj)

        synced_bill_ids.append(b_data.get("local_id", inv_no))

    await db.commit()

    return {
        "status": "success",
        "synced_bills_count": len(synced_bill_ids),
        "synced_ids": synced_bill_ids,
        "synced_at": datetime.utcnow().isoformat()
    }


@router.get("/pull")
async def pull_master_catalog(
    last_synced_at: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Pull updated product inventory & customer directory from cloud to local merchant device.
    """
    prods_res = await db.execute(
        select(Product).where(Product.organization_id == current_user.organization_id, Product.is_active == True)
    )
    products = prods_res.scalars().all()

    custs_res = await db.execute(
        select(Customer).where(Customer.organization_id == current_user.organization_id)
    )
    customers = custs_res.scalars().all()

    return {
        "products": [
            {
                "id": p.id, "name": p.name, "barcode": p.barcode,
                "selling_price": p.selling_price, "mrp": p.mrp,
                "stock_quantity": p.stock_quantity, "min_stock_alert": p.min_stock_alert, "unit": p.unit
            } for p in products
        ],
        "customers": [
            {
                "id": c.id, "name": c.name, "phone": c.phone,
                "credit_balance": c.credit_balance, "loyalty_points": c.loyalty_points, "segment": c.segment
            } for c in customers
        ],
        "pulled_at": datetime.utcnow().isoformat()
    }
