import HydrationHistoryItem from "./HydrationHistoryItem";

export default function HydrationHistoryList({ entries, emptyMessage }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-6 text-center">
        <p className="text-sm leading-relaxed text-stone">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {entries.map((entry) => (
        <HydrationHistoryItem key={entry.dateKey} entry={entry} />
      ))}
    </div>
  );
}
