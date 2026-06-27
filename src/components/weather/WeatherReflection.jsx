// src/components/weather/WeatherReflection.jsx
// Gentle deterministic reflection based on recent weather patterns.
// Non-diagnostic, poetic, non-clinical.

export default function WeatherReflection({ message }) {
  if (!message) return null;

  return (
    <div
      className="rounded-3xl p-5 space-y-2"
      style={{
        background:
          "linear-gradient(160deg, rgba(134,159,138,0.07) 0%, rgba(185,175,160,0.08) 100%)",
        border: "1px solid rgba(185,175,160,0.2)",
      }}
    >
      <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70">
        A gentle observation
      </p>
      <p className="font-display font-light text-ink leading-relaxed text-sm">
        {message}
      </p>
    </div>
  );
}
