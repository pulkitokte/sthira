// src/components/reflection/ReflectionJourneyCard.jsx
// "Reflection Journey" — a warm, personalized end-of-day reflection card.
// Purely calm and editorial. No checklists, scores, progress bars, or percentages.

import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/navigation";

export default function ReflectionJourneyCard({ reflection }) {
  const navigate = useNavigate();

  if (!reflection) return null;

  const {
    emoji,
    title,
    toneLine,
    observation,
    appreciationLine,
    tomorrowSuggestion,
    showExploreButton,
  } = reflection;

  return (
    <section aria-label="Reflection journey" className="space-y-4">
      {/* Section header */}
      <div className="space-y-1 px-1">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70">
          Reflection Journey
        </h2>
        <p className="text-sm text-stone font-light leading-relaxed opacity-70">
          A quiet look back before tomorrow begins.
        </p>
      </div>

      {/* Main reflection card */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,253,248,1) 0%, rgba(250,245,238,1) 100%)",
          border: "1px solid rgba(185,175,160,0.22)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
          padding: "1.6rem",
        }}
      >
        {/* Decorative orb */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          aria-hidden="true"
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(185,175,160,0.07) 0%, transparent 70%)",
            transform: "translate(40%, -40%)",
          }}
        />

        <div className="relative space-y-5">
          {/* Emoji + title */}
          <div className="flex items-start gap-3">
            <span
              className="text-2xl leading-none mt-0.5 shrink-0"
              aria-hidden="true"
            >
              {emoji}
            </span>
            <h3
              className="font-display font-light text-ink leading-snug"
              style={{ fontSize: "1.1rem" }}
            >
              {title}
            </h3>
          </div>

          {/* Soft horizontal rule */}
          <div
            className="h-px"
            style={{ background: "rgba(185,175,160,0.18)" }}
            aria-hidden="true"
          />

          {/* Tone line */}
          <div className="space-y-1">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone opacity-50">
              Today's tone
            </p>
            <p className="text-sm text-stone font-light leading-relaxed">
              {toneLine}
            </p>
          </div>

          {/* Observation */}
          <div className="space-y-1">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone opacity-50">
              Something worth noticing
            </p>
            <p className="text-sm text-ink font-light leading-relaxed">
              {observation}
            </p>
          </div>

          {/* Appreciation */}
          <div
            className="rounded-2xl px-4 py-3"
            style={{
              background: "rgba(134,159,138,0.06)",
              border: "1px solid rgba(134,159,138,0.16)",
            }}
          >
            <p className="text-sm text-ink font-light leading-relaxed italic">
              {appreciationLine}
            </p>
          </div>

          {/* Tomorrow suggestion */}
          <div className="space-y-1">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone opacity-50">
              For tomorrow
            </p>
            <p className="text-sm text-stone font-light leading-relaxed">
              {tomorrowSuggestion}
            </p>
          </div>

          {/* Optional explore button */}
          {showExploreButton && (
            <button
              onClick={() => navigate(PATHS.EVENING_REFLECTION)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ background: "#869F8A" }}
              aria-label="Open Evening Reflection"
            >
              Explore Reflection
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
