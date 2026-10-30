import { useEffect } from "react";

/**
 * Note: Website auto-scrolling between products is disabled as requested by the user.
 * Media items inside each product card handle their own horizontal and vertical auto-movement.
 */
export function useProductAutoScroll(enabled: boolean = false) {
  useEffect(() => {
    // Disabled: Web page does not scroll automatically
    if (!enabled || typeof window === "undefined") return;
  }, [enabled]);
}
