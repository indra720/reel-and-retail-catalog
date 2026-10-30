import { useEffect, useRef } from "react";

/**
 * 6. AUTO-MOVE BETWEEN PRODUCTS:
 * - If user is on Product 01 and takes NO action for 20s, smoothly scroll to Product 02, etc.
 * - Loops back to Product 01 after the last product.
 * - Any user interaction (scroll, touch, click, keypress, mouse move) resets the idle timer.
 * - Pauses if tab is hidden, video is fullscreen, or prefers-reduced-motion is enabled.
 */
export const IDLE_SECONDS = 20;

export function useProductAutoScroll(enabled: boolean = true) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const scrollToNextProduct = () => {
      // Pause if tab is hidden or fullscreen is active
      if (document.hidden || document.fullscreenElement) {
        resetTimer();
        return;
      }

      const productSections = Array.from(
        document.querySelectorAll<HTMLElement>("section[id^='product-']"),
      );

      if (productSections.length <= 1) return;

      // Find which product is currently most visible in viewport
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let currentIndex = 0;
      let closestDistance = Infinity;

      productSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        const distance = Math.abs(viewportCenter - (absoluteTop + rect.height / 2));
        if (distance < closestDistance) {
          closestDistance = distance;
          currentIndex = index;
        }
      });

      // Next product index (loop back to top after last)
      const nextIndex = (currentIndex + 1) % productSections.length;
      const targetSection = productSections[nextIndex];

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      resetTimer();
    };

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(scrollToNextProduct, IDLE_SECONDS * 1000);
    };

    // User interactions that reset the 20s idle timer
    const interactionEvents = [
      "scroll",
      "touchstart",
      "touchmove",
      "click",
      "keydown",
      "mousemove",
      "pointerdown",
    ];

    interactionEvents.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    document.addEventListener("visibilitychange", resetTimer);

    // Initial countdown
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      document.removeEventListener("visibilitychange", resetTimer);
    };
  }, [enabled]);
}

