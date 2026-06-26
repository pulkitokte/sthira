import { Sun, BookOpen, Eye, Droplet, Leaf } from "lucide-react";

export const PATHS = {
  ONBOARDING: "/onboarding",
  HOME: "/",
  LIBRARY: "/library",
  ROUTINE_PLAYER: "/routine-player",
  EYE_RELAX: "/eye-relax",
  EYE_RECOVERY_PLAYER: "/eye-recovery-player",
  HYDRATION: "/hydration",
  HYDRATION_HISTORY: "/hydration-history",
  WELLNESS_TRACKER: "/wellness-tracker",
  REMINDERS: "/reminders",
  SETTINGS: "/settings",
  HISTORY: "/history",
  RECOVERY_LIBRARY: "/recovery",
  RECOVERY_PLAYER: "/recovery-player",
  ABOUT: "/about",
  WEEKLY_REFLECTION: "/weekly-reflection",
  ACHIEVEMENTS: "/achievements",
  WELLNESS_INSIGHTS: "/wellness-insights",
  FOCUS_SESSIONS: "/focus",
  FOCUS_PLAYER: "/focus-player",
  SLEEP_WIND_DOWN: "/sleep",
  SLEEP_RITUAL_PLAYER: "/sleep-player",
  BREATHING: "/breathing",
};

export const PAGE_TITLES = {
  [PATHS.ONBOARDING]: "Welcome",
  [PATHS.HOME]: "Sthira",
  [PATHS.LIBRARY]: "Routine Library",
  [PATHS.ROUTINE_PLAYER]: "Routine",
  [PATHS.EYE_RELAX]: "Eye Recovery",
  [PATHS.EYE_RECOVERY_PLAYER]: "Eye Recovery Session",
  [PATHS.HYDRATION]: "Hydration",
  [PATHS.HYDRATION_HISTORY]: "Hydration History",
  [PATHS.WELLNESS_TRACKER]: "Daily Wellness",
  [PATHS.REMINDERS]: "Reminders",
  [PATHS.SETTINGS]: "Settings",
  [PATHS.HISTORY]: "Completion History",
  [PATHS.RECOVERY_LIBRARY]: "Study Break Recovery",
  [PATHS.RECOVERY_PLAYER]: "Recovery Session",
  [PATHS.ABOUT]: "About Sthira",
  [PATHS.WEEKLY_REFLECTION]: "Weekly Reflection",
  [PATHS.ACHIEVEMENTS]: "Achievements",
  [PATHS.WELLNESS_INSIGHTS]: "Wellness Insights",
  [PATHS.FOCUS_SESSIONS]: "Focus Sessions",
  [PATHS.FOCUS_PLAYER]: "Focus Session",
  [PATHS.SLEEP_WIND_DOWN]: "Sleep Wind-Down",
  [PATHS.SLEEP_RITUAL_PLAYER]: "Sleep Ritual",
  [PATHS.BREATHING]: "Mindful Breathing",
};

export const NAV_ITEMS = [
  { label: "Home", path: PATHS.HOME, icon: Sun },
  { label: "Library", path: PATHS.LIBRARY, icon: BookOpen },
  { label: "Eyes", path: PATHS.EYE_RELAX, icon: Eye },
  { label: "Hydration", path: PATHS.HYDRATION, icon: Droplet },
  { label: "Wellness", path: PATHS.WELLNESS_TRACKER, icon: Leaf },
  // { label: "Sleep", path: PATHS.SLEEP_WIND_DOWN, icon: Moon },
];

export const isTopLevelPath = (pathname) =>
  NAV_ITEMS.some((item) => item.path === pathname);
