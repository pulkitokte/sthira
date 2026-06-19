import { CheckCircle2, Circle } from "lucide-react";

export default function TodaysProgressCard({
  hasCompletedToday,
  totalCompletedToday,
}) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-border bg-surface p-5 shadow-soft">
      {hasCompletedToday ? (
        <CheckCircle2
          size={22}
          className="shrink-0 text-moss"
          strokeWidth={1.8}
        />
      ) : (
        <Circle
          size={22}
          className="shrink-0 text-stone/40"
          strokeWidth={1.8}
        />
      )}
      <div>
        <p className="font-display text-sm font-semibold text-ink">
          {hasCompletedToday
            ? "Morning routine completed"
            : "Morning routine not yet done"}
        </p>
        <p className="mt-0.5 text-xs text-stone">
          {totalCompletedToday > 0
            ? `${totalCompletedToday} routine${totalCompletedToday > 1 ? "s" : ""} completed today`
            : "Nothing logged yet today — no rush."}
        </p>
      </div>
    </div>
  );
}
