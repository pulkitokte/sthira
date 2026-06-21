import ActivityTypeBadge from "./ActivityTypeBadge";

export default function ActivityHistoryItem({ activity }) {
  const time = new Date(activity.timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5">
      <div className="min-w-0">
        <p className="truncate font-display text-sm font-semibold text-ink">
          {activity.title}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <ActivityTypeBadge type={activity.type} />
          <span className="text-xs text-stone">{time}</span>
        </div>
      </div>
      <span className="shrink-0 rounded-full bg-canvas px-3 py-1 text-xs font-medium text-stone">
        {activity.duration} min
      </span>
    </div>
  );
}
