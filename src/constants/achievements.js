import {
  Sunrise,
  Droplet,
  Droplets,
  Leaf,
  Flame,
  Compass,
  Eye,
  Wind,
  CalendarCheck,
} from "lucide-react";

export const ACHIEVEMENTS_STORAGE_KEY = "sthira:achievements";

export const ACHIEVEMENT_CATEGORY_LABELS = {
  "first-steps": "First Steps",
  consistency: "Consistency",
  exploration: "Exploration",
  wellness: "Wellness",
};

export const ACHIEVEMENTS = [
  // ── First Steps ───────────────────────────────────────────────────────────
  {
    id: "first-routine",
    category: "first-steps",
    title: "First Step",
    description: "Completed your first morning routine.",
    icon: Sunrise,
  },
  {
    id: "first-hydration-goal",
    category: "first-steps",
    title: "Well Hydrated",
    description: "Reached your daily hydration goal for the first time.",
    icon: Droplet,
  },
  {
    id: "first-wellness-checkin",
    category: "first-steps",
    title: "First Check-In",
    description: "Completed your first daily wellness check-in.",
    icon: Leaf,
  },

  // ── Consistency ───────────────────────────────────────────────────────────
  {
    id: "streak-3",
    category: "consistency",
    title: "Three Days",
    description: "Showed up for movement three days in a row.",
    icon: Flame,
  },
  {
    id: "streak-7",
    category: "consistency",
    title: "One Week",
    description: "A full week of consistent morning movement.",
    icon: Flame,
  },
  {
    id: "streak-14",
    category: "consistency",
    title: "Two Weeks",
    description: "Fourteen days of showing up. A habit is forming.",
    icon: Flame,
  },
  {
    id: "streak-30",
    category: "consistency",
    title: "Thirty Days",
    description:
      "A month of consistent movement. Something real has taken root.",
    icon: Flame,
  },

  // ── Exploration ───────────────────────────────────────────────────────────
  {
    id: "explore-3-categories",
    category: "exploration",
    title: "Explorer",
    description: "Tried routines from three different categories.",
    icon: Compass,
  },
  {
    id: "try-eye-recovery",
    category: "exploration",
    title: "Screen Break",
    description: "Completed your first eye recovery session.",
    icon: Eye,
  },
  {
    id: "try-study-break",
    category: "exploration",
    title: "Study Break",
    description: "Completed your first study break recovery session.",
    icon: Wind,
  },

  // ── Wellness ──────────────────────────────────────────────────────────────
  {
    id: "wellness-5",
    category: "wellness",
    title: "Self-Aware",
    description: "Completed wellness check-ins on five separate days.",
    icon: CalendarCheck,
  },
  {
    id: "hydration-goal-3",
    category: "wellness",
    title: "Consistent Flow",
    description: "Reached your daily hydration goal on three different days.",
    icon: Droplets,
  },
];
