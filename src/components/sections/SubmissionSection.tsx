"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, BookOpen, Code2, Globe } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
import { fadeUp, staggerContainer } from "@/lib/animations";

const checklist = [
  { done: true, text: "Project Overview & Vertical documented" },
  { done: true, text: "Approach & logic explained" },
  { done: true, text: "Tech stack listed (Next.js, Tailwind, Framer Motion)" },
  { done: true, text: "Google Services integration (Sheets export + Firebase arch)" },
  { done: true, text: "All 6 core concepts covered interactively" },
  { done: true, text: "API routes with structured JSON + validation" },
  { done: true, text: "Repo under 1 MB (node_modules gitignored)" },
  { done: true, text: "Single branch (main) maintained" },
  { done: true, text: "Responsive design across all breakpoints" },
  { done: true, text: "Accessibility: ARIA, keyboard navigation, contrast" },
];

export default function SubmissionSection() {
  return (
    <section id="submission" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.1) 0%, transparent 60%)" }} />

      <div className="section-container">
        <motion.div
          variants={staggerContainer} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Hackathon 2026
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-white mb-4">
            Submission
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-xl mx-auto">
            Everything judges need — GitHub repo, README checklist, and live preview — in one polished panel.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* GitHub Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6"
            style={{ border: "1px solid rgba(99,102,241,0.3)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/12 flex items-center justify-center">
                <GithubIcon className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Repository</p>
                <p className="text-xs text-white/40">github.com</p>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 font-mono text-sm mb-5 border border-white/6">
              <div className="text-white/30 text-xs mb-2">$ git clone</div>
              <div className="text-indigo-300 break-all text-xs leading-relaxed">
                github.com/user/<br />data-modeling-pro
              </div>
            </div>

            <div className="space-y-2 mb-5">
              {[
                { label: "Branch", value: "main" },
                { label: "Repo size", value: "< 1 MB" },
                { label: "License", value: "MIT" },
                { label: "Language", value: "TypeScript" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center text-xs">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white/70 font-mono">{value}</span>
                </div>
              ))}
            </div>

            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-glass w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
            >
              <GithubIcon className="w-4 h-4" />
              View Repository
            </motion.a>
          </motion.div>

          {/* README Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">README Checklist</p>
                <p className="text-xs text-emerald-400">{checklist.filter((c) => c.done).length}/{checklist.length} complete</p>
              </div>
            </div>

            <div className="space-y-2">
              {checklist.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${item.done ? "text-emerald-400" : "text-white/20"}`}
                  />
                  <p className={`text-xs ${item.done ? "text-white/65" : "text-white/25"}`}>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Live Preview</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400">Active</span>
                </div>
              </div>
            </div>

            {/* Mock browser window */}
            <div className="flex-1 bg-black/40 rounded-xl border border-white/10 overflow-hidden mb-5">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/8">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 bg-white/8 rounded-md px-3 py-1 text-xs text-white/40 font-mono">
                  datamodel-pro.vercel.app
                </div>
              </div>
              <div className="p-3 space-y-2">
                <div className="h-2 bg-white/10 rounded w-3/4" />
                <div className="h-2 bg-white/6 rounded w-1/2" />
                <div className="grid grid-cols-3 gap-1.5 mt-3">
                  {[3, 4, 5].map((w) => (
                    <div key={w} className="h-12 rounded-lg bg-white/4 border border-white/6" />
                  ))}
                </div>
                <div className="h-16 rounded-lg bg-indigo-500/8 border border-indigo-500/15 mt-2" />
              </div>
            </div>

            <div className="space-y-2 mb-5">
              {[
                { icon: Code2, text: "Next.js 14 App Router", color: "text-white/60" },
                { icon: Globe, text: "Vercel Edge Network", color: "text-cyan-400/70" },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className={`flex items-center gap-2 text-xs ${color}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {text}
                </div>
              ))}
            </div>

            <motion.a
              href="#hero"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
            >
              <ExternalLink className="w-4 h-4" />
              Open Live Preview
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
