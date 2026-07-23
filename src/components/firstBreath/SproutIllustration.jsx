// src/components/firstBreath/SproutIllustration.jsx
// The First Breath's sole visual centerpiece: seed -> root -> sprout ->
// leaves, driven entirely by stageId (no interaction, no per-stage
// callbacks). Real vector animation (stroke-dashoffset line-drawing for
// root/stem, fading leaf unfurl), not scale tricks. Purely decorative —
// aria-hidden; the page provides the single accessible status
// announcement.
//
// Reduced motion: the same end-state visuals appear for every stage,
// reached via instant/opacity-only rendering instead of the
// drawing/unfurl animations.

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const ROOT_LENGTH = 18;
const STEM_LENGTH = 26;

export default function SproutIllustration({ stageId }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const showSeed = Boolean(stageId);
  const showRoot =
    stageId === "root" || stageId === "sprout" || stageId === "leaves";
  const showStem = stageId === "sprout" || stageId === "leaves";
  const showLeaves = stageId === "leaves";

  return (
    <div
      className="relative flex items-center justify-center"
      aria-hidden="true"
      style={{ width: 60, height: 90 }}
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

      <svg width="60" height="90" viewBox="0 0 60 90" fill="none" className="relative">
        {/* Seed */}
        {showSeed && (
          <path
            d="M30 38C30 38 43 50 43 60C43 66.6 37.28 72 30 72C22.7 72 17 66.6 17 60C17 50 30 38 30 38Z"
            fill="currentColor"
            className={
              prefersReducedMotion
                ? "text-sage fb-seed-breathe"
                : "text-sage fb-seed-breathe fb-part-fade"
            }
          />
        )}

        {/* Root — grows downward from the seed */}
        {showRoot && (
          <path
            d="M30 72C30 72 29 80 30 88"
            stroke="currentColor"
            className={
              prefersReducedMotion ? "text-sage" : "text-sage fb-root-draw"
            }
            strokeWidth={2}
            strokeLinecap="round"
            style={{
              "--fb-root-length": ROOT_LENGTH,
              ...(prefersReducedMotion
                ? { strokeDasharray: "none", strokeDashoffset: 0 }
                : {}),
            }}
          />
        )}

        {/* Stem — grows upward from the seed */}
        {showStem && (
          <path
            d="M30 38C30 38 29 26 30 14"
            stroke="currentColor"
            className={
              prefersReducedMotion ? "text-sage" : "text-sage fb-sprout-draw"
            }
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              "--fb-sprout-length": STEM_LENGTH,
              ...(prefersReducedMotion
                ? { strokeDasharray: "none", strokeDashoffset: 0 }
                : {}),
            }}
          />
        )}

        {/* Two small leaves at the stem tip */}
        {showLeaves && (
          <>
            <path
              d="M30 15C30 15 22 12 18 16C18 20 26 22 30 19"
              fill="currentColor"
              className={
                prefersReducedMotion ? "text-sage" : "text-sage fb-leaf-unfurl"
              }
              style={
                prefersReducedMotion
                  ? { transition: "opacity 400ms ease-out" }
                  : { animationDelay: "80ms" }
              }
            />
            <path
              d="M30 15C30 15 38 12 42 16C42 20 34 22 30 19"
              fill="currentColor"
              className={
                prefersReducedMotion ? "text-sage" : "text-sage fb-leaf-unfurl"
              }
              style={
                prefersReducedMotion
                  ? { transition: "opacity 400ms ease-out" }
                  : { animationDelay: "220ms" }
              }
            />
          </>
        )}
      </svg>
    </div>
  );
}