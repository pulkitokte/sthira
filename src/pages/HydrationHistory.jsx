import PageContainer from "../components/layout/PageContainer";
import HydrationHistoryList from "../components/hydration/HydrationHistoryList";
import { useHydration } from "../context/HydrationContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { HYDRATION_HISTORY_LIMIT } from "../constants/hydration";

export default function HydrationHistory() {
  const { dailyTotals } = useHydration();
  useDocumentTitle("Hydration History");

  const visibleEntries = dailyTotals.slice(0, HYDRATION_HISTORY_LIMIT);

  return (
    <PageContainer className="flex flex-col gap-4">
      <p className="leading-relaxed text-stone">
        A quiet record of your water intake, day by day.
      </p>
      <HydrationHistoryList
        entries={visibleEntries}
        emptyMessage="Once you log some water, it'll appear here."
      />
    </PageContainer>
  );
}
