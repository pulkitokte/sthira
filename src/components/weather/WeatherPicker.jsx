// src/components/weather/WeatherPicker.jsx
// Weather selection grid — large, touch-friendly, expressive.

import { WEATHER_TYPES } from "../../data/emotionalWeatherData";

export default function WeatherPicker({ selected, onChange }) {
  return (
    <div className="space-y-3">
      <p className="font-display text-sm font-medium text-ink">
        What is the weather inside today?
      </p>
      <div className="grid grid-cols-4 gap-2">
        {WEATHER_TYPES.map((weather) => {
          const isSelected = selected === weather.id;
          return (
            <button
              key={weather.id}
              onClick={() => onChange(isSelected ? null : weather.id)}
              className="flex flex-col items-center gap-1.5 rounded-2xl py-3 px-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                background: isSelected
                  ? weather.bgColor
                  : "rgba(185,175,160,0.06)",
                border: `1.5px solid ${isSelected ? weather.borderColor : "rgba(185,175,160,0.15)"}`,
                transform: isSelected ? "scale(1.04)" : "scale(1)",
                boxShadow: isSelected
                  ? `0 2px 12px ${weather.accentColor}40`
                  : "none",
              }}
              aria-pressed={isSelected}
              aria-label={`${weather.label} — ${weather.description}`}
            >
              <span className="text-2xl leading-none">{weather.emoji}</span>
              <span
                className="text-xs font-display font-medium text-center leading-tight"
                style={{ color: isSelected ? weather.textColor : "#8a8070" }}
              >
                {weather.label}
              </span>
            </button>
          );
        })}
      </div>
      {selected && (
        <p className="text-xs text-stone font-light italic text-center opacity-70 transition-all duration-300">
          {WEATHER_TYPES.find((w) => w.id === selected)?.description ?? ""}
        </p>
      )}
    </div>
  );
}
