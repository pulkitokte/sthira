// src/components/morningFlow/ExerciseCard.jsx
// Premium, static exercise display card used on the Morning Flow list
// page. Polish batch: refined spacing/typography/icon alignment to
// match the in-player exercise screen's hierarchy. Content unchanged.

import { Clock, Target, Sparkles, Lightbulb } from "lucide-react";

export default function ExerciseCard({ exercise, categoryIcon: Icon }) {
  return (
    <div
      className="rounded-3xl p-5 space-y-4"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,252,248,1) 0%, rgba(250,246,240,1) 100%)",
        border: "1px solid rgba(185,175,160,0.22)",
        boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
      }}
    >
      {/* Illustration placeholder + title row */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: "rgba(134,159,138,0.1)",
            border: "1px solid rgba(134,159,138,0.2)",
          }}
          aria-hidden="true"
        >
          {Icon && <Icon size={22} strokeWidth={1.5} className="text-sage" />}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <p className="font-display text-base font-medium text-ink leading-snug">
            {exercise.title}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-dew/15 px-2.5 py-1 text-xs font-medium text-dew">
              {exercise.difficulty}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-stone">
              <Clock size={11} strokeWidth={2} />
              {exercise.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-stone">
        {exercise.description}
      </p>

      {/* Target muscles */}
      {exercise.targetMuscles?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Target
              size={12}
              strokeWidth={2}
              className="text-stone opacity-60"
            />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-stone opacity-70">
              Muscles Involved
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {exercise.targetMuscles.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full px-2.5 py-1 text-xs font-medium text-ink"
                style={{ background: "rgba(185,175,160,0.1)" }}
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      {exercise.benefits?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Sparkles
              size={12}
              strokeWidth={2}
              className="text-stone opacity-60"
            />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-stone opacity-70">
              Benefits
            </p>
          </div>
          <ul className="space-y-1.5">
            {exercise.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2 text-sm text-stone"
              >
                <span
                  className="mt-1.5 w-1 h-1 rounded-full bg-sage shrink-0"
                  aria-hidden="true"
                />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preparation tips */}
      {exercise.tips?.length > 0 && (
        <div
          className="rounded-2xl p-4 space-y-2"
          style={{
            background: "rgba(185,175,160,0.06)",
            border: "1px dashed rgba(185,175,160,0.25)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <Lightbulb
              size={12}
              strokeWidth={2}
              className="text-stone opacity-60"
            />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-stone opacity-70">
              Preparation Tips
            </p>
          </div>
          <ul className="space-y-1.5">
            {exercise.tips.map((tip) => (
              <li key={tip} className="text-xs text-stone leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
