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

function App() {
  const { pathname } = useLocation();
  const { isComplete } = useOnboarding();
  const { currentBannerAchievement, dismissBanner } = useAchievements();
  const isOnboarding = pathname === PATHS.ONBOARDING;

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
      {!isOnboarding && <Header />}
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
