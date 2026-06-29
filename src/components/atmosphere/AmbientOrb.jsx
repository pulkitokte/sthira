// src/components/atmosphere/AmbientOrb.jsx
// Two extremely subtle ambient orbs.
// Opacity is below 8%. Respects prefers-reduced-motion.
// Never distracting — purely atmospheric.

export default function AmbientOrb({ preset }) {
  // Respect prefers-reduced-motion — skip animation entirely
  // We use CSS media query via inline style to keep this pure CSS, no JS check needed.
  const orbColor = preset?.orbColor ?? "rgba(185,175,160,0.05)";

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .sthira-orb-1 {
            animation: orbDrift1 28s ease-in-out infinite;
          }
          .sthira-orb-2 {
            animation: orbDrift2 34s ease-in-out infinite;
          }
        }

        @keyframes orbDrift1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(8px, -6px) scale(1.04); }
          66%  { transform: translate(-5px, 4px) scale(0.97); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes orbDrift2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(-7px, 5px) scale(1.03); }
          70%  { transform: translate(4px, -4px) scale(0.98); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>

      {/* Orb 1 — top right */}
      <div
        className="sthira-orb-1 absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: 320,
          height: 320,
          borderRadius: "50%",
          top: "-12%",
          right: "-10%",
          background: `radial-gradient(circle, ${orbColor} 0%, transparent 68%)`,
          willChange: "transform",
        }}
      />

      {/* Orb 2 — bottom left */}
      <div
        className="sthira-orb-2 absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: 240,
          height: 240,
          borderRadius: "50%",
          bottom: "-8%",
          left: "-8%",
          background: `radial-gradient(circle, ${orbColor} 0%, transparent 65%)`,
          willChange: "transform",
        }}
      />
    </>
  );
}
