// src/components/garden/GratitudeCategoryBadge.jsx
// Reusable category badge for garden entries.

import { getCategoryById } from "../../data/gratitudeGardenData";

export default function GratitudeCategoryBadge({ categoryId, size = "sm" }) {
  const cat = getCategoryById(categoryId);

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3.5 py-1.5",
  };

  return (
    <span
      className={`inline-block rounded-full font-display font-medium tracking-wide ${sizeClasses[size]}`}
      style={{
        background: cat.bg,
        border: `1px solid ${cat.border}`,
        color: cat.color,
      }}
    >
      {cat.label}
    </span>
  );
}
