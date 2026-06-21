import { formatDisplayDate } from "../../utils/date";
import ActivityHistoryItem from "./ActivityHistoryItem";

export default function HistoryDateGroup({ group }) {
  return (
    <div>
      <p className="mb-2.5 px-1 font-display text-sm font-semibold text-stone">
        {formatDisplayDate(group.dateKey)}
      </p>
      <div className="flex flex-col gap-2.5">
        {group.items.map((activity) => (
          <ActivityHistoryItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
