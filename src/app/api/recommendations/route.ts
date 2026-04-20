import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const recommendations: Record<string, {
  tips: string[];
  performance: string[];
  tradeoffs: string[];
  indexes: string[];
}> = {
  user: {
    tips: [
      "Add a partial index on email WHERE deleted_at IS NULL for soft-delete patterns",
      "Store passwords as bcrypt hashes — never plaintext",
      "Use UUID v7 for time-sortable primary keys",
    ],
    performance: [
      "Index email column for login queries (O(log n) vs O(n))",
      "Cache session tokens in Redis with TTL",
      "Partition by created_at for large user tables",
    ],
    tradeoffs: [
      "UUID PKs: better distribution but larger index size than BIGSERIAL",
      "Soft delete: data recovery possible but complicates queries",
      "Role enum: fast but hard to extend without migration",
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_user_email ON users(email)",
      "CREATE INDEX idx_user_created ON users(created_at DESC)",
    ],
  },
  product: {
    tips: [
      "Index (category_id, price) composite for filtered catalog queries",
      "Use GENERATED ALWAYS AS for computed columns like discounted_price",
      "Full-text index on name + description for search",
    ],
    performance: [
      "Denormalize category_name into products for read-heavy catalog API",
      "Use materialized views for aggregated inventory stats",
      "Cache product pages at CDN edge for 60s TTL",
    ],
    tradeoffs: [
      "Denormalization speeds reads but risks stale category names",
      "Stock in product table causes write contention at scale → use inventory service",
      "DECIMAL for price avoids float precision bugs",
    ],
    indexes: [
      "CREATE INDEX idx_product_category ON products(category_id)",
      "CREATE INDEX idx_product_price ON products(price) WHERE stock_qty > 0",
      "CREATE INDEX idx_product_sku ON products(sku)",
    ],
  },
  order: {
    tips: [
      "Use a status state machine: pending → confirmed → shipped → delivered → cancelled",
      "Store total_amount at order creation — never recalculate dynamically",
      "Add order_items junction table for line items (N:M with products)",
    ],
    performance: [
      "Index (user_id, ordered_at DESC) for user order history queries",
      "Partition orders by month for archives older than 2 years",
      "Read replicas for reporting dashboards",
    ],
    tradeoffs: [
      "Storing total_amount: fast reads but risk of stale totals if order modified",
      "ENUM status: requires migration to add new states → consider VARCHAR with CHECK",
      "Soft delete orders for compliance / audit trail",
    ],
    indexes: [
      "CREATE INDEX idx_order_user ON orders(user_id, ordered_at DESC)",
      "CREATE INDEX idx_order_status ON orders(status) WHERE status != 'delivered'",
    ],
  },
  category: {
    tips: [
      "Use closure table pattern for efficient hierarchical queries",
      "Add slug column with UNIQUE index for SEO-friendly URLs",
      "Limit tree depth to prevent recursive query stack overflows",
    ],
    performance: [
      "Cache category tree in Redis — changes rarely",
      "Use adjacency list for simple trees; closure table for complex hierarchies",
      "Precompute full_path as materialized column",
    ],
    tradeoffs: [
      "Self-referential FK: simple but slow for deep hierarchy queries",
      "Closure table: fast reads but doubles storage for path data",
      "Flat category with path string: fast but hard to maintain",
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_category_slug ON categories(slug)",
      "CREATE INDEX idx_category_parent ON categories(parent_id)",
    ],
  },
  payment: {
    tips: [
      "Store payment as immutable ledger — never update, only append",
      "Include idempotency_key to prevent duplicate charges",
      "Encrypt card last-four / payment method metadata at rest",
    ],
    performance: [
      "Index (order_id, status) for payment status lookups",
      "Use event sourcing: append payment events, derive current state",
      "Webhook retry queue for failed payment notifications",
    ],
    tradeoffs: [
      "1:1 with order works for simple flows; use 1:N for retry/partial payments",
      "Storing payment locally vs. delegating entirely to Stripe",
      "Encryption at column level vs. disk encryption",
    ],
    indexes: [
      "CREATE INDEX idx_payment_order ON payments(order_id)",
      "CREATE UNIQUE INDEX idx_payment_idempotency ON payments(idempotency_key)",
    ],
  },
  default: {
    tips: [
      "Click an entity to get schema-specific recommendations",
      "Every table should have a primary key — prefer UUID v7",
      "Add created_at and updated_at audit columns to all tables",
    ],
    performance: [
      "Profile slow queries with EXPLAIN ANALYZE before adding indexes",
      "Use connection pooling (PgBouncer) to handle concurrent requests",
      "Read replicas reduce load on primary for analytics",
    ],
    tradeoffs: [
      "Normalization vs. denormalization depends on read/write ratio",
      "Indexes improve reads but slow writes — choose carefully",
      "Microservices split data ownership but add distributed transaction complexity",
    ],
    indexes: [
      "Index every FOREIGN KEY column",
      "Composite indexes: put high-cardinality columns first",
    ],
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const entity = searchParams.get("entity")?.toLowerCase() ?? "default";

  if (!Object.prototype.hasOwnProperty.call(recommendations, entity)) {
    return NextResponse.json(
      { success: false, error: "Unknown entity" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      entity,
      data: recommendations[entity] ?? recommendations.default,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300",
      },
    }
  );
}
