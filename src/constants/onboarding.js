import {
  Repeat,
  Zap,
  PersonStanding,
  Wind,
  Leaf,
  Feather,
  Sparkles,
} from "lucide-react";

export const ONBOARDING_STORAGE_KEY = "sthira:onboarding";
export const TOTAL_STEPS = 7;

export const STUDY_HOURS_OPTIONS = [
  { value: "lt2", label: "Less than 2 hrs" },
  { value: "2-4", label: "2 – 4 hrs" },
  { value: "4-6", label: "4 – 6 hrs" },
  { value: "6-8", label: "6 – 8 hrs" },
  { value: "8plus", label: "8+ hrs" },
];

export const ROUTINE_DURATION_OPTIONS = [
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min" },
  { value: 15, label: "15 min" },
  { value: 20, label: "20 min" },
];

export const ACTIVITY_LEVEL_OPTIONS = [
  {
    value: "beginner",
    label: "Beginner",
    blurb: "I'm just getting started",
    icon: Feather,
  },
  {
    value: "slightly-active",
    label: "Slightly active",
    blurb: "I move now and then",
    icon: Wind,
  },
  {
    value: "active",
    label: "Active",
    blurb: "I move most days",
    icon: Sparkles,
  },
];

export const PRIMARY_GOAL_OPTIONS = [
  { value: "consistency", label: "Build consistency", icon: Repeat },
  { value: "energy", label: "Increase energy", icon: Zap },
  { value: "posture", label: "Improve posture", icon: PersonStanding },
  { value: "stiffness", label: "Reduce stiffness", icon: Wind },
  { value: "wellness", label: "General wellness", icon: Leaf },
];
