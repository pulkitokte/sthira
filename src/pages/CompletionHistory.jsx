import PageContainer from "../components/layout/PageContainer";
import CompletionHistoryList from "../components/tracker/CompletionHistoryList";
import { useProgress } from "../context/ProgressContext";
import { RECENT_HISTORY_LIMIT } from "../constants/progress";

export default function CompletionHistory() {
  const { recentCompletions } = useProgress();
  const visible = recentCompletions.slice(0, RECENT_HISTORY_LIMIT);

  return (
    <PageContainer className="flex flex-col gap-4">
      <p className="leading-relaxed text-stone">
        A gentle record of the routines you've shown up for — no pressure, just
        a quiet log.
      </p>
      <CompletionHistoryList
        completions={visible}
        emptyMessage="No routines completed yet. Once you finish one, it'll show up here."
      />
    </PageContainer>
  );
}
