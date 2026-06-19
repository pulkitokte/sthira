import { Routes, Route } from "react-router-dom";
import Onboarding from "../pages/Onboarding";
import Home from "../pages/Home";
import RoutineLibrary from "../pages/RoutineLibrary";
import RoutinePlayer from "../pages/RoutinePlayer";
import EyeRelax from "../pages/EyeRelax";
import HydrationTracker from "../pages/HydrationTracker";
import WellnessTracker from "../pages/WellnessTracker";
import Reminders from "../pages/Reminders";
import Settings from "../pages/Settings";
import CompletionHistory from "../pages/CompletionHistory";
import { PATHS } from "../constants/navigation";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.ONBOARDING} element={<Onboarding />} />
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.LIBRARY} element={<RoutineLibrary />} />
      <Route path={PATHS.ROUTINE_PLAYER} element={<RoutinePlayer />} />
      <Route path={PATHS.EYE_RELAX} element={<EyeRelax />} />
      <Route path={PATHS.HYDRATION} element={<HydrationTracker />} />
      <Route path={PATHS.WELLNESS_TRACKER} element={<WellnessTracker />} />
      <Route path={PATHS.REMINDERS} element={<Reminders />} />
      <Route path={PATHS.SETTINGS} element={<Settings />} />
      <Route path={PATHS.HISTORY} element={<CompletionHistory />} />
    </Routes>
  );
}
