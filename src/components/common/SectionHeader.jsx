import { ChevronRight } from "lucide-react";

export default function SectionHeader({
  title,
  actionLabel,
  onAction,
  accent = "moss",
}) {
  const hoverClass = accent === "dew" ? "hover:text-dew" : "hover:text-moss";

  return (
    <div className="mb-4 flex items-center justify-between px-1">
      <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className={`flex items-center gap-1 text-xs font-medium text-stone transition-colors ${hoverClass}`}
        >
          {actionLabel} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
