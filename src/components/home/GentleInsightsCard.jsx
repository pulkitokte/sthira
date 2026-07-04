// src/components/home/GentleInsightsCard.jsx
// "Gentle Wellness Insights" — warm observational card.
// No charts. No graphs. No percentages. No progress bars.
// Up to 3 gentle observations, each as one paragraph.
// Premium paper aesthetic. Opacity-only fade on mount.

import { useEffect, useRef } from "react";

export default function GentleInsightsCard({ insights }) {
  const ref = useRef(null);

  // Very slow opacity-only fade on mount — no movement, no bounce
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.opacity = "0";
    ref.current.style.transition = "opacity 0.8s ease";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (ref.current) ref.current.style.opacity = "1";
      });
    });
  }, []);

  // Render nothing if no insights are eligible yet
  if (!insights || insights.length === 0) return null;

  return (
    <section
      ref={ref}
      aria-label="Gentle wellness insights"
      className="relative overflow-hidden rounded-3xl"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,253,248,1) 0%, rgba(250,246,238,1) 100%)",
        border: "1px solid rgba(185,175,160,0.2)",
        boxShadow: "0 2px 18px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
        padding: "1.7rem 1.8rem 1.5rem",
      }}
    >
      {/* Decorative soft orb — top right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(134,159,138,0.06) 0%, transparent 68%)",
          transform: "translate(38%, -38%)",
        }}
      />

      {/* Decorative soft orb — bottom left */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(185,175,160,0.05) 0%, transparent 65%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="relative space-y-5">
        {/* Section header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-stone opacity-65">
              Gentle Insights
            </h2>
            <p className="text-xs text-stone font-light opacity-50">
              Quiet patterns, noticed with care.
            </p>
          </div>
          {/* Tiny leaf illustration — decorative text, aria-hidden */}
          <span
            className="text-lg leading-none opacity-25 shrink-0 mt-0.5"
            aria-hidden="true"
          >
            🌿
          </span>
        </div>

        {/* Soft divider */}
        <div
          className="h-px"
          style={{ background: "rgba(185,175,160,0.16)" }}
          aria-hidden="true"
        />

        {/* Insight paragraphs */}
        <div className="space-y-4">
          {insights.map((insight, i) => (
            <p
              key={`${insight.category}-${i}`}
              className="font-display font-light text-ink leading-[1.78]"
              style={{
                fontSize: "0.93rem",
                opacity: i === 0 ? 0.9 : i === 1 ? 0.78 : 0.65,
              }}
            >
              {insight.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
