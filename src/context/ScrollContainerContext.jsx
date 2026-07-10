// src/context/ScrollContainerContext.jsx
// Exposes a ref to the app's outer scrollable container (see App.jsx).
// On mobile this div does not scroll (the window does); at sm+ breakpoints
// it becomes the actual scroll owner via sm:overflow-y-auto.
// useScrollRestoration reads this ref so it can save/restore scroll
// position correctly regardless of which one is active for the viewport.

import { createContext, useContext } from "react";

const ScrollContainerContext = createContext(null);

export function ScrollContainerProvider({ containerRef, children }) {
  return (
    <ScrollContainerContext.Provider value={containerRef}>
      {children}
    </ScrollContainerContext.Provider>
  );
}

export function useScrollContainerRef() {
  return useContext(ScrollContainerContext);
}
