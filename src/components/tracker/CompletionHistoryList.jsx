import HistoryItem from "./HistoryItem";

export default function CompletionHistoryList({ completions, emptyMessage }) {
  if (completions.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-6 text-center">
        <p className="text-sm leading-relaxed text-stone">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {completions.map((completion) => (
        <HistoryItem key={completion.id} completion={completion} />
      ))}
    </div>
  );
}
