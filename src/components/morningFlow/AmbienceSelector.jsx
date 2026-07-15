// src/components/morningFlow/AmbienceSelector.jsx
// Ambient Experience selector. Polish batch: refined spacing, larger
// touch targets, focus-visible support (inherits global :focus-visible
// styling). No functional change — still UI/architecture only.

import { useState } from "react";
import { MORNING_FLOW_AMBIENCE_OPTIONS } from "../../data/morningFlowAmbience";

export default function AmbienceSelector({ onSelect }) {
  const [selectedId, setSelectedId] = useState(
    MORNING_FLOW_AMBIENCE_OPTIONS[0].id,
  );

  const handleSelect = (id) => {
    setSelectedId(id);
    onSelect?.(id);
  };

  return (
    <div className="space-y-3">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone opacity-70 px-1">
        Ambient Experience
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {MORNING_FLOW_AMBIENCE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              aria-pressed={isSelected}
              aria-label={`${option.label} ambience${isSelected ? ", selected" : ""}`}
              className="min-h-[64px] rounded-2xl p-3.5 text-left transition-all duration-150"
              style={{
                background: isSelected
                  ? "rgba(134,159,138,0.12)"
                  : "rgba(185,175,160,0.06)",
                border: `1.5px solid ${
                  isSelected
                    ? "rgba(134,159,138,0.35)"
                    : "rgba(185,175,160,0.18)"
                }`,
              }}
            >
              <div className="flex items-center gap-2">
                <Icon
                  size={15}
                  strokeWidth={1.8}
                  className={isSelected ? "text-sage" : "text-stone"}
                  aria-hidden="true"
                />
                <span className="font-display text-xs font-medium text-ink">
                  {option.label}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-stone font-light leading-snug">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-stone font-light italic opacity-50 px-1">
        Sound is coming in a future update.
      </p>
    </div>
  );
}
