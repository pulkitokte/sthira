import { formatDisplayDate } from "../../utils/date";

export default function HydrationHistoryItem({ entry }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3.5">
      <p className="font-display text-sm font-semibold text-ink">
        {formatDisplayDate(entry.dateKey)}
      </p>
      <span className="rounded-full bg-canvas px-3 py-1 text-xs font-medium text-stone">
        {entry.total} ml
      </span>
    </div>
  );
}
