// src/components/common/HeaderActionButton.jsx
// Shared "pill" action button used in FeatureHeader's rightAction slot
// (e.g. "+ New", "+ Add"). Extracted because this exact markup was
// duplicated verbatim across Letters, Gratitude Garden (x2), Mood
// Journal, and Evening Reflection. Uses the shared --accent-soft token
// instead of a hardcoded hex, same visual result as before.

export default function HeaderActionButton({
  icon: Icon,
  label,
  onClick,
  ariaLabel,
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || label}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-sm font-semibold text-canvas transition-all duration-200 active:scale-[0.98] hover:opacity-90 min-h-[44px]"
      style={{ background: "var(--accent-soft)" }}
    >
      {Icon && <Icon size={15} strokeWidth={2} />}
      {label}
    </button>
  );
}
