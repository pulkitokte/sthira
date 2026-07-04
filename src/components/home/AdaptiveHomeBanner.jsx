// src/components/home/AdaptiveHomeBanner.jsx
// Adaptive Home Companion banner — placed between Hero and Today's Atmosphere.
// Large premium paper card. Warm gradient. Editorial spacing.
// Feels like Apple Health + Calm. Never flashy. Pure CSS fade on mount.

import { useEffect, useRef } from "react";

export default function AdaptiveHomeBanner({ banner }) {
  const ref = useRef(null);

  // Gentle CSS fade-in on mount only — no bouncing, no glowing
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.opacity = "0";
    ref.current.style.transition = "opacity 0.6s ease";
    // rAF ensures the initial opacity:0 is painted before we transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (ref.current) ref.current.style.opacity = "1";
      });
    });
  }, []);

  if (!banner) return null;

  const {
    greeting,
    observation,
    encouragement,
    seasonalSentence,
    weatherSentence,
    hydrationReminder,
    energyNote,
    palette,
  } = banner;

  // Collect body lines — max 4, greeting counts as its own tier
  const bodyLines = [
    observation,
    encouragement,
    seasonalSentence ?? weatherSentence, // prefer seasonal, fall back to weather
    hydrationReminder ?? energyNote, // prefer hydration reminder, fall back to energy note
  ]
    .filter(Boolean)
    .slice(0, 3); // greeting + up to 3 body lines = max 4 paragraphs total

  return (
    <section
      ref={ref}
      aria-label="Adaptive home companion"
      className="relative overflow-hidden rounded-3xl"
      style={{
        background: palette.gradient,
        border: `1px solid ${palette.border}`,
        boxShadow: "0 2px 20px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.03)",
        padding: "1.8rem 1.8rem 1.6rem",
      }}
    >
      {/* ── Decorative orbs — aria-hidden, pointer-events-none ── */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: 300,
          height: 300,
          top: "-15%",
          right: "-10%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${palette.orbA} 0%, transparent 68%)`,
        }}
      />
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: 200,
          height: 200,
          bottom: "-12%",
          left: "-6%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${palette.orbB} 0%, transparent 65%)`,
        }}
      />

      {/* ── Content ── */}
      <div className="relative space-y-4">
        {/* Greeting — the headline */}
        <h2
          className="font-display font-light text-ink leading-snug"
          style={{ fontSize: "1.25rem", letterSpacing: "-0.01em" }}
        >
          {greeting}
        </h2>

        {/* Body lines */}
        <div className="space-y-3">
          {bodyLines.map((line, i) => (
            <p
              key={i}
              className="text-sm text-stone font-light leading-[1.75]"
              style={{ opacity: i === 0 ? 0.88 : i === 1 ? 0.72 : 0.58 }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
