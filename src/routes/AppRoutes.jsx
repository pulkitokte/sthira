import { Routes, Route, Navigate } from "react-router-dom";
import Onboarding from "../pages/Onboarding";
import FirstBreath from "../pages/FirstBreath";
import LaunchSplash from "../pages/LaunchSplash";
import Home from "../pages/Home";
import RoutineLibrary from "../pages/RoutineLibrary";
import RoutinePlayer from "../pages/RoutinePlayer";
import MorningFlow from "../pages/MorningFlow";
import MorningFlowPlayer from "../pages/MorningFlowPlayer";
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
import Achievements from "../pages/Achievements";
import WellnessInsights from "../pages/WellnessInsights";
import FocusSessions from "../pages/FocusSessions";
import FocusPlayer from "../pages/FocusPlayer";
import SleepWindDown from "../pages/SleepWindDown";
import SleepRitualPlayer from "../pages/SleepRitualPlayer";
import MindfulBreathing from "../pages/MindfulBreathing";
import MoodJournal from "../pages/MoodJournal";
import EveningReflection from "../pages/EveningReflection";
import GratitudeGarden from "../pages/GratitudeGarden";
import DigitalSanctuary from "../pages/DigitalSanctuary";
import DailyWisdom from "../pages/DailyWisdom";
import EmotionalWeather from "../pages/EmotionalWeather";
import LettersToSelf from "../pages/LettersToSelf";
import SelfCompassion from "../pages/SelfCompassion";
import CalmSounds from "../pages/CalmSounds";
import CompanionSpace from "../pages/CompanionSpace";
import MemoryTimeline from "../pages/MemoryTimeline";
import { PATHS } from "../constants/navigation";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.ONBOARDING} element={<Onboarding />} />
      <Route path={PATHS.FIRST_BREATH} element={<FirstBreath />} />
      <Route path={PATHS.SPLASH} element={<LaunchSplash />} />
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.LIBRARY} element={<RoutineLibrary />} />
      <Route path={PATHS.ROUTINE_PLAYER} element={<RoutinePlayer />} />
      <Route path={PATHS.MORNING_FLOW} element={<MorningFlow />} />
      <Route path={PATHS.MORNING_FLOW_PLAYER} element={<MorningFlowPlayer />} />
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
      <Route path={PATHS.ACHIEVEMENTS} element={<Achievements />} />
      <Route path={PATHS.WELLNESS_INSIGHTS} element={<WellnessInsights />} />
      <Route path={PATHS.FOCUS_SESSIONS} element={<FocusSessions />} />
      <Route path={PATHS.FOCUS_PLAYER} element={<FocusPlayer />} />
      <Route path={PATHS.SLEEP_WIND_DOWN} element={<SleepWindDown />} />
      <Route path={PATHS.SLEEP_RITUAL_PLAYER} element={<SleepRitualPlayer />} />
      <Route path={PATHS.BREATHING} element={<MindfulBreathing />} />
      <Route path={PATHS.MOOD_JOURNAL} element={<MoodJournal />} />
      <Route path={PATHS.EVENING_REFLECTION} element={<EveningReflection />} />
      <Route path={PATHS.GRATITUDE_GARDEN} element={<GratitudeGarden />} />
      <Route path={PATHS.SANCTUARY} element={<DigitalSanctuary />} />
      <Route path={PATHS.WISDOM} element={<DailyWisdom />} />
      <Route path={PATHS.EMOTIONAL_WEATHER} element={<EmotionalWeather />} />
      <Route path={PATHS.LETTERS} element={<LettersToSelf />} />
      <Route path={PATHS.SELF_COMPASSION} element={<SelfCompassion />} />
      <Route path={PATHS.CALM_SOUNDS} element={<CalmSounds />} />
      <Route path={PATHS.COMPANION} element={<CompanionSpace />} />
      <Route path={PATHS.MEMORIES} element={<MemoryTimeline />} />
      <Route path="*" element={<Navigate to={PATHS.HOME} replace />} />
    </Routes>
  );
}
