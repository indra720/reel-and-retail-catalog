import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Maximize,
  Minimize,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { MEDIA_CONFIG, type MediaItem } from "@/data/catalog";
import { cn } from "@/lib/utils";

/**
 * Unified cinematic gallery: one large active panel playing the current
 * image/video, flanked by perspective-tilted previews of the neighbouring
 * playlist items. Mixed playlist rules:
 *  - images auto-advance every MEDIA_CONFIG.imageIntervalMs
 *  - a video autoplays (muted) when it becomes active; the timer is paused
 *  - the video auto-advances on `ended` — never cut halfway
 *  - only the active video plays; leaving videos pause & reset
 */

const carouselRegistry = new Set<HTMLElement>();

function visibleFraction(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const h = rect.height || 1;
  return Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0)) / Math.min(h, vh);
}

function MediaFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-secondary text-muted-foreground">
      <ImageOff size={28} />
      <p className="px-6 text-center text-xs">Media unavailable — preview coming soon</p>
    </div>
  );
}

function PreviewPanel({
  item,
  onClick,
  label,
  className,
  style,
  mini,
}: {
  item: MediaItem;
  onClick: () => void;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  mini?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group/preview relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-glow",
        className,
      )}
      style={style}
    >
      {item.type === "video" && !mini && (
        <span className="glass-strong absolute left-1/2 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-foreground">
          <Play size={14} className="ml-0.5" />
        </span>
      )}
      <img
        src={item.type === "video" ? item.poster : item.src}
        alt={item.alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
        className="h-full w-full object-cover opacity-60 transition-all duration-300 group-hover/preview:scale-105 group-hover/preview:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
    </button>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="glass-strong flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 transition-all duration-200 hover:scale-105 hover:text-foreground hover:shadow-glow"
    >
      {children}
    </button>
  );
}

export function MediaCarousel({ media }: { media: MediaItem[] }) {
  const count = media.length;
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [playBlocked, setPlayBlocked] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canTilt, setCanTilt] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeBarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const elapsedRef = useRef(0);
  const wasPlayingRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const active = media[index]!;
  const activeType = active.type;

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + count) % count);
      elapsedRef.current = 0;
      setPlayBlocked(false);
      setVideoPlaying(false);
    },
    [count],
  );

  const goTo = useCallback(
    (raw: number) => {
      setIndex(((raw % count) + count) % count);
      elapsedRef.current = 0;
      setPlayBlocked(false);
      setVideoPlaying(false);
    },
    [count],
  );

  const markFailed = useCallback((i: number) => {
    setFailed((f) => (f[i] ? f : { ...f, [i]: true }));
  }, []);

  /* ------- capability probes (client only) ------- */
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const fine = window.matchMedia?.("(pointer: fine)").matches ?? false;
    setReducedMotion(reduced);
    setCanTilt(fine && !reduced);
  }, []);

  /* ------- keyboard arrows: most-visible carousel wins ------- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    carouselRegistry.add(root);
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      let bestEl: HTMLElement | null = null;
      let best = 0;
      carouselRegistry.forEach((el) => {
        const fraction = visibleFraction(el);
        if (fraction > best) {
          best = fraction;
          bestEl = el;
        }
      });
      if (bestEl !== root || best < 0.45) return;
      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      carouselRegistry.delete(root);
      document.removeEventListener("keydown", onKey);
    };
  }, [step]);

  /* ------- image auto-advance timer ------- */
  useEffect(() => {
    if (activeType !== "image" || reducedMotion || tabHidden) return;
    if (activeBarRef.current) {
      activeBarRef.current.style.width = `${Math.min(100, (elapsedRef.current / MEDIA_CONFIG.imageIntervalMs) * 100)}%`;
    }
    const start = performance.now() - elapsedRef.current;
    const tick = (now: number) => {
      const elapsed = now - start;
      elapsedRef.current = elapsed;
      const pct = Math.min(100, (elapsed / MEDIA_CONFIG.imageIntervalMs) * 100);
      if (activeBarRef.current) activeBarRef.current.style.width = `${pct}%`;
      if (elapsed >= MEDIA_CONFIG.imageIntervalMs) {
        step(1);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, activeType, reducedMotion, tabHidden, step]);

  /* ------- video: autoplay when active ------- */
  useEffect(() => {
    if (activeType !== "video") return;
    const video = videoRef.current;
    if (!video) return;
    elapsedRef.current = 0;
    if (activeBarRef.current) activeBarRef.current.style.width = "0%";
    setPlayBlocked(false);
    setVideoPlaying(false);
    if (reducedMotion) return; // user starts it manually
    video.play().catch(() => setPlayBlocked(true));
  }, [index, activeType, reducedMotion]);

  /* ------- only the active video may play ------- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll("video").forEach((video) => {
      if (video !== videoRef.current) {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          /* ignore */
        }
      }
    });
  }, [index]);

  /* ------- mute sync (React's muted attr is first-render only) ------- */
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, index]);

  /* ------- pause everything when the tab is hidden ------- */
  useEffect(() => {
    const onVisibility = () => {
      setTabHidden(document.hidden);
      const video = videoRef.current;
      if (document.hidden) {
        wasPlayingRef.current = video ? !video.paused : false;
        video?.pause();
      } else if (video && activeType === "video" && wasPlayingRef.current && !playBlocked) {
        video.play().catch(() => setPlayBlocked(true));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [activeType, playBlocked]);

  /* ------- fullscreen ------- */
  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    const stage = stageRef.current;
    if (!stage) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      stage.requestFullscreen?.().catch(() => {});
    }
  };

  /* ------- helpers ------- */
  const onVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration && activeBarRef.current) {
      activeBarRef.current.style.width = `${Math.min(100, (video.currentTime / video.duration) * 100)}%`;
    }
  };

  const resumeVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    setPlayBlocked(false);
    video.play().catch(() => setPlayBlocked(true));
  };

  const onVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) resumeVideo();
    else video.pause();
  };

  /* ------- pointer tilt (desktop only) ------- */
  const onTiltMove = (event: React.PointerEvent) => {
    if (!canTilt || !tiltRef.current || !rootRef.current || isFullscreen) return;
    const rect = rootRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current.style.transform = `perspective(1400px) rotateX(${(-py * 3).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg)`;
  };
  const onTiltLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };

  const prev = media[(index - 1 + count) % count];
  const next = media[(index + 1) % count];
  const next2 = media[(index + 2) % count];

  const showPlayOverlay = activeType === "video" && !videoPlaying && (playBlocked || reducedMotion);

  const stage = (className?: string) => (
    <div
      ref={stageRef}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={`${index}-${active.type}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: "easeOut" }}
        >
          {failed[index] ? (
            <MediaFallback />
          ) : activeType === "image" ? (
            <img
              src={(active as Extract<MediaItem, { type: "image" }>).src}
              alt={active.alt}
              onError={() => markFailed(index)}
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={(active as Extract<MediaItem, { type: "video" }>).src}
              poster={(active as Extract<MediaItem, { type: "video" }>).poster}
              muted={muted}
              playsInline
              preload="auto"
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
              onEnded={() => {
                setVideoPlaying(false);
                step(1);
              }}
              onTimeUpdate={onVideoTimeUpdate}
              onError={() => markFailed(index)}
              onClick={onVideoClick}
              className="h-full w-full cursor-pointer object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* legibility gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/70 to-transparent" />

      {/* counter */}
      <div className="glass-strong absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-foreground/90">
        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </div>

      {/* top-right controls */}
      <div className="absolute right-3 top-3 z-20 flex gap-1.5">
        {activeType === "video" && (
          <IconButton label={muted ? "Unmute video" : "Mute video"} onClick={() => setMuted((m) => !m)}>
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </IconButton>
        )}
        <IconButton label={isFullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
        </IconButton>
      </div>

      {/* prev / next arrows */}
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous media"
        className="glass-strong absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-foreground/80 transition-all duration-200 hover:scale-105 hover:text-foreground hover:shadow-glow"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next media"
        className="glass-strong absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-foreground/80 transition-all duration-200 hover:scale-105 hover:text-foreground hover:shadow-glow"
      >
        <ChevronRight size={18} />
      </button>

      {/* play overlay when autoplay was blocked / reduced-motion */}
      {showPlayOverlay && (
        <button
          type="button"
          onClick={resumeVideo}
          aria-label="Play video"
          className="absolute inset-0 z-30 flex items-center justify-center bg-background/30 backdrop-blur-[2px]"
        >
          <span className="glass-strong flex h-16 w-16 items-center justify-center rounded-full text-foreground shadow-glow">
            <Play size={24} className="ml-1" />
          </span>
        </button>
      )}

      {/* segmented progress */}
      <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-1.5">
        {media.map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/20">
            {i === index && (
              <div
                ref={activeBarRef}
                className="h-full w-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--primary), var(--violet-glow), var(--cyan-glow))",
                }}
              />
            )}
            {i < index && <div className="h-full w-full bg-foreground/50" />}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Product media gallery"
      onPointerMove={onTiltMove}
      onPointerLeave={onTiltLeave}
      onTouchStart={(e) => {
        const touch = e.touches[0]!;
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touchStartRef.current;
        touchStartRef.current = null;
        if (!start) return;
        const touch = e.changedTouches[0]!;
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          step(dx < 0 ? 1 : -1);
        }
      }}
      className="rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      <div
        ref={tiltRef}
        className="will-change-transform [transition:transform_.25s_ease-out]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Desktop: unified 4-panel cinematic layout */}
        <div className="hidden h-[480px] grid-cols-[0.62fr_2.15fr_1.05fr_0.75fr] items-stretch gap-3 md:grid lg:h-[560px]">
          <PreviewPanel
            item={prev!}
            onClick={() => step(-1)}
            label="Previous media"
            className="h-full"
            style={{ transform: "perspective(1000px) rotateY(9deg) scale(0.95)", opacity: 0.75 }}
          />
          {stage("h-full")}
          <PreviewPanel
            item={next!}
            onClick={() => step(1)}
            label="Next media"
            className="h-full"
            style={{ transform: "perspective(1000px) rotateY(-9deg) scale(0.95)", opacity: 0.75 }}
          />
          <PreviewPanel
            item={next2!}
            onClick={() => goTo(index + 2)}
            label="Jump two ahead"
            className="h-full"
            style={{ transform: "perspective(1000px) rotateY(-14deg) scale(0.88)", opacity: 0.55 }}
          />
        </div>

        {/* Mobile: large active panel + small preview strip */}
        <div className="md:hidden">
          {stage("h-[320px]")}
          <div className="mt-2 grid h-20 grid-cols-3 gap-2">
            <PreviewPanel item={prev!} onClick={() => step(-1)} label="Previous media" mini />
            <PreviewPanel item={next!} onClick={() => step(1)} label="Next media" mini />
            <PreviewPanel item={next2!} onClick={() => goTo(index + 2)} label="Jump two ahead" mini />
          </div>
        </div>
      </div>
    </div>
  );
}
