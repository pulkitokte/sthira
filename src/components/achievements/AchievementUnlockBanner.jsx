import { useEffect } from "react";
import { Check, X } from "lucide-react";

const AUTO_DISMISS_MS = 4000;

export default function AchievementUnlockBanner({ achievement, onDismiss }) {
  const Icon = achievement.icon;

  useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [achievement.id, onDismiss]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Milestone reached: ${achievement.title}`}
      className="flex items-center gap-3 bg-sage/15 px-5 py-3"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss">
        <Icon
          size={16}
          className="text-canvas"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </span>

      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-ink">
          {achievement.title}
        </p>
        <p className="text-xs text-stone">{achievement.description}</p>
      </div>

      <span className="mr-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-moss/30">
        <Check
          size={10}
          className="text-moss"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </span>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 rounded-full p-1 text-stone transition-colors hover:text-ink"
      >
        <X size={14} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
