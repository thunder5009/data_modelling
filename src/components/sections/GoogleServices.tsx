"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, CheckCircle2, Cloud, Database, Layers } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

async function handleExport() {
  const res = await fetch("/api/export");
  if (!res.ok) return;
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data_model_schema.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function GoogleSheetsIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" fill="#0F9D58" opacity="0.9" />
      <rect x="7" y="7" width="10" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      <rect x="7" y="10.5" width="10" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      <rect x="7" y="14" width="6" height="1.5" rx="0.75" fill="white" opacity="0.9" />
    </svg>
  );
}

function FirebaseIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 20 L12 3 L15 10 L18 7 L21 20 Z" fill="#FFCA28" opacity="0.9" />
      <path d="M5 20 L12 3 L9 12 Z" fill="#FF8F00" opacity="0.9" />
    </svg>
  );
}

export default function GoogleServicesSection() {
  return (
    <section id="google" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 60%)" }} />

      <div className="section-container">
        <motion.div
          variants={staggerContainer} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Cloud Integration
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-white mb-4">
            Google Services
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-xl mx-auto">
            Export your schema to Google Sheets and architect on Google Cloud — integrated meaningfully, not superficially.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Google Sheets Export */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6"
            style={{ border: "1px solid rgba(15,157,88,0.25)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <GoogleSheetsIcon />
              </div>
              <div>
                <p className="font-bold text-white">Google Sheets Export</p>
                <p className="text-xs text-white/40">Live schema data as CSV</p>
              </div>
            </div>

            {/* Mock spreadsheet */}
            <div className="rounded-xl overflow-hidden mb-5 border border-white/8">
              <div className="bg-emerald-950/40 px-3 py-2 flex items-center gap-2 border-b border-white/8">
                <GoogleSheetsIcon />
                <span className="text-xs text-white/60 font-medium">data_model_schema.csv</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/8">
                      {["entity", "attribute", "type", "constraint"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-white/30 font-semibold uppercase text-[10px] tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["users", "user_id", "UUID", "PRIMARY KEY"],
                      ["users", "email", "VARCHAR(255)", "UNIQUE NOT NULL"],
                      ["products", "product_id", "UUID", "PRIMARY KEY"],
                      ["products", "price", "DECIMAL(10,2)", "CHECK(price≥0)"],
                      ["orders", "user_id", "UUID", "FOREIGN KEY"],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                        {row.map((cell, j) => (
                          <td key={j} className={`px-3 py-2 ${
                            j === 0 ? "text-emerald-400" :
                            j === 3 ? "text-cyan-400/70" :
                            "text-white/55"
                          }`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-3 py-1.5 bg-white/2 text-[10px] text-white/25 font-mono">
                26 rows total · 5 entities
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <motion.button
                onClick={handleExport}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary"
              >
                <Download className="w-4 h-4" />
                Export to CSV
              </motion.button>
              <motion.a
                href="https://sheets.google.com/create"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold btn-glass text-white/80"
              >
                <ExternalLink className="w-4 h-4" />
                Open Google Sheets
              </motion.a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Schema Audits", "Data Quality Reports", "Team Collaboration", "Version History"].map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full text-emerald-400/70 border border-emerald-400/20 bg-emerald-400/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Firebase Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card p-6"
            style={{ border: "1px solid rgba(255,202,40,0.2)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <FirebaseIcon />
              </div>
              <div>
                <p className="font-bold text-white">Google Cloud Architecture</p>
                <p className="text-xs text-white/40">Firebase + Cloud Run + Firestore</p>
              </div>
            </div>

            {/* Architecture SVG */}
            <div className="rounded-xl bg-black/30 border border-white/8 p-5 mb-5">
              <svg viewBox="0 0 280 180" className="w-full" aria-label="Google Cloud Architecture Diagram">
                {/* Client */}
                <rect x="10" y="70" width="50" height="40" rx="6"
                  fill="rgba(79,70,229,0.15)" stroke="#4F46E5" strokeWidth="0.5" />
                <text x="35" y="87" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">Next.js</text>
                <text x="35" y="97" textAnchor="middle" fontSize="5" fill="rgba(255,255,255,0.5)">Client</text>
                <text x="35" y="107" textAnchor="middle" fontSize="5" fill="rgba(255,255,255,0.3)">:3000</text>

                {/* Arrow 1 */}
                <motion.line x1="60" y1="90" x2="90" y2="90"
                  stroke="#06B6D4" strokeWidth="0.6" strokeDasharray="3 2"
                  className="animated-dash" />
                <text x="75" y="86" textAnchor="middle" fontSize="4.5" fill="rgba(6,182,212,0.7)">HTTPS</text>

                {/* Cloud Run */}
                <rect x="90" y="60" width="60" height="60" rx="6"
                  fill="rgba(6,182,212,0.12)" stroke="#06B6D4" strokeWidth="0.5" />
                <Cloud x={103} y={68} width={12} height={12} color="#06B6D4" />
                <text x="120" y="93" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">Cloud Run</text>
                <text x="120" y="103" textAnchor="middle" fontSize="5" fill="rgba(255,255,255,0.5)">API Routes</text>
                <text x="120" y="113" textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,0.3)">Auto-scaling</text>

                {/* Arrow 2 (to Firestore) */}
                <motion.line x1="150" y1="70" x2="180" y2="55"
                  stroke="#FFCA28" strokeWidth="0.6" strokeDasharray="3 2"
                  className="animated-dash" />

                {/* Arrow 3 (to Auth) */}
                <motion.line x1="150" y1="110" x2="180" y2="120"
                  stroke="#34D399" strokeWidth="0.6" strokeDasharray="3 2"
                  className="animated-dash" />

                {/* Firestore */}
                <rect x="180" y="30" width="55" height="42" rx="6"
                  fill="rgba(255,202,40,0.1)" stroke="#FFCA28" strokeWidth="0.5" />
                <Database x={193} y={37} width={10} height={10} color="#FFCA28" />
                <text x="207" y="57" textAnchor="middle" fontSize="5.5" fill="white" fontWeight="bold">Firestore</text>
                <text x="207" y="66" textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,0.45)">NoSQL DB</text>

                {/* Firebase Auth */}
                <rect x="180" y="105" width="55" height="42" rx="6"
                  fill="rgba(16,185,129,0.1)" stroke="#10B981" strokeWidth="0.5" />
                <Layers x={193} y={112} width={10} height={10} color="#10B981" />
                <text x="207" y="131" textAnchor="middle" fontSize="5.5" fill="white" fontWeight="bold">Firebase</text>
                <text x="207" y="140" textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,0.45)">Auth + SDK</text>

                {/* GCP label */}
                <rect x="75" y="22" width="175" height="142" rx="8"
                  fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="5 3" />
                <text x="162" y="20" textAnchor="middle" fontSize="5" fill="rgba(255,255,255,0.2)">
                  Google Cloud Platform
                </text>
              </svg>
            </div>

            <div className="space-y-2">
              {[
                { icon: CheckCircle2, text: "Auto-scaling with Cloud Run (0 → N instances)", color: "#06B6D4" },
                { icon: CheckCircle2, text: "Real-time data sync via Firestore listeners", color: "#FFCA28" },
                { icon: CheckCircle2, text: "Managed auth with Firebase Authentication", color: "#10B981" },
                { icon: CheckCircle2, text: "Deployed from same Next.js codebase", color: "#7C3AED" },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-start gap-2">
                  <Icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color }} />
                  <p className="text-xs text-white/55">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
