import { CalendarDays } from "lucide-react";
import EmptyState from "../common/EmptyState";
import { formatWeekdayLabel } from "../../utils/date";
import { getDimensionOptionLabel } from "../../utils/wellness";

export default function WeeklyOverviewList({ entries }) {
  if (entries.length === 0) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="No check-ins yet this week"
        description="Your daily reflections will appear here once you check in."
      />
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
