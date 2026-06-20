import { Leaf, ChevronRight } from "lucide-react";
import { getDimensionOptionLabel } from "../../utils/wellness";

export default function WellnessHomeCard({ todayEntry, onSelect }) {
  const hasEntry = Boolean(todayEntry?.mood && todayEntry?.energy);

  return (
    <button
      onClick={onSelect}
      className="flex w-full items-center gap-3 rounded-3xl border border-border bg-surface px-5 py-4 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/15">
        <Leaf size={18} className="text-moss" strokeWidth={1.8} />
      </span>
      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-ink">
          {hasEntry ? "Today's check-in" : "How are you feeling today?"}
        </p>
        <p className="mt-0.5 text-xs text-stone">
          {hasEntry
            ? `Mood: ${getDimensionOptionLabel("mood", todayEntry.mood)} · Energy: ${getDimensionOptionLabel("energy", todayEntry.energy)}`
            : "Take a moment to check in"}
        </p>
      </div>
      <ChevronRight size={16} className="shrink-0 text-stone/60" />
    </button>
  );
}
