"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Lightbulb, Zap, GitCompare, Code2, RefreshCw } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

type Rec = { tips: string[]; performance: string[]; tradeoffs: string[]; indexes: string[] };

const ENTITY_LABELS: Record<string, { label: string; color: string }> = {
  user: { label: "User", color: "#4F46E5" },
  product: { label: "Product", color: "#06B6D4" },
  order: { label: "Order", color: "#7C3AED" },
  category: { label: "Category", color: "#10B981" },
  payment: { label: "Payment", color: "#EF4444" },
  default: { label: "General", color: "#60A5FA" },
};

const TAB_CONFIG = [
  { id: "tips", label: "Schema Tips", icon: Lightbulb, color: "#F59E0B" },
  { id: "performance", label: "Performance", icon: Zap, color: "#06B6D4" },
  { id: "tradeoffs", label: "Tradeoffs", icon: GitCompare, color: "#7C3AED" },
  { id: "indexes", label: "Indexes", icon: Code2, color: "#10B981" },
];

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 18);
    return () => clearInterval(timer);
  }, [text]);
  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="typing-cursor" />}
    </span>
  );
}

export default function SmartAssistant() {
  const [entity, setEntity] = useState("default");
  const [activeTab, setActiveTab] = useState("tips");
  const [rec, setRec] = useState<Rec | null>(null);
  const [loading, setLoading] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const fetchRec = useCallback(async (e: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/recommendations?entity=${e}`);
      if (res.ok) {
        const json = await res.json();
        setRec(json.data);
        setTipIndex(0);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRec(entity); }, [entity, fetchRec]);

  const currentItems = rec?.[activeTab as keyof Rec] ?? [];

  return (
    <section id="assistant" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(79,70,229,0.08) 0%, transparent 60%)" }} />

      <div className="section-container">
        <motion.div
          variants={staggerContainer} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-4">
            AI-Powered
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-white mb-4">
            Smart Assistant
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-xl mx-auto">
            Select an entity to receive intelligent schema recommendations, performance tips, and real-world tradeoffs.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Entity Selector */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-3"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Select Entity</p>
            {Object.entries(ENTITY_LABELS).map(([id, meta]) => {
              const isActive = entity === id;
              return (
                <motion.button
                  key={id}
                  onClick={() => setEntity(id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-300 ${
                    isActive ? "glass-strong" : "glass hover:glass-strong"
                  }`}
                  style={{
                    borderColor: isActive ? meta.color + "50" : "rgba(255,255,255,0.08)",
                    boxShadow: isActive ? `0 0 20px ${meta.color}22` : "none",
                  }}
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: meta.color, boxShadow: isActive ? `0 0 10px ${meta.color}` : "none" }}
                  />
                  <span className={`text-sm font-semibold transition-colors ${isActive ? "text-white" : "text-white/60"}`}>
                    {meta.label}
                  </span>
                  {isActive && (
                    <motion.div layoutId="active-entity" className="ml-auto">
                      <Bot className="w-4 h-4" style={{ color: meta.color }} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Recommendations Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 glass-card p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: loading ? 360 : 0 }}
                  transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                  className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
                >
                  <Bot className="w-4 h-4 text-white" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white">Schema Advisor</p>
                  <p className="text-xs text-white/40 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${loading ? "bg-yellow-400 animate-pulse" : "bg-emerald-400"}`} />
                    {loading ? "Analyzing..." : `Analyzing ${ENTITY_LABELS[entity]?.label ?? "schema"}`}
                  </p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9, rotate: 180 }}
                onClick={() => fetchRec(entity)}
                className="p-2 rounded-xl glass text-white/40 hover:text-white transition-colors"
                title="Refresh recommendations"
              >
                <RefreshCw className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Tab Bar */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
              {TAB_CONFIG.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                      isActive ? "glass-strong" : "glass hover:glass-strong"
                    }`}
                    style={{
                      color: isActive ? tab.color : "rgba(255,255,255,0.5)",
                      borderColor: isActive ? tab.color + "40" : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 rounded-xl animate-pulse"
                      style={{ background: "rgba(255,255,255,0.04)" }} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={`${entity}-${activeTab}`}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3"
                >
                  {currentItems.map((item, i) => {
                    const tab = TAB_CONFIG.find((t) => t.id === activeTab);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-4 rounded-2xl group"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        <div className="flex gap-3">
                          <div
                            className="w-1.5 rounded-full flex-shrink-0 mt-1"
                            style={{ background: tab?.color, minHeight: 16 }}
                          />
                          <p className={`text-sm leading-relaxed ${
                            activeTab === "indexes"
                              ? "font-mono text-emerald-300 text-xs"
                              : "text-white/70"
                          }`}>
                            {i === 0 && tipIndex === 0 ? (
                              <TypingText text={item} />
                            ) : item}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer note */}
            <div className="mt-5 pt-4 border-t border-white/8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-white/30">
                Recommendations are context-aware and adapt to the selected entity schema.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
