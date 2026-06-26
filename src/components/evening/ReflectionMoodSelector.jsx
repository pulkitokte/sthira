// src/components/evening/ReflectionMoodSelector.jsx
// Optional mood selector for the Evening Reflection form.

import { REFLECTION_MOODS } from "../../data/eveningReflectionData";

export default function ReflectionMoodSelector({ selected, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-medium text-ink">
          How are you ending the day?
        </p>
        <span className="text-xs text-stone font-light">optional</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {REFLECTION_MOODS.map((mood) => {
          const isSelected = selected === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => onChange(isSelected ? null : mood.id)}
              className="rounded-full font-display text-xs font-medium px-3.5 py-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                background: isSelected ? mood.bg : "transparent",
                border: `1.5px solid ${isSelected ? mood.border : "rgba(160,150,130,0.25)"}`,
                color: isSelected ? mood.color : "#8a8070",
                transform: isSelected ? "scale(1.04)" : "scale(1)",
              }}
              aria-pressed={isSelected}
            >
              {mood.label}
            </button>
          );
        })}
      </div>
      {selected && (
        <button
          onClick={() => onChange(null)}
          className="text-xs text-stone font-light hover:text-ink transition-colors"
        >
          Clear selection
        </button>
      )}
    </div>
  );
}
