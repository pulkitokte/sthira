// src/data/morningFlowCategories.js
// Pure data for Morning Flow's category sections.
// Architecture-only phase: no exercises, no durations, no workout content —
// just the category identity (id, label, tagline, icon) that future
// phases will populate with real exercise data.

import { Flame, Move, Dumbbell, Scale, Wind } from "lucide-react";

export const MORNING_FLOW_CATEGORY_IDS = {
  WARM_UP: "warm-up",
  MOBILITY: "mobility",
  STRENGTH: "strength",
  BALANCE: "balance",
  COOL_DOWN: "cool-down",
};

export const MORNING_FLOW_CATEGORIES = [
  {
    id: MORNING_FLOW_CATEGORY_IDS.WARM_UP,
    label: "Warm Up",
    tagline: "Gently wake up the body",
    icon: Flame,
  },
  {
    id: MORNING_FLOW_CATEGORY_IDS.MOBILITY,
    label: "Mobility",
    tagline: "Loosen joints and ease stiffness",
    icon: Move,
  },
  {
    id: MORNING_FLOW_CATEGORY_IDS.STRENGTH,
    label: "Strength",
    tagline: "Build steady, functional strength",
    icon: Dumbbell,
  },
  {
    id: MORNING_FLOW_CATEGORY_IDS.BALANCE,
    label: "Balance",
    tagline: "Steady the body and the mind",
    icon: Scale,
  },
  {
    id: MORNING_FLOW_CATEGORY_IDS.COOL_DOWN,
    label: "Cool Down",
    tagline: "Ease back into your day",
    icon: Wind,
  },
];
