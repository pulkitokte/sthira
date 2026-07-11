import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import BottomNavigation from "./components/layout/BottomNavigation";
import OfflineBanner from "./components/common/OfflineBanner";
import AchievementUnlockBanner from "./components/achievements/AchievementUnlockBanner";
import AppRoutes from "./routes/AppRoutes";
import { useOnboarding } from "./context/OnboardingContext";
import { useAchievements } from "./context/AchievementsContext";
import { PATHS } from "./constants/navigation";

// Routes that render their own complete custom header (sticky top bar,
// back button, title) rather than using the shared PageContainer/Header
// pattern. Rendering the global Header on these routes as well produced
// two overlapping position:sticky top-0 elements, which caused the
// Letters to Self back button to become unreliable/unclickable depending
// on scroll position. Only Letters is excluded here, scoped to the
// reported bug — CalmSounds/CompanionSpace use the same custom-header
// pattern and may warrant the same exclusion, but that's left untouched
// pending a separate report.
const HAS_OWN_HEADER = [PATHS.LETTERS];

function App() {
  const { pathname } = useLocation();
  const { isComplete } = useOnboarding();
  const { currentBannerAchievement, dismissBanner } = useAchievements();
  const isOnboarding = pathname === PATHS.ONBOARDING;
  const rendersOwnHeader = HAS_OWN_HEADER.includes(pathname);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-canvas sm:my-8 sm:h-[844px] sm:min-h-0 sm:overflow-y-auto sm:rounded-[2.5rem] sm:shadow-2xl sm:ring-1 sm:ring-border">
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
    </div>
  );
}

export default App;
