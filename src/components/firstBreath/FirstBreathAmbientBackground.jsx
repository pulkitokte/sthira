// src/components/firstBreath/FirstBreathAmbientBackground.jsx
// Warm, premium ambient backdrop.
// Phase 5: optional `settled` prop lets the ambient light's own motion
// slow to a near-still state, per "allow the ambient background to
// gently settle." Default (settled omitted) unchanged from Phase 2/4.

import FirstBreathParticles from "./FirstBreathParticles";

export default function FirstBreathAmbientBackground({
  awakened = false,
  settled = false,
}) {
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
          animationPlayState: settled ? "paused" : "running",
        }}
      />
      <FirstBreathParticles opacityBoost={awakened} settled={settled} />
    </div>
  );
}
