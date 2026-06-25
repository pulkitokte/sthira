import { Brain, ChevronRight } from "lucide-react";

export default function FocusHomeCard({ onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="flex w-full items-center gap-4 rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage/15">
        <Brain
          size={20}
          className="text-moss"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </span>
      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-ink">
          Calm Focus Session
        </p>
        <p className="mt-0.5 text-xs text-stone">
          15 to 60 minutes · quiet, intentional work
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
