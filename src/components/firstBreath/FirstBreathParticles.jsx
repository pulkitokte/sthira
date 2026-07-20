// src/components/firstBreath/FirstBreathParticles.jsx
// Sparse, slow, nearly-invisible floating particles.
// Phase 4: optional opacityBoost prop makes particles very slightly
// more visible once awakened, per "slightly more visible particles."
// Default behavior (prop omitted) is identical to Phase 2.

const PARTICLES = [
  { top: "18%", left: "22%", size: 3, delay: "0s", duration: "14s" },
  { top: "30%", left: "78%", size: 2, delay: "2s", duration: "18s" },
  { top: "62%", left: "15%", size: 2, delay: "4s", duration: "16s" },
  { top: "75%", left: "68%", size: 3, delay: "1s", duration: "20s" },
  { top: "45%", left: "50%", size: 2, delay: "6s", duration: "17s" },
];

export default function FirstBreathParticles({ opacityBoost = false }) {
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
            background: `rgba(134,159,138,${opacityBoost ? 0.4 : 0.3})`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
