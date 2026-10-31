import { Image as ImageIcon, Video } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CLIENT_SHOWCASES, type ClientShowcase } from "@/data/catalog";

/**
 * Grand Luxury Hero Showcase:
 * - Left: Editorial High-Fashion Shop Name in Monumental Serif with clean accent lines.
 * - Right: 4:3 Curated Media (Video/Photo) with warm brass frame & Shop Name overlay.
 * - Outside Bottom: Smooth auto-slider slide points (dots).
 */
export function HeroBanner() {
  const [showcases] = useState<ClientShowcase[]>(CLIENT_SHOWCASES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const count = showcases.length;

  // Infinite seamless loop: clone first item at the end
  const displayShowcases = useMemo(() => {
    if (count === 0) return [];
    const first = showcases[0];
    return first ? [...showcases, first] : [...showcases];
  }, [showcases, count]);

  // Advance to next slide smoothly
  const advanceSlide = useCallback(() => {
    if (count <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [count]);

  // Auto-slide every 4 seconds - pauses on hover
  useEffect(() => {
    if (isHovered || count <= 1) return undefined;

    const timer = setInterval(() => {
      advanceSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered, count, advanceSlide]);

  // Seamless infinite loop handler
  const handleTransitionEnd = () => {
    if (currentIndex >= count) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  // Re-enable smooth transition if disabled
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
    return undefined;
  }, [isTransitioning]);

  // Touch / Mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !e.changedTouches[0]) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (diff < -40) {
      advanceSlide();
    } else if (diff > 40) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : count - 1));
    }
  };

  const activeDotIndex = count > 0 ? currentIndex % count : 0;

  return (
    <div className="mb-6 select-none">
      {/* GRAND LUXURY HERO CARD WITH AUTO-SLIDER (Left-to-Right) */}
      <section
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-3xl border-2 border-[#E2D6C0] bg-gradient-to-br from-[#FAF7F0] via-[#FDFBF7] to-[#F5ECE0] px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-7 shadow-[0_12px_40px_-15px_rgba(138,99,49,0.18)]"
      >
        {/* Ambient Warm Golden Lighting Effects */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl" />

        {/* Continuous Horizontal Sliding Track */}
        <div className="relative z-10 w-full overflow-hidden">
          <div
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
              transition: isTransitioning
                ? "transform 850ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
            className="flex will-change-transform"
          >
            {displayShowcases.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="w-full shrink-0">
                <div className="grid items-center gap-6 lg:grid-cols-12">
                  {/* Left Column: Grand Editorial Shop Name (ONLY Shop Name) */}
                  <div className="space-y-4 lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-4">
                    {/* Architectural Accent Line */}
                    <div className="flex items-center gap-2">
                      <span className="h-[2px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-[#B68B59] to-[#DECDB3]" />
                    </div>

                    {/* Shop Name in MONUMENTAL GRAND SERIF TYPOGRAPHY */}
                    <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-tight text-[#1F1914] leading-[1.02] drop-shadow-2xs">
                      {item.shopName}
                    </h2>

                    {/* Handcrafted Brass Divider */}
                    <div className="h-[2px] w-20 sm:w-28 bg-gradient-to-r from-[#B68B59] via-[#DECDB3] to-transparent rounded-full my-1" />
                  </div>

                  {/* Right Column: 4:3 Luxury Framed Media (ONLY Shop Name on Overlay) */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="relative w-full overflow-hidden rounded-[20px] border-2 border-[#D8C7AA] bg-stone-900 shadow-[0_20px_50px_-12px_rgba(138,99,49,0.25)] max-w-[390px] lg:max-w-[430px]">
                      {/* Top Badge: Showcase Reel OR Curated Gallery */}
                      <div className="absolute left-3.5 top-3.5 z-20 flex items-center gap-1.5 rounded-full bg-stone-950/85 px-3.5 py-1 text-[11px] font-bold text-amber-200 backdrop-blur-md border border-amber-200/20 shadow-sm">
                        {item.media.type === "video" ? (
                          <>
                            <Video size={13} className="text-amber-300" />
                            <span>Showcase Reel</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon size={13} className="text-amber-300" />
                            <span>Curated Gallery</span>
                          </>
                        )}
                      </div>

                      {/* Media Frame: 4:3 Aspect Ratio */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                        {item.media.type === "video" ? (
                          <video
                            key={item.media.src}
                            src={item.media.src}
                            poster={item.media.poster}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <img
                            key={item.media.src}
                            src={item.media.src}
                            alt={item.shopName}
                            className="h-full w-full object-cover object-center"
                          />
                        )}

                        {/* Bottom Overlay: ONLY Shop Name in Luxury Serif */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-transparent p-4 sm:p-5 text-white">
                          <p className="font-serif text-base sm:text-lg font-bold tracking-wide uppercase text-white drop-shadow-sm">
                            {item.shopName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide Points (Dots) Outside the Card at the Bottom */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {showcases.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(dotIdx);
            }}
            aria-label={`Go to slide ${dotIdx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeDotIndex === dotIdx
                ? "w-8 bg-[#8A6331] shadow-xs"
                : "w-2 bg-stone-300 hover:bg-[#8A6331]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
