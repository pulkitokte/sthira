// src/components/sanctuary/QuietCorner.jsx
// Displays a random calming micro-exercise with a refresh option.

export default function QuietCorner({ exercise, onRefresh }) {
  return (
    <div
      className="rounded-3xl p-6 space-y-5"
      style={{
        background:
          "linear-gradient(160deg, rgba(185,175,160,0.08) 0%, rgba(160,155,145,0.1) 100%)",
        border: "1px solid rgba(185,175,160,0.2)",
      }}
    >
      <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone">
        Quiet Corner
      </p>

      {/* Exercise */}
      <div className="space-y-3">
        {/* Small leaf accent */}
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background: "rgba(134,159,138,0.15)",
            border: "1px solid rgba(134,159,138,0.25)",
          }}
        />
        <p
          className="font-display font-light text-ink leading-relaxed"
          style={{ fontSize: "1rem" }}
        >
          {exercise}
        </p>
      </div>

      <button
        onClick={onRefresh}
        className="text-xs text-stone font-light tracking-wide hover:text-ink transition-colors duration-200"
        aria-label="Show another exercise"
      >
        Show another
      </button>
    </div>
  );
}
