import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { MediaItem } from "@/data/catalog";
import { cn } from "@/lib/utils";

/**
 * Single Media Slide Card with Landscape 4:3 frame:
 * 1. Aspect ratio 4:3 on desktop and mobile. All cards have identical size.
 * 2. Fill the frame: object-cover with object-position: center for photos & videos.
 * 3. Exception: only very tall portrait media (aspect ratio > 3:4) uses object-contain with light blur 20px.
 * 4. NO dark/black gradient overlay at bottom.
 * 5. THIN LINE GAP: Cards sit right next to each other separated by a 3px line (scale-100 for all cards).
 */
function MediaSlideCard({
  item,
  isActive,
  onClick,
  onVideoEnded,
}: {
  item: MediaItem;
  isActive: boolean;
  onClick: () => void;
  onVideoEnded?: () => void;
}) {
  const [isTallPortrait, setIsTallPortrait] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When this video becomes the active slide, start from beginning
  useEffect(() => {
    if (isActive && item.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [isActive, item.type]);

  return (
    <div
      onClick={onClick}
      className={cn(
        "media-slide-card relative shrink-0 overflow-hidden rounded-[14px] sm:rounded-[16px] border cursor-pointer select-none",
        // 1. LANDSCAPE frame: 4:3 aspect ratio on all screens
        "aspect-[4/3]",
        // Thin line gap: all cards stay scale-100 so they touch with only a thin line separating them
        "transition-all duration-500 ease-out",
        isActive
          ? "border-[#B68B59]/80 shadow-[0_6px_18px_-4px_rgba(182,139,89,0.25)] ring-1 ring-[#B68B59]/30 z-10"
          : "border-[#E8E2D8]/80 hover:border-[#D5C7B2] shadow-2xs z-0 bg-white",
      )}
    >
      {/* 3. Exception: only very tall portrait media gets very light blurred background */}
      {isTallPortrait && (
        <img
          src={item.type === "video" ? item.poster : item.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover blur-[20px] scale-110 opacity-60"
        />
      )}

      {item.type === "video" ? (
        <div className="relative h-full w-full overflow-hidden bg-stone-900 pointer-events-none">
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            autoPlay
            loop={!isActive} // When active, let it reach the end so onEnded triggers advance
            muted
            playsInline
            onEnded={() => {
              if (isActive && onVideoEnded) {
                onVideoEnded();
              }
            }}
            onLoadedMetadata={(e) => {
              const { videoWidth, videoHeight } = e.currentTarget;
              if (videoWidth > 0 && videoHeight / videoWidth > 1.33) {
                setIsTallPortrait(true);
              }
            }}
            // 2. Fill the frame: object-fit: cover with object-position: center
            className={cn(
              "h-full w-full object-center",
              isTallPortrait ? "relative z-10 object-contain" : "object-cover",
            )}
          />
          {/* Small Live Video badge at top right */}
          <span className="absolute top-2 right-2 z-20 rounded-full bg-stone-950/75 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-white backdrop-blur-xs border border-white/20">
            Live Video
          </span>
        </div>
      ) : (
        <div className="relative h-full w-full overflow-hidden bg-stone-100 pointer-events-none">
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            onLoad={(e) => {
              const { naturalWidth, naturalHeight } = e.currentTarget;
              if (naturalWidth > 0 && naturalHeight / naturalWidth > 1.33) {
                setIsTallPortrait(true);
              }
            }}
            // 2. Fill the frame: object-fit: cover with object-position: center
            className={cn(
              "h-full w-full object-center transition-transform duration-700 hover:scale-102",
              isTallPortrait ? "relative z-10 object-contain" : "object-cover",
            )}
          />
          {/* Small Photo badge at top right */}
          <span className="absolute top-2 right-2 z-20 rounded-full bg-white/90 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-stone-700 backdrop-blur-xs border border-stone-200/80 shadow-xs">
            Photo
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Clean Horizontal MediaCarousel:
 * - Slides horizontally (Right-to-Left / Left-to-Right) only.
 * - Slow, buttery smooth glide (850ms transition).
 * - Razor-thin 3px line gap between cards.
 * - Minimalist dot pagination.
 * - No internal vertical movement or status labels.
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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Monitor if this product carousel is in view
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: [0, 0.2] },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Measure card width + gap with ResizeObserver for 100% precision
  useEffect(() => {
    const updateSize = () => {
      if (!trackRef.current) return;
      const firstCard = trackRef.current.querySelector<HTMLElement>(".media-slide-card");
      if (firstCard) {
        const style = window.getComputedStyle(trackRef.current);
        const gap = parseFloat(style.columnGap || style.gap || "3") || 3;
        setCardStep(firstCard.offsetWidth + gap);
      }
    };

    updateSize();
    const timer = setTimeout(updateSize, 100);

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateSize);
    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const activeMediaIndex = currentIndex % mediaCount;

  // Helper to advance slide smoothly with loop wrap
  const advanceSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= mediaCount * 2) {
        return prev - mediaCount + 1;
      }
      return prev + 1;
    });
  }, [mediaCount]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  // Preload next slides
  useEffect(() => {
    if (mediaCount <= 1) return;
    const nextIndices = [
      (activeMediaIndex + 1) % mediaCount,
      (activeMediaIndex + 2) % mediaCount,
    ];
    nextIndices.forEach((i) => {
      const nextItem = media[i];
      if (nextItem) {
        const preloadSrc = nextItem.type === "video" ? nextItem.poster : nextItem.src;
        if (preloadSrc) {
          const img = new Image();
          img.src = preloadSrc;
        }
      }
    });
  }, [activeMediaIndex, media, mediaCount]);

  // Horizontal auto-slide: Slow and buttery smooth (850ms)
  useEffect(() => {
    if (!isInView || isHovered || isDragging || mediaCount <= 1) return undefined;

    const timer = setInterval(() => {
      advanceSlide();
    }, 3500);

    return () => {
      clearInterval(timer);
    };
  }, [advanceSlide, isInView, isHovered, isDragging, mediaCount]);

  // Touch and drag swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !e.touches[0]) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    const diff = dragOffset;
    touchStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (diff < -30) {
      advanceSlide();
    } else if (diff > 30) {
      prevSlide();
    }
  };

  return (
    <div
      className="group relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Viewport: clips overflowing cards cleanly */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-[16px] py-0.5 select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          style={{
            transform: `translate3d(-${currentIndex * cardStep - dragOffset}px, 0, 0)`,
            // Slow and buttery smooth glide (850ms)
            transition: isDragging
              ? "none"
              : "transform 850ms cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          // Thin 3px line gap between cards
          className="flex gap-[3px] items-center will-change-transform touch-pan-y cursor-grab active:cursor-grabbing"
        >
          {repeatedMedia.map((item, idx) => (
            <MediaSlideCard
              key={`${item.src}-${idx}`}
              item={item}
              isActive={idx === currentIndex}
              onClick={() => setCurrentIndex(idx)}
              onVideoEnded={advanceSlide}
            />
          ))}
        </div>

        {/* Navigation arrows (visible on hover) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md backdrop-blur-xs transition-opacity duration-200 hover:bg-white cursor-pointer opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={advanceSlide}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md backdrop-blur-xs transition-opacity duration-200 hover:bg-white cursor-pointer opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Clean Minimalist Dot Pagination below the slider (No Reel 1 / Reel 2 labels) */}
      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        {media.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.floor(prev / mediaCount) * mediaCount + i)}
            aria-label={`Jump to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              activeMediaIndex === i
                ? "w-6 bg-[#B68B59]"
                : "w-1.5 bg-[#DDD5CA] hover:bg-[#B68B59]/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
