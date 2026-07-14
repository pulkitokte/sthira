// src/components/morningFlow/MorningFlowHero.jsx
// Morning Flow's greeting hero card.
// Architecture-only phase: onStart is wired but intentionally has no
// destination yet — future phases will connect this to the real
// workout flow.

import { Sunrise, ArrowRight } from "lucide-react";

const TAGS = ["30 Minutes", "No Equipment", "Beginner Friendly"];

export default function MorningFlowHero({ onStart }) {
  return (
    <section
      className="rounded-4xl p-8 shadow-soft"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,252,248,1) 0%, rgba(248,244,236,1) 100%)",
        border: "1px solid rgba(185,175,160,0.22)",
      }}
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: "rgba(134,159,138,0.14)",
          border: "1px solid rgba(134,159,138,0.25)",
        }}
      >
        <Sunrise size={20} strokeWidth={1.8} className="text-sage" />
      </div>

      <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-sage">
        Good Morning
      </p>
      <h1 className="mt-2 font-display text-[26px] font-semibold leading-snug text-ink">
        Wake up your body before your day begins.
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-stone"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={onStart}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors duration-200 hover:bg-moss-dark"
      >
        Start Today's Flow
        <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
      </button>

      <p className="mt-4 text-sm leading-relaxed text-stone">
        A calm full-body routine designed for students and people who spend long
        hours sitting.
      </p>
    </section>
  );
}
