import { Timer, Move, Eye, PersonStanding, Wind, Brain } from "lucide-react";

export const RECOVERY_CATEGORY_IDS = {
  TWO_MINUTE_RESET: "two-minute-reset",
  DESK_STRETCH: "desk-stretch",
  EYE_RECOVERY: "eye-recovery",
  NECK_SHOULDER_RELIEF: "neck-shoulder-relief",
  DEEP_BREATHING: "deep-breathing",
  FOCUS_REFRESH: "focus-refresh",
};

export const RECOVERY_CATEGORIES = [
  {
    id: RECOVERY_CATEGORY_IDS.TWO_MINUTE_RESET,
    label: "2 Minute Reset",
    tagline: "The fastest way back to feeling steady",
    icon: Timer,
  },
  {
    id: RECOVERY_CATEGORY_IDS.DESK_STRETCH,
    label: "Desk Stretch",
    tagline: "Loosen up without leaving your chair",
    icon: Move,
  },
  {
    id: RECOVERY_CATEGORY_IDS.EYE_RECOVERY,
    label: "Eye Recovery",
    tagline: "Ease the strain of screen time",
    icon: Eye,
  },
  {
    id: RECOVERY_CATEGORY_IDS.NECK_SHOULDER_RELIEF,
    label: "Neck & Shoulder Relief",
    tagline: "Release tension from looking down",
    icon: PersonStanding,
  },
  {
    id: RECOVERY_CATEGORY_IDS.DEEP_BREATHING,
    label: "Deep Breathing",
    tagline: "Settle a busy mind in a few breaths",
    icon: Wind,
  },
  {
    id: RECOVERY_CATEGORY_IDS.FOCUS_REFRESH,
    label: "Focus Refresh",
    tagline: "Clear mental clutter between subjects",
    icon: Brain,
  },
];
