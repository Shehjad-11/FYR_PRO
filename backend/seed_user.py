"""
StoreMind Pro - Direct DB Seed Script
Seeds both Store Manager & Super Admin accounts into SQLite DB using bcrypt directly.
"""

import sqlite3
import uuid
from datetime import datetime
import bcrypt

# --- Credentials List ---
USERS_TO_SEED = [
    {
        "name": "TEST_owner_1_SUPER_MART",
        "email": "TEST_SUPERMART1@GMAIL.COM",
        "password": "Test@1234",
        "org_name": "TEST_SUPERMART_1",
        "org_type": "supermarket",
        "role": "store_manager"
    },
    {
        "name": "Super Admin Platform Manager",
        "email": "admin@storemind.com",
        "password": "Admin@123",
        "org_name": "StoreMind HQ SaaS",
        "org_type": "enterprise",
        "role": "super_admin"
    }
]

db_path = "storemind.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    for u in USERS_TO_SEED:
        cursor.execute("SELECT id FROM users WHERE email = ?", (u["email"],))
        if cursor.fetchone():
            print(f"✅ User {u['email']} already exists in DB!")
        else:
            org_id = str(uuid.uuid4())
            user_id = str(uuid.uuid4())
            now = datetime.utcnow().isoformat()
            password_hash = bcrypt.hashpw(u["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

            cursor.execute("""
                INSERT INTO organizations
                  (id, name, type, subscription_plan, gst_number, phone, address, is_active, created_at)
                VALUES (?, ?, ?, 'pro', NULL, NULL, NULL, 1, ?)
            """, (org_id, u["org_name"], u["org_type"], now))

            cursor.execute("""
                INSERT INTO users
                  (id, organization_id, name, email, phone, password_hash, role, is_active, last_login, created_at)
                VALUES (?, ?, ?, ?, NULL, ?, ?, 1, NULL, ?)
            """, (user_id, org_id, u["name"], u["email"], password_hash, u["role"], now))

            print(f"✅ Seeded: {u['email']} | Role: {u['role']} | Pass: {u['password']}")

    conn.commit()
    print("=" * 50)
    print("ALL TEST CREDENTIALS SEEDED SUCCESSFULLY IN SQLite!")
    print("=" * 50)

except Exception as e:
    conn.rollback()
    print(f"❌ Error seeding users: {e}")
finally:
    conn.close()
