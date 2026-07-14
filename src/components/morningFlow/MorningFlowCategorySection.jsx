// src/components/morningFlow/MorningFlowCategorySection.jsx
// One reusable section renderer for Morning Flow's five movement
// categories (Warm Up, Mobility, Strength, Balance, Cool Down).
// Rendered once per category from MORNING_FLOW_CATEGORIES, rather than
// duplicating near-identical JSX five times in the page.

import MorningFlowPlaceholderCard from "./MorningFlowPlaceholderCard";

export default function MorningFlowCategorySection({ category }) {
  const Icon = category.icon;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 px-1">
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

      <div className="flex flex-col gap-2.5">
        <MorningFlowPlaceholderCard />
      </div>
    </section>
  );
}
