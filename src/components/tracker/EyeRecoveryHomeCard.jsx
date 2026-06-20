import { Eye, ChevronRight } from "lucide-react";

export default function EyeRecoveryHomeCard({ session, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="flex w-full items-center gap-3 rounded-3xl border border-border bg-surface px-5 py-4 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dew/15">
        <Eye size={18} className="text-dew" strokeWidth={1.8} />
      </span>
      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-ink">
          {session.title}
        </p>
        <p className="mt-0.5 text-xs text-stone">
          {session.duration} min eye recovery
        </p>
      </div>
      <ChevronRight size={16} className="shrink-0 text-stone/60" />
    </button>
  );
}
