import { ChevronRight, Clock } from "lucide-react";

export default function FocusSessionCard({ session, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(session)}
      className="flex w-full items-center gap-4 rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <div className="flex-1">
        <p className="font-display text-base font-semibold text-ink">
          {session.title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-stone">
          {session.description}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="flex items-center gap-1 rounded-full bg-canvas px-3 py-1 text-xs font-medium text-stone">
          <Clock size={12} strokeWidth={2} aria-hidden="true" />
          {session.duration} min
        </span>
        <ChevronRight size={16} className="text-stone/60" aria-hidden="true" />
      </div>
    </button>
  );
}
