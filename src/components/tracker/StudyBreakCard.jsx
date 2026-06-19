import { Wind, ChevronRight } from "lucide-react";

export default function StudyBreakCard({ session, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="flex w-full items-center gap-4 rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-dew/15">
        <Wind size={20} className="text-dew" strokeWidth={1.8} />
      </span>
      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-ink">
          {session.title}
        </p>
        <p className="mt-0.5 text-xs text-stone">
          {session.duration} min · gentle study break
        </p>
      </div>
      <ChevronRight size={18} className="shrink-0 text-stone/60" />
    </button>
  );
}
