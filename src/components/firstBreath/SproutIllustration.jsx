// src/components/firstBreath/SproutIllustration.jsx
// The Awakening's visual centerpiece: a separate vector component from
// SeedIllustration, rendering distinct path/stroke states per growth
// stage. Real vector animation (stroke-dasharray line-drawing, path
// fades) rather than scale tricks. Purely decorative — aria-hidden.
//
// Reduced motion: the same end-state visuals are shown, but reached via
// instant/opacity-only changes rather than the drawing/unfurl
// animations — nothing is skipped, only the transition style differs.

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const SPROUT_PATH_LENGTH = 34;

export default function SproutIllustration({ stageId }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const showSeed = stageId === "resting" || stageId === "softening";
  const showCrack = stageId === "cracking";
  const showSprout =
    stageId === "cracking" || stageId === "sprouting" || stageId === "leaves";
  const showLeaves = stageId === "leaves";

  // "Softening" has no separate visual asset of its own — its softness
  // is conveyed by the seed's own idle glow already present via
  // fb-seed-glow (reused below), so no new asset was invented just to
  // mark this stage.
  const seedOpacity = stageId === "softening" ? 0.85 : 1;

  return (
    <div
      className="relative flex items-center justify-center"
      aria-hidden="true"
      style={{ width: 60, height: 70 }}
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

      <svg
        width="60"
        height="70"
        viewBox="0 0 60 70"
        fill="none"
        className="relative"
      >
        {/* Seed body */}
        {showSeed && (
          <path
            d="M30 20C30 20 43 32 43 44C43 52.837 37.284 60 30 60C22.716 60 17 52.837 17 44C17 32 30 20 30 20Z"
            fill="currentColor"
            className="text-sage"
            style={{
              opacity: seedOpacity,
              transition: prefersReducedMotion
                ? "opacity 500ms ease-out"
                : "opacity 900ms ease-out",
            }}
          />
        )}

        {/* Crack — a short fading line across the seed as it opens */}
        {showCrack && (
          <line
            x1="24"
            y1="38"
            x2="36"
            y2="46"
            stroke="currentColor"
            className="text-canvas fb-crack-fade"
            strokeWidth={1.5}
            strokeLinecap="round"
            style={
              prefersReducedMotion
                ? { animation: "none", opacity: 1 }
                : undefined
            }
          />
        )}

        {/* Sprout stem — real vector line-drawing via stroke-dashoffset,
            not a scale transform. Reduced motion: drawn instantly. */}
        {showSprout && (
          <path
            d="M30 44C30 44 29 32 30 20"
            stroke="currentColor"
            className={
              prefersReducedMotion ? "text-sage" : "text-sage fb-sprout-draw"
            }
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              "--fb-sprout-length": SPROUT_PATH_LENGTH,
              ...(prefersReducedMotion
                ? { strokeDasharray: "none", strokeDashoffset: 0 }
                : {}),
            }}
          />
        )}

        {/* Two small leaves at the sprout tip */}
        {showLeaves && (
          <>
            <path
              d="M30 21C30 21 22 18 18 22C18 26 26 28 30 25"
              fill="currentColor"
              className={
                prefersReducedMotion ? "text-sage" : "text-sage fb-leaf-unfurl"
              }
              style={
                prefersReducedMotion
                  ? { transition: "opacity 500ms ease-out" }
                  : { animationDelay: "100ms" }
              }
            />
            <path
              d="M30 21C30 21 38 18 42 22C42 26 34 28 30 25"
              fill="currentColor"
              className={
                prefersReducedMotion ? "text-sage" : "text-sage fb-leaf-unfurl"
              }
              style={
                prefersReducedMotion
                  ? { transition: "opacity 500ms ease-out" }
                  : { animationDelay: "300ms" }
              }
            />
          </>
        )}
      </svg>
    </div>
  );
}
