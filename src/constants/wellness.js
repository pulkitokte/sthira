import { Zap, Target, CloudRain, Smile } from "lucide-react";

export const WELLNESS_ENTRIES_STORAGE_KEY = "sthira:wellnessEntries";

export const WELLNESS_DIMENSIONS = [
  {
    id: "energy",
    label: "Energy Level",
    icon: Zap,
    options: [
      { value: "very-low", label: "Very Low" },
      { value: "low", label: "Low" },
      { value: "balanced", label: "Balanced" },
      { value: "high", label: "High" },
      { value: "excellent", label: "Excellent" },
    ],
  },
  {
    id: "focus",
    label: "Focus Level",
    icon: Target,
    options: [
      { value: "distracted", label: "Distracted" },
      { value: "struggling", label: "Struggling" },
      { value: "average", label: "Average" },
      { value: "focused", label: "Focused" },
      { value: "deep-focus", label: "Deep Focus" },
    ],
  },
  {
    id: "stress",
    label: "Stress Level",
    icon: CloudRain,
    options: [
      { value: "calm", label: "Calm" },
      { value: "slightly-stressed", label: "Slightly Stressed" },
      { value: "moderately-stressed", label: "Moderately Stressed" },
      { value: "very-stressed", label: "Very Stressed" },
      { value: "overwhelmed", label: "Overwhelmed" },
    ],
  },
  {
    id: "mood",
    label: "Mood",
    icon: Smile,
    options: [
      { value: "tired", label: "Tired" },
      { value: "neutral", label: "Neutral" },
      { value: "good", label: "Good" },
      { value: "great", label: "Great" },
      { value: "motivated", label: "Motivated" },
    ],
  },
];
