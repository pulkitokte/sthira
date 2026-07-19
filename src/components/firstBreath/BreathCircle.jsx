// src/components/firstBreath/BreathCircle.jsx
// Extremely subtle breathing circle surrounding the seed. Very low
// opacity, soft blurred edges, no harsh border. Expands/contracts with
// the exact same phase timing as the seed, so both feel like one
// organic motion rather than two independent animations.
// Respects prefers-reduced-motion by using an opacity change instead of
// a scale transform.

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const BASE_SIZE = 140;
const CENTER = "translate(-50%, -50%)";

export default function BreathCircle({ phase }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scale, durationMs } = phase;

  const style = prefersReducedMotion
    ? {
        top: "50%",
        left: "50%",
        width: BASE_SIZE,
        height: BASE_SIZE,
        transform: CENTER,
        opacity: scale > 1 ? 0.22 : 0.12,
        transition: `opacity ${durationMs}ms ease-in-out`,
      }
    : {
        top: "50%",
        left: "50%",
        width: BASE_SIZE,
        height: BASE_SIZE,
        transform: `${CENTER} scale(${scale})`,
        opacity: 0.16,
        transition: `transform ${durationMs}ms ease-in-out`,
      };

  return (
    <div
      className="absolute rounded-full pointer-events-none"
      aria-hidden="true"
      style={{
        ...style,
        background:
          "radial-gradient(circle, rgba(134,159,138,0.5) 0%, transparent 72%)",
        filter: "blur(2px)",
      }}
    />
  );
}
