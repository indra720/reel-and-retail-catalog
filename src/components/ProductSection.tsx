import type { Product } from "@/data/catalog";

import { MediaCarousel } from "./MediaCarousel";
import { ProductDetails } from "./ProductDetails";
import { ShareButton } from "./ShareButton";

export function ProductSection({ product }: { product: Product }) {
  return (
    <section
      id={product.id}
      className="scroll-mt-24 py-3 sm:py-4 border-b border-[#E8E2D8] last:border-0"
    >
      {/* Top Header Row matching wireframe: Product No. - 1 ( Name ) ---------- Share */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5">
        <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2.5">
          <h2 className="font-serif text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-stone-900">
            Product No. - {product.index} ({product.name})
          </h2>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#9C733E]">
            · {product.category.toUpperCase()}
          </span>
        </div>

        <div className="shrink-0">
          <ShareButton product={product} />
        </div>
      </div>

      {/* Media Carousel (PICS & VIDEOS): 4-Card Auto-sliding */}
      <div className="mt-1">
        <MediaCarousel media={product.media} />
      </div>

      {/* Details Block: Price, Description, MOQ, Facility Line, WhatsApp Icon */}
      <div>
        <ProductDetails product={product} />
      </div>
    </section>
  );
}
