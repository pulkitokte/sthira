// src/components/calm/SoundCard.jsx
// A single ambient sound selection card shown on the home grid.

export default function SoundCard({ sound, isActive, isPlaying, onSelect }) {
  return (
    <button
      onClick={() => onSelect(sound)}
      className="w-full text-left rounded-2xl p-4 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1"
      style={{
        background: sound.gradient,
        border: `1px solid ${sound.cardBorder}`,
        boxShadow: isActive
          ? `0 2px 16px ${sound.accentColor}40`
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
      aria-label={`Play ${sound.title}`}
      aria-pressed={isActive}
    >
      <div className="flex items-center gap-3">
        {/* Emoji with optional playing indicator */}
        <div className="relative shrink-0">
          <span className="text-3xl leading-none">{sound.emoji}</span>
          {isActive && isPlaying && (
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
              style={{
                background: sound.accentColor,
                boxShadow: `0 0 0 2px rgba(255,255,255,0.9)`,
              }}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="font-display text-sm font-medium leading-snug"
            style={{ color: sound.textColor }}
          >
            {sound.title}
          </p>
          <p className="text-xs text-stone font-light mt-0.5 leading-snug line-clamp-1 opacity-80">
            {sound.subtitle}
          </p>
        </div>

        {/* Playing badge */}
        {isActive && (
          <span
            className="shrink-0 text-xs font-display font-medium px-2 py-0.5 rounded-full"
            style={{
              background: sound.accentColor,
              color: "#fff",
              opacity: 0.9,
            }}
          >
            {isPlaying ? "Playing" : "Paused"}
          </span>
        )}
      </div>
    </button>
  );
}
