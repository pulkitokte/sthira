// src/components/journal/MoodBadge.jsx
// Reusable mood badge — used in cards, detail view, and editor.

import { getMoodById } from "../../data/journalPrompts";

export default function MoodBadge({ moodId, size = "sm" }) {
  const mood = getMoodById(moodId);

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3.5 py-1.5",
  };

  return (
    <span
      className={`inline-block rounded-full font-display font-medium tracking-wide ${sizeClasses[size]}`}
      style={{
        background: mood.bg,
        border: `1px solid ${mood.border}`,
        color: mood.color,
      }}
    >
      {mood.label}
    </span>
  );
}
