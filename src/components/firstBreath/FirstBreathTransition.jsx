// src/components/firstBreath/FirstBreathTransition.jsx
// Wraps each step's content. Phase 2: the reserved seam from Phase 1
// is now filled in with the real transition (fb-content-in: soft fade +
// gentle upward motion + subtle scale), keyed by stepKey so a step
// change remounts and re-triggers it. Reduced motion is respected
// automatically via the global CSS rule — no branching needed here.
// stepRef remains reserved for future focus management, unchanged.

import { useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export default function FirstBreathTransition({ stepKey, children }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const stepRef = useRef(null);

  return (
    <div
      key={stepKey}
      ref={stepRef}
      tabIndex={-1}
      aria-live="polite"
      data-reduced-motion={prefersReducedMotion || undefined}
      className="fb-content-in"
    >
      {children}
    </div>
  );
}
