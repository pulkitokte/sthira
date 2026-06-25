import { Moon, ChevronRight } from "lucide-react";

export default function SleepWindDownHomeCard({ onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="flex w-full items-center gap-4 rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay/15">
        <Moon
          size={20}
          className="text-clay"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </span>
      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-ink">
          Sleep Wind-Down
        </p>
        <p className="mt-0.5 text-xs text-stone">
          5 to 20 minutes · gentle evening rituals
        </p>
      </div>
      <ChevronRight
        size={18}
        className="shrink-0 text-stone/60"
        aria-hidden="true"
      />
    </button>
  );
}
