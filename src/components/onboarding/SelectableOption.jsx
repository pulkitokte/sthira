export default function SelectableOption({
  label,
  blurb,
  icon: Icon,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition-colors duration-150 ${
        selected
          ? "border-moss bg-moss/8"
          : "border-border bg-surface hover:border-sage/60"
      }`}
    >
      {Icon && (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            selected ? "bg-moss text-canvas" : "bg-sage/15 text-moss"
          }`}
        >
          <Icon size={18} strokeWidth={1.8} />
        </span>
      )}
      <span className="flex-1">
        <span className="block font-display text-sm font-semibold text-ink">
          {label}
        </span>
        {blurb && (
          <span className="mt-0.5 block text-xs text-stone">{blurb}</span>
        )}
      </span>
      <span
        className={`h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${
          selected ? "border-moss bg-moss" : "border-border"
        }`}
      >
        {selected && (
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-full w-full p-0.5 text-canvas"
          >
            <path
              d="M5 10l3 3 7-7"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
