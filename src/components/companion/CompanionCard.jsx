// src/components/companion/CompanionCard.jsx
// Reusable companion message card.
// Used both on the home section and inside CompanionSpace.

import { Heart, RefreshCw } from "lucide-react";

export default function CompanionCard({
  message,
  categoryLabel,
  isFavorited,
  onToggleFavorite,
  onRefresh,
  size = "home", // "home" | "full"
}) {
  if (!message) return null;

  const isFullSize = size === "full";

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,252,248,1) 0%, rgba(250,246,240,1) 100%)",
        border: "1px solid rgba(185,175,160,0.25)",
        boxShadow: isFullSize
          ? "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)"
          : "0 1px 8px rgba(0,0,0,0.04)",
        padding: isFullSize ? "2rem" : "1.25rem",
      }}
    >
      {/* Decorative orb */}
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
        {/* Category eyebrow */}
        <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-stone opacity-60">
          {categoryLabel}
        </p>

        {/* Message text */}
        <p
          className="font-display font-light text-ink leading-[1.75]"
          style={{ fontSize: isFullSize ? "1.15rem" : "0.95rem" }}
        >
          {message.text}
        </p>

        {/* Actions row */}
        {(onToggleFavorite || onRefresh) && (
          <div className="flex items-center justify-between pt-1">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="flex items-center gap-1.5 text-xs text-stone font-light hover:text-ink transition-colors"
                aria-label="Show another message"
              >
                <RefreshCw size={12} strokeWidth={1.5} />
                Another
              </button>
            )}
            {!onRefresh && <span />}

            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(message.id)}
                className="p-1.5 rounded-xl transition-all duration-200 focus:outline-none"
                style={{
                  color: isFavorited ? "#c07860" : "#b0a898",
                }}
                aria-label={
                  isFavorited ? "Remove from favorites" : "Save message"
                }
                aria-pressed={isFavorited}
              >
                <Heart
                  size={16}
                  strokeWidth={1.5}
                  fill={isFavorited ? "currentColor" : "none"}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
