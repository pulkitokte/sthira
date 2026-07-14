// src/components/morningFlow/MorningFlowCategorySection.jsx
// Reusable section renderer for Morning Flow's five movement categories.
// Now renders each category's real exercises via ExerciseCard. Falls back
// to MorningFlowPlaceholderCard if a category has no exercises yet, so
// future categories can be added without this component needing changes.

import ExerciseCard from "./ExerciseCard";
import MorningFlowPlaceholderCard from "./MorningFlowPlaceholderCard";

export default function MorningFlowCategorySection({ category, exercises }) {
  const Icon = category.icon;
  const hasExercises = exercises && exercises.length > 0;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "rgba(134,159,138,0.12)",
              border: "1px solid rgba(134,159,138,0.22)",
            }}
          >
            <Icon size={15} strokeWidth={1.8} className="text-sage" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-ink">
              {category.label}
            </p>
            <p className="text-xs text-stone font-light">{category.tagline}</p>
          </div>
        </div>
        {hasExercises && (
          <span className="text-xs text-stone font-light opacity-60">
            {exercises.length}{" "}
            {exercises.length === 1 ? "exercise" : "exercises"}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {hasExercises ? (
          exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              categoryIcon={category.icon}
            />
          ))
        ) : (
          <MorningFlowPlaceholderCard />
        )}
      </div>
    </section>
  );
}
