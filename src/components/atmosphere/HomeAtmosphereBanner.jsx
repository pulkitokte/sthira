// src/components/atmosphere/HomeAtmosphereBanner.jsx
// The "Today's Atmosphere" section rendered directly below the hero on Home.
// Extremely calm and subtle. No CTAs that navigate away.
// Purely reflective — "Sit with this moment" is a gentle invitation, not a button.

import AmbientOrb from "./AmbientOrb";
import AmbientQuote from "./AmbientQuote";

export default function HomeAtmosphereBanner({ atmosphere }) {
  if (!atmosphere) return null;

  const {
    phaseLabel,
    seasonLabel,
    seasonEmoji,
    preset,
    weatherFeelingPhrase,
    quote,
  } = atmosphere;

  return (
    <section
      className="relative overflow-hidden rounded-3xl"
      aria-label="Today's atmosphere"
      style={{
        background: preset.gradient,
        border: `1px solid ${preset.pillBorder}`,
        padding: "1.5rem",
      }}
    >
      {/* Ambient orbs — decorative only */}
      <AmbientOrb preset={preset} />

      {/* Content — above orbs */}
      <div className="relative z-10 space-y-4">
        {/* Phase + season pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.13em] px-2.5 py-1 rounded-full"
            style={{
              background: preset.pillBg,
              border: `1px solid ${preset.pillBorder}`,
              color: preset.accentColor,
            }}
          >
            {phaseLabel}
          </span>
          <span
            className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.13em] px-2.5 py-1 rounded-full"
            style={{
              background: preset.pillBg,
              border: `1px solid ${preset.pillBorder}`,
              color: preset.accentColor,
            }}
          >
            {seasonEmoji} {seasonLabel}
          </span>
        </div>

        {/* Emotional weather influence — shown only if today's weather exists */}
        {weatherFeelingPhrase && (
          <p
            className="text-xs font-light text-stone italic"
            style={{ opacity: 0.7 }}
          >
            {weatherFeelingPhrase}
          </p>
        )}

        {/* Atmospheric quote */}
        <AmbientQuote quote={quote} accentColor={preset.accentColor} />

        {/* Gentle reflective CTA — not a navigation link */}
        <p
          className="text-xs font-display font-light text-stone text-right"
          style={{ opacity: 0.45, letterSpacing: "0.04em" }}
        >
          Sit with this moment.
        </p>
      </div>
    </section>
  );
}
