"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, GitBranch, Zap, Share2, Activity, Shield, ChevronRight } from "lucide-react";
import { fadeUp, staggerContainer, listItem } from "@/lib/animations";

const concepts = [
  {
    id: "normalization",
    title: "Normalization",
    subtitle: "Eliminate Redundancy",
    description:
      "Systematically organize table structures from 1NF through BCNF to minimize redundancy and maintain data integrity across your schema.",
    details: ["1NF: Eliminate repeating groups", "2NF: Remove partial dependencies", "3NF: Remove transitive deps", "BCNF: Stronger 3NF guarantee"],
    icon: Layers,
    color: "#4F46E5",
    glow: "rgba(79,70,229,0.3)",
    complexity: "Intermediate",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  },
  {
    id: "cardinality",
    title: "Cardinality",
    subtitle: "Relationship Ratios",
    description:
      "Define precise numerical relationships between tables: One-to-One, One-to-Many, and Many-to-Many, driving join strategies and index design.",
    details: ["1:1 — User ↔ Profile", "1:N — Category → Products", "N:M — Products ↔ Orders", "Drives join & index strategy"],
    icon: GitBranch,
    color: "#06B6D4",
    glow: "rgba(6,182,212,0.3)",
    complexity: "Beginner",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
  {
    id: "indexing",
    title: "Indexing",
    subtitle: "Query Acceleration",
    description:
      "B-Tree, Hash, and Full-Text indexes allow the engine to locate rows in O(log n) instead of O(n) table scans — critical for production systems.",
    details: ["Primary: Clustered on PK", "Secondary: Non-clustered", "Composite: Multi-column", "Tradeoff: Read vs. write speed"],
    icon: Zap,
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    complexity: "Advanced",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    id: "er-diagrams",
    title: "ER Diagrams",
    subtitle: "Visual Schema Design",
    description:
      "Entity-Relationship diagrams map entities, attributes, and relationships visually before implementation — the blueprint of every database.",
    details: ["Entities → Tables", "Attributes → Columns", "Relationships → FKs", "Crow's Foot notation"],
    icon: Share2,
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.3)",
    complexity: "Beginner",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    id: "dfds",
    title: "DFDs",
    subtitle: "Data Flow Diagrams",
    description:
      "Visualize how data flows through a system — from external sources through processing steps into data stores — at multiple levels of abstraction.",
    details: ["Level 0: Context diagram", "Level 1: System processes", "Circles: Processes", "Rectangles: Data Stores"],
    icon: Activity,
    color: "#10B981",
    glow: "rgba(16,185,129,0.3)",
    complexity: "Intermediate",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Data Integrity Rules",
    description:
      "Database rules enforced by the DBMS: PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, and NOT NULL — your last line of defense against corrupt data.",
    details: ["PRIMARY KEY: Unique, non-null", "FOREIGN KEY: Referential integrity", "UNIQUE: No duplicates", "CHECK: Custom validation"],
    icon: Shield,
    color: "#EF4444",
    glow: "rgba(239,68,68,0.3)",
    complexity: "Intermediate",
    badge: "bg-red-500/20 text-red-300 border-red-500/30",
  },
];

export default function ConceptsSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="concepts" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Foundation
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-white mb-4">
            Core Concepts
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-xl mx-auto">
            Six pillars of database design mastery — from first principles to production patterns.
          </motion.p>
        </motion.div>

        {/* Concept Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {concepts.map((concept) => {
            const Icon = concept.icon;
            const isHovered = hovered === concept.id;
            const isExpanded = expanded === concept.id;

            return (
              <motion.div
                key={concept.id}
                variants={listItem}
                onMouseEnter={() => setHovered(concept.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setExpanded(isExpanded ? null : concept.id)}
                whileHover={{ scale: 1.02, rotateX: 1, rotateY: 1 }}
                whileTap={{ scale: 0.99 }}
                className="glass-card p-6 cursor-pointer relative overflow-hidden group transition-all duration-300"
                style={{
                  boxShadow: isHovered
                    ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${concept.glow}`
                    : undefined,
                  borderColor: isHovered ? concept.color + "40" : undefined,
                }}
              >
                {/* Background glow */}
                <motion.div
                  animate={{ opacity: isHovered ? 0.06 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${concept.color}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${concept.color}22, ${concept.color}11)`,
                    border: `1px solid ${concept.color}33`,
                    boxShadow: isHovered ? `0 0 20px ${concept.glow}` : "none",
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: concept.color }} />
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">{concept.title}</h3>
                    <p className="text-white/40 text-xs mt-0.5">{concept.subtitle}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${concept.badge}`}>
                    {concept.complexity}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/55 text-sm leading-relaxed mb-4">{concept.description}</p>

                {/* Details */}
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <motion.ul
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isExpanded ? "visible" : "hidden"}
                    className="space-y-1.5 mb-4"
                  >
                    {concept.details.map((d) => (
                      <motion.li
                        key={d}
                        variants={listItem}
                        className="flex items-center gap-2 text-xs font-mono text-white/60"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: concept.color }}
                        />
                        {d}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>

                {/* Expand toggle */}
                <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: concept.color }}>
                  <span>{isExpanded ? "Show less" : "Learn more"}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </motion.div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                  style={{ background: `linear-gradient(90deg, ${concept.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
