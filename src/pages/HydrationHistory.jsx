import PageContainer from "../components/layout/PageContainer";
import HydrationHistoryList from "../components/hydration/HydrationHistoryList";
import { useHydration } from "../context/HydrationContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function HydrationHistory() {
  const { dailyTotals } = useHydration();
  useDocumentTitle("Hydration History");

  return (
    <PageContainer className="flex flex-col gap-4">
      <p className="leading-relaxed text-stone">
        A quiet record of your water intake, day by day.
      </p>
      <HydrationHistoryList
        entries={dailyTotals}
        emptyMessage="Once you log some water, it'll appear here."
      />
    </PageContainer>
  );
}
