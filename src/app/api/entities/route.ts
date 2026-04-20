import { NextResponse } from "next/server";

const entities = [
  {
    id: "user",
    label: "User",
    x: 150,
    y: 200,
    color: "#4F46E5",
    attributes: [
      { name: "user_id", type: "UUID", isPK: true },
      { name: "email", type: "VARCHAR(255)", isUnique: true },
      { name: "name", type: "VARCHAR(100)" },
      { name: "created_at", type: "TIMESTAMP" },
      { name: "role", type: "ENUM" },
    ],
    description: "Stores authenticated user accounts with role-based access.",
  },
  {
    id: "product",
    label: "Product",
    x: 500,
    y: 120,
    color: "#06B6D4",
    attributes: [
      { name: "product_id", type: "UUID", isPK: true },
      { name: "category_id", type: "UUID", isFK: true },
      { name: "name", type: "VARCHAR(200)" },
      { name: "price", type: "DECIMAL(10,2)" },
      { name: "stock_qty", type: "INTEGER" },
      { name: "sku", type: "VARCHAR(50)", isUnique: true },
    ],
    description: "Product catalog with pricing, inventory, and categorization.",
  },
  {
    id: "order",
    label: "Order",
    x: 500,
    y: 360,
    color: "#7C3AED",
    attributes: [
      { name: "order_id", type: "UUID", isPK: true },
      { name: "user_id", type: "UUID", isFK: true },
      { name: "status", type: "ENUM" },
      { name: "total_amount", type: "DECIMAL(12,2)" },
      { name: "ordered_at", type: "TIMESTAMP" },
    ],
    description: "Tracks customer orders and their fulfillment status.",
  },
  {
    id: "category",
    label: "Category",
    x: 850,
    y: 120,
    color: "#059669",
    attributes: [
      { name: "category_id", type: "UUID", isPK: true },
      { name: "name", type: "VARCHAR(100)" },
      { name: "parent_id", type: "UUID", isFK: true },
      { name: "slug", type: "VARCHAR(120)", isUnique: true },
    ],
    description: "Hierarchical product taxonomy with self-referential parent.",
  },
  {
    id: "payment",
    label: "Payment",
    x: 850,
    y: 360,
    color: "#DC2626",
    attributes: [
      { name: "payment_id", type: "UUID", isPK: true },
      { name: "order_id", type: "UUID", isFK: true },
      { name: "method", type: "ENUM" },
      { name: "amount", type: "DECIMAL(12,2)" },
      { name: "status", type: "ENUM" },
      { name: "paid_at", type: "TIMESTAMP" },
    ],
    description: "Payment transactions linked to orders with audit trail.",
  },
];

const relationships = [
  {
    id: "user-order",
    from: "user",
    to: "order",
    type: "1:N",
    label: "places",
    description: "One user can place many orders",
  },
  {
    id: "category-product",
    from: "category",
    to: "product",
    type: "1:N",
    label: "contains",
    description: "One category holds many products",
  },
  {
    id: "order-product",
    from: "order",
    to: "product",
    type: "N:M",
    label: "includes",
    description: "Orders contain many products; products appear in many orders (via order_items)",
  },
  {
    id: "order-payment",
    from: "order",
    to: "payment",
    type: "1:1",
    label: "paid via",
    description: "Each order has exactly one payment record",
  },
];

export async function GET() {
  return NextResponse.json(
    { success: true, data: { entities, relationships } },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
