export default function TodayLogList({ logs }) {
  if (logs.length === 0) {
    return (
      <p className="px-1 py-2 text-sm text-stone">No water logged yet today.</p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {logs.map((log) => (
        <div
          key={log.id}
          className="flex items-center justify-between rounded-2xl bg-canvas px-4 py-3"
        >
          <span className="text-sm text-stone">
            {new Date(log.timestamp).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
          <span className="font-display text-sm font-semibold text-ink">
            {log.amount} ml
          </span>
        </div>
      ))}
    </div>
  );
}
