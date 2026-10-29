import { AnimatePresence, motion } from "framer-motion";
import { Building2, Check, ChevronDown, Layers } from "lucide-react";
import { useState } from "react";

import type { Product } from "@/data/catalog";

import { WhatsAppButton } from "./WhatsAppButton";

export function ProductDetails({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);

  const sentenceEnd = product.description.indexOf(". ");
  const lead =
    sentenceEnd === -1 ? product.description : product.description.slice(0, sentenceEnd + 1);
  const rest = sentenceEnd === -1 ? "" : product.description.slice(sentenceEnd + 2);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* left: price + description */}
      <div>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
          <p className="text-accent-gradient font-display text-3xl font-bold tracking-tight md:text-4xl">
            {product.price}
          </p>
          <p className="pb-1 text-xs text-muted-foreground md:text-sm">{product.priceNote}</p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{lead}</p>
        <AnimatePresence initial={false}>
          {expanded && rest && (
            <motion.p
              key="rest"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden text-sm leading-relaxed text-muted-foreground md:text-[15px]"
            >
              <span className="block pt-0">{rest}</span>
            </motion.p>
          )}
        </AnimatePresence>
        {rest && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-foreground/90 transition-colors hover:text-foreground"
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Read more"}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}

        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 size={16} className="text-cyan-glow" />
          {product.facilitiesLine}
        </div>
      </div>

      {/* right: MOQ + features + inquiry */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-foreground">
            <Layers size={14} className="text-cyan-glow" />
            {product.moq}
          </span>
        </div>

        <ul className="grid gap-2.5 sm:grid-cols-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check size={15} className="mt-0.5 shrink-0 text-whatsapp" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <WhatsAppButton product={product} label={`Inquire about ${product.name}`} className="w-full justify-center sm:w-auto" />
        </div>
      </div>
    </div>
  );
}
