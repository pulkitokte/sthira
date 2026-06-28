// src/components/calm/PulseRing.jsx
// Pure CSS animated pulse ring shown around emoji while a sound is playing.
// No Framer Motion. No external dependencies.

export default function PulseRing({
  isPlaying,
  color = "rgba(134,159,138,0.35)",
  children,
}) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 120, height: 120 }}
    >
      {/* Outer pulse — only animates when playing */}
      {isPlaying && (
        <>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: color,
              animation: "calmPulse 2.4s ease-out infinite",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: color,
              animation: "calmPulse 2.4s ease-out infinite 1.2s",
            }}
          />
        </>
      )}

      {/* Inner circle */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: 96,
          height: 96,
          background: "rgba(255,253,248,0.9)",
          border: `1.5px solid ${color}`,
          boxShadow: isPlaying ? `0 0 0 3px ${color}` : "none",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {children}
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes calmPulse {
          0%   { transform: scale(0.92); opacity: 0.6; }
          60%  { transform: scale(1.28); opacity: 0; }
          100% { transform: scale(1.28); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
