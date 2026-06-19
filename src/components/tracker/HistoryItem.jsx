import { formatDisplayDate } from "../../utils/date";

export default function HistoryItem({ completion }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3.5">
      <div>
        <p className="font-display text-sm font-semibold text-ink">
          {completion.routineTitle}
        </p>
        <p className="mt-0.5 text-xs text-stone">
          {formatDisplayDate(completion.dateKey)}
        </p>
      </div>
      <span className="rounded-full bg-canvas px-3 py-1 text-xs font-medium text-stone">
        {completion.duration} min
      </span>
    </div>
  );
}
