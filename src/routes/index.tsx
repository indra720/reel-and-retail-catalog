import { createFileRoute } from '@tanstack/react-router'
import { PackageSearch } from "lucide-react";
import { useState } from "react";

import { BackgroundFX } from "@/components/BackgroundFX";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductSection } from "@/components/ProductSection";
import { TermsAndConditions } from "@/components/TermsAndConditions";
import { FloatingWhatsApp } from "@/components/WhatsAppButton";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/data/catalog";
import { useProductAutoScroll } from "@/hooks/use-product-auto-scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMINA Living — Double Your Sales with Video Catalogs" },
      {
        name: "description",
        content:
          "Sales: Jo dikhta hai wo bikta hai. Double your sales by showing live videos and HD photos of your products directly to clients with WhatsApp inquiries.",
      },
      { property: "og:title", content: "LUMINA Living — Luxury Video Product Catalog" },
      {
        property: "og:description",
        content:
          "Curated luxury lighting, furniture, decor & textiles with live video reels and hotel pricing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<CategoryId>("all");
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isCustomerCareOpen, setIsCustomerCareOpen] = useState(false);

  // Website page does NOT auto-scroll (disabled as per user instruction: product gallery handles its own movement)
  useProductAutoScroll(false);

  const products =
    category === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.category === category);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#F8F5F0]">
      <BackgroundFX />
      <Header
        isTrainingOpen={isTrainingOpen}
        setIsTrainingOpen={setIsTrainingOpen}
        isPricingOpen={isPricingOpen}
        setIsPricingOpen={setIsPricingOpen}
        isCustomerCareOpen={isCustomerCareOpen}
        setIsCustomerCareOpen={setIsCustomerCareOpen}
      />

      <main className="relative z-10 mx-auto max-w-[1500px] px-3.5 pb-12 pt-4 sm:px-5 lg:px-5">
        {/* First Impression Hero Banner: "Double Your Sales by Showing Videos of your Products" */}
        <HeroBanner
          onOpenTraining={() => setIsTrainingOpen(true)}
          onOpenPricing={() => setIsPricingOpen(true)}
          onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
        />

        {/* Category Navigation Bar matching Wireframe: Category : [ ] [ ] [ ] [ ] */}
        <div id="solutions" className="flex flex-wrap items-center gap-3 border-b border-[#E8E2D8] pb-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Category :
          </span>
          <CategoryNav categories={CATEGORIES} active={category} onChange={setCategory} />
        </div>

        {/* Vertical Stack of Products (Manual page scrolling) */}
        {products.length > 0 ? (
          <div className="space-y-3">
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

        {/* 7a. TERMS & CONDITIONS OF SELLER: at the very end of the catalog, above the footer */}
        <TermsAndConditions />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
