import { X } from "lucide-react";

export default function HelperHint({
  icon: Icon,
  message,
  onDismiss,
  accent = "moss",
}) {
  const containerClass =
    accent === "dew" ? "border-dew/30 bg-dew/10" : "border-sage/30 bg-sage/10";
  const iconColor = accent === "dew" ? "text-dew" : "text-moss";

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border px-4 py-3 ${containerClass}`}
    >
      {Icon && (
        <Icon
          size={16}
          className={`mt-0.5 shrink-0 ${iconColor}`}
          strokeWidth={1.8}
        />
      )}
      <p className="flex-1 text-sm leading-relaxed text-ink">{message}</p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss hint"
        className="shrink-0 rounded-full p-1 text-stone transition-colors hover:text-ink"
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
}
