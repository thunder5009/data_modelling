"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Zap, Shield, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const problems = [
  {
    id: "schema-drift",
    title: "Schema Drift",
    category: "Structural",
    severity: 8,
    icon: AlertTriangle,
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    description:
      "Teams modify database columns ad-hoc without migrations, causing production and development schemas to silently diverge.",
    symptoms: [
      "NULL values appearing in non-nullable columns",
      "Missing columns causing API 500 errors",
      "Inconsistent types across environments",
    ],
    solution:
      "Adopt migration-first development. Every schema change goes through a versioned migration file, reviewed in PR, and applied atomically via CI/CD.",
    steps: [
      "Adopt Flyway, Liquibase, or Alembic",
      "Never modify production DB manually",
      "Run migrations inside CI/CD pipeline",
      "Keep schema + application code in same PR",
    ],
    impact: "High",
    effort: "Medium",
  },
  {
    id: "query-bottlenecks",
    title: "Query Bottlenecks",
    category: "Performance",
    severity: 9,
    icon: Zap,
    color: "#EF4444",
    glow: "rgba(239,68,68,0.3)",
    description:
      "N+1 queries, missing foreign key indexes, and SELECT * on large tables cause API latency to spike at scale.",
    symptoms: [
      "API list endpoints exceed 500ms",
      "Database CPU at 100% during peaks",
      "Timeout errors on reporting queries",
    ],
    solution:
      "Use EXPLAIN ANALYZE to profile queries, add composite indexes on frequently joined columns, and implement DataLoader batching with Redis caching.",
    steps: [
      "Run EXPLAIN ANALYZE on slow queries",
      "Add indexes on FK + WHERE columns",
      "Batch N+1 queries with DataLoader",
      "Cache read-heavy data in Redis with TTL",
    ],
    impact: "Critical",
    effort: "High",
  },
  {
    id: "data-quality",
    title: "Data Quality Issues",
    category: "Integrity",
    severity: 7,
    icon: Shield,
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.3)",
    description:
      "Lack of database constraints and missing application-layer validation allows corrupt data to enter the system silently.",
    symptoms: [
      "Orders with zero or negative amounts",
      "Invalid email formats stored in DB",
      "Orphaned records after failed deletes",
    ],
    solution:
      "Enforce constraints at both DB (CHECK, NOT NULL, FK) and app layer (Zod/Joi). Run monthly data quality audits via scheduled queries.",
    steps: [
      "Add CHECK constraints for business rules",
      "Validate inputs with Zod at API boundary",
      "Enable referential integrity (FK constraints)",
      "Schedule monthly data quality audit queries",
    ],
    impact: "High",
    effort: "Low",
  },
];

const SEVERITY_COLOR = (s: number) =>
  s >= 9 ? "#EF4444" : s >= 7 ? "#F59E0B" : "#10B981";

export default function RealWorldFriction() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="friction" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(239,68,68,0.05) 0%, transparent 60%)" }} />

      <div className="section-container">
        <motion.div
          variants={staggerContainer} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Production Reality
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-white mb-4">
            Real-World Friction
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-xl mx-auto">
            Three scenarios every production database encounters — with root causes and battle-tested solutions.
          </motion.p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            const isOpen = expanded === prob.id;

            return (
              <motion.div
                key={prob.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass-card overflow-hidden"
                style={{
                  boxShadow: isOpen ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${prob.glow}` : undefined,
                  borderColor: isOpen ? prob.color + "40" : undefined,
                }}
              >
                {/* Header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : prob.id)}
                  className="w-full p-5 flex items-center gap-4 text-left group"
                  aria-expanded={isOpen}
                >
                  {/* Severity ring */}
                  <div className="relative flex-shrink-0">
                    <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden="true">
                      <circle cx={24} cy={24} r={20} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={3} />
                      <circle
                        cx={24} cy={24} r={20}
                        fill="none"
                        stroke={SEVERITY_COLOR(prob.severity)}
                        strokeWidth={3}
                        strokeDasharray={`${prob.severity * 12.56} 125.6`}
                        strokeLinecap="round"
                        transform="rotate(-90 24 24)"
                        style={{ transition: "stroke-dasharray 1s ease" }}
                      />
                      <text x={24} y={29} textAnchor="middle" fontSize={12} fontWeight="bold"
                        fill={SEVERITY_COLOR(prob.severity)} fontFamily="system-ui">
                        {prob.severity}
                      </text>
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: prob.color }} />
                      <h3 className="text-white font-bold text-lg">{prob.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: prob.color + "22", color: prob.color, border: `1px solid ${prob.color}44` }}>
                        {prob.category}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm truncate">{prob.description}</p>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-white/30 flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-white/8 pt-5 grid md:grid-cols-2 gap-5">
                        {/* Symptoms */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
                            Symptoms
                          </p>
                          <ul className="space-y-2">
                            {prob.symptoms.map((s) => (
                              <li key={s} className="flex items-start gap-2 text-sm text-white/60">
                                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: prob.color }} />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Solution Steps */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
                            Solution
                          </p>
                          <ul className="space-y-2">
                            {prob.steps.map((step, i) => (
                              <motion.li
                                key={step}
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                                className="flex items-start gap-2 text-sm text-white/70"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-400" />
                                {step}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Bottom meta */}
                      <div className="mx-5 mb-5 p-3 rounded-xl flex items-center justify-between"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-xs text-white/40 leading-relaxed max-w-sm">{prob.solution}</p>
                        <div className="flex flex-col gap-1 ml-4 flex-shrink-0 text-right">
                          <span className="text-xs text-white/30">Impact: <strong style={{ color: prob.color }}>{prob.impact}</strong></span>
                          <span className="text-xs text-white/30">Effort: <strong className="text-white/50">{prob.effort}</strong></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
