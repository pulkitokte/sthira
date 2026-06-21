import { Droplet } from "lucide-react";
import EmptyState from "../common/EmptyState";
import HydrationHistoryItem from "./HydrationHistoryItem";

export default function HydrationHistoryList({ entries, emptyMessage }) {
  if (entries.length === 0) {
    return (
      <EmptyState
        icon={Droplet}
        title="No hydration logged yet"
        description={emptyMessage}
      />
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
