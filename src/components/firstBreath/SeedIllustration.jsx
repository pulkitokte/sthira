// src/components/firstBreath/SeedIllustration.jsx
// Minimal vector seed for The First Breath's opening scene.
// Phase 2: idle animation only (subtle breathing scale, gentle float,
// soft glow). No inhale/hold/exhale breathing ritual yet — that is a
// future batch, and will extend this component with new CSS classes
// only, without touching where or how it's used elsewhere.
// Purely decorative — aria-hidden, conveys no information on its own.

export default function SeedIllustration() {
  return (
    <div
      className="relative flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Glow lives on its own layer so its opacity pulse doesn't
          interfere with the seed's own scale/float transforms. */}
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
