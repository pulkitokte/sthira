// src/components/home/EnergyGuidanceCard.jsx
// "Today's Energy" — gently suggests supportive activities based on how
// the user feels today, derived from their existing wellness check-in.
// No productivity language. No pressure. No analytics.

import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/navigation";
import { ENERGY_STATES } from "../../utils/energyGuidance";

export default function EnergyGuidanceCard({ guidance }) {
  const navigate = useNavigate();

  if (!guidance) return null;

  const { state, message, actions, accent } = guidance;
  const isUnknown = state === ENERGY_STATES.UNKNOWN;

  return (
    <section
      className="relative overflow-hidden rounded-3xl"
      aria-label="Today's energy guidance"
      style={{
        background: accent.gradient,
        border: `1px solid ${accent.border}`,
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        padding: "1.5rem",
      }}
    >
      {/* Decorative orb — hidden from assistive tech */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(185,175,160,0.08) 0%, transparent 70%)",
          transform: "translate(40%, -40%)",
        }}
      />

      <div className="relative space-y-4">
        {/* Header row: title + energy state pill */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70">
            Today's Energy
          </h2>

          {!isUnknown && (
            <span
              className="inline-flex items-center gap-1.5 font-display text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                background: accent.pillBg,
                border: `1px solid ${accent.pillBorder}`,
                color: accent.pillText,
              }}
              aria-label={`Energy state: ${accent.label}`}
            >
              <span aria-hidden="true">{accent.icon}</span>
              {accent.label}
            </span>
          )}
        </div>

        {/* Supportive message */}
        <p
          className="font-display font-light text-ink leading-[1.7]"
          style={{ fontSize: "0.97rem" }}
        >
          {message}
        </p>

        {/* Unknown state: single CTA to wellness check-in */}
        {isUnknown && (
          <button
            onClick={() => navigate(PATHS.WELLNESS_TRACKER)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ background: "#869F8A" }}
            aria-label="Complete today's wellness check-in"
          >
            Complete today's wellness check-in
          </button>
        )}

        {/* Known state: 2–4 action suggestions */}
        {!isUnknown && actions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-stone font-light opacity-60 tracking-wide">
              Some things that may help:
            </p>
            <div className="flex flex-wrap gap-2">
              {actions.map((action) => {
                const path = PATHS[action.pathKey];
                if (!path) return null;
                return (
                  <button
                    key={action.pathKey}
                    onClick={() => navigate(path)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-display text-xs font-medium transition-all duration-150 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                    style={{
                      background: accent.pillBg,
                      border: `1px solid ${accent.pillBorder}`,
                      color: accent.pillText,
                    }}
                    aria-label={`Go to ${action.label}`}
                  >
                    <span aria-hidden="true">{action.emoji}</span>
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
