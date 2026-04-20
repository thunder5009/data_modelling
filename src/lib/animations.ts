import { Variants } from "framer-motion";

// ─── Shared Spring Configs ───────────────────────────────────────────────────
export const springSnappy = { type: "spring", stiffness: 400, damping: 30 };
export const springBouncy = { type: "spring", stiffness: 300, damping: 20 };
export const springGentle = { type: "spring", stiffness: 150, damping: 25 };

// ─── Page / Section Transitions ─────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ─── Stagger Container ───────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

// ─── Card Hover ──────────────────────────────────────────────────────────────
export const cardHover = {
  rest: { scale: 1, rotateX: 0, rotateY: 0 },
  hover: {
    scale: 1.03,
    transition: springSnappy,
  },
};

// ─── Button Press ────────────────────────────────────────────────────────────
export const buttonPress = {
  whileTap: { scale: 0.96 },
  whileHover: { scale: 1.04 },
  transition: springSnappy,
};

// ─── Floating / Blob ─────────────────────────────────────────────────────────
export const floatAnim = {
  animate: {
    y: [0, -18, 0],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const blobAnim = (delay = 0) => ({
  animate: {
    scale: [1, 1.08, 0.95, 1],
    x: [0, 30, -20, 0],
    y: [0, -25, 15, 0],
    transition: {
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity,
      delay,
    },
  },
});

// ─── Navbar ──────────────────────────────────────────────────────────────────
export const navbarAnim: Variants = {
  top: { backgroundColor: "rgba(5,5,16,0)", backdropFilter: "blur(0px)", borderColor: "rgba(255,255,255,0)" },
  scrolled: {
    backgroundColor: "rgba(5,5,16,0.85)",
    backdropFilter: "blur(24px)",
    borderColor: "rgba(255,255,255,0.08)",
    transition: { duration: 0.4 },
  },
};

// ─── List Item ───────────────────────────────────────────────────────────────
export const listItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
