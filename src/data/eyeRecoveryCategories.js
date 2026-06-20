import { Sparkles, Monitor, Brain, Moon, Hourglass } from "lucide-react";

export const EYE_CATEGORY_IDS = {
  QUICK_RELIEF: "quick-relief",
  SCREEN_FATIGUE_RESET: "screen-fatigue-reset",
  FOCUS_REFRESH: "eye-focus-refresh",
  EVENING_WIND_DOWN: "evening-wind-down",
  LONG_STUDY_RECOVERY: "long-study-session-recovery",
};

export const EYE_RECOVERY_CATEGORIES = [
  {
    id: EYE_CATEGORY_IDS.QUICK_RELIEF,
    label: "Quick Relief",
    tagline: "A fast pause for tired eyes",
    icon: Sparkles,
  },
  {
    id: EYE_CATEGORY_IDS.SCREEN_FATIGUE_RESET,
    label: "Screen Fatigue Reset",
    tagline: "Ease the strain of long screen time",
    icon: Monitor,
  },
  {
    id: EYE_CATEGORY_IDS.FOCUS_REFRESH,
    label: "Focus Refresh",
    tagline: "Sharpen attention between subjects",
    icon: Brain,
  },
  {
    id: EYE_CATEGORY_IDS.EVENING_WIND_DOWN,
    label: "Evening Wind Down",
    tagline: "Settle your eyes before sleep",
    icon: Moon,
  },
  {
    id: EYE_CATEGORY_IDS.LONG_STUDY_RECOVERY,
    label: "Long Study Session Recovery",
    tagline: "A fuller reset after hours of focus",
    icon: Hourglass,
  },
];
