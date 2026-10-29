import { AnimatePresence, motion } from "framer-motion";
import { Building2, Check, ChevronDown, Layers } from "lucide-react";
import { useState } from "react";

import {
  BUSINESS,
  buildWhatsAppLink,
  productInquiryMessage,
  type Product,
} from "@/data/catalog";

import { WhatsAppIcon } from "./WhatsAppIcon";

export function ProductDetails({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);

  const sentenceEnd = product.description.indexOf(". ");
  const lead =
    sentenceEnd === -1 ? product.description : product.description.slice(0, sentenceEnd + 1);
  const rest = sentenceEnd === -1 ? "" : product.description.slice(sentenceEnd + 2);

  const whatsappHref = buildWhatsAppLink(productInquiryMessage(product));

  return (
    <div className="mt-5 rounded-3xl border border-[#E8E2D8] bg-white p-5 sm:p-7 shadow-xs">
      <div className="grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-center">
        {/* Left Side: Price, Description, MOQ, Hotel/Facility Line */}
        <div className="space-y-3.5">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              {product.price}
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-500">
              {product.priceNote}
            </span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-stone-700 font-normal">
            {lead}
          </p>

          <AnimatePresence initial={false}>
            {expanded && rest && (
              <motion.p
                key="rest"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden text-xs sm:text-sm leading-relaxed text-stone-700"
              >
                <span className="block pt-1">{rest}</span>
              </motion.p>
            )}
          </AnimatePresence>

          {rest && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#A27744] hover:text-[#7A5323] cursor-pointer"
            >
              <span>{expanded ? "Show less" : "Read more"}</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}

          {/* Features Checklist */}
          <div className="pt-1">
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs font-medium text-stone-700">
                  <Check size={14} className="mt-0.5 shrink-0 text-emerald-600 font-bold" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* MOQ & Facility Info */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5EFE6] px-3.5 py-1 text-xs font-bold text-[#9C733E] border border-[#E8DFC9]">
              <Layers size={13} className="text-[#9C733E]" />
              <span>{product.moq}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-1 text-xs font-medium text-stone-600 border border-stone-200/70">
              <Building2 size={13} className="text-amber-700" />
              <span>{product.facilitiesLine}</span>
            </span>
          </div>
        </div>

        {/* Right Side: Prominent WhatsApp Icon & Action Box (Matching Drawing) */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#FBF9F5] p-5 sm:p-6 border border-[#EFEAE2] text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
            Instant Inquiry & Wholesale Quote
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
            className="group relative flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <div className="relative flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/25 transition-all group-hover:bg-[#22c55e] group-hover:shadow-xl">
              <WhatsAppIcon className="h-9 w-9 text-white" />
            </div>
            <span className="mt-1 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-emerald-700">
              Chat on WhatsApp
            </span>
            <span className="text-[11px] text-stone-500 font-medium">
              Direct connection with our catalog manager
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
