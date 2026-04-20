"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer, blobAnim, floatAnim } from "@/lib/animations";

export default function HeroSection() {
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.15) 0%, #050510 60%)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />

      {/* Animated blobs */}
      <motion.div
        {...blobAnim(0)}
        className="blob blob-blue"
        style={{ width: 600, height: 600, top: -100, left: -150 }}
      />
      <motion.div
        {...blobAnim(3)}
        className="blob blob-cyan"
        style={{ width: 500, height: 500, top: 100, right: -150 }}
      />
      <motion.div
        {...blobAnim(5)}
        className="blob blob-purple"
        style={{ width: 400, height: 400, bottom: -50, left: "30%" }}
      />

      {/* Cursor glow */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed z-0 w-[400px] h-[400px] rounded-full opacity-[0.06] transition-transform duration-300"
        style={{ background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)" }}
      />

      {/* Floating schema nodes in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { label: "1:N", x: "10%", y: "30%", delay: 0 },
          { label: "UUID", x: "85%", y: "20%", delay: 1 },
          { label: "INDEX", x: "80%", y: "70%", delay: 2 },
          { label: "FK", x: "15%", y: "65%", delay: 0.5 },
          { label: "N:M", x: "50%", y: "80%", delay: 1.5 },
        ].map((node) => (
          <motion.div
            key={node.label}
            animate={{ y: [0, -12, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
            className="absolute glass rounded-lg px-3 py-1.5 text-xs font-mono text-white/40 border border-white/10"
            style={{ left: node.x, top: node.y }}
          >
            {node.label}
          </motion.div>
        ))}
      </div>

      {/* SVG animated connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" aria-hidden="true">
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="1" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="10%" y1="30%" x2="50%" y2="50%"
          stroke="url(#lineGrad1)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        />
        <motion.line
          x1="85%" y1="20%" x2="50%" y2="50%"
          stroke="url(#lineGrad1)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Main content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center section-container max-w-5xl"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-8">
          <motion.div
            {...floatAnim}
            className="glass-strong rounded-full px-5 py-2 flex items-center gap-2 border border-indigo-500/30"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-white/70 font-medium">
              Hackathon 2026 · Data Modeling Vertical
            </span>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="section-title mb-6"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <span className="text-white">Data Modeling</span>
          <br />
          <span className="gradient-text">Reimagined</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          An interactive platform where database design meets Apple-level aesthetics.
          Explore normalization, ER diagrams, indexing strategies and real-world
          schema decisions — with cinematic animations that make concepts click.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center mb-16">
          <motion.a
            href="#concepts"
            whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(79,70,229,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-2xl text-base"
          >
            Explore Concepts
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="#explorer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="btn-glass flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-2xl text-base"
          >
            <Play className="w-4 h-4" />
            Try Schema Demo
          </motion.a>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          variants={fadeUp}
          className="glass-card rounded-2xl p-6 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: "6", label: "Core Concepts", color: "text-indigo-400" },
            { value: "5", label: "Entity Types", color: "text-cyan-400" },
            { value: "3", label: "Real Scenarios", color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050510)" }}
      />
    </section>
  );
}
