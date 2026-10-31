import { useEffect, useRef } from "react";

/**
 * 6. AUTO-MOVE BETWEEN PRODUCTS
 * - 5-6 second idle interval (IDLE_SECONDS = 5.5).
 * - Gentle, slow-motion scroll animation (1800ms duration) instead of abrupt instant jumps.
 * - Any user interaction cancels active animation and resets the idle timer.
 */
export const IDLE_SECONDS = 5.5;
export const SCROLL_DURATION_MS = 1800;

export function useProductAutoScroll(enabled: boolean = true) {
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelAnimRef = useRef<(() => void) | null>(null);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    // Respect prefers-reduced-motion: disable auto-move if requested
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Smooth, slow, gradual scroll animation using requestAnimationFrame
    const smoothSlowScrollTo = (
      targetY: number,
      duration: number,
      onFinish: () => void,
    ) => {
      const startY = window.scrollY;
      const diff = targetY - startY;

      if (Math.abs(diff) < 2) {
        onFinish();
        return () => {};
      }

      const startTime = performance.now();
      let animId: number | null = null;
      let isCancelled = false;

      // Silky smooth easeInOutCubic curve (slow start, gentle cruise, slow stop)
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now: number) => {
        if (isCancelled) return;
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeInOutCubic(progress);

        window.scrollTo({
          top: startY + diff * eased,
          behavior: "auto",
        });

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          onFinish();
        }
      };

      animId = requestAnimationFrame(step);

      return () => {
        isCancelled = true;
        if (animId !== null) {
          cancelAnimationFrame(animId);
        }
      };
    };

    const scrollToNextProduct = () => {
      // Pause while tab is hidden, or any video is fullscreen
      if (document.hidden || Boolean(document.fullscreenElement)) {
        startIdleTimer();
        return;
      }

      const productSections = Array.from(
        document.querySelectorAll<HTMLElement>("section[id^='product-']"),
      );
      if (productSections.length <= 1) {
        startIdleTimer();
        return;
      }

      // Determine current product in view
      const header = document.querySelector("header");
      const headerOffset = (header?.offsetHeight ?? 70) + 10;
      const currentScroll = window.scrollY + headerOffset;
      let currentIndex = 0;
      let closestDiff = Infinity;

      productSections.forEach((section, index) => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        const diff = Math.abs(currentScroll - top);
        if (diff < closestDiff) {
          closestDiff = diff;
          currentIndex = index;
        }
      });

      // Next product (loop back to Product 01 after the last product)
      const nextIndex = (currentIndex + 1) % productSections.length;
      const targetSection = productSections[nextIndex];

      if (targetSection) {
        const targetY = Math.max(
          0,
          targetSection.getBoundingClientRect().top + window.scrollY - headerOffset,
        );

        isAutoScrollingRef.current = true;

        // Cancel any previous in-flight animation
        if (cancelAnimRef.current) {
          cancelAnimRef.current();
        }

        cancelAnimRef.current = smoothSlowScrollTo(
          targetY,
          SCROLL_DURATION_MS,
          () => {
            isAutoScrollingRef.current = false;
            cancelAnimRef.current = null;
            startIdleTimer();
          },
        );
      } else {
        startIdleTimer();
      }
    };

    const startIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(scrollToNextProduct, IDLE_SECONDS * 1000);
    };

    // User interaction immediately cancels in-flight animation and resets the idle timer
    const handleUserActivity = (e?: Event) => {
      // Ignore programmatic scroll events triggered by our own slow scroll
      if (e?.type === "scroll" && isAutoScrollingRef.current) {
        return;
      }

      // If user intervenes during slow scroll, stop the animation immediately
      if (cancelAnimRef.current) {
        cancelAnimRef.current();
        cancelAnimRef.current = null;
      }
      isAutoScrollingRef.current = false;

      startIdleTimer();
    };

    const activityEvents = [
      "scroll",
      "touchstart",
      "touchmove",
      "click",
      "keydown",
      "mousemove",
      "pointerdown",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    // Start initial idle timer
    startIdleTimer();

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      if (cancelAnimRef.current) {
        cancelAnimRef.current();
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [enabled]);
}
