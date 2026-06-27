// src/data/sanctuaryData.js
// All content data for the Digital Sanctuary feature.
// Pure data — no UI, no side effects.

// ── Welcome messages ─────────────────────────────────────────────────────────
// 30+ calming messages shown randomly each visit.

export const SANCTUARY_MESSAGES = [
  "You do not need to solve everything tonight.",
  "Rest is a form of progress.",
  "It is okay to simply be here for a while.",
  "A difficult day does not define you.",
  "Small steps are still steps.",
  "You are allowed to slow down.",
  "Not every moment needs to be productive.",
  "Breathing slowly is doing something.",
  "You have done enough for today.",
  "The quiet is here for you.",
  "Whatever you are carrying, you can set it down for now.",
  "You do not have to be okay. You just have to be here.",
  "Gentleness is always available to you.",
  "The world can wait a few minutes.",
  "You are more than your to-do list.",
  "Some days, showing up is the whole achievement.",
  "Peace does not require permission.",
  "You are safe here.",
  "Nothing is required of you in this moment.",
  "A quiet mind is worth more than a busy one.",
  "This moment is yours.",
  "There is no version of you that needs to perform right now.",
  "Rest without guilt is a skill worth practising.",
  "You came here. That was a good choice.",
  "Tiredness is not weakness. It is information.",
  "The next step will reveal itself. For now, breathe.",
  "You are not behind. You are exactly where you are.",
  "Softness is not fragility. It is wisdom.",
  "Something small can shift everything.",
  "Your presence here is enough.",
  "Whatever happened today, this moment is new.",
  "You deserve the same kindness you give to others.",
  "The pause is not wasted time. It is the work.",
  "Being still is its own kind of courage.",
  "There is always something quiet to return to.",
];

// ── Ambience options ──────────────────────────────────────────────────────────
// Visual ambience cards — architecture supports real audio in the future.

export const AMBIENCE_OPTIONS = [
  {
    id: "rain",
    label: "Rain",
    description: "Soft rainfall on a window.",
    visual: "rain",
    gradient:
      "linear-gradient(135deg, rgba(100,120,150,0.18) 0%, rgba(80,100,130,0.22) 100%)",
    accentColor: "rgba(100, 130, 170, 0.6)",
    dotColor: "rgba(130, 160, 200, 0.5)",
    // Future: audioFile: "/audio/rain.mp3"
  },
  {
    id: "forest",
    label: "Forest",
    description: "Leaves rustling in a gentle breeze.",
    visual: "forest",
    gradient:
      "linear-gradient(135deg, rgba(80,130,90,0.15) 0%, rgba(100,140,80,0.18) 100%)",
    accentColor: "rgba(100, 150, 100, 0.6)",
    dotColor: "rgba(120, 170, 110, 0.5)",
    // Future: audioFile: "/audio/forest.mp3"
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Waves arriving and retreating.",
    visual: "ocean",
    gradient:
      "linear-gradient(135deg, rgba(80,130,160,0.15) 0%, rgba(60,110,150,0.2) 100%)",
    accentColor: "rgba(80, 140, 170, 0.6)",
    dotColor: "rgba(100, 160, 190, 0.5)",
    // Future: audioFile: "/audio/ocean.mp3"
  },
  {
    id: "night",
    label: "Night",
    description: "The stillness of late evening.",
    visual: "night",
    gradient:
      "linear-gradient(135deg, rgba(60,60,100,0.18) 0%, rgba(40,40,80,0.22) 100%)",
    accentColor: "rgba(100, 100, 160, 0.6)",
    dotColor: "rgba(160, 160, 220, 0.4)",
    // Future: audioFile: "/audio/night.mp3"
  },
  {
    id: "silence",
    label: "Silence",
    description: "Simply still. No sound.",
    visual: "silence",
    gradient:
      "linear-gradient(135deg, rgba(185,175,160,0.1) 0%, rgba(160,155,145,0.12) 100%)",
    accentColor: "rgba(160, 150, 135, 0.5)",
    dotColor: "rgba(185, 175, 160, 0.4)",
    // Future: audioFile: null
  },
];

// ── Quiet corner exercises ────────────────────────────────────────────────────
// 20+ small calming exercises. One shown at a time.

export const QUIET_EXERCISES = [
  "Sit quietly for one minute without doing anything else.",
  "Notice five things you can see right now.",
  "Relax your shoulders away from your ears.",
  "Stretch your neck slowly — left, then right.",
  "Drink a glass of water, slowly and with full attention.",
  "Step outside for a moment of fresh air.",
  "Unclench your jaw. Let your tongue rest.",
  "Close your eyes and take three slow breaths.",
  "Place both feet flat on the floor and feel the ground.",
  "Look at something far away for thirty seconds.",
  "Roll your shoulders back gently, three times.",
  "Let your hands rest open in your lap.",
  "Notice the temperature of the air on your skin.",
  "Take one full breath in, hold it briefly, let it go slowly.",
  "Let your face go completely soft — forehead, eyes, mouth.",
  "Wiggle your fingers and toes to bring yourself back.",
  "Put a hand on your chest and feel it rise and fall.",
  "Look for the lightest colour in the room.",
  "Sit up gently, straighten your spine, breathe.",
  "Name three things that are going okay right now.",
  "Notice any sounds in the room without labelling them.",
  "Let yourself yawn if you feel like it. Let it be long.",
  "Rest your palms on a warm surface — a cup, your lap.",
  "Blink slowly several times, as if your eyes need rest.",
];

// ── Grounding ritual steps ────────────────────────────────────────────────────
// 5-4-3-2-1 grounding method.

export const GROUNDING_STEPS = [
  {
    id: "see",
    count: 5,
    sense: "see",
    instruction: "Name 5 things you can see.",
    prompt: "Look slowly around the room. Notice colours, shapes, light.",
    cue: "Take your time. There is no hurry.",
  },
  {
    id: "feel",
    count: 4,
    sense: "feel",
    instruction: "Notice 4 things you can physically feel.",
    prompt:
      "The weight of your body. The texture of your clothes. The temperature of the air.",
    cue: "Stay with each sensation for a moment.",
  },
  {
    id: "hear",
    count: 3,
    sense: "hear",
    instruction: "Listen for 3 things you can hear.",
    prompt:
      "Even small sounds — a distant hum, your own breathing, the building settling.",
    cue: "You don't need to name them perfectly. Just notice.",
  },
  {
    id: "smell",
    count: 2,
    sense: "smell",
    instruction: "Find 2 things you can smell.",
    prompt: "This might take a moment. Breathe gently and see what arrives.",
    cue: "If nothing comes, simply notice the absence of scent.",
  },
  {
    id: "taste",
    count: 1,
    sense: "taste",
    instruction: "Notice 1 thing you can taste.",
    prompt:
      "The lingering taste of your last drink or meal, or simply the inside of your mouth.",
    cue: "This is the last step. You have arrived here.",
  },
];
