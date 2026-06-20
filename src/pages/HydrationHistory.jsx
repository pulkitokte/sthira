import PageContainer from "../components/layout/PageContainer";
import HydrationHistoryList from "../components/hydration/HydrationHistoryList";
import { useHydration } from "../context/HydrationContext";

export default function HydrationHistory() {
  const { dailyTotals } = useHydration();

  return (
    <PageContainer className="flex flex-col gap-4">
      <p className="leading-relaxed text-stone">
        A quiet record of your water intake, day by day.
      </p>
      <HydrationHistoryList
        entries={dailyTotals}
        emptyMessage="No hydration logged yet. Once you log some water, it'll show up here."
      />
    </PageContainer>
  );
}
