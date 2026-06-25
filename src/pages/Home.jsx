import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import SthiraLogo from "../components/common/SthiraLogo";
import HelperHint from "../components/common/HelperHint";
import RecommendedCard from "../components/home/RecommendedCard";
import DailyRitualCard from "../components/home/DailyRitualCard";
import TodaysJourneySection from "../components/journey/TodaysJourneySection";
import TodaysProgressCard from "../components/tracker/TodaysProgressCard";
import ConsistencyCard from "../components/tracker/ConsistencyCard";
import RecentAchievementCard from "../components/tracker/RecentAchievementCard";
import StudyBreakCard from "../components/tracker/StudyBreakCard";
import FocusHomeCard from "../components/tracker/FocusHomeCard";
import HydrationSummaryCard from "../components/tracker/HydrationSummaryCard";
import EyeRecoveryHomeCard from "../components/tracker/EyeRecoveryHomeCard";
import WellnessHomeCard from "../components/tracker/WellnessHomeCard";
import { useProgress } from "../context/ProgressContext";
import { useHydration } from "../context/HydrationContext";
import { useWellness } from "../context/WellnessContext";
import { useOnboarding } from "../context/OnboardingContext";
import { useAchievements } from "../context/AchievementsContext";
import { useDismissibleHint } from "../hooks/useDismissibleHint";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { getRecommendedSession } from "../utils/recovery";
import { getRecommendedEyeSession } from "../utils/eyeRecovery";
import {
  getPersonalizedGreeting,
  getContextualSubheading,
  getHomeRecommendation,
} from "../utils/personalization";
import { generateDailyJourney } from "../utils/journeyGenerator";
import { getDailyRitual } from "../utils/ritualEngine";
import { HINT_IDS } from "../constants/hints";
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
  const { data: onboardingData } = useOnboarding();
  const { recentAchievement, recentAchievementUnlockedAt } = useAchievements();
  const recommendedSession = getRecommendedSession();
  const recommendedEyeSession = getRecommendedEyeSession();
  const homeHint = useDismissibleHint(HINT_IDS.HOME_FIRST_ROUTINE);

  useDocumentTitle("Home");

  const greeting = getPersonalizedGreeting(onboardingData.firstName);
  const subheading = getContextualSubheading();
  const recommendation = getHomeRecommendation(onboardingData, todayEntry);

  const journeyActivities = useMemo(
    () => generateDailyJourney(onboardingData, todayEntry, percentage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onboardingData.studyHours,
      onboardingData.activityLevel,
      onboardingData.primaryGoal,
      onboardingData.routineDuration,
      todayEntry?.energy,
      todayEntry?.focus,
      todayEntry?.stress,
      todayEntry?.mood,
      percentage,
    ],
  );

  const ritual = useMemo(
    () => getDailyRitual(onboardingData, todayEntry),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onboardingData.studyHours,
      onboardingData.activityLevel,
      todayEntry?.stress,
      todayEntry?.energy,
    ],
  );

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
      {/* Hero */}
      <section className="rounded-4xl bg-surface p-8 shadow-soft">
        <div className="mb-5">
          <SthiraLogo size={48} iconSize={22} />
        </div>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-sage">
          {greeting}
        </p>
        <h1 className="mt-2 font-display text-[28px] font-semibold leading-snug text-ink">
          Begin with a little movement
        </h1>
        <p className="mt-3 leading-relaxed text-stone">{subheading}</p>
        <button
          onClick={() => navigate(PATHS.LIBRARY)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors duration-200 hover:bg-moss-dark"
        >
          Start Morning Routine
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
        {onboardingData.routineDuration && (
          <p className="mt-3 text-center text-xs text-stone">
            Tuned to your {onboardingData.routineDuration}-minute preference
          </p>
        )}
      </section>

      {/* Today's Journey */}
      <TodaysJourneySection activities={journeyActivities} />

      {/* Today's Ritual */}
      <DailyRitualCard ritual={ritual} />

      {/* Personalized recommendation */}
      <RecommendedCard recommendation={recommendation} />

      {/* First-time hint */}
      {homeHint.isVisible && (
        <HelperHint
          icon={Sparkles}
          message="New here? Start with a short morning routine — even five minutes counts."
          onDismiss={homeHint.dismiss}
        />
      )}

      {/* Today's Progress */}
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
          {recentAchievement && (
            <RecentAchievementCard
              achievement={recentAchievement}
              unlockedAt={recentAchievementUnlockedAt}
            />
          )}
        </div>
      </section>

      {/* Study Break */}
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

      {/* Focus Sessions */}
      <section>
        <SectionHeader
          title="Focus"
          actionLabel="See all"
          onAction={() => navigate(PATHS.FOCUS_SESSIONS)}
        />
        <FocusHomeCard onSelect={() => navigate(PATHS.FOCUS_SESSIONS)} />
      </section>

      {/* Hydration */}
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

      {/* Eye Recovery */}
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

      {/* Wellness */}
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
