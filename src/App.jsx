import { useState, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import BottomNavigation from "./components/layout/BottomNavigation";
import OfflineBanner from "./components/common/OfflineBanner";
import AchievementUnlockBanner from "./components/achievements/AchievementUnlockBanner";
import AppRoutes from "./routes/AppRoutes";
import { useOnboarding } from "./context/OnboardingContext";
import { useAchievements } from "./context/AchievementsContext";
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
];

function App() {
  const { pathname } = useLocation();
  const { isComplete } = useOnboarding();
  const { currentBannerAchievement, dismissBanner } = useAchievements();
  const isOnboarding = pathname === PATHS.ONBOARDING;
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

  if (!isComplete && !isOnboarding) {
    return <Navigate to={PATHS.ONBOARDING} replace />;
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-canvas sm:my-8 sm:h-[844px] sm:min-h-0 sm:overflow-y-auto sm:rounded-[2.5rem] sm:shadow-2xl sm:ring-1 sm:ring-border"
    >
      <ScrollContainerProvider containerRef={containerRef}>
        {!isOnboarding && !rendersOwnHeader && <Header />}
        {!isOnline && <OfflineBanner />}
        {!isOnboarding && currentBannerAchievement && (
          <AchievementUnlockBanner
            achievement={currentBannerAchievement}
            onDismiss={dismissBanner}
          />
        )}
        <AppRoutes />
        {!isOnboarding && <BottomNavigation />}
      </ScrollContainerProvider>
    </div>
  );
}

export default App;
