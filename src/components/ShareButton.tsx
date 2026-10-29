import { Share2 } from "lucide-react";
import { toast } from "sonner";

import { BUSINESS, productShareUrl, type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

import { Magnetic } from "./Magnetic";

export function ShareButton({ product, className }: { product: Product; className?: string }) {
  const onShare = async () => {
    const url = productShareUrl(product);
    const shareData: ShareData = {
      title: `${product.name} — ${BUSINESS.name}`,
      text: product.subtitle,
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        // fall through to clipboard fallback
      }
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      toast.success("Link copied to clipboard", { description: `${product.name} · #${product.id}` });
    } catch {
      toast.error("Couldn't copy the link — please copy it from the address bar.");
    }
  };

  return (
    <Magnetic>
      <button
        type="button"
        onClick={onShare}
        aria-label={`Share ${product.name}`}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/95 px-4 py-2 text-xs md:text-sm font-semibold text-stone-700 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-400 hover:text-stone-900 hover:shadow-sm cursor-pointer",
          className,
        )}
      >
        <Share2 size={15} className="transition-transform duration-300 group-hover:rotate-12 text-stone-600 group-hover:text-stone-900" />
        Share
      </button>
    </Magnetic>
  );
}
