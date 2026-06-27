// src/components/wisdom/WisdomCard.jsx
// The main editorial wisdom card — large, calm, premium typography.
// Used for both the daily card and archive detail.

import { Heart } from "lucide-react";

export default function WisdomCard({
  entry,
  isFavorited,
  onToggleFavorite,
  isToday = false,
  compact = false,
}) {
  if (!entry) return null;

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(185,175,160,0.1) 0%, rgba(134,159,138,0.08) 100%)",
        border: "1px solid rgba(185,175,160,0.2)",
        padding: compact ? "1.5rem" : "2.5rem 2rem",
      }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(134,159,138,0.07) 0%, transparent 70%)",
          transform: "translate(40%, -40%)",
        }}
        aria-hidden="true"
      />

      <div className="relative space-y-5">
        {/* Eyebrow */}
        {isToday && (
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-stone opacity-60">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        )}

        {/* Wisdom text */}
        <blockquote
          className="font-display font-light text-ink leading-[1.75]"
          style={{ fontSize: compact ? "1rem" : "1.25rem" }}
        >
          "{entry.text}"
        </blockquote>

        {/* Author */}
        {entry.author && (
          <p className="text-sm text-stone font-light tracking-wide">
            — {entry.author}
          </p>
        )}

        {/* Footer row: category + favorite */}
        <div className="flex items-center justify-between pt-1">
          <span
            className="text-xs font-display font-medium px-2.5 py-1 rounded-full capitalize tracking-wide"
            style={{
              background: "rgba(134,159,138,0.1)",
              border: "1px solid rgba(134,159,138,0.22)",
              color: "#5a7060",
            }}
          >
            {entry.category.replace("-", " ")}
          </span>

          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(entry.id)}
              className="p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                color: isFavorited ? "#c07860" : "#b0a898",
              }}
              aria-label={
                isFavorited ? "Remove from favorites" : "Save to favorites"
              }
              aria-pressed={isFavorited}
            >
              <Heart
                size={18}
                strokeWidth={1.5}
                fill={isFavorited ? "currentColor" : "none"}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
