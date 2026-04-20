"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Link, Database, ChevronDown, X } from "lucide-react";
import { fadeUp, staggerContainer, slideInRight, slideInLeft } from "@/lib/animations";

type Attribute = { name: string; type: string; isPK?: boolean; isFK?: boolean; isUnique?: boolean };
type Entity = {
  id: string; label: string; x: number; y: number; color: string;
  attributes: Attribute[]; description: string;
};
type Relationship = { id: string; from: string; to: string; type: string; label: string; description: string };

const ENTITIES: Entity[] = [
  {
    id: "user", label: "User", x: 12, y: 35, color: "#4F46E5",
    attributes: [
      { name: "user_id", type: "UUID", isPK: true },
      { name: "email", type: "VARCHAR(255)", isUnique: true },
      { name: "name", type: "VARCHAR(100)" },
      { name: "created_at", type: "TIMESTAMP" },
      { name: "role", type: "ENUM" },
    ],
    description: "Authenticated user accounts with role-based access control.",
  },
  {
    id: "product", label: "Product", x: 42, y: 12, color: "#06B6D4",
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
    id: "order", label: "Order", x: 42, y: 60, color: "#7C3AED",
    attributes: [
      { name: "order_id", type: "UUID", isPK: true },
      { name: "user_id", type: "UUID", isFK: true },
      { name: "status", type: "ENUM" },
      { name: "total_amount", type: "DECIMAL(12,2)" },
      { name: "ordered_at", type: "TIMESTAMP" },
    ],
    description: "Customer orders with fulfillment lifecycle tracking.",
  },
  {
    id: "category", label: "Category", x: 72, y: 12, color: "#10B981",
    attributes: [
      { name: "category_id", type: "UUID", isPK: true },
      { name: "name", type: "VARCHAR(100)" },
      { name: "parent_id", type: "UUID", isFK: true },
      { name: "slug", type: "VARCHAR(120)", isUnique: true },
    ],
    description: "Hierarchical product taxonomy with self-referential parent.",
  },
  {
    id: "payment", label: "Payment", x: 72, y: 60, color: "#EF4444",
    attributes: [
      { name: "payment_id", type: "UUID", isPK: true },
      { name: "order_id", type: "UUID", isFK: true },
      { name: "method", type: "ENUM" },
      { name: "amount", type: "DECIMAL(12,2)" },
      { name: "status", type: "ENUM" },
      { name: "paid_at", type: "TIMESTAMP" },
    ],
    description: "Payment transactions with idempotency and audit trail.",
  },
];

const RELATIONSHIPS: Relationship[] = [
  { id: "u-o", from: "user", to: "order", type: "1:N", label: "places", description: "One user places many orders" },
  { id: "c-p", from: "category", to: "product", type: "1:N", label: "contains", description: "One category holds many products" },
  { id: "o-p", from: "order", to: "product", type: "N:M", label: "includes", description: "Via order_items junction table" },
  { id: "o-pay", from: "order", to: "payment", type: "1:1", label: "paid via", description: "Each order has one payment" },
];

const REL_COLORS: Record<string, string> = { "1:N": "#06B6D4", "N:M": "#7C3AED", "1:1": "#10B981" };

function getEntityCenter(id: string) {
  const e = ENTITIES.find((e) => e.id === id);
  if (!e) return { cx: 0, cy: 0 };
  return { cx: e.x + 7, cy: e.y + 5 };
}

export default function SchemaExplorer() {
  const [selected, setSelected] = useState<Entity | null>(null);
  const [hoveredRel, setHoveredRel] = useState<string | null>(null);


  return (
    <section id="explorer" className="py-24 relative">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Interactive
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-white mb-4">
            Schema Explorer
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg">
            Click any entity to inspect its attributes and relationships.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* SVG Canvas */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card p-4 relative overflow-hidden"
            style={{ minHeight: 380 }}
          >
            <div className="text-xs text-white/30 font-mono mb-3 flex items-center gap-2">
              <Database className="w-3.5 h-3.5" />
              <span>e-commerce_db.schema — 5 entities · 4 relationships</span>
            </div>

            <svg
              viewBox="0 0 100 80"
              className="w-full"
              style={{ minHeight: 320 }}
              aria-label="Database schema diagram"
            >
              {/* Relationship Lines */}
              {RELATIONSHIPS.map((rel) => {
                const from = getEntityCenter(rel.from);
                const to = getEntityCenter(rel.to);
                const color = REL_COLORS[rel.type] ?? "#ffffff";
                const isHov = hoveredRel === rel.id;
                const midX = (from.cx + to.cx) / 2;
                const midY = (from.cy + to.cy) / 2;
                return (
                  <g
                    key={rel.id}
                    onMouseEnter={() => setHoveredRel(rel.id)}
                    onMouseLeave={() => setHoveredRel(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <motion.line
                      x1={from.cx} y1={from.cy}
                      x2={to.cx} y2={to.cy}
                      stroke={color}
                      strokeWidth={isHov ? 0.6 : 0.35}
                      strokeDasharray={rel.type === "N:M" ? "2 1" : "none"}
                      opacity={isHov ? 0.9 : 0.4}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1, opacity: isHov ? 0.9 : 0.4 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    {/* Cardinality badge */}
                    <motion.g
                      animate={{ opacity: isHov ? 1 : 0.6 }}
                    >
                      <rect x={midX - 3} y={midY - 2} width={6} height={4} rx={1}
                        fill="rgba(5,5,16,0.9)" stroke={color} strokeWidth={0.2} />
                      <text x={midX} y={midY + 1} textAnchor="middle"
                        fontSize={2.2} fill={color} fontFamily="monospace" fontWeight="bold">
                        {rel.type}
                      </text>
                    </motion.g>
                  </g>
                );
              })}

              {/* Entity Nodes */}
              {ENTITIES.map((entity) => {
                const isSelected = selected?.id === entity.id;
                return (
                  <motion.g
                    key={entity.id}
                    onClick={() => setSelected(isSelected ? null : entity)}
                    style={{ cursor: "pointer" }}
                    whileHover={{ scale: 1.05 }}
                    animate={{ scale: isSelected ? 1.06 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Glow ring */}
                    {isSelected && (
                      <motion.rect
                        x={entity.x - 1} y={entity.y - 1} width={16} height={12} rx={2}
                        fill="none" stroke={entity.color} strokeWidth={0.8}
                        opacity={0.6}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    {/* Card */}
                    <rect
                      x={entity.x} y={entity.y} width={14} height={10} rx={1.5}
                      fill={isSelected ? entity.color + "22" : "rgba(255,255,255,0.04)"}
                      stroke={entity.color}
                      strokeWidth={isSelected ? 0.5 : 0.3}
                      opacity={isSelected ? 1 : 0.8}
                    />
                    {/* Header */}
                    <rect x={entity.x} y={entity.y} width={14} height={3} rx={1.5}
                      fill={entity.color + "33"} />
                    <rect x={entity.x} y={entity.y + 1.5} width={14} height={1.5} fill={entity.color + "33"} />
                    {/* Label */}
                    <text x={entity.x + 7} y={entity.y + 2} textAnchor="middle"
                      fontSize={2.4} fill="white" fontWeight="bold" fontFamily="system-ui">
                      {entity.label}
                    </text>
                    {/* Attributes preview */}
                    {entity.attributes.slice(0, 3).map((attr, i) => (
                      <g key={attr.name}>
                        <text x={entity.x + 1} y={entity.y + 5 + i * 1.6}
                          fontSize={1.5} fill={attr.isPK ? "#F59E0B" : attr.isFK ? "#06B6D4" : "rgba(255,255,255,0.55)"}
                          fontFamily="monospace">
                          {attr.isPK ? "🔑 " : attr.isFK ? "🔗 " : "• "}{attr.name}
                        </text>
                        <text x={entity.x + 12.5} y={entity.y + 5 + i * 1.6}
                          fontSize={1.3} fill="rgba(255,255,255,0.3)" textAnchor="end" fontFamily="monospace">
                          {attr.type.split("(")[0]}
                        </text>
                      </g>
                    ))}
                    {entity.attributes.length > 3 && (
                      <text x={entity.x + 1} y={entity.y + 9.2}
                        fontSize={1.4} fill="rgba(255,255,255,0.25)" fontFamily="monospace">
                        +{entity.attributes.length - 3} more...
                      </text>
                    )}
                  </motion.g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-white/8">
              {Object.entries(REL_COLORS).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 rounded" style={{ background: color }} />
                  <span className="text-xs font-mono text-white/40">{type}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <Key className="w-3 h-3 text-amber-400" />
                <span className="text-xs text-white/40">PK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Link className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-white/40">FK</span>
              </div>
            </div>
          </motion.div>

          {/* Detail Panel */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-widest mb-1"
                        style={{ color: selected.color }}
                      >
                        Entity
                      </div>
                      <h3 className="text-xl font-bold text-white">{selected.label}</h3>
                      <p className="text-white/50 text-sm mt-1">{selected.description}</p>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="p-1.5 rounded-lg glass text-white/40 hover:text-white transition-colors"
                      aria-label="Close panel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Attributes */}
                  <div className="space-y-2 mb-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Attributes</p>
                    {selected.attributes.map((attr, i) => (
                      <motion.div
                        key={attr.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between py-2 px-3 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <div className="flex items-center gap-2">
                          {attr.isPK && <Key className="w-3.5 h-3.5 text-amber-400" />}
                          {attr.isFK && <Link className="w-3.5 h-3.5 text-cyan-400" />}
                          {!attr.isPK && !attr.isFK && <div className="w-3.5 h-3.5 rounded-full bg-white/10" />}
                          <span className="text-sm font-mono text-white/80">{attr.name}</span>
                          {attr.isUnique && (
                            <span className="text-xs px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                              UNQ
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-white/35">{attr.type}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Related relationships */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Relationships</p>
                    <div className="space-y-2">
                      {RELATIONSHIPS.filter((r) => r.from === selected.id || r.to === selected.id).map((rel) => {
                        const other = rel.from === selected.id ? rel.to : rel.from;
                        const otherEntity = ENTITIES.find((e) => e.id === other);
                        const color = REL_COLORS[rel.type];
                        return (
                          <div key={rel.id} className="flex items-center gap-3 py-2 px-3 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.04)" }}>
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-white/70">
                                <span style={{ color: otherEntity?.color }}>{otherEntity?.label}</span>
                                <span className="text-white/40 mx-1.5">—</span>
                                <span className="text-white/50 text-xs">{rel.description}</span>
                              </div>
                            </div>
                            <span className="text-xs font-mono px-2 py-0.5 rounded-md flex-shrink-0"
                              style={{ background: color + "22", color, border: `1px solid ${color}44` }}>
                              {rel.type}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-8 flex flex-col items-center justify-center text-center min-h-[300px]"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Database className="w-10 h-10 text-white/20 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-white/35 text-sm">Click any entity node in the diagram to inspect its schema</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-indigo-400/60">
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>Select an entity</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
