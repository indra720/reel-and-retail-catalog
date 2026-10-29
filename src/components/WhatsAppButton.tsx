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
          "inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-whatsapp-foreground shadow-[0_10px_30px_-10px_var(--whatsapp)] transition-shadow duration-200 hover:shadow-[0_14px_40px_-8px_var(--whatsapp)]",
          className,
        )}
      >
        <WhatsAppIcon className="h-4.5 w-4.5" />
        {label}
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
      className="group fixed bottom-5 right-5 z-50"
    >
      <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp/50" />
      <span
        aria-hidden
        className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp/30 [animation-delay:1.2s]"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform duration-300 group-hover:scale-110">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </motion.a>
  );
}
