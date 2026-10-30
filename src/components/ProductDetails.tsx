import { AnimatePresence, motion } from "framer-motion";
import { Building2, Check, ChevronDown, Layers } from "lucide-react";
import { useState } from "react";

import {
  buildWhatsAppLink,
  productInquiryMessage,
  type Product,
} from "@/data/catalog";
import { cn } from "@/lib/utils";

import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * 5 & 8. Compact product details card (<150px height)
 * 7b. Hotel / Facility Pricing Option:
 * - Animated toggle with "Exclusive" and "Inclusive" options.
 * - Displays matching price & note.
 * - Included in the WhatsApp inquiry message automatically.
 */
export function ProductDetails({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);
  const [hotelPricing, setHotelPricing] = useState<"Exclusive" | "Inclusive">("Inclusive");

  const whatsappHref = buildWhatsAppLink(
    productInquiryMessage(product, hotelPricing),
  );

  return (
    <div className="mt-2 rounded-2xl border border-[#E8E2D8] bg-white p-3.5 sm:p-4 shadow-xs">
      {/* Row 1: Price, MOQ and WhatsApp button sitting close together in one compact row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EBE1] pb-2.5">
        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
            {product.price}
          </span>
          <span className="text-xs font-medium text-stone-500">
            {product.priceNote}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5EFE6] px-2.5 py-0.5 text-[11px] font-bold text-[#9C733E] border border-[#E8DFC9]">
            <Layers size={11} className="text-[#9C733E]" />
            <span>{product.moq}</span>
          </span>
        </div>

        {/* WhatsApp Inquiry Button with active pricing option */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`Inquire about ${product.name} on WhatsApp`}
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-1.5 text-white shadow-xs hover:bg-[#20bd5a] hover:shadow-md transition-all active:scale-95 cursor-pointer text-xs font-semibold"
        >
          <WhatsAppIcon className="h-4 w-4 text-white" />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>

      {/* Row 2: Description with Read more / Read less */}
      <div className="pt-2 space-y-2.5">
        <div>
          <AnimatePresence initial={false}>
            <motion.div
              initial={false}
              animate={{ height: "auto" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <p
                className={cn(
                  "text-xs leading-relaxed text-stone-600 transition-all duration-300",
                  !expanded && "line-clamp-2",
                )}
              >
                {product.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {product.description.length > 90 && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#A27744] hover:text-[#7A5323] cursor-pointer"
            >
              <span>{expanded ? "Read less" : "Read more"}</span>
              <ChevronDown
                size={12}
                className={cn("transition-transform duration-200", expanded && "rotate-180")}
              />
            </button>
          )}
        </div>

        {/* Features Chips: Flexible wrap badge pills (fits content naturally on LG and mobile, no empty gaps) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {product.features.map((feature) => (
            <div
              key={feature}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F2] px-3 py-1 text-[11px] sm:text-xs font-medium text-stone-700 border border-[#EBE4D8] shadow-2xs hover:border-[#D5C7B2] transition-colors"
            >
              <Check size={12} className="shrink-0 text-emerald-600 font-bold" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* 7b. Hotel / Facility Pricing with Exclusive / Inclusive Animated Toggle */}
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2.5 rounded-xl bg-[#FAF7F2] p-2 sm:p-2.5 border border-[#ECE5D8]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EFE6D8] text-[#8A6331] shrink-0">
              <Building2 size={14} />
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-[11px] font-bold text-stone-800">
                  Hotels & Facilities:
                </span>
                <span className="text-xs font-bold text-[#8A6331]">
                  {hotelPricing === "Inclusive"
                    ? product.hotelPriceInclusive
                    : product.hotelPriceExclusive}
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  {hotelPricing === "Inclusive"
                    ? "(incl. taxes & delivery)"
                    : "(excl. taxes & delivery)"}
                </span>
              </div>
              {product.hotelPriceNote && (
                <p className="text-[10px] text-stone-500 font-normal">
                  {product.hotelPriceNote}
                </p>
              )}
            </div>
          </div>

          {/* Small Animated Toggle Switch with Exclusive & Inclusive options */}
          <div className="flex items-center rounded-full bg-[#EAE2D5] p-0.5 border border-[#DFD5C4] text-[10px] font-bold shrink-0">
            <button
              type="button"
              onClick={() => setHotelPricing("Exclusive")}
              className={cn(
                "rounded-full px-2.5 py-0.5 transition-all duration-200 cursor-pointer",
                hotelPricing === "Exclusive"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900",
              )}
            >
              Exclusive
            </button>
            <button
              type="button"
              onClick={() => setHotelPricing("Inclusive")}
              className={cn(
                "rounded-full px-2.5 py-0.5 transition-all duration-200 cursor-pointer",
                hotelPricing === "Inclusive"
                  ? "bg-[#B68B59] text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900",
              )}
            >
              Inclusive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
