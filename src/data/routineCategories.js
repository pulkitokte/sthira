import { Zap, Battery, Sunrise, Flower2, Feather } from "lucide-react";

export const CATEGORY_IDS = {
  QUICK_START: "quick-start",
  DAILY_ENERGY: "daily-energy",
  MORNING_RESET: "morning-reset",
  FULL_MORNING_FLOW: "full-morning-flow",
  BEGINNER_FRIENDLY: "beginner-friendly",
};

export const ROUTINE_CATEGORIES = [
  {
    id: CATEGORY_IDS.QUICK_START,
    label: "Quick Start",
    tagline: "5-minute resets for busy mornings",
    icon: Zap,
  },
  {
    id: CATEGORY_IDS.DAILY_ENERGY,
    label: "Daily Energy",
    tagline: "10 minutes to build steady momentum",
    icon: Battery,
  },
  {
    id: CATEGORY_IDS.MORNING_RESET,
    label: "Morning Reset",
    tagline: "15 minutes to wake up fully, body and mind",
    icon: Sunrise,
  },
  {
    id: CATEGORY_IDS.FULL_MORNING_FLOW,
    label: "Full Morning Flow",
    tagline: "20 minutes for a complete morning practice",
    icon: Flower2,
  },
  {
    id: CATEGORY_IDS.BEGINNER_FRIENDLY,
    label: "Beginner Friendly",
    tagline: "Easy routines to ease into movement",
    icon: Feather,
  },
];
