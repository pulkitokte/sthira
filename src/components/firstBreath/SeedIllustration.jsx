// src/components/firstBreath/SeedIllustration.jsx
// Minimal vector seed. Purely decorative — aria-hidden, conveys no
// information on its own.
//
// Phase 2 behavior (breathPhase omitted): unchanged idle CSS-keyframe
// animation (subtle breathing scale, gentle float, soft glow pulse).
//
// Phase 3: when a breathPhase object ({ scale, durationMs }) is passed
// (during the Breathing Ritual), the seed instead uses a controlled
// inline transform transition timed to that exact phase's duration —
// no bouncing/pulsing, no keyframes, just one smooth scale change per
// phase. The idle glow pulse is intentionally NOT used during breathing
// (BreathCircle is the element that visibly expands/contracts instead),
// leaving a static soft glow behind the seed.
// Respects prefers-reduced-motion by switching to a subtle opacity
// change instead of scaling, per this batch's accessibility requirement.

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export default function SeedIllustration({ breathPhase = null }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // ── Phase 2 idle behavior (unchanged) ──────────────────────────────────
  if (!breathPhase) {
    return (
      <div
        className="relative flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="fb-seed-glow absolute rounded-full"
          style={{
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle, rgba(134,159,138,0.35) 0%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />
        <div className="fb-seed-float">
          <svg
            width="28"
            height="40"
            viewBox="0 0 28 40"
            className="fb-seed-breathe text-sage"
            fill="currentColor"
          >
            <path d="M14 0C14 0 27 12 27 24C27 32.837 21.284 40 14 40C6.716 40 1 32.837 1 24C1 12 14 0 14 0Z" />
          </svg>
        </div>
      </div>
    );
  }

  // ── Phase 3: controlled breathing behavior ─────────────────────────────
  const { scale, durationMs } = breathPhase;

  const containerStyle = prefersReducedMotion
    ? {
        opacity: scale > 1 ? 1 : 0.75,
        transition: `opacity ${durationMs}ms ease-in-out`,
      }
    : {};

  const seedStyle = prefersReducedMotion
    ? {}
    : {
        transform: `scale(${scale})`,
        transition: `transform ${durationMs}ms ease-in-out`,
      };

  return (
    <div
      className="relative flex items-center justify-center"
      aria-hidden="true"
      style={containerStyle}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: 120,
          height: 120,
          background:
            "radial-gradient(circle, rgba(134,159,138,0.35) 0%, transparent 70%)",
          filter: "blur(6px)",
          opacity: 0.5,
        }}
      />
      <svg
        width="28"
        height="40"
        viewBox="0 0 28 40"
        className="text-sage"
        fill="currentColor"
        style={seedStyle}
      >
        <path d="M14 0C14 0 27 12 27 24C27 32.837 21.284 40 14 40C6.716 40 1 32.837 1 24C1 12 14 0 14 0Z" />
      </svg>
    </div>
  );
}
