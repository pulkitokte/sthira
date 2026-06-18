import { Sun, BookOpen, Eye, Droplet, Leaf } from "lucide-react";

export const PATHS = {
  ONBOARDING: "/onboarding",
  HOME: "/",
  LIBRARY: "/library",
  ROUTINE_PLAYER: "/routine-player",
  EYE_RELAX: "/eye-relax",
  HYDRATION: "/hydration",
  WELLNESS_TRACKER: "/wellness-tracker",
  REMINDERS: "/reminders",
  SETTINGS: "/settings",
};

export const PAGE_TITLES = {
  [PATHS.ONBOARDING]: "Welcome",
  [PATHS.HOME]: "Sthira",
  [PATHS.LIBRARY]: "Routine Library",
  [PATHS.ROUTINE_PLAYER]: "Routine",
  [PATHS.EYE_RELAX]: "Eye Relax",
  [PATHS.HYDRATION]: "Hydration",
  [PATHS.WELLNESS_TRACKER]: "Daily Wellness",
  [PATHS.REMINDERS]: "Reminders",
  [PATHS.SETTINGS]: "Settings",
};

export const NAV_ITEMS = [
  { label: "Home", path: PATHS.HOME, icon: Sun },
  { label: "Library", path: PATHS.LIBRARY, icon: BookOpen },
  { label: "Eyes", path: PATHS.EYE_RELAX, icon: Eye },
  { label: "Hydration", path: PATHS.HYDRATION, icon: Droplet },
  { label: "Wellness", path: PATHS.WELLNESS_TRACKER, icon: Leaf },
];

export const isTopLevelPath = (pathname) =>
  NAV_ITEMS.some((item) => item.path === pathname);
