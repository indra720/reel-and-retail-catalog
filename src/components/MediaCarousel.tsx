import {
  ChevronLeft,
  ChevronRight,
  Film,
  MoveHorizontal,
  MoveVertical,
} from "lucide-react";
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
 * Enhanced MediaCarousel:
 * - Alternating Auto-Scroll: First scrolls horizontally (Right-to-Left),
 *   then smoothly glides vertically (Top-to-Bottom) between Reel 1 and Reel 2.
 * - Slow and smooth transition ("slow ho but ho" as requested by CEO).
 * - NO website page auto-scrolling: only the media inside the product card moves.
 * - Razor-thin 3px line gap between cards with 4:3 landscape framing.
 */
export function MediaCarousel({ media }: { media: MediaItem[] }) {
  // Split media into Reel 1 (top set) and Reel 2 (bottom set)
  const halfCount = Math.max(1, Math.ceil(media.length / 2));
  const reel1 = useMemo(() => media.slice(0, halfCount), [media, halfCount]);
  const reel2 = useMemo(
    () => (media.length > halfCount ? media.slice(halfCount) : media.slice(0, halfCount)),
    [media, halfCount],
  );

  // Repeat items for seamless continuous horizontal sliding
  const repeatedReel1 = useMemo(() => [...reel1, ...reel1, ...reel1, ...reel1], [reel1]);
  const repeatedReel2 = useMemo(() => [...reel2, ...reel2, ...reel2, ...reel2], [reel2]);

  // Active state: activeRow (0 for Reel 1, 1 for Reel 2)
  const [activeRow, setActiveRow] = useState<0 | 1>(0);
  const [colIndexRow0, setColIndexRow0] = useState(0);
  const [colIndexRow1, setColIndexRow1] = useState(0);

  // Layout dimensions
  const [cardStep, setCardStep] = useState(300);
  const [cardHeight, setCardHeight] = useState(240);
  const [isHovered, setIsHovered] = useState(false);
  // Start isInView as true so auto-scroll starts immediately without observer delay
  const [isInView, setIsInView] = useState(true);
  const [motionDirection, setMotionDirection] = useState<"horizontal" | "vertical">("horizontal");

  // Touch and drag tracking
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRow0Ref = useRef<HTMLDivElement>(null);

  // Alternating motion sequence: "jaise left to right gayi, then top-bottom scroll ho jayegi"
  // Alternates every tick: Horizontal -> Vertical -> Horizontal -> Vertical
  const nextMotionRef = useRef<"horizontal" | "vertical">("horizontal");

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

  // Measure card width & height with ResizeObserver for 100% precision
  useEffect(() => {
    const updateSize = () => {
      if (!trackRow0Ref.current) return;
      const firstCard = trackRow0Ref.current.querySelector<HTMLElement>(".media-slide-card");
      if (firstCard) {
        const style = window.getComputedStyle(trackRow0Ref.current);
        const gap = parseFloat(style.columnGap || style.gap || "3") || 3;
        setCardStep(firstCard.offsetWidth + gap);
        setCardHeight(firstCard.offsetHeight);
      }
    };

    updateSize();
    const timer = setTimeout(updateSize, 120);

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

  // Helpers to slide horizontally
  const advanceHorizontalSlide = useCallback(() => {
    setMotionDirection("horizontal");
    if (activeRow === 0) {
      setColIndexRow0((prev) => {
        if (prev >= reel1.length * 2) {
          return prev - reel1.length + 1;
        }
        return prev + 1;
      });
    } else {
      setColIndexRow1((prev) => {
        if (prev >= reel2.length * 2) {
          return prev - reel2.length + 1;
        }
        return prev + 1;
      });
    }
  }, [activeRow, reel1.length, reel2.length]);

  const prevHorizontalSlide = useCallback(() => {
    setMotionDirection("horizontal");
    if (activeRow === 0) {
      setColIndexRow0((prev) => Math.max(0, prev - 1));
    } else {
      setColIndexRow1((prev) => Math.max(0, prev - 1));
    }
  }, [activeRow]);

  // Helper to switch row vertically (Top to Bottom)
  const toggleRowVertically = useCallback(() => {
    setMotionDirection("vertical");
    setActiveRow((prev) => (prev === 0 ? 1 : 0));
  }, []);

  // Alternating Auto-Scroll inside the product:
  // "jaise left to right gayi, then top-bottom scroll ho jayegi"
  // Cycle:
  // 1. Horizontal slide (left to right / right to left)
  // 2. Next tick: Top-to-bottom vertical slide (Reel 1 <-> Reel 2)
  // 3. Next tick: Horizontal slide
  // 4. Next tick: Top-to-bottom vertical slide
  // 100% automated without needing any button click!
  useEffect(() => {
    if (!isInView || isHovered || isDragging) return undefined;

    const timer = setInterval(() => {
      if (nextMotionRef.current === "horizontal") {
        advanceHorizontalSlide();
        setMotionDirection("horizontal");
        nextMotionRef.current = "vertical";
      } else {
        toggleRowVertically();
        setMotionDirection("vertical");
        nextMotionRef.current = "horizontal";
      }
    }, 3200);

    return () => {
      clearInterval(timer);
    };
  }, [advanceHorizontalSlide, isInView, isHovered, isDragging, toggleRowVertically]);

  // Touch and drag swipe handlers (support both horizontal swipe and vertical swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current || !e.touches[0]) return;
    const diffX = e.touches[0].clientX - touchStartPos.current.x;
    const diffY = e.touches[0].clientY - touchStartPos.current.y;
    setDragOffset({ x: diffX, y: diffY });
  };

  const handleTouchEnd = () => {
    if (!touchStartPos.current) return;
    const { x: diffX, y: diffY } = dragOffset;
    touchStartPos.current = null;
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });

    // Decide whether it's a horizontal swipe or vertical swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < -30) {
        advanceHorizontalSlide();
      } else if (diffX > 30) {
        prevHorizontalSlide();
      }
    } else {
      if (diffY < -30 || diffY > 30) {
        toggleRowVertically();
      }
    }
  };

  const activeReel1Index = colIndexRow0 % reel1.length;
  const activeReel2Index = colIndexRow1 % reel2.length;

  return (
    <div
      className="group relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Status & Direction Bar: Highlights Right-to-Left & Top-to-Bottom Auto Movement */}
      <div className="flex items-center justify-between pb-1.5 px-0.5 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          {/* Active Reel Indicator */}
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FAF4EB] px-2 py-0.5 text-[11px] font-bold text-[#8A6331] border border-[#DECDB3]">
            <Film size={11} />
            <span>Reel {activeRow + 1} of 2</span>
          </span>

          {/* Active Motion Mode Badge (Transitions between Left-to-Right and Top-to-Bottom) */}
          <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px] font-bold border transition-all duration-500 bg-white border-[#E8DFC9] shadow-2xs">
            {motionDirection === "vertical" ? (
              <span className="inline-flex items-center gap-1 text-[#8A6331]">
                <MoveVertical size={11} className="animate-bounce" />
                <span>Auto: Top-to-Bottom Glide</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <MoveHorizontal size={11} className="animate-pulse" />
                <span>Auto: Left-to-Right Slide</span>
              </span>
            )}
          </span>
        </div>

        {/* Informative Auto Indicator: No button click needed */}
        <div className="flex items-center gap-1.5 text-[10.5px] text-stone-600 font-medium bg-[#FBF9F5] px-2.5 py-0.5 rounded-full border border-stone-200/80">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="hidden sm:inline">Auto-Flow Active:</span>
          <span className="font-semibold text-stone-700">Left-Right &rarr; Top-Bottom</span>
        </div>
      </div>

      {/* Main Viewport: Fixed to 1 card's height, clips overflowing horizontal and vertical cards */}
      <div
        ref={containerRef}
        style={{ height: cardHeight > 0 ? `${cardHeight}px` : "auto" }}
        className="relative w-full overflow-hidden rounded-[16px] select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Vertical Track: Holds Row 0 (Reel 1) and Row 1 (Reel 2) */}
        <div
          style={{
            transform: `translate3d(0, -${activeRow * (cardHeight + 3) - (isDragging ? dragOffset.y : 0)}px, 0)`,
            // Buttery smooth slow vertical glide (900ms)
            transition: isDragging
              ? "none"
              : "transform 900ms cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          className="flex flex-col gap-[3px] will-change-transform"
        >
          {/* Row 0: Reel 1 Horizontal Strip */}
          <div
            ref={trackRow0Ref}
            style={{
              transform: `translate3d(-${colIndexRow0 * cardStep - (activeRow === 0 && isDragging ? dragOffset.x : 0)}px, 0, 0)`,
              // Buttery smooth slow horizontal slide (850ms)
              transition: isDragging
                ? "none"
                : "transform 850ms cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            className="flex gap-[3px] items-center will-change-transform touch-pan-y cursor-grab active:cursor-grabbing"
          >
            {repeatedReel1.map((item, idx) => (
              <MediaSlideCard
                key={`reel1-${item.src}-${idx}`}
                item={item}
                isActive={activeRow === 0 && idx === colIndexRow0}
                onClick={() => {
                  setActiveRow(0);
                  setColIndexRow0(idx);
                }}
                onVideoEnded={advanceHorizontalSlide}
              />
            ))}
          </div>

          {/* Row 1: Reel 2 Horizontal Strip */}
          <div
            style={{
              transform: `translate3d(-${colIndexRow1 * cardStep - (activeRow === 1 && isDragging ? dragOffset.x : 0)}px, 0, 0)`,
              transition: isDragging
                ? "none"
                : "transform 850ms cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            className="flex gap-[3px] items-center will-change-transform touch-pan-y cursor-grab active:cursor-grabbing"
          >
            {repeatedReel2.map((item, idx) => (
              <MediaSlideCard
                key={`reel2-${item.src}-${idx}`}
                item={item}
                isActive={activeRow === 1 && idx === colIndexRow1}
                onClick={() => {
                  setActiveRow(1);
                  setColIndexRow1(idx);
                }}
                onVideoEnded={advanceHorizontalSlide}
              />
            ))}
          </div>
        </div>

        {/* Horizontal Navigation Chevrons (Hover) */}
        <button
          type="button"
          onClick={prevHorizontalSlide}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md backdrop-blur-xs transition-opacity duration-200 hover:bg-white cursor-pointer opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={advanceHorizontalSlide}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md backdrop-blur-xs transition-opacity duration-200 hover:bg-white cursor-pointer opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Multi-Row Dot Pagination Indicators */}
      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-4 text-[10.5px] font-semibold text-stone-600">
        {/* Reel 1 Dots */}
        <div className="flex items-center gap-1.5">
          <span
            onClick={() => setActiveRow(0)}
            className={cn(
              "cursor-pointer text-[10px] transition-colors",
              activeRow === 0 ? "font-bold text-[#8A6331]" : "text-stone-400 hover:text-stone-600",
            )}
          >
            Reel 1:
          </span>
          {reel1.map((_, i) => (
            <button
              key={`r1-${i}`}
              type="button"
              onClick={() => {
                setActiveRow(0);
                setColIndexRow0(i);
              }}
              aria-label={`Reel 1 slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                activeRow === 0 && activeReel1Index === i
                  ? "w-5 bg-[#B68B59]"
                  : "w-1.5 bg-[#DDD5CA] hover:bg-[#B68B59]/60",
              )}
            />
          ))}
        </div>

        {/* Separator */}
        <span className="text-stone-300">|</span>

        {/* Reel 2 Dots */}
        <div className="flex items-center gap-1.5">
          <span
            onClick={() => setActiveRow(1)}
            className={cn(
              "cursor-pointer text-[10px] transition-colors",
              activeRow === 1 ? "font-bold text-[#8A6331]" : "text-stone-400 hover:text-stone-600",
            )}
          >
            Reel 2:
          </span>
          {reel2.map((_, i) => (
            <button
              key={`r2-${i}`}
              type="button"
              onClick={() => {
                setActiveRow(1);
                setColIndexRow1(i);
              }}
              aria-label={`Reel 2 slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                activeRow === 1 && activeReel2Index === i
                  ? "w-5 bg-[#B68B59]"
                  : "w-1.5 bg-[#DDD5CA] hover:bg-[#B68B59]/60",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
