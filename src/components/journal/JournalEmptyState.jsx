// src/components/journal/JournalEmptyState.jsx
// Premium empty state for when no journal entries exist yet.

export default function JournalEmptyState({ onNewEntry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 gap-6">
      {/* Gentle decorative element */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background: "rgba(134, 159, 138, 0.1)",
            border: "1.5px solid rgba(134, 159, 138, 0.3)",
          }}
        />
        <div
          className="w-10 h-px"
          style={{ background: "rgba(134, 159, 138, 0.3)" }}
        />
        <div
          className="w-6 h-px"
          style={{ background: "rgba(134, 159, 138, 0.2)" }}
        />
      </div>

      <div className="space-y-2 max-w-xs">
        <p className="font-display text-lg font-light text-ink tracking-tight">
          Your journal is waiting.
        </p>
        <p className="text-sm text-stone font-light leading-relaxed">
          A few words at the end of the day can bring surprising clarity. There
          is no right or wrong way to begin.
        </p>
      </div>

      <button
        onClick={onNewEntry}
        className="px-8 py-3 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-opacity hover:opacity-90"
        style={{ background: "#869F8A" }}
      >
        Write your first entry
      </button>
    </div>
  );
}
