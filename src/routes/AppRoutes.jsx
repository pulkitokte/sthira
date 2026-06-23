import { Routes, Route, Navigate } from "react-router-dom";
import Onboarding from "../pages/Onboarding";
import Home from "../pages/Home";
import RoutineLibrary from "../pages/RoutineLibrary";
import RoutinePlayer from "../pages/RoutinePlayer";
import EyeRelax from "../pages/EyeRelax";
import EyeRecoverySessionPlayer from "../pages/EyeRecoverySessionPlayer";
import HydrationTracker from "../pages/HydrationTracker";
import HydrationHistory from "../pages/HydrationHistory";
import WellnessTracker from "../pages/WellnessTracker";
import Reminders from "../pages/Reminders";
import Settings from "../pages/Settings";
import CompletionHistory from "../pages/CompletionHistory";
import RecoveryLibrary from "../pages/RecoveryLibrary";
import RecoverySessionPlayer from "../pages/RecoverySessionPlayer";
import AboutSthira from "../pages/AboutSthira";
import WeeklyReflection from "../pages/WeeklyReflection";
import { PATHS } from "../constants/navigation";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.ONBOARDING} element={<Onboarding />} />
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.LIBRARY} element={<RoutineLibrary />} />
      <Route path={PATHS.ROUTINE_PLAYER} element={<RoutinePlayer />} />
      <Route path={PATHS.EYE_RELAX} element={<EyeRelax />} />
      <Route
        path={PATHS.EYE_RECOVERY_PLAYER}
        element={<EyeRecoverySessionPlayer />}
      />
      <Route path={PATHS.HYDRATION} element={<HydrationTracker />} />
      <Route path={PATHS.HYDRATION_HISTORY} element={<HydrationHistory />} />
      <Route path={PATHS.WELLNESS_TRACKER} element={<WellnessTracker />} />
      <Route path={PATHS.REMINDERS} element={<Reminders />} />
      <Route path={PATHS.SETTINGS} element={<Settings />} />
      <Route path={PATHS.HISTORY} element={<CompletionHistory />} />
      <Route path={PATHS.RECOVERY_LIBRARY} element={<RecoveryLibrary />} />
      <Route path={PATHS.RECOVERY_PLAYER} element={<RecoverySessionPlayer />} />
      <Route path={PATHS.ABOUT} element={<AboutSthira />} />
      <Route path={PATHS.WEEKLY_REFLECTION} element={<WeeklyReflection />} />
      <Route path="*" element={<Navigate to={PATHS.HOME} replace />} />
    </Routes>
  );
}
