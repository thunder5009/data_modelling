# DataModel Pro 🗄️

> **Hackathon 2026 · Data Modeling Vertical**

A next-generation, Apple-inspired interactive platform that teaches, visualizes, and demonstrates real-world database design — with liquid-glass UI and cinematic animations.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff4d00?logo=framer)](https://www.framer.com/motion/)

---

## 📌 Project Overview

**DataModel Pro** is a full-stack web application that makes database design concepts tangible and interactive. Users can:

- Learn six core data modeling concepts with animated glass cards
- Explore a real e-commerce schema (User, Product, Order, Category, Payment) visually
- Click entities to inspect attributes, constraints, and cardinality relationships
- Receive AI-style schema recommendations via the Smart Assistant panel
- Discover and understand real-world friction points (Schema Drift, Query Bottlenecks, Data Quality)
- Export the schema to CSV for Google Sheets analysis
- See full Google Cloud / Firebase architecture

---

## 🎯 Chosen Vertical

**Data Modeling** — covering normalization, entity-relationship design, cardinality, indexing, Data Flow Diagrams, and integrity constraints applied to a realistic e-commerce product catalog.

---

## 🧠 Approach & Logic

### Design Philosophy
The "Liquid Glass" aesthetic (Apple Vision Pro-inspired) uses:
- `backdrop-filter: blur()` for frosted glass panels
- CSS radial gradients and animated SVG blobs for depth
- Framer Motion physics-based springs for organic feel

### Data Architecture
The schema models a real e-commerce system:
```
User ──1:N──> Order ──1:1──> Payment
Category ──1:N──> Product
Order ──N:M──> Product (via order_items junction)
```

### Smart Assistant Logic
The `/api/recommendations` endpoint accepts an `?entity=` query param and returns context-aware tips for schema design, performance, tradeoffs, and index suggestions — simulating intelligent decision-making.

---

## 🔧 How It Works

1. **Visit the site** → Hero section loads with animated background blobs
2. **Scroll to Concepts** → 6 glassmorphic cards reveal on scroll with stagger animation; click to expand details
3. **Schema Explorer** → Click SVG entity nodes to inspect attributes, constraints, and relationships
4. **Smart Assistant** → Select an entity → API fetches recommendations → typing animation reveals tips
5. **Friction Panel** → Accordion-style problem cards with severity meters and solution steps
6. **Google Services** → Click "Export to CSV" → `/api/export` returns CSV → browser downloads it
7. **Dashboard** → Animated circular progress rings count up as section enters viewport
8. **Submission** → Full hackathon-ready submission panel

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/concepts` | GET | 6 data modeling concepts with metadata |
| `/api/entities` | GET | Full schema (5 entities + 4 relationships) |
| `/api/problems` | GET | 3 real-world issues with causes + solutions |
| `/api/recommendations` | GET | Smart tips per `?entity=` param |
| `/api/export` | GET | Schema as downloadable CSV |

---

## 📐 Assumptions

- **Mock intelligence**: The Smart Assistant uses pre-computed expert knowledge, not a live LLM (keeps repo lightweight and latency-free)
- **Google Sheets**: Integration is via CSV export + direct Sheet-creation URL — no OAuth secrets required
- **Firebase**: Architecture is shown as an SVG diagram; actual Firebase SDK not initialized (avoids env secrets)
- **Schema**: The e-commerce schema represents a realistic but simplified production setup

---

## 🛠 Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | RSC + API routes in one package |
| Language | TypeScript 5 | Type safety throughout |
| Styling | Tailwind CSS 3.4 | Utility-first, small output |
| Animations | Framer Motion 11 | Physics springs, whileInView |
| Icons | Lucide React | Lightweight SVG icons |
| Fonts | Google Fonts (Inter + Outfit) | Premium typography |
| Diagrams | SVG (inline) | Zero image bytes |
| API | Next.js Route Handlers | Serverless by default |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

The app runs on `http://localhost:3000`.

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── globals.css          # Liquid Glass design system
│   ├── layout.tsx           # Root layout + fonts + metadata
│   ├── page.tsx             # Page assembly
│   └── api/
│       ├── concepts/        # Data modeling topics
│       ├── entities/        # Schema structure
│       ├── problems/        # Real-world issues
│       ├── recommendations/ # Smart assistant logic
│       └── export/          # CSV export
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky glass navbar
│   │   └── Footer.tsx       # Minimal footer
│   └── sections/
│       ├── HeroSection.tsx
│       ├── ConceptsSection.tsx
│       ├── SchemaExplorer.tsx
│       ├── SmartAssistant.tsx
│       ├── RealWorldFriction.tsx
│       ├── GoogleServices.tsx
│       ├── EvalDashboard.tsx
│       └── SubmissionSection.tsx
└── lib/
    └── animations.ts        # Framer Motion variants
```

---

## ✅ Hackathon Checklist

- [x] Repository under 1 MB (node_modules gitignored)
- [x] Single branch (main)
- [x] Clean, structured code
- [x] TypeScript strict mode
- [x] Security headers on all API routes
- [x] Responsive design (mobile → desktop)
- [x] Accessibility: ARIA labels, keyboard navigation, contrast
- [x] Google Services integration (CSV export + Firebase architecture)
- [x] Six core data modeling concepts covered
- [x] Interactive schema visualization
- [x] Smart assistant with context-aware recommendations
- [x] Real-world problem scenarios with solutions

---

*Made with precision and passion for the Data Modeling hackathon vertical.*
