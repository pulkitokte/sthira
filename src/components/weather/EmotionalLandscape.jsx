// src/components/weather/EmotionalLandscape.jsx
// A visual "sky" of the last 7 emotional weather entries.
// Pure emoji + layout — no charts, no graphs.
// Newest entry on the right.

import { getWeatherById } from "../../data/emotionalWeatherData";
import { formatWeatherDate } from "../../utils/emotionalWeather";
import { loadWeatherEntries } from "../../utils/emotionalWeather";

export default function EmotionalLandscape({ recentIds }) {
  // Get full entries to show dates in tooltip/label
  const recentEntries = loadWeatherEntries().slice(0, 7).reverse(); // oldest → newest

  if (recentIds.length === 0) {
    return (
      <div
        className="rounded-3xl p-6 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(160deg, rgba(185,175,160,0.08) 0%, rgba(160,155,148,0.06) 100%)",
          border: "1px solid rgba(185,175,160,0.18)",
          minHeight: 120,
        }}
      >
        <p className="text-xs text-stone font-light italic opacity-50">
          Your emotional sky will appear here.
        </p>
      </div>
    );
  }

  // Reversed so newest is on the right
  const displayEntries = [...recentEntries];

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(200,210,230,0.12) 0%, rgba(185,190,200,0.08) 60%, rgba(200,195,185,0.1) 100%)",
        border: "1px solid rgba(185,175,160,0.2)",
      }}
    >
      {/* Sky area */}
      <div className="px-5 pt-5 pb-3">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70 mb-4">
          Recent skies
        </p>

        <div className="flex items-end justify-between gap-1">
          {displayEntries.map((entry, i) => {
            const weather = getWeatherById(entry.weather);
            const isNewest = i === displayEntries.length - 1;
            const opacity =
              0.4 + (i / Math.max(displayEntries.length - 1, 1)) * 0.6;

            return (
              <div
                key={entry.id}
                className="flex flex-col items-center gap-2 flex-1"
                style={{ opacity }}
              >
                {/* Weather emoji — grows toward newest */}
                <div
                  className="flex items-center justify-center rounded-2xl transition-all duration-300"
                  style={{
                    background: weather.bgColor,
                    border: `1px solid ${weather.borderColor}`,
                    width: isNewest ? 44 : 34,
                    height: isNewest ? 44 : 34,
                  }}
                >
                  <span
                    style={{ fontSize: isNewest ? "1.4rem" : "1.1rem" }}
                    aria-label={weather.label}
                  >
                    {weather.emoji}
                  </span>
                </div>

                {/* Date label */}
                <p
                  className="text-center font-light text-stone"
                  style={{ fontSize: "0.6rem", lineHeight: 1.3 }}
                >
                  {formatWeatherDate(entry.date)}
                </p>
              </div>
            );
          })}

          {/* Placeholder slots if fewer than 7 entries */}
          {Array.from({ length: Math.max(0, 7 - displayEntries.length) }).map(
            (_, i) => (
              <div
                key={`empty-${i}`}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="rounded-2xl"
                  style={{
                    width: 34,
                    height: 34,
                    background: "rgba(185,175,160,0.07)",
                    border: "1px dashed rgba(185,175,160,0.2)",
                  }}
                />
                <p
                  style={{ fontSize: "0.6rem" }}
                  className="text-stone opacity-0"
                >
                  —
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Ground */}
      <div
        className="h-3"
        style={{
          background:
            "linear-gradient(to top, rgba(185,175,160,0.12), transparent)",
        }}
      />
    </div>
  );
}
