import { useNavigate } from "react-router-dom";
import { Sunrise } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import TodaysProgressCard from "../components/tracker/TodaysProgressCard";
import ConsistencyCard from "../components/tracker/ConsistencyCard";
import StudyBreakCard from "../components/tracker/StudyBreakCard";
import HydrationSummaryCard from "../components/tracker/HydrationSummaryCard";
import EyeRecoveryHomeCard from "../components/tracker/EyeRecoveryHomeCard";
import WellnessHomeCard from "../components/tracker/WellnessHomeCard";
import { useProgress } from "../context/ProgressContext";
import { useHydration } from "../context/HydrationContext";
import { useWellness } from "../context/WellnessContext";
import { getRecommendedSession } from "../utils/recovery";
import { getRecommendedEyeSession } from "../utils/eyeRecovery";
import { PATHS } from "../constants/navigation";

export default function Home() {
  const navigate = useNavigate();
  const {
    hasCompletedToday,
    totalCompletedToday,
    currentStreak,
    longestStreak,
  } = useProgress();
  const { todayTotal, goal, remaining, percentage } = useHydration();
  const { todayEntry } = useWellness();
  const recommendedSession = getRecommendedSession();
  const recommendedEyeSession = getRecommendedEyeSession();

  const handleSelectRecommended = () => {
    navigate(PATHS.RECOVERY_PLAYER, {
      state: { sessionId: recommendedSession.id },
    });
  };

  const handleSelectRecommendedEye = () => {
    navigate(PATHS.EYE_RECOVERY_PLAYER, {
      state: { sessionId: recommendedEyeSession.id },
    });
  };

  return (
    <PageContainer className="flex flex-col gap-8">
      <section className="rounded-4xl bg-surface p-8 shadow-soft">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
          <Sunrise size={22} className="text-moss" strokeWidth={1.8} />
        </div>

        <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-sage">
          Good morning
        </p>
        <h1 className="mt-2 font-display text-[28px] font-semibold leading-snug text-ink">
          Begin with a little movement
        </h1>
        <p className="mt-3 leading-relaxed text-stone">
          A few gentle minutes before the day takes over. That's all your
          morning routine needs to be.
        </p>

        <button
          onClick={() => navigate(PATHS.LIBRARY)}
          className="mt-6 w-full rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors duration-200 hover:bg-moss-dark"
        >
          Start Morning Routine
        </button>
      </section>

      <section>
        <SectionHeader
          title="Today's Progress"
          actionLabel="History"
          onAction={() => navigate(PATHS.HISTORY)}
        />
        <div className="flex flex-col gap-3">
          <TodaysProgressCard
            hasCompletedToday={hasCompletedToday}
            totalCompletedToday={totalCompletedToday}
          />
          <ConsistencyCard
            currentStreak={currentStreak}
            longestStreak={longestStreak}
          />
        </div>
      </section>

      <section>
        <SectionHeader
          title="Study Break"
          actionLabel="See all"
          onAction={() => navigate(PATHS.RECOVERY_LIBRARY)}
        />
        <StudyBreakCard
          session={recommendedSession}
          onSelect={handleSelectRecommended}
        />
      </section>

      <section>
        <SectionHeader title="Hydration" />
        <HydrationSummaryCard
          todayTotal={todayTotal}
          goal={goal}
          remaining={remaining}
          percentage={percentage}
          onSelect={() => navigate(PATHS.HYDRATION)}
        />
      </section>

      <section>
        <SectionHeader
          title="Eye Recovery"
          actionLabel="See all"
          onAction={() => navigate(PATHS.EYE_RELAX)}
          accent="dew"
        />
        <EyeRecoveryHomeCard
          session={recommendedEyeSession}
          onSelect={handleSelectRecommendedEye}
        />
      </section>

      <section>
        <SectionHeader title="Wellness" />
        <WellnessHomeCard
          todayEntry={todayEntry}
          onSelect={() => navigate(PATHS.WELLNESS_TRACKER)}
        />
      </section>
    </PageContainer>
  );
}
