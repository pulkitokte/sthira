import { useState, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import BottomNavigation from "./components/layout/BottomNavigation";
import OfflineBanner from "./components/common/OfflineBanner";
import AchievementUnlockBanner from "./components/achievements/AchievementUnlockBanner";
import AppRoutes from "./routes/AppRoutes";
import { useOnboarding } from "./context/OnboardingContext";
import { useAchievements } from "./context/AchievementsContext";
import { useFirstBreathStatus } from "./hooks/useFirstBreathStatus";
import { useLaunchManager } from "./hooks/useLaunchManager";
import { ScrollContainerProvider } from "./context/ScrollContainerContext";
import { PATHS } from "./constants/navigation";

const HAS_OWN_HEADER = [
  PATHS.LETTERS,
  PATHS.HYDRATION,
  PATHS.WELLNESS_TRACKER,
  PATHS.MOOD_JOURNAL,
  PATHS.EVENING_REFLECTION,
  PATHS.GRATITUDE_GARDEN,
  PATHS.SANCTUARY,
  PATHS.SELF_COMPASSION,
  PATHS.WISDOM,
  PATHS.MEMORIES,
  PATHS.EMOTIONAL_WEATHER,
  PATHS.COMPANION,
  PATHS.CALM_SOUNDS,
  PATHS.SLEEP_WIND_DOWN,
  PATHS.EYE_RELAX,
  PATHS.FOCUS_SESSIONS,
  PATHS.RECOVERY_LIBRARY,
  PATHS.EYE_RECOVERY_PLAYER,
  PATHS.RECOVERY_PLAYER,
  PATHS.BREATHING,
  PATHS.MORNING_FLOW,
  PATHS.MORNING_FLOW_PLAYER,
];

function App() {
  const { pathname } = useLocation();
  const { isComplete } = useOnboarding();
  const { currentBannerAchievement, dismissBanner } = useAchievements();
  const { hasCompletedFirstBreath } = useFirstBreathStatus();

  const isOnboarding = pathname === PATHS.ONBOARDING;
  const isFirstBreath = pathname === PATHS.FIRST_BREATH;
  const isSplash = pathname === PATHS.SPLASH;
  const isFullScreenExperience = isOnboarding || isFirstBreath || isSplash;
  const rendersOwnHeader = HAS_OWN_HEADER.includes(pathname);

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const containerRef = useRef(null);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // New: The First Breath / Splash launch gate. Evaluated before the
  // existing onboarding redirect below so that, on a first-ever launch,
  // First Breath always wins over the Onboarding redirect (both would
  // otherwise want to fire on the same render).
  const launchRedirect = useLaunchManager({
    pathname,
    hasCompletedFirstBreath,
    isOnboardingComplete: isComplete,
  });

  if (launchRedirect && pathname !== launchRedirect) {
    return <Navigate to={launchRedirect} replace />;
  }

  // Existing onboarding redirect — untouched.
  if (!isComplete && !isOnboarding) {
    return <Navigate to={PATHS.ONBOARDING} replace />;
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-canvas sm:my-8 sm:h-[844px] sm:min-h-0 sm:overflow-y-auto sm:rounded-[2.5rem] sm:shadow-2xl sm:ring-1 sm:ring-border"
    >
      <ScrollContainerProvider containerRef={containerRef}>
        {!isFullScreenExperience && !rendersOwnHeader && <Header />}
        {!isOnline && <OfflineBanner />}
        {!isFullScreenExperience && currentBannerAchievement && (
          <AchievementUnlockBanner
            achievement={currentBannerAchievement}
            onDismiss={dismissBanner}
          />
        )}
        <AppRoutes />
        {!isFullScreenExperience && <BottomNavigation />}
      </ScrollContainerProvider>
    </div>
  );
}

export default App;
