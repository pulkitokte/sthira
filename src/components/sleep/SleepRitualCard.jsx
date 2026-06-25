import { ChevronRight, Clock, Moon } from "lucide-react";

export default function SleepRitualCard({ ritual, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(ritual)}
      className="flex w-full flex-col gap-3 rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-semibold text-ink">
            {ritual.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-stone">
            {ritual.description}
          </p>
        </div>
        <ChevronRight
          size={18}
          className="mt-1 shrink-0 text-stone/60"
          aria-hidden="true"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1 text-xs font-medium text-stone">
          <Clock size={12} strokeWidth={2} aria-hidden="true" />
          {ritual.duration} min
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1 text-xs font-medium text-stone">
          <Moon size={12} strokeWidth={2} aria-hidden="true" />
          {ritual.steps.length} step{ritual.steps.length !== 1 ? "s" : ""}
        </span>
      </div>
    </button>
  );
}
