// src/components/weather/WeatherEntryCard.jsx
// A single weather entry card for the timeline.

import { getWeatherById } from "../../data/emotionalWeatherData";
import {
  formatWeatherDate,
  formatWeatherTime,
} from "../../utils/emotionalWeather";

export default function WeatherEntryCard({ entry }) {
  const weather = getWeatherById(entry.weather);

  return (
    <div
      className="rounded-2xl p-4 transition-all duration-150"
      style={{
        background: weather.bgColor,
        border: `1px solid ${weather.borderColor}`,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Emoji */}
        <span className="text-2xl leading-none mt-0.5 shrink-0">
          {weather.emoji}
        </span>

        <div className="flex-1 min-w-0">
          {/* Label + date row */}
          <div className="flex items-center justify-between gap-2">
            <p
              className="font-display text-sm font-medium"
              style={{ color: weather.textColor }}
            >
              {weather.label}
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-stone font-light">
                {formatWeatherDate(entry.date)}
              </span>
              {entry.date === new Date().toISOString().slice(0, 10) && (
                <span
                  className="text-xs font-display font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: weather.bgColor,
                    border: `1px solid ${weather.borderColor}`,
                    color: weather.textColor,
                  }}
                >
                  today
                </span>
              )}
            </div>
          </div>

          {/* Note preview */}
          {entry.note && entry.note.trim().length > 0 && (
            <p className="mt-1.5 text-xs text-stone font-light leading-relaxed line-clamp-2">
              {entry.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
