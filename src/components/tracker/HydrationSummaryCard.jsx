import { Droplet, ChevronRight } from "lucide-react";

export default function HydrationSummaryCard({
  todayTotal,
  goal,
  remaining,
  percentage,
  onSelect,
}) {
  return (
    <button
      onClick={onSelect}
      className="flex w-full flex-col gap-3 rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dew/15">
            <Droplet size={18} className="text-dew" strokeWidth={1.8} />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-ink">
              {todayTotal} / {goal} ml
            </p>
            <p className="text-xs text-stone">
              {remaining > 0
                ? `${remaining} ml left today`
                : "Goal reached today"}
            </p>
          </div>
        </div>
        <ChevronRight size={18} className="shrink-0 text-stone/60" />
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas">
        <div
          className="h-full rounded-full bg-dew transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </button>
  );
}
