import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Wind,
  BookHeart,
  Sunset,
  Leaf,
  Feather,
  BookOpen,
  Mail,
  Heart,
  Music,
  MessageCircle,
  Clock,
} from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import SthiraLogo from "../components/common/SthiraLogo";
import HelperHint from "../components/common/HelperHint";
import FeatureSearchBar from "../components/home/FeatureSearchBar";
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
import SleepWindDownHomeCard from "../components/tracker/SleepWindDownHomeCard";
import WellnessHomeCard from "../components/tracker/WellnessHomeCard";
import DailyCheckInCard from "../components/checkin/DailyCheckInCard";
import HomeAtmosphereBanner from "../components/atmosphere/HomeAtmosphereBanner";
import GentleConsistencyCard from "../components/reflection/GentleConsistencyCard";
import NatureSuggestionCard from "../components/soundscapes/NatureSuggestionCard";
import EnergyGuidanceCard from "../components/home/EnergyGuidanceCard";
import DailyCompanionPlanCard from "../components/home/DailyCompanionPlanCard";
import ReflectionJourneyCard from "../components/reflection/ReflectionJourneyCard";
import AdaptiveHomeBanner from "../components/home/AdaptiveHomeBanner";
import GentleInsightsCard from "../components/home/GentleInsightsCard";
import { useProgress } from "../context/ProgressContext";
import { useHydration } from "../context/HydrationContext";
import { useWellness } from "../context/WellnessContext";
import { useOnboarding } from "../context/OnboardingContext";
import { useAchievements } from "../context/AchievementsContext";
import { useDismissibleHint } from "../hooks/useDismissibleHint";
import { useDailyCheckIn } from "../hooks/useDailyCheckIn";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useAtmosphere } from "../hooks/useAtmosphere";
import { getRecommendedSession } from "../utils/recovery";
import { getRecommendedEyeSession } from "../utils/eyeRecovery";
import {
  getPersonalizedGreeting,
  getContextualSubheading,
  getHomeRecommendation,
} from "../utils/personalization";
import { generateDailyJourney } from "../utils/journeyGenerator";
import { getDailyRitual } from "../utils/ritualEngine";
import { getTotalGratitudeCount } from "../utils/gratitudeGarden";
import { getTodayWisdom } from "../utils/dailyWisdom";
import { getTodayEntry } from "../utils/emotionalWeather";
import { getWeatherById as getWeatherDef } from "../data/emotionalWeatherData";
import { getTotalLetterCount } from "../utils/lettersToSelf";
import { loadCalmSoundsPrefs } from "../utils/calmSoundsStorage";
import { getSoundById } from "../data/calmSounds";
import {
  getTodayCompanionMessage,
  getCategoryLabel,
} from "../utils/companionEngine";
import { buildMemoryTimeline } from "../utils/memoryTimeline";
import { buildGentleConsistencySummary } from "../utils/gentleStreaks";
import { getSoundscapeRecommendation } from "../utils/soundscapeRecommendations";
import { buildEnergyGuidance } from "../utils/energyGuidance";
import { buildDailyCompanionPlan } from "../utils/dailyCompanionPlan";
import { buildReflectionJourney } from "../utils/reflectionJourney";
import { buildAdaptiveBanner } from "../utils/adaptiveHomeEngine";
import { buildGentleInsights } from "../utils/gentleInsightsEngine";
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
  const checkIn = useDailyCheckIn();
  const atmosphere = useAtmosphere();
  const gratitudeCount = getTotalGratitudeCount();
  const letterCount = getTotalLetterCount();

  const todayWisdom = useMemo(() => getTodayWisdom(), []);
  const todayWeatherEntry = useMemo(() => getTodayEntry(), []);
  const todayWeatherDef = todayWeatherEntry
    ? getWeatherDef(todayWeatherEntry.weather)
    : null;

  const lastCalmSound = useMemo(() => {
    const prefs = loadCalmSoundsPrefs();
    return prefs.lastSoundId ? getSoundById(prefs.lastSoundId) : null;
  }, []);

  // Context-aware companion — context derived internally, no args needed
  const companionMessage = useMemo(() => getTodayCompanionMessage(), []);

  const companionCategoryLabel = useMemo(
    () =>
      companionMessage ? getCategoryLabel(companionMessage.category) : "Today",
    [companionMessage],
  );

  const memoryCount = useMemo(() => buildMemoryTimeline().length, []);
  const gentleConsistency = useMemo(() => buildGentleConsistencySummary(), []);
  const soundscapeRec = useMemo(() => getSoundscapeRecommendation(), []);
  const energyGuidance = useMemo(() => buildEnergyGuidance(), []);
  const dailyCompanionPlan = useMemo(() => buildDailyCompanionPlan(), []);
  const reflectionJourney = useMemo(() => buildReflectionJourney(), []);
  const adaptiveBanner = useMemo(() => buildAdaptiveBanner(), []);
  const gentleInsights = useMemo(() => buildGentleInsights(), []);

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

      {/* ── Quick Feature Search ── */}
      <FeatureSearchBar />

      {/* ── Adaptive Home Companion ── */}
      <AdaptiveHomeBanner banner={adaptiveBanner} />

      {/* ── Gentle Wellness Insights ── */}
      <GentleInsightsCard insights={gentleInsights} />

      {/* ── Today's Atmosphere ── */}
      <HomeAtmosphereBanner atmosphere={atmosphere} />

      {/* ── Gentle Consistency ── */}
      <GentleConsistencyCard summary={gentleConsistency} />

      {/* ── Nature for This Moment ── */}
      <NatureSuggestionCard recommendation={soundscapeRec} />

      {/* ── Today's Energy ── */}
      <EnergyGuidanceCard guidance={energyGuidance} />

      {/* ── Today's Gentle Journey ── */}
      <DailyCompanionPlanCard plan={dailyCompanionPlan} />

      {/* ── Reflection Journey ── */}
      <ReflectionJourneyCard reflection={reflectionJourney} />

      {/* Daily Check-In */}
      {!checkIn.isCompleted && (
        <section>
          <DailyCheckInCard checkIn={checkIn} />
        </section>
      )}

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

      {/* Emotional Weather */}
      <section>
        <SectionHeader
          title="Emotional Weather"
          actionLabel="Check in"
          onAction={() => navigate(PATHS.EMOTIONAL_WEATHER)}
        />
        <button
          onClick={() => navigate(PATHS.EMOTIONAL_WEATHER)}
          className="w-full rounded-3xl text-left transition-all duration-200 hover:shadow-md overflow-hidden"
          style={
            todayWeatherDef
              ? {
                  background: todayWeatherDef.gradient,
                  border: `1px solid ${todayWeatherDef.borderColor}`,
                }
              : {
                  background:
                    "linear-gradient(160deg, rgba(200,210,230,0.12) 0%, rgba(185,190,200,0.08) 100%)",
                  border: "1px solid rgba(185,190,220,0.2)",
                }
          }
        >
          <div className="p-5 flex items-start gap-4">
            <span className="text-3xl leading-none mt-0.5 shrink-0">
              {todayWeatherDef ? todayWeatherDef.emoji : "🌤️"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base font-medium text-ink leading-snug">
                {todayWeatherDef
                  ? `Today: ${todayWeatherDef.label}`
                  : "Emotional Weather"}
              </p>
              <p className="text-sm text-stone font-light mt-1 leading-relaxed">
                {todayWeatherDef
                  ? todayWeatherEntry?.note || todayWeatherDef.description
                  : "Notice the sky within."}
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "#869F8A" }}
              >
                {todayWeatherDef
                  ? "Update or view history →"
                  : "Check in for today →"}
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Gentle Companion */}
      <section>
        <SectionHeader
          title="Gentle Companion"
          actionLabel="Open"
          onAction={() => navigate(PATHS.COMPANION)}
        />
        <button
          onClick={() => navigate(PATHS.COMPANION)}
          className="w-full rounded-3xl text-left transition-all duration-200 hover:shadow-md overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,252,248,1) 0%, rgba(250,246,240,1) 100%)",
            border: "1px solid rgba(185,175,160,0.25)",
            boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-60">
                {companionCategoryLabel}
              </p>
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(185,175,160,0.15)",
                  border: "1px solid rgba(185,175,160,0.25)",
                }}
              >
                <MessageCircle
                  size={13}
                  strokeWidth={1.5}
                  className="text-stone"
                />
              </div>
            </div>
            {companionMessage && (
              <p
                className="font-display font-light text-ink leading-relaxed"
                style={{ fontSize: "0.95rem" }}
              >
                {companionMessage.text}
              </p>
            )}
            <p
              className="text-xs font-semibold tracking-wide uppercase"
              style={{ color: "#869F8A" }}
            >
              More messages →
            </p>
          </div>
        </button>
      </section>

      {/* Letters to Self */}
      <section>
        <SectionHeader
          title="Letters to Self"
          actionLabel="Open"
          onAction={() => navigate(PATHS.LETTERS)}
        />
        <button
          onClick={() => navigate(PATHS.LETTERS)}
          className="w-full rounded-3xl p-5 text-left transition-all duration-200 hover:shadow-md"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,252,245,1) 0%, rgba(248,244,236,1) 100%)",
            border: "1px solid rgba(185,175,160,0.28)",
            boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(185,175,160,0.15)",
                border: "1px solid rgba(185,175,160,0.28)",
              }}
            >
              <Mail size={17} strokeWidth={1.5} className="text-stone" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base font-medium text-ink leading-snug">
                Letters to Self
              </p>
              <p className="text-sm text-stone font-light mt-1 leading-relaxed">
                Leave gentle words for the person you are becoming.
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "#869F8A" }}
              >
                {letterCount === 0
                  ? "Write your first letter →"
                  : letterCount === 1
                    ? "1 letter written →"
                    : `${letterCount} letters written →`}
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Self-Compassion Toolkit */}
      <section>
        <SectionHeader
          title="Self-Compassion"
          actionLabel="Open"
          onAction={() => navigate(PATHS.SELF_COMPASSION)}
        />
        <button
          onClick={() => navigate(PATHS.SELF_COMPASSION)}
          className="w-full rounded-3xl p-5 text-left transition-all duration-200 hover:shadow-md"
          style={{
            background:
              "linear-gradient(160deg, rgba(134,159,138,0.08) 0%, rgba(140,130,155,0.06) 100%)",
            border: "1px solid rgba(140,130,155,0.2)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(140,130,155,0.1)",
                border: "1px solid rgba(140,130,155,0.22)",
              }}
            >
              <Heart size={17} strokeWidth={1.5} className="text-stone" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base font-medium text-ink leading-snug">
                Self-Compassion Toolkit
              </p>
              <p className="text-sm text-stone font-light mt-1 leading-relaxed">
                A gentle place to return to when things feel heavy.
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "#869F8A" }}
              >
                5 support spaces →
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Digital Sanctuary */}
      <section>
        <SectionHeader
          title="Digital Sanctuary"
          actionLabel="Enter"
          onAction={() => navigate(PATHS.SANCTUARY)}
        />
        <button
          onClick={() => navigate(PATHS.SANCTUARY)}
          className="w-full rounded-3xl p-5 text-left transition-all duration-200 hover:shadow-md"
          style={{
            background:
              "linear-gradient(160deg, rgba(134,159,138,0.09) 0%, rgba(185,175,160,0.1) 100%)",
            border: "1px solid rgba(134,159,138,0.18)",
            boxShadow: "0 2px 16px rgba(134,159,138,0.06)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(134,159,138,0.12)",
                border: "1px solid rgba(134,159,138,0.22)",
              }}
            >
              <Feather size={17} strokeWidth={1.5} className="text-sage" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base font-medium text-ink leading-snug">
                Digital Sanctuary
              </p>
              <p className="text-sm text-stone font-light mt-1 leading-relaxed">
                A quiet place to pause and simply exist.
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "#869F8A" }}
              >
                Enter the sanctuary →
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Calm Sounds */}
      <section>
        <SectionHeader
          title="Calm Sounds"
          actionLabel="Open"
          onAction={() => navigate(PATHS.CALM_SOUNDS)}
        />
        <button
          onClick={() => navigate(PATHS.CALM_SOUNDS)}
          className="w-full rounded-3xl p-5 text-left transition-all duration-200 hover:shadow-md"
          style={
            lastCalmSound
              ? {
                  background: lastCalmSound.gradient,
                  border: `1px solid ${lastCalmSound.cardBorder}`,
                }
              : {
                  background:
                    "linear-gradient(160deg, rgba(185,175,160,0.1) 0%, rgba(160,155,148,0.08) 100%)",
                  border: "1px solid rgba(185,175,160,0.22)",
                }
          }
        >
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-xl"
              style={{
                background: lastCalmSound
                  ? lastCalmSound.accentColor + "22"
                  : "rgba(185,175,160,0.15)",
                border: `1px solid ${
                  lastCalmSound
                    ? lastCalmSound.cardBorder
                    : "rgba(185,175,160,0.28)"
                }`,
              }}
            >
              {lastCalmSound ? (
                <span>{lastCalmSound.emoji}</span>
              ) : (
                <Music size={17} strokeWidth={1.5} className="text-stone" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base font-medium text-ink leading-snug">
                Calm Sounds
              </p>
              <p className="text-sm text-stone font-light mt-1 leading-relaxed">
                {lastCalmSound
                  ? `Last played: ${lastCalmSound.title}`
                  : "Ambient sounds for study, rest, and winding down."}
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "#869F8A" }}
              >
                {lastCalmSound
                  ? `${lastCalmSound.title} and 7 more →`
                  : "8 soundscapes →"}
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Gratitude Garden */}
      <section>
        <SectionHeader
          title="Gratitude Garden"
          actionLabel="Open garden"
          onAction={() => navigate(PATHS.GRATITUDE_GARDEN)}
        />
        <button
          onClick={() => navigate(PATHS.GRATITUDE_GARDEN)}
          className="w-full rounded-3xl bg-surface p-5 shadow-soft text-left transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(134, 159, 138, 0.13)",
                border: "1px solid rgba(134, 159, 138, 0.28)",
              }}
            >
              <Leaf size={18} strokeWidth={1.5} className="text-sage" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base font-medium text-ink leading-snug">
                Gratitude Garden
              </p>
              <p className="text-sm text-stone font-light mt-1 leading-relaxed">
                Collect the quiet moments worth remembering.
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "#869F8A" }}
              >
                {gratitudeCount === 0
                  ? "Plant your first moment →"
                  : gratitudeCount === 1
                    ? "1 moment planted →"
                    : `${gratitudeCount} moments planted →`}
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Memory Timeline */}
      <section>
        <SectionHeader
          title="Memory Timeline"
          actionLabel="Explore"
          onAction={() => navigate(PATHS.MEMORIES)}
        />
        <button
          onClick={() => navigate(PATHS.MEMORIES)}
          className="w-full rounded-3xl p-5 text-left transition-all duration-200 hover:shadow-md"
          style={{
            background:
              "linear-gradient(160deg, rgba(185,155,110,0.1) 0%, rgba(160,140,100,0.07) 100%)",
            border: "1px solid rgba(185,155,110,0.22)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(185,155,110,0.12)",
                border: "1px solid rgba(185,155,110,0.25)",
              }}
            >
              <Clock size={17} strokeWidth={1.5} className="text-stone" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base font-medium text-ink leading-snug">
                Memory Timeline
              </p>
              <p className="text-sm text-stone font-light mt-1 leading-relaxed">
                Revisit moments from your journey.
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "#869F8A" }}
              >
                {memoryCount === 0
                  ? "Your memories will appear here →"
                  : memoryCount === 1
                    ? "1 memory collected →"
                    : `${memoryCount} memories collected →`}
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Evening Reflection */}
      <section>
        <SectionHeader
          title="Evening Reflection"
          actionLabel="See all"
          onAction={() => navigate(PATHS.EVENING_REFLECTION)}
        />
        <button
          onClick={() => navigate(PATHS.EVENING_REFLECTION)}
          className="w-full rounded-3xl bg-surface p-5 shadow-soft text-left transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(185, 160, 120, 0.12)",
                border: "1px solid rgba(185, 160, 120, 0.3)",
              }}
            >
              <Sunset size={18} strokeWidth={1.5} className="text-stone" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base font-medium text-ink leading-snug">
                Evening Reflection
              </p>
              <p className="text-sm text-stone font-light mt-1 leading-relaxed">
                Pause for a moment and gently close your day.
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "#869F8A" }}
              >
                Begin tonight&#39;s reflection →
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Mood Journal */}
      <section>
        <SectionHeader
          title="Mood Journal"
          actionLabel="See all"
          onAction={() => navigate(PATHS.MOOD_JOURNAL)}
        />
        <button
          onClick={() => navigate(PATHS.MOOD_JOURNAL)}
          className="w-full rounded-3xl bg-surface p-5 shadow-soft text-left transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(160, 150, 130, 0.12)",
                border: "1px solid rgba(160, 150, 130, 0.28)",
              }}
            >
              <BookHeart size={18} strokeWidth={1.5} className="text-stone" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base font-medium text-ink leading-snug">
                A quiet space to reflect
              </p>
              <p className="text-sm text-stone font-light mt-1 leading-relaxed">
                Record how you are feeling. A few words can bring surprising
                clarity at the end of a long day.
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "#869F8A" }}
              >
                Write today&#39;s entry →
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Daily Wisdom */}
      <section>
        <SectionHeader
          title="Daily Wisdom"
          actionLabel="See all"
          onAction={() => navigate(PATHS.WISDOM)}
        />
        <button
          onClick={() => navigate(PATHS.WISDOM)}
          className="w-full rounded-3xl text-left transition-all duration-200 hover:shadow-md overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, rgba(185,175,160,0.1) 0%, rgba(134,159,138,0.08) 100%)",
            border: "1px solid rgba(185,175,160,0.2)",
          }}
        >
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(185,175,160,0.15)",
                  border: "1px solid rgba(185,175,160,0.25)",
                }}
              >
                <BookOpen size={15} strokeWidth={1.5} className="text-stone" />
              </div>
              <span className="text-xs text-stone font-light opacity-60">
                A quiet thought for today
              </span>
            </div>
            {todayWisdom && (
              <p
                className="font-display font-light text-ink leading-relaxed"
                style={{ fontSize: "0.95rem" }}
              >
                &ldquo;{todayWisdom.text}&rdquo;
              </p>
            )}
            {todayWisdom?.author && (
              <p className="text-xs text-stone font-light">
                &mdash; {todayWisdom.author}
              </p>
            )}
            <p
              className="text-xs font-semibold tracking-wide uppercase"
              style={{ color: "#869F8A" }}
            >
              Browse all wisdom →
            </p>
          </div>
        </button>
      </section>

      {/* Mindful Breathing */}
      <section>
        <SectionHeader
          title="Mindful Breathing"
          actionLabel="See all"
          onAction={() => navigate(PATHS.BREATHING)}
        />
        <button
          onClick={() => navigate(PATHS.BREATHING)}
          className="w-full rounded-3xl bg-surface p-5 shadow-soft text-left transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(134, 159, 138, 0.15)",
                border: "1px solid rgba(134, 159, 138, 0.3)",
              }}
            >
              <Wind size={18} strokeWidth={1.5} className="text-sage" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base font-medium text-ink leading-snug">
                Calm a busy mind
              </p>
              <p className="text-sm text-stone font-light mt-1 leading-relaxed">
                Quick breathing sessions for stress, low focus, or mental
                fatigue. 1 to 7 minutes.
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "#869F8A" }}
              >
                5 sessions available
              </p>
            </div>
          </div>
        </button>
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

      {/* Focus */}
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

      {/* Sleep Wind-Down */}
      <section>
        <SectionHeader
          title="Sleep Wind-Down"
          actionLabel="See all"
          onAction={() => navigate(PATHS.SLEEP_WIND_DOWN)}
        />
        <SleepWindDownHomeCard
          onSelect={() => navigate(PATHS.SLEEP_WIND_DOWN)}
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
