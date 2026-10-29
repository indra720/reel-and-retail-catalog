import { motion } from "framer-motion";

import { BUSINESS, buildWhatsAppLink, productInquiryMessage, type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

import { Magnetic } from "./Magnetic";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppButton({
  product,
  label = "Inquire on WhatsApp",
  className,
}: {
  product?: Product;
  label?: string;
  className?: string;
}) {
  const text = product
    ? productInquiryMessage(product)
    : `Hi ${BUSINESS.name}! I'd like to know more about your collections.`;
  const href = buildWhatsAppLink(text);

  return (
    <Magnetic>
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_25px_-6px_rgba(37,211,102,0.6)] transition-all duration-200 hover:bg-[#22c55e] hover:shadow-[0_12px_32px_-6px_rgba(37,211,102,0.7)] cursor-pointer",
          className,
        )}
      >
        <WhatsAppIcon className="h-5 w-5 text-white" />
        <span>{label}</span>
      </motion.a>
    </Magnetic>
  );
}

export function FloatingWhatsApp() {
  const href = buildWhatsAppLink(`Hi ${BUSINESS.name}! I'd like to know more about your collections.`);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 18 }}
      className="group fixed bottom-6 right-6 z-50 cursor-pointer"
    >
      <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500/40" />
      <span
        aria-hidden
        className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400/25 [animation-delay:1.2s]"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
        <WhatsAppIcon className="h-7 w-7 text-white" />
      </span>
    </motion.a>
  );
}
