// src/components/wisdom/WisdomCategoryFilter.jsx
// Horizontal scrollable category filter tabs.

import { WISDOM_CATEGORIES } from "../../data/wisdomData";

export default function WisdomCategoryFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {WISDOM_CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="shrink-0 rounded-full font-display text-xs font-medium px-3.5 py-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{
              background: isActive
                ? "rgba(134,159,138,0.15)"
                : "rgba(185,175,160,0.08)",
              border: `1.5px solid ${isActive ? "rgba(134,159,138,0.4)" : "rgba(185,175,160,0.2)"}`,
              color: isActive ? "#4a7055" : "#8a8070",
            }}
            aria-pressed={isActive}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
