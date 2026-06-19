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
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-canvas">
      {!isOnboarding && <Header />}
      <AppRoutes />
      {!isOnboarding && <BottomNavigation />}
    </div>
  );
}

export default App;
