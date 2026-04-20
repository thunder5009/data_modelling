import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataModel Pro — Interactive Data Modeling Platform",
  description:
    "A next-generation platform to learn, explore, and master data modeling concepts including normalization, ER diagrams, indexing, cardinality, and more. Built for hackathon excellence.",
  keywords: [
    "data modeling",
    "normalization",
    "ER diagrams",
    "database design",
    "cardinality",
    "indexing",
    "DFD",
    "constraints",
  ],
  openGraph: {
    title: "DataModel Pro",
    description: "Interactive data modeling platform with Liquid Glass UI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
