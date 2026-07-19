// src/components/firstBreath/FirstBreathAmbientBackground.jsx
// Warm, premium ambient backdrop: soft radial lighting, a very slow
// moving light layer, and sparse floating particles. Purely decorative,
// sits fixed behind all page content. Uses only existing color language
// (warm cream, sage) — no new design tokens introduced.

import FirstBreathParticles from "./FirstBreathParticles";

export default function FirstBreathAmbientBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, rgba(255,253,248,1) 0%, rgba(250,246,238,1) 60%, rgba(247,242,232,1) 100%)",
      }}
      aria-hidden="true"
    >
      <div
        className="fb-ambient-light absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          top: "20%",
          left: "50%",
          background:
            "radial-gradient(circle, rgba(134,159,138,0.08) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <FirstBreathParticles />
    </div>
  );
}
