// src/hooks/useScrollRestoration.js
// Generic, reusable scroll position preservation for top-level pages.
//
// Behavior:
// - Saves scroll position (both window and the app's outer scroll
//   container, whichever applies at the current viewport) when the page
//   unmounts, i.e. when the user navigates away.
// - Restores it on mount, before paint, so there is no visible jump.
// - Cache lives only in memory (a module-level Map), so it is
//   automatically cleared on full page refresh or browser restart —
//   nothing is written to sessionStorage/localStorage.
// - No scroll event listeners are attached, so there is no per-scroll
//   overhead; the position is only read at unmount time.
//
// Usage: call once per top-level page, keyed by that page's path.
//   useScrollRestoration(PATHS.HOME);

import { useLayoutEffect } from "react";
import { useScrollContainerRef } from "../context/ScrollContainerContext";

const scrollCache = new Map();

export function useScrollRestoration(key) {
  const containerRef = useScrollContainerRef();

  useLayoutEffect(() => {
    const container = containerRef?.current ?? null;
    const cached = scrollCache.get(key);

    if (cached) {
      window.scrollTo(0, cached.windowY);
      if (container) container.scrollTop = cached.containerY;
    }

    return () => {
      scrollCache.set(key, {
        windowY: window.scrollY,
        containerY: container ? container.scrollTop : 0,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
