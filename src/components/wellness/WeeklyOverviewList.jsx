import { formatWeekdayLabel } from "../../utils/date";
import { getDimensionOptionLabel } from "../../utils/wellness";

export default function WeeklyOverviewList({ entries }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-6 text-center">
        <p className="text-sm leading-relaxed text-stone">
          No check-ins yet this week. Your daily reflections will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {entries.map((entry) => (
        <div
          key={entry.dateKey}
          className="rounded-2xl border border-border bg-surface px-4 py-3.5"
        >
          <p className="font-display text-sm font-semibold text-ink">
            {formatWeekdayLabel(entry.dateKey)}
          </p>
          <p className="mt-1 text-xs text-stone">
            Energy: {getDimensionOptionLabel("energy", entry.energy)}
          </p>
          <p className="text-xs text-stone">
            Mood: {getDimensionOptionLabel("mood", entry.mood)}
          </p>
        </div>
      ))}
    </div>
  );
}
