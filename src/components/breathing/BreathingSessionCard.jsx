// src/components/breathing/BreathingSessionCard.jsx
// A single selectable breathing session card.

export default function BreathingSessionCard({ session, onSelect }) {
  const accentMap = {
    sage: {
      ring: "rgba(134, 159, 138, 0.35)",
      bg: "rgba(134, 159, 138, 0.07)",
      badge: "rgba(134, 159, 138, 0.2)",
      badgeText: "#4a7055",
    },
    warm: {
      ring: "rgba(185, 160, 120, 0.35)",
      bg: "rgba(185, 160, 120, 0.07)",
      badge: "rgba(185, 160, 120, 0.2)",
      badgeText: "#7a6040",
    },
    blue: {
      ring: "rgba(120, 150, 175, 0.35)",
      bg: "rgba(120, 150, 175, 0.07)",
      badge: "rgba(120, 150, 175, 0.2)",
      badgeText: "#3a6080",
    },
  };

  const accent = accentMap[session.color] ?? accentMap.sage;

  return (
    <button
      onClick={() => onSelect(session)}
      className="w-full text-left rounded-2xl p-5 transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
      style={{
        background: accent.bg,
        border: `1px solid ${accent.ring}`,
      }}
      aria-label={`Start ${session.title}, ${session.totalMinutes} minutes`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-display text-base font-medium text-ink leading-snug">
            {session.title}
          </p>
          <p className="text-xs text-stone font-light mt-0.5 tracking-wide">
            {session.subtitle}
          </p>
          <p className="text-sm text-stone font-light mt-2.5 leading-relaxed line-clamp-2">
            {session.description}
          </p>
        </div>
        <span
          className="shrink-0 mt-0.5 text-xs font-light px-2.5 py-1 rounded-full"
          style={{ background: accent.badge, color: accent.badgeText }}
        >
          {session.totalMinutes}m
        </span>
      </div>
    </button>
  );
}
