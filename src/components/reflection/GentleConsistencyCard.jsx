// src/components/reflection/GentleConsistencyCard.jsx
// Gentle Consistency — a compassionate alternative to guilt-driven streaks.
// No charts. No percentages. No red. No "broken streak" language.
// Purely warm, paper-like, reflective. Not clickable — no CTA navigation.

export default function GentleConsistencyCard({ summary }) {
  if (!summary) return null;

  const { totalDays, weekCount, headline, secondaryMessage } = summary;

  return (
    <section
      className="relative overflow-hidden rounded-3xl"
      aria-label="Gentle consistency"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,253,248,1) 0%, rgba(248,245,238,1) 100%)",
        border: "1px solid rgba(134,159,138,0.22)",
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        padding: "1.5rem",
      }}
    >
      {/* Decorative soft orb — purely visual, hidden from assistive tech */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(134,159,138,0.07) 0%, transparent 70%)",
          transform: "translate(35%, -35%)",
        }}
      />

      <div className="relative space-y-4">
        {/* Section title */}
        <div className="flex items-center gap-2">
          <span className="text-base leading-none" aria-hidden="true">
            🌱
          </span>
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70">
            Gentle Consistency
          </h2>
        </div>

        {/* Stats — text only, no bars, no percentages */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <p className="font-display text-sm font-light text-ink">
            <span aria-hidden="true">🌱 </span>
            {totalDays === 0
              ? "No reflections yet — and that is alright."
              : totalDays === 1
                ? "1 day of returning"
                : `${totalDays} days of returning`}
          </p>
          <p className="font-display text-sm font-light text-ink">
            <span aria-hidden="true">✨ </span>
            {weekCount === 0
              ? "No gentle moments yet this week"
              : weekCount === 1
                ? "1 gentle moment this week"
                : `${weekCount} gentle moments this week`}
          </p>
        </div>

        {/* Headline message — state-aware */}
        <p
          className="font-display font-light text-ink leading-[1.7]"
          style={{ fontSize: "1rem" }}
        >
          {headline}
        </p>

        {/* Secondary message, when present and distinct from headline */}
        {secondaryMessage && (
          <p className="text-sm text-stone font-light italic leading-relaxed opacity-75">
            {secondaryMessage}
          </p>
        )}

        {/* Non-clickable CTA text */}
        <p
          className="text-xs font-display font-light text-stone"
          style={{ opacity: 0.5, letterSpacing: "0.03em" }}
        >
          Begin again, whenever you are ready.
        </p>
      </div>
    </section>
  );
}
