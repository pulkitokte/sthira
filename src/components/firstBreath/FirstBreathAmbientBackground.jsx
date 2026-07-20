// src/components/firstBreath/FirstBreathAmbientBackground.jsx
// Warm, premium ambient backdrop.
// Phase 4: added an optional `awakened` prop. When true, the ambient
// light layer and particle opacity nudge very slightly warmer/brighter,
// per "the background should respond slightly." Default (awakened
// omitted/false) is byte-identical to Phase 2/3 — no existing usage
// needs to change.

import FirstBreathParticles from "./FirstBreathParticles";

export default function FirstBreathAmbientBackground({ awakened = false }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden transition-[filter] duration-[1200ms] ease-out"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, rgba(255,253,248,1) 0%, rgba(250,246,238,1) 60%, rgba(247,242,232,1) 100%)",
        filter: awakened ? "brightness(1.03)" : "none",
      }}
      aria-hidden="true"
    >
      <div
        className="fb-ambient-light absolute rounded-full transition-opacity duration-[1200ms] ease-out"
        style={{
          width: 480,
          height: 480,
          top: "20%",
          left: "50%",
          background: `radial-gradient(circle, rgba(134,159,138,${
            awakened ? 0.12 : 0.08
          }) 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      <FirstBreathParticles opacityBoost={awakened} />
    </div>
  );
}
