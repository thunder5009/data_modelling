"use client";

import { motion } from "framer-motion";
import { Database, ExternalLink, Heart } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/8">
      {/* Gradient line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #4F46E5, #06B6D4, transparent)" }}
      />

      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white/60">
              DataModel<span className="text-cyan-400">Pro</span>
            </span>
          </motion.div>

          {/* Center */}
          <p className="text-xs text-white/30 text-center flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for Hackathon 2026
            <span className="text-white/15 mx-1">·</span>
            Data Modeling Vertical
          </p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "#fff" }}
              className="text-white/30 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.1 }}
              className="text-white/30 hover:text-white transition-colors"
              aria-label="Live site"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-6 justify-center text-xs text-white/20">
          {["Next.js 14", "React 18", "Tailwind CSS", "Framer Motion", "TypeScript", "Next.js API Routes"].map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
