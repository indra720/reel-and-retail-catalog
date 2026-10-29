import { Share2 } from "lucide-react";
import toast from "sonner";

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
      toast.success("Link copied", { description: `${product.name} · #${product.id}` });
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
          "glass group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow",
          className,
        )}
      >
        <Share2 size={16} className="transition-transform duration-300 group-hover:rotate-12" />
        Share
      </button>
    </Magnetic>
  );
}
