import { Droplet } from "lucide-react";

export default function TodayLogList({ logs }) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <Droplet size={20} className="text-stone/50" strokeWidth={1.8} />
        <p className="text-sm text-stone">No water logged yet today.</p>
      </div>
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
