// src/components/wisdom/WisdomArchiveCard.jsx
// Compact card for archive and favorites list views.

import { Heart } from "lucide-react";

export default function WisdomArchiveCard({
  entry,
  isFavorited,
  onToggleFavorite,
}) {
  return (
    <div
      className="rounded-2xl p-5 transition-all duration-150"
      style={{
        background: "rgba(248,246,242,1)",
        border: "1px solid rgba(185,175,160,0.2)",
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Text */}
      <p className="font-display font-light text-ink leading-relaxed text-sm">
        "{entry.text}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {entry.author && (
            <span className="text-xs text-stone font-light">
              — {entry.author}
            </span>
          )}
          <span
            className="text-xs font-display font-medium px-2 py-0.5 rounded-full capitalize"
            style={{
              background: "rgba(134,159,138,0.1)",
              color: "#5a7060",
            }}
          >
            {entry.category.replace("-", " ")}
          </span>
        </div>

        <button
          onClick={() => onToggleFavorite(entry.id)}
          className="shrink-0 p-1.5 rounded-xl transition-all duration-200 focus:outline-none"
          style={{ color: isFavorited ? "#c07860" : "#c0b8b0" }}
          aria-label={
            isFavorited ? "Remove from favorites" : "Save to favorites"
          }
          aria-pressed={isFavorited}
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            fill={isFavorited ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
}
