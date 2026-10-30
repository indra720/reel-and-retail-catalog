import { describe, expect, it } from "vitest";

import {
  BUSINESS,
  CATEGORIES,
  PRODUCTS,
  buildWhatsAppLink,
  productInquiryMessage,
  productShareUrl,
} from "@/data/catalog";

describe("Catalog config rules", () => {
  it("builds WhatsApp links from the configured number with the encoded inquiry", () => {
    const product = PRODUCTS[0]!;
    const link = buildWhatsAppLink(productInquiryMessage(product));
    expect(link).toContain(`https://wa.me/${BUSINESS.whatsappNumber}?text=`);
    expect(link).toContain(encodeURIComponent(product.name));
  });

  it("gives every product a stable #product-XX share URL", () => {
    for (const product of PRODUCTS) {
      expect(product.id).toMatch(/^product-\d{2}$/);
      expect(productShareUrl(product)).toContain(`#${product.id}`);
    }
  });

  it("keeps every product gallery rich with both images and videos across horizontal and vertical reels", () => {
    for (const product of PRODUCTS) {
      expect(product.media.length).toBeGreaterThanOrEqual(4);
      expect(product.media.length).toBeLessThanOrEqual(12);
      const videos = product.media.filter((m) => m.type === "video");
      const images = product.media.filter((m) => m.type === "image");
      expect(videos.length).toBeGreaterThanOrEqual(1);
      expect(images.length).toBeGreaterThanOrEqual(1);
      for (const video of videos) {
        expect(video.poster).toMatch(/^https?:\/\//);
        expect(video.src).toMatch(/\.mp4$/);
      }
    }
  });

  it("covers every category with at least one product", () => {
    for (const category of CATEGORIES) {
      if (category.id === "all") continue;
      expect(PRODUCTS.some((p) => p.category === category.id)).toBe(true);
    }
  });
});
