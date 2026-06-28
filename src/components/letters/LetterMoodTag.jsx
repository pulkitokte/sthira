// src/components/letters/LetterMoodTag.jsx
// Reusable mood tag pill for letters.

import { getLetterMoodById } from "../../data/lettersData";

export default function LetterMoodTag({ moodId, size = "sm" }) {
  const mood = getLetterMoodById(moodId);
  if (!mood) return null;

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
