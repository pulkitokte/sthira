// src/components/garden/GardenEmptyState.jsx
// Shown when the garden has no entries yet.

export default function GardenEmptyState({ onPlant }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-12 gap-6">
      {/* Seed illustration — pure CSS */}
      <div className="relative flex items-center justify-center w-24 h-24">
        <div
          className="absolute w-24 h-24 rounded-full"
          style={{
            background: "rgba(134, 159, 138, 0.08)",
            border: "1.5px solid rgba(134, 159, 138, 0.2)",
          }}
        />
        <div
          className="absolute w-16 h-16 rounded-full"
          style={{
            background: "rgba(134, 159, 138, 0.1)",
            border: "1.5px solid rgba(134, 159, 138, 0.25)",
          }}
        />
        {/* Single small sprout */}
        <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
          <line
            x1="14"
            y1="32"
            x2="14"
            y2="14"
            stroke="#a8c5a0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <ellipse
            cx="9"
            cy="12"
            rx="6"
            ry="4"
            fill="#b8d4b0"
            opacity="0.7"
            transform="rotate(-20 9 12)"
          />
          <ellipse
            cx="19"
            cy="10"
            rx="6"
            ry="4"
            fill="#a8c5a0"
            opacity="0.7"
            transform="rotate(20 19 10)"
          />
        </svg>
      </div>

      <div className="space-y-2 max-w-xs">
        <p className="font-display text-lg font-light text-ink tracking-tight">
          Your garden is ready.
        </p>
        <p className="text-sm text-stone font-light leading-relaxed">
          Each moment of gratitude you record grows something here. Small things
          noticed become something beautiful over time.
        </p>
      </div>

      <button
        onClick={onPlant}
        className="px-8 py-3 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-opacity hover:opacity-90"
        style={{ background: "#869F8A" }}
      >
        Plant your first moment
      </button>
    </div>
  );
}
