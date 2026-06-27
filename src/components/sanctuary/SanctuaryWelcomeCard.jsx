// src/components/sanctuary/SanctuaryWelcomeCard.jsx
// The main welcome message card shown on sanctuary entry.
// Extremely calm, minimal, spacious.

export default function SanctuaryWelcomeCard({ message, onRefresh }) {
  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(134,159,138,0.1) 0%, rgba(185,175,160,0.1) 100%)",
        border: "1px solid rgba(134, 159, 138, 0.18)",
        padding: "2.5rem 2rem",
      }}
    >
      {/* Subtle background orb */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(134,159,138,0.08) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="relative space-y-6">
        {/* Eyebrow */}
        <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-stone opacity-70">
          A moment for you
        </p>

        {/* Message */}
        <p
          className="font-display font-light text-ink leading-[1.7]"
          style={{ fontSize: "1.2rem" }}
        >
          {message}
        </p>

        {/* Refresh */}
        <button
          onClick={onRefresh}
          className="text-xs text-stone font-light tracking-wide hover:text-ink transition-colors duration-300"
          aria-label="Show another message"
        >
          Another thought →
        </button>
      </div>
    </div>
  );
}
