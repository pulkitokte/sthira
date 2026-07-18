// src/components/firstBreath/FirstBreathAnimationWrapper.jsx
// Reserved container for a future illustration/animation. Phase 1:
// intentionally empty — no seed, plant, particles, or gradients yet.
// Already reads reduced-motion preference and exposes it as a data
// attribute, so whatever a future batch mounts inside can respect it
// without this wrapper needing to change.

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export default function FirstBreathAnimationWrapper({
  children = null,
  className = "",
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className={className}
      data-motion-enabled={!prefersReducedMotion}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
