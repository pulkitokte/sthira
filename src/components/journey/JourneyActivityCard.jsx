import { useNavigate } from "react-router-dom";
import { Sunrise, Wind, Eye, Droplet, Leaf, Check } from "lucide-react";

const TYPE_META = {
  routine: { icon: Sunrise, iconColor: "text-moss", iconBg: "bg-sage/15" },
  recovery: { icon: Wind, iconColor: "text-dew", iconBg: "bg-dew/15" },
  eye: { icon: Eye, iconColor: "text-dew", iconBg: "bg-dew/15" },
  hydration: { icon: Droplet, iconColor: "text-dew", iconBg: "bg-dew/15" },
  wellness: { icon: Leaf, iconColor: "text-moss", iconBg: "bg-sage/15" },
};

export default function JourneyActivityCard({
  activity,
  isComplete,
  onMarkComplete,
}) {
  const navigate = useNavigate();
  const meta = TYPE_META[activity.type] ?? TYPE_META.routine;
  const Icon = meta.icon;

  const handleNavigate = () => {
    if (activity.navigation?.path) {
      navigate(activity.navigation.path, {
        state: activity.navigation.state ?? undefined,
      });
    }
  };

  const handleCheck = (e) => {
    // Prevent the card's click handler from also firing
    e.stopPropagation();
    if (!isComplete) onMarkComplete(activity.id);
  };

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition-colors ${
        isComplete ? "border-sage/20 bg-sage/5" : "border-border bg-surface"
      }`}
    >
      {/* Type icon */}
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          isComplete ? "bg-sage/15" : meta.iconBg
        }`}
        aria-hidden="true"
      >
        <Icon
          size={18}
          className={isComplete ? "text-moss/60" : meta.iconColor}
          strokeWidth={1.8}
        />
      </span>

      {/* Text — tapping navigates to the activity */}
      <button
        type="button"
        onClick={handleNavigate}
        aria-label={`Start ${activity.title}`}
        className="flex flex-1 flex-col text-left"
      >
        <span
          className={`font-display text-sm font-semibold leading-snug ${
            isComplete
              ? "text-stone line-through decoration-stone/40"
              : "text-ink"
          }`}
        >
          {activity.title}
        </span>
        <span className="mt-0.5 text-xs text-stone">{activity.subtitle}</span>
      </button>

      {/* Check button */}
      <button
        type="button"
        onClick={handleCheck}
        aria-label={
          isComplete
            ? `${activity.title} completed`
            : `Mark ${activity.title} as done`
        }
        aria-pressed={isComplete}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          isComplete
            ? "border-moss bg-moss text-canvas"
            : "border-border bg-transparent text-transparent hover:border-sage"
        }`}
      >
        <Check size={13} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  );
}
