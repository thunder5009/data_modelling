import { NextResponse } from "next/server";

export async function GET() {
  const rows = [
    ["entity", "attribute", "type", "constraint", "notes"],
    ["users", "user_id", "UUID", "PRIMARY KEY", "UUID v7 recommended"],
    ["users", "email", "VARCHAR(255)", "UNIQUE NOT NULL", "Indexed for login"],
    ["users", "name", "VARCHAR(100)", "NOT NULL", ""],
    ["users", "created_at", "TIMESTAMP", "NOT NULL DEFAULT NOW()", "Audit column"],
    ["users", "role", "ENUM", "NOT NULL DEFAULT 'customer'", ""],
    ["products", "product_id", "UUID", "PRIMARY KEY", ""],
    ["products", "category_id", "UUID", "FOREIGN KEY → categories", "Indexed"],
    ["products", "name", "VARCHAR(200)", "NOT NULL", "Full-text searchable"],
    ["products", "price", "DECIMAL(10,2)", "NOT NULL CHECK(price >= 0)", "Use DECIMAL not FLOAT"],
    ["products", "stock_qty", "INTEGER", "NOT NULL DEFAULT 0", ""],
    ["products", "sku", "VARCHAR(50)", "UNIQUE NOT NULL", ""],
    ["orders", "order_id", "UUID", "PRIMARY KEY", ""],
    ["orders", "user_id", "UUID", "FOREIGN KEY → users", "Indexed"],
    ["orders", "status", "ENUM", "NOT NULL DEFAULT 'pending'", "State machine pattern"],
    ["orders", "total_amount", "DECIMAL(12,2)", "NOT NULL", "Immutable after creation"],
    ["orders", "ordered_at", "TIMESTAMP", "NOT NULL DEFAULT NOW()", ""],
    ["categories", "category_id", "UUID", "PRIMARY KEY", ""],
    ["categories", "name", "VARCHAR(100)", "NOT NULL", ""],
    ["categories", "parent_id", "UUID", "FOREIGN KEY → categories", "Self-referential"],
    ["categories", "slug", "VARCHAR(120)", "UNIQUE NOT NULL", "SEO URL"],
    ["payments", "payment_id", "UUID", "PRIMARY KEY", ""],
    ["payments", "order_id", "UUID", "FOREIGN KEY → orders", ""],
    ["payments", "method", "ENUM", "NOT NULL", "card|upi|wallet|cod"],
    ["payments", "amount", "DECIMAL(12,2)", "NOT NULL", ""],
    ["payments", "status", "ENUM", "NOT NULL DEFAULT 'pending'", ""],
    ["payments", "paid_at", "TIMESTAMP", "", "NULL until confirmed"],
  ];

  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="data_model_schema.csv"',
      "Cache-Control": "no-store",
    },
  });
}
