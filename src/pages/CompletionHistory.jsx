import { CalendarClock } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import EmptyState from "../components/common/EmptyState";
import HistoryDateGroup from "../components/history/HistoryDateGroup";
import { useCombinedHistory } from "../hooks/useCombinedHistory";
import { RECENT_HISTORY_LIMIT } from "../constants/progress";

export default function CompletionHistory() {
  const groups = useCombinedHistory(RECENT_HISTORY_LIMIT);

  return (
    <PageContainer className="flex flex-col gap-8">
      <p className="leading-relaxed text-stone">
        A gentle record of everything you've shown up for — morning routines,
        study breaks, and eye recovery, together in one place.
      </p>

      {groups.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="Nothing logged yet"
          description="Once you complete a routine, a study break, or an eye recovery session, it'll show up here."
        />
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <HistoryDateGroup key={group.dateKey} group={group} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
