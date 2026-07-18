// src/components/firstBreath/FirstBreathTransition.jsx
// Wraps each step's content. Phase 1: no animation is applied yet —
// this component only prepares the seams a future batch will use:
// - prefersReducedMotion is already read and exposed via a data
//   attribute, so future animation CSS/logic can key off it without
//   restructuring this component.
// - stepRef is reserved for future focus management (a later batch can
//   call stepRef.current?.focus() when the step changes, so screen
//   reader users are announced into new content). Not wired yet.
// - aria-live="polite" gives a baseline non-intrusive announcement of
//   step-text changes for screen readers today, without full focus
//   management.

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
    >
      {children}
    </div>
  );
}
