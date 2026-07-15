// src/data/morningFlowAmbience.js
// Ambient background options for Morning Flow. Architecture and data
// only — no audio files, no playback logic. Each option's id is the
// exact key a future audio phase would map to an audio source, without
// needing to change the selector UI or this data shape.

import { Moon, Wind, TreePine, CloudRain, Waves } from "lucide-react";

export const MORNING_FLOW_AMBIENCE_OPTIONS = [
  {
    id: "morning-silence",
    label: "Morning Silence",
    description: "Pure quiet, no background sound",
    icon: Moon,
  },
  {
    id: "soft-breeze",
    label: "Soft Breeze",
    description: "A gentle, airy stillness",
    icon: Wind,
  },
  {
    id: "forest-morning",
    label: "Forest Morning",
    description: "Birdsong and distant leaves",
    icon: TreePine,
  },
  {
    id: "rain",
    label: "Rain",
    description: "Soft rainfall in the background",
    icon: CloudRain,
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Slow, rhythmic waves",
    icon: Waves,
  },
];
