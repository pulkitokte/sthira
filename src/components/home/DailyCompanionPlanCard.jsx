// src/components/home/DailyCompanionPlanCard.jsx
// "Today's Gentle Journey" — a warm, non-pressuring daily plan card.
// Displays 4–6 suggested moments. Each moment navigates to an existing feature.
// Never resembles a checklist. No completion states. No percentages. No warnings.

import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/navigation";

// ── Individual moment card ────────────────────────────────────────────────────

function MomentCard({ moment }) {
  const navigate = useNavigate();
  const path = PATHS[moment.pathKey];

  const handleOpen = () => {
    if (path) navigate(path);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,253,248,1) 0%, rgba(250,246,240,1) 100%)",
        border: "1px solid rgba(185,175,160,0.2)",
        boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
        padding: "1rem 1.1rem",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Emoji */}
        <span
          className="text-xl leading-none mt-0.5 shrink-0"
          aria-hidden="true"
        >
          {moment.emoji}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Title + duration chip */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="font-display text-sm font-medium text-ink leading-snug">
              {moment.title}
            </p>
            <span
              className="shrink-0 font-display text-xs font-light px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(185,175,160,0.12)",
                border: "1px solid rgba(185,175,160,0.22)",
                color: "#7a6a58",
              }}
              aria-label={`Duration: ${moment.duration}`}
            >
              {moment.duration}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-stone font-light leading-relaxed">
            {moment.description}
          </p>

          {/* Open button */}
          {path && (
            <button
              onClick={handleOpen}
              className="mt-2 inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.1em] transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 rounded"
              style={{ color: "#869F8A" }}
              aria-label={`Open ${moment.title}`}
            >
              Open
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main card ─────────────────────────────────────────────────────────────────

export default function DailyCompanionPlanCard({ plan }) {
  if (!plan || !plan.moments || plan.moments.length === 0) return null;

  return (
    <section aria-label="Today's gentle journey" className="space-y-4">
      {/* Section header */}
      <div className="space-y-1 px-1">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70">
          Today's Gentle Journey
        </h2>
        <p className="text-sm text-stone font-light leading-relaxed opacity-80">
          {plan.subtitle}
        </p>
      </div>

      {/* Moment cards */}
      <div className="flex flex-col gap-3">
        {plan.moments.map((moment) => (
          <MomentCard key={moment.id} moment={moment} />
        ))}
      </div>

      {/* Closing note — not a button, purely reflective */}
      <p
        className="text-center text-xs text-stone font-light italic px-4"
        style={{ opacity: 0.4 }}
      >
        These are gentle suggestions, not requirements.
      </p>
    </section>
  );
}
