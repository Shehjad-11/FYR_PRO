"""
StoreMind Pro - Direct DB Seed Script
Uses bcrypt directly (bypasses passlib which breaks on Python 3.14)
"""

import sqlite3
import uuid
from datetime import datetime
import bcrypt

# --- Credentials ---
USER_NAME     = "TEST_owner_1_SUPER_MART"
USER_EMAIL    = "TEST_SUPERMART1@GMAIL.COM"
USER_PASSWORD = "Test@1234"
ORG_NAME      = "TEST_SUPERMART_1"
ORG_TYPE      = "supermarket"

# --- Hash password using bcrypt directly ---
password_hash = bcrypt.hashpw(USER_PASSWORD.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# --- IDs & timestamp ---
org_id  = str(uuid.uuid4())
user_id = str(uuid.uuid4())
now     = datetime.utcnow().isoformat()

# --- Write to SQLite ---
db_path = "storemind.db"
conn    = sqlite3.connect(db_path)
cursor  = conn.cursor()

try:
    cursor.execute("SELECT id FROM users WHERE email = ?", (USER_EMAIL,))
    if cursor.fetchone():
        print("=" * 50)
        print("✅ User already exists in DB!")
        print(f"   Email    : {USER_EMAIL}")
        print(f"   Password : {USER_PASSWORD}")
        print("   Go to http://localhost:5173 and login.")
        print("=" * 50)
    else:
        cursor.execute("""
            INSERT INTO organizations
              (id, name, type, subscription_plan, gst_number, phone, address, is_active, created_at)
            VALUES (?, ?, ?, 'starter', NULL, NULL, NULL, 1, ?)
        """, (org_id, ORG_NAME, ORG_TYPE, now))

        cursor.execute("""
            INSERT INTO users
              (id, organization_id, name, email, phone, password_hash, role, is_active, last_login, created_at)
            VALUES (?, ?, ?, ?, NULL, ?, 'admin', 1, NULL, ?)
        """, (user_id, org_id, USER_NAME, USER_EMAIL, password_hash, now))

        conn.commit()
        print("=" * 50)
        print("✅ User seeded successfully!")
        print(f"   Email    : {USER_EMAIL}")
        print(f"   Password : {USER_PASSWORD}")
        print(f"   Name     : {USER_NAME}")
        print(f"   Store    : {ORG_NAME}")
        print("=" * 50)
        print("Open http://localhost:5173 and login now!")

except Exception as e:
    conn.rollback()
    print(f"❌ Error: {e}")
finally:
    conn.close()
