import { Navigate, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import BottomNavigation from "./components/layout/BottomNavigation";
import AppRoutes from "./routes/AppRoutes";
import { useOnboarding } from "./context/OnboardingContext";
import { PATHS } from "./constants/navigation";

function App() {
  const { pathname } = useLocation();
  const { isComplete } = useOnboarding();
  const isOnboarding = pathname === PATHS.ONBOARDING;

  if (!isComplete && !isOnboarding) {
    return <Navigate to={PATHS.ONBOARDING} replace />;
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-canvas sm:my-8 sm:h-[844px] sm:min-h-0 sm:overflow-y-auto sm:rounded-[2.5rem] sm:shadow-2xl sm:ring-1 sm:ring-border">
      {!isOnboarding && <Header />}
      <AppRoutes />
      {!isOnboarding && <BottomNavigation />}
    </div>
  );
}

export default App;
