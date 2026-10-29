import { createFileRoute } from '@tanstack/react-router'
import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import { useState } from "react";

import { BackgroundFX } from "@/components/BackgroundFX";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductSection } from "@/components/ProductSection";
import { FloatingWhatsApp } from "@/components/WhatsAppButton";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMINA Living — Luxury Product Catalog" },
      {
        name: "description",
        content:
          "Curated catalog of premium lighting, furniture, decor and textiles for homes, hotels & facilities — with direct WhatsApp inquiries.",
      },
      { property: "og:title", content: "LUMINA Living — Luxury Product Catalog" },
      {
        property: "og:description",
        content:
          "Curated catalog of premium lighting, furniture, decor and textiles for homes, hotels & facilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<CategoryId>("all");

  const products =
    category === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.category === category);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#F8F5F0]">
      <BackgroundFX />
      <Header />

      <main className="relative z-10 mx-auto max-w-[1400px] px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        {/* Category Navigation Bar matching Wireframe: Category : [ ] [ ] [ ] [ ] */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#E8E2D8] pb-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Category :
          </span>
          <CategoryNav categories={CATEGORIES} active={category} onChange={setCategory} />
        </div>

        {/* Vertical Stack of Products (Up & Down Scroll as in wireframe) */}
        {products.length > 0 ? (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductSection key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-16 text-stone-500">
            <PackageSearch size={36} className="text-stone-400" />
            <p className="text-sm font-medium">No pieces found in this category.</p>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
