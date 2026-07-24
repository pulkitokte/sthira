// src/components/firstBreath/SproutIllustration.jsx
// The First Breath's only illustration: seed -> root -> sprout -> leaves,
// driven purely by stageId. Real vector animation (stroke-dashoffset
// line-drawing, fading leaf unfurl) via plain inline CSS transitions —
// no external animation library, no keyframe class dependencies outside
// this file. Purely decorative — aria-hidden; the page provides the
// single accessible status announcement.
//
// Reduced motion: every stage still renders its correct end-state
// visual — only the transition style differs (near-instant vs. eased),
// governed by the prefers-reduced-motion hook below.

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const ROOT_LENGTH = 18;
const STEM_LENGTH = 26;

export default function SproutIllustration({ stageId }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const dur = prefersReducedMotion ? 1 : undefined; // ms; undefined = default below

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
      {/* Soft glow behind the seed */}
      <div
        className="absolute rounded-full"
        style={{
          width: 110,
          height: 110,
          background:
            "radial-gradient(circle, rgba(134,159,138,0.32) 0%, transparent 70%)",
          filter: "blur(6px)",
          opacity: showSeed ? 1 : 0,
          transition: `opacity ${dur ?? 700}ms ease-out`,
        }}
      />

      <svg width="60" height="90" viewBox="0 0 60 90" fill="none">
        {/* Seed */}
        <path
          d="M30 38C30 38 43 50 43 60C43 66.6 37.28 72 30 72C22.7 72 17 66.6 17 60C17 50 30 38 30 38Z"
          fill="currentColor"
          className="text-sage"
          style={{
            opacity: showSeed ? 1 : 0,
            transition: `opacity ${dur ?? 700}ms ease-out`,
          }}
        />

        {/* Root — grows downward from the seed */}
        <path
          d="M30 72C30 72 29 80 30 88"
          stroke="currentColor"
          className="text-sage"
          strokeWidth={2}
          strokeLinecap="round"
          style={{
            strokeDasharray: ROOT_LENGTH,
            strokeDashoffset: showRoot ? 0 : ROOT_LENGTH,
            transition: `stroke-dashoffset ${dur ?? 800}ms ease-out`,
          }}
        />

        {/* Stem — grows upward from the seed */}
        <path
          d="M30 38C30 38 29 26 30 14"
          stroke="currentColor"
          className="text-sage"
          strokeWidth={2.5}
          strokeLinecap="round"
          style={{
            strokeDasharray: STEM_LENGTH,
            strokeDashoffset: showStem ? 0 : STEM_LENGTH,
            transition: `stroke-dashoffset ${dur ?? 700}ms ease-out`,
          }}
        />

        {/* Two small leaves at the stem tip */}
        <path
          d="M30 15C30 15 22 12 18 16C18 20 26 22 30 19"
          fill="currentColor"
          className="text-sage"
          style={{
            opacity: showLeaves ? 1 : 0,
            transform: showLeaves ? "scale(1)" : "scale(0.4)",
            transformOrigin: "bottom center",
            transition: `opacity ${dur ?? 600}ms ease-out, transform ${dur ?? 600}ms ease-out`,
          }}
        />
        <path
          d="M30 15C30 15 38 12 42 16C42 20 34 22 30 19"
          fill="currentColor"
          className="text-sage"
          style={{
            opacity: showLeaves ? 1 : 0,
            transform: showLeaves ? "scale(1)" : "scale(0.4)",
            transformOrigin: "bottom center",
            transition: `opacity ${dur ?? 600}ms ease-out 100ms, transform ${dur ?? 600}ms ease-out 100ms`,
          }}
        />
      </svg>
    </div>
  );
}
