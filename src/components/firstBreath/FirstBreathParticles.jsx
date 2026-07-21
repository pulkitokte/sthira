// src/components/firstBreath/FirstBreathParticles.jsx
// Sparse, slow, nearly-invisible floating particles.
// Phase 5: optional `settled` prop slows movement further and lowers
// opacity slightly, per "reduce particle movement... keep the
// atmosphere calm... the ending should feel still." Default behavior
// (prop omitted) is identical to Phase 2/4.

const PARTICLES = [
  { top: "18%", left: "22%", size: 3, delay: "0s", duration: 14 },
  { top: "30%", left: "78%", size: 2, delay: "2s", duration: 18 },
  { top: "62%", left: "15%", size: 2, delay: "4s", duration: 16 },
  { top: "75%", left: "68%", size: 3, delay: "1s", duration: 20 },
  { top: "45%", left: "50%", size: 2, delay: "6s", duration: 17 },
];

export default function FirstBreathParticles({
  opacityBoost = false,
  settled = false,
}) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="fb-particle absolute rounded-full transition-opacity duration-[1200ms] ease-out"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: `rgba(134,159,138,${
              opacityBoost && !settled ? 0.4 : settled ? 0.18 : 0.3
            })`,
            animationDelay: p.delay,
            animationDuration: `${p.duration * (settled ? 1.6 : 1)}s`,
          }}
        />
      ))}
    </div>
  );
}