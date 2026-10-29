import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from "framer-motion";
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
      { title: "LUMINA Living — Premium 3D Product Catalog" },
      {
        name: "description",
        content:
          "Cinematic animated catalog of premium lighting, furniture, decor and textiles for homes, hotels & facilities — with instant WhatsApp inquiries.",
      },
      { property: "og:title", content: "LUMINA Living — Premium 3D Product Catalog" },
      {
        property: "og:description",
        content:
          "Cinematic animated catalog of premium lighting, furniture, decor and textiles for homes, hotels & facilities.",
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
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <BackgroundFX />
      <Header />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-6 md:px-8 md:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-glow">
              Collection 2026
            </p>
            <h2 className="text-gradient font-display mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              The Catalog
            </h2>
          </div>
          <p className="max-w-xs pb-1 text-sm text-muted-foreground">
            Scroll through each piece — every gallery plays photos and videos on its own.
          </p>
        </motion.div>

        <CategoryNav categories={CATEGORIES} active={category} onChange={setCategory} />

        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <ProductSection product={product} />
            </motion.div>
          ))}
        </AnimatePresence>

        {products.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
            <PackageSearch size={32} />
            <p className="text-sm">No products in this category yet.</p>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
