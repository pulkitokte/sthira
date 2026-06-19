import { ChevronRight, Clock } from "lucide-react";

export default function RecoveryCard({ session, categoryLabel, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(session)}
      className="flex w-full flex-col gap-3 rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-semibold text-ink">
            {session.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-stone">
            {session.description}
          </p>
        </div>
        <ChevronRight size={18} className="mt-1 shrink-0 text-stone/60" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1 text-xs font-medium text-stone">
          <Clock size={13} strokeWidth={2} />
          {session.duration} min
        </span>
        {categoryLabel && (
          <span className="rounded-full bg-dew/15 px-3 py-1 text-xs font-medium text-dew">
            {categoryLabel}
          </span>
        )}
      </div>
    </button>
  );
}
