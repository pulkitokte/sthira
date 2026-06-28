// src/components/compassion/CompassionCard.jsx
// A single support card shown on the toolkit home screen.

export default function CompassionCard({ card, onOpen }) {
  return (
    <button
      onClick={() => onOpen(card)}
      className="w-full text-left rounded-2xl p-5 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1"
      style={{
        background: card.gradient,
        border: `1px solid ${card.border}`,
      }}
      aria-label={`Open: ${card.title}`}
    >
      <div className="flex items-start gap-4">
        {/* Emoji in a soft bubble */}
        <div
          className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            background: card.lightBg,
            border: `1px solid ${card.border}`,
          }}
        >
          <span className="text-xl leading-none">{card.emoji}</span>
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <p
            className="font-display text-sm font-medium leading-snug"
            style={{ color: card.accentColor }}
          >
            {card.title}
          </p>
          <p className="text-xs text-stone font-light leading-relaxed">
            {card.subtitle}
          </p>
        </div>
      </div>
    </button>
  );
}
