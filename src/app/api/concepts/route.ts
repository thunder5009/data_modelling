import { NextResponse } from "next/server";

const concepts = [
  {
    id: "normalization",
    title: "Normalization",
    subtitle: "Eliminate Redundancy",
    description:
      "A systematic process to organize a database schema to reduce data redundancy and improve data integrity. Spans 1NF through BCNF.",
    details: [
      "1NF: Eliminate repeating groups",
      "2NF: Remove partial dependencies",
      "3NF: Remove transitive dependencies",
      "BCNF: Stronger 3NF guarantee",
    ],
    icon: "layers",
    color: "blue",
    complexity: "Intermediate",
  },
  {
    id: "cardinality",
    title: "Cardinality",
    subtitle: "Relationship Ratios",
    description:
      "Defines the numerical relationship between rows of one table and rows of another. One-to-One, One-to-Many, Many-to-Many.",
    details: [
      "1:1 — User ↔ Profile",
      "1:N — Category → Products",
      "N:M — Products ↔ Orders (via junction)",
      "Determines join strategy and index design",
    ],
    icon: "git-branch",
    color: "cyan",
    complexity: "Beginner",
  },
  {
    id: "indexing",
    title: "Indexing",
    subtitle: "Query Acceleration",
    description:
      "Data structures (B-Tree, Hash, Full-Text) that allow the database engine to find rows without scanning every record.",
    details: [
      "Primary Index: Clustered on PK",
      "Secondary Index: Non-clustered",
      "Composite Index: Multi-column",
      "Trade-off: Read speed vs. write overhead",
    ],
    icon: "zap",
    color: "yellow",
    complexity: "Advanced",
  },
  {
    id: "er-diagrams",
    title: "ER Diagrams",
    subtitle: "Visual Schema Design",
    description:
      "Entity-Relationship diagrams visually represent entities, attributes, and relationships before physical implementation.",
    details: [
      "Entities → Tables",
      "Attributes → Columns",
      "Relationships → Foreign Keys",
      "Crow's Foot notation for cardinality",
    ],
    icon: "share-2",
    color: "purple",
    complexity: "Beginner",
  },
  {
    id: "dfds",
    title: "DFDs",
    subtitle: "Data Flow Diagrams",
    description:
      "Show how data moves through a system — from external entities through processes and data stores.",
    details: [
      "Level 0: Context diagram",
      "Level 1: System processes",
      "Processes: circles / rounded rectangles",
      "Data stores: open-ended rectangles",
    ],
    icon: "activity",
    color: "green",
    complexity: "Intermediate",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Data Integrity Rules",
    description:
      "Rules enforced by the DBMS to maintain accuracy and prevent invalid data from entering the database.",
    details: [
      "PRIMARY KEY: Unique, non-null identifier",
      "FOREIGN KEY: Referential integrity",
      "UNIQUE: No duplicate values",
      "CHECK: Custom validation expressions",
    ],
    icon: "shield",
    color: "red",
    complexity: "Intermediate",
  },
];

export async function GET() {
  return NextResponse.json(
    { success: true, count: concepts.length, data: concepts },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
