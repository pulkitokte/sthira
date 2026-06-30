// src/components/soundscapes/NatureSuggestionCard.jsx
// "Nature for This Moment" — gentle soundscape recommendation card.
// Never auto-plays audio. Purely suggests; user always decides.
// Fully keyboard accessible, warm natural aesthetic.

import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/navigation";

export default function NatureSuggestionCard({ recommendation }) {
  const navigate = useNavigate();

  const handleListen = () => {
    navigate(PATHS.CALM_SOUNDS);
  };

  return (
    <section
      className="relative overflow-hidden rounded-3xl"
      aria-label="Nature soundscape suggestion"
      style={{
        background:
          "linear-gradient(160deg, rgba(134,159,138,0.07) 0%, rgba(185,175,160,0.07) 100%)",
        border: "1px solid rgba(134,159,138,0.2)",
        boxShadow: "0 1px 8px rgba(0,0,0,0.03)",
        padding: "1.5rem",
      }}
    >
      {/* Decorative orb — purely visual */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(134,159,138,0.08) 0%, transparent 70%)",
          transform: "translate(35%, -35%)",
        }}
      />

      <div className="relative space-y-4">
        {/* Title */}
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70">
          Nature for This Moment
        </h2>

        {recommendation ? (
          <>
            {/* Sound emoji + title */}
            <div className="flex items-center gap-3">
              <span
                className="text-3xl leading-none shrink-0"
                aria-hidden="true"
              >
                {recommendation.sound.emoji}
              </span>
              <p className="font-display text-base font-medium text-ink leading-snug">
                {recommendation.sound.title}
              </p>
            </div>

            {/* Reason */}
            <p className="text-sm text-stone font-light leading-relaxed">
              {recommendation.reason}
            </p>

            {/* CTA */}
            <button
              onClick={handleListen}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ background: "#869F8A" }}
              aria-label={`Listen to ${recommendation.sound.title} in Calm Sounds`}
            >
              Listen in Calm Sounds
            </button>
          </>
        ) : (
          // ── Empty state ──────────────────────────────────────────────────
          <p className="text-sm text-stone font-light leading-relaxed">
            Choose any sound that feels supportive right now.
          </p>
        )}
      </div>
    </section>
  );
}
