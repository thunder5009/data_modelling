import { NextResponse } from "next/server";

const problems = [
  {
    id: "schema-drift",
    title: "Schema Drift",
    severity: 8,
    category: "Structural",
    emoji: "🌀",
    cause:
      "Teams modify database columns or add nullable fields ad-hoc without migrations, causing production and development schemas to diverge silently.",
    symptoms: [
      "NULL values in non-nullable columns",
      "Missing columns in API responses",
      "Inconsistent data types across environments",
    ],
    solution:
      "Adopt migration-first development (Flyway, Alembic). Every schema change goes through a versioned migration file, reviewed in PR, and applied atomically.",
    solution_steps: [
      "Use a migration tool (Flyway / Liquibase / Alembic)",
      "Never modify production DB manually",
      "Run migrations as part of CI/CD pipeline",
      "Keep schema and application code in same PR",
    ],
    impact: "High",
    effort: "Medium",
  },
  {
    id: "query-bottlenecks",
    title: "Query Bottlenecks",
    severity: 9,
    category: "Performance",
    emoji: "⚡",
    cause:
      "N+1 queries, missing indexes on foreign keys, SELECT * on large tables, and lack of query analysis lead to slow response times at scale.",
    symptoms: [
      "API latency > 500ms on list endpoints",
      "Database CPU at 100% during peak hours",
      "Timeout errors on reporting queries",
    ],
    solution:
      "Profile queries with EXPLAIN ANALYZE, add composite indexes on frequently joined columns, implement query batching (DataLoader pattern), and cache read-heavy data with Redis.",
    solution_steps: [
      "Run EXPLAIN ANALYZE on slow queries",
      "Add indexes on FK columns and WHERE predicates",
      "Batch N+1 queries with DataLoader / includes",
      "Cache with Redis TTL for read-heavy endpoints",
    ],
    impact: "Critical",
    effort: "High",
  },
  {
    id: "data-quality",
    title: "Data Quality Issues",
    severity: 7,
    category: "Integrity",
    emoji: "🛡️",
    cause:
      "Lack of CHECK constraints, missing validation at application layer, and accepting null for required fields creates corrupt data that is expensive to clean later.",
    symptoms: [
      "Orders with zero or negative amounts",
      "Users with invalid email formats",
      "Orphaned records after cascade deletes",
    ],
    solution:
      "Enforce constraints at both database (CHECK, NOT NULL, FK) and application layer. Add input validation with Zod/Joi. Run regular data quality checks via scheduled queries.",
    solution_steps: [
      "Add CHECK constraints for business rules",
      "Validate inputs with Zod at API boundary",
      "Enable referential integrity (FK constraints)",
      "Schedule data quality audits monthly",
    ],
    impact: "High",
    effort: "Low",
  },
];

export async function GET() {
  return NextResponse.json(
    { success: true, count: problems.length, data: problems },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
