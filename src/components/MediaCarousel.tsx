import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import type { MediaItem } from "@/data/catalog";
import { cn } from "@/lib/utils";

/**
 * 4-Card Auto-Sliding Media Showcase:
 * - 4 distinct cards visible on screen (Image | Video | Image | Video).
 * - Real horizontal slide animation: all cards smoothly glide to the left automatically.
 * - Videos autoplay continuously on loop with NO pause button.
 * - NO arrow button slider (< and > removed as per user order).
 * - Pauses on hover so user can inspect details.
 */

export function MediaCarousel({ media }: { media: MediaItem[] }) {
  const mediaCount = media.length;
  // Repeat items for seamless continuous horizontal sliding
  const repeatedMedia = useMemo(
    () => [...media, ...media, ...media, ...media],
    [media],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardStep, setCardStep] = useState(300);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Measure card width + gap on resize
  useEffect(() => {
    const updateSize = () => {
      if (!trackRef.current) return;
      const firstCard = trackRef.current.querySelector<HTMLElement>(".media-slide-card");
      if (firstCard) {
        const style = window.getComputedStyle(trackRef.current);
        const gap = parseFloat(style.columnGap || style.gap || "16") || 16;
        setCardStep(firstCard.offsetWidth + gap);
      }
    };

    updateSize();
    const timer = setTimeout(updateSize, 100);
    window.addEventListener("resize", updateSize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Automatic horizontal sliding every 3.5 seconds
  useEffect(() => {
    if (isHovered || mediaCount <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        // When we reach near the end of repeated sets, wrap back smoothly
        if (prev >= mediaCount * 2) {
          return prev - mediaCount + 1;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [isHovered, mediaCount]);

  const activeMediaIndex = currentIndex % mediaCount;

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Viewport: clips overflowing cards so exactly 4 cards are shown on desktop */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-[26px] p-1"
      >
        <motion.div
          ref={trackRef}
          animate={{ x: -currentIndex * cardStep }}
          transition={{
            duration: 0.75,
            ease: [0.25, 1, 0.5, 1], // Buttery-smooth luxury slide ease
          }}
          className="flex gap-4 items-stretch will-change-transform"
        >
          {repeatedMedia.map((item, idx) => (
            <div
              key={`${item.src}-${idx}`}
              className={cn(
                "media-slide-card relative shrink-0 overflow-hidden rounded-[24px] border border-[#E8E2D8] bg-white shadow-[0_10px_28px_-8px_rgba(180,140,100,0.12)] transition-shadow duration-300 hover:shadow-[0_16px_36px_-8px_rgba(180,140,100,0.2)]",
                // Responsive card widths:
                // Desktop: exactly 4 cards visible (each ~25% minus gap)
                // Tablet: 3 cards visible
                // Mobile: 1.3 cards visible
                "w-[calc(80%-12px)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]",
                "h-[360px] sm:h-[390px] lg:h-[420px]",
              )}
            >
              {item.type === "video" ? (
                <div className="relative h-full w-full bg-stone-900">
                  <video
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  {/* Subtle video badge in top corner - NO PAUSE BUTTON! */}
                  <span className="absolute top-3 right-3 rounded-full bg-stone-950/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-xs border border-white/20">
                    Live Video
                  </span>
                </div>
              ) : (
                <div className="relative h-full w-full bg-[#F6F2EC]">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold text-stone-700 backdrop-blur-xs border border-stone-200/80 shadow-xs">
                    Photo
                  </span>
                </div>
              )}

              {/* Bottom gradient overlay for depth */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-stone-950/40 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Media Dot Indicators below the 4-card slider */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {media.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.floor(prev / mediaCount) * mediaCount + i)}
            aria-label={`Jump to slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer",
              activeMediaIndex === i
                ? "w-7 bg-[#B68B59]"
                : "w-2 bg-[#DDD5CA] hover:bg-[#B68B59]/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
