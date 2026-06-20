import { EYE_CATEGORY_IDS } from "./eyeRecoveryCategories";

export const EYE_RECOVERY_SESSIONS = [
  // ---------- Quick Relief ----------
  {
    id: "quick-eye-refresh",
    title: "Quick Eye Refresh",
    categoryId: EYE_CATEGORY_IDS.QUICK_RELIEF,
    duration: 2,
    description: "A short pause to ease tired eyes between tasks.",
    benefits: [
      "Eases immediate eye fatigue",
      "Takes under two minutes",
      "No equipment needed",
    ],
    steps: [
      {
        title: "Soft Blink",
        instruction: "Blink slowly and gently, ten times.",
        duration: 30,
      },
      {
        title: "Look Away",
        instruction: "Focus on something at least 20 feet away.",
        duration: 30,
      },
      {
        title: "Eye Roll",
        instruction: "Roll your eyes slowly in a full circle, both directions.",
        duration: 30,
      },
      {
        title: "Return and Rest",
        instruction:
          "Close your eyes gently and breathe once before opening them.",
        duration: 30,
      },
    ],
  },
  {
    id: "60-second-blink-reset",
    title: "60-Second Blink Reset",
    categoryId: EYE_CATEGORY_IDS.QUICK_RELIEF,
    duration: 2,
    description: "A short blinking sequence to refresh dry, tired eyes.",
    benefits: [
      "Re-moistens dry eyes",
      "Calms a racing mind",
      "Easy to repeat often",
    ],
    steps: [
      {
        title: "Settle In",
        instruction: "Sit comfortably and let your shoulders drop.",
        duration: 20,
      },
      {
        title: "Steady Blinking",
        instruction: "Blink fully and slowly, twenty times.",
        duration: 40,
      },
      {
        title: "Soft Gaze",
        instruction:
          "Let your eyes rest on a neutral point without focusing hard.",
        duration: 30,
      },
      {
        title: "Close and Breathe",
        instruction: "Close your eyes and take two slow breaths.",
        duration: 30,
      },
    ],
  },
  {
    id: "rapid-eye-ease",
    title: "Rapid Eye Ease",
    categoryId: EYE_CATEGORY_IDS.QUICK_RELIEF,
    duration: 2,
    description: "A brisk sequence for whenever your eyes feel heavy.",
    benefits: [
      "Quick relief between tasks",
      "Loosens tight eye muscles",
      "No need to stand up",
    ],
    steps: [
      {
        title: "Quick Blinks",
        instruction: "Blink rapidly but gently for a few seconds, then pause.",
        duration: 20,
      },
      {
        title: "Distance Shift",
        instruction:
          "Look at a far object, then back to something near, a few times.",
        duration: 40,
      },
      {
        title: "Eye Roll",
        instruction: "Roll your eyes slowly in a circle, both directions.",
        duration: 30,
      },
      {
        title: "Close & Rest",
        instruction: "Close your eyes and rest them for a moment.",
        duration: 30,
      },
    ],
  },

  // ---------- Screen Fatigue Reset ----------
  {
    id: "screen-fatigue-reset",
    title: "Screen Fatigue Reset",
    categoryId: EYE_CATEGORY_IDS.SCREEN_FATIGUE_RESET,
    duration: 3,
    description: "A complete reset for eyes worn out by hours of screen time.",
    benefits: [
      "Eases digital eye strain",
      "Combines movement and rest",
      "Great after long sessions",
    ],
    steps: [
      {
        title: "Step Back",
        instruction: "Look away from your screen and sit back.",
        duration: 20,
      },
      {
        title: "20-20-20 Look Away",
        instruction: "Look at something roughly 20 feet away for 20 seconds.",
        duration: 30,
      },
      {
        title: "Palming",
        instruction:
          "Rub your palms together gently and cup them over closed eyes.",
        duration: 40,
      },
      {
        title: "Eye Rolls",
        instruction: "Roll your eyes slowly in both directions.",
        duration: 40,
      },
      {
        title: "Return Gently",
        instruction: "Open your eyes slowly and blink a few times.",
        duration: 50,
      },
    ],
  },
  {
    id: "digital-eye-recovery",
    title: "Digital Eye Recovery",
    categoryId: EYE_CATEGORY_IDS.SCREEN_FATIGUE_RESET,
    duration: 3,
    description:
      "A focused sequence to recover from prolonged screen exposure.",
    benefits: [
      "Relieves screen-related strain",
      "Improves focus shifting",
      "Calms the eyes fully",
    ],
    steps: [
      {
        title: "Blink Reset",
        instruction: "Blink slowly and fully, fifteen times.",
        duration: 30,
      },
      {
        title: "Near-Far Focus",
        instruction:
          "Focus on your thumb up close, then something far. Repeat.",
        duration: 50,
      },
      {
        title: "Figure Eight",
        instruction: "Trace a slow figure eight with your eyes in the air.",
        duration: 40,
      },
      {
        title: "Soft Focus",
        instruction:
          "Let your gaze soften, not focusing on anything in particular.",
        duration: 30,
      },
      {
        title: "Close and Breathe",
        instruction: "Close your eyes and take a few slow breaths.",
        duration: 30,
      },
    ],
  },
  {
    id: "midday-screen-break",
    title: "Midday Screen Break",
    categoryId: EYE_CATEGORY_IDS.SCREEN_FATIGUE_RESET,
    duration: 3,
    description: "A mid-day pause to stop screen fatigue before it builds up.",
    benefits: [
      "Prevents fatigue from building",
      "Eases tension around the eyes",
      "A good midday habit",
    ],
    steps: [
      {
        title: "Pause the Screen",
        instruction: "Look away from your device completely.",
        duration: 20,
      },
      {
        title: "Distant Gaze",
        instruction:
          "Find the farthest point you can see and rest your eyes there.",
        duration: 40,
      },
      {
        title: "Blink Fully",
        instruction: "Blink slowly and completely, ten times.",
        duration: 30,
      },
      {
        title: "Eyelid Massage",
        instruction: "Gently massage your closed eyelids in small circles.",
        duration: 40,
      },
      {
        title: "Reopen Slowly",
        instruction: "Open your eyes gradually and let them adjust.",
        duration: 50,
      },
    ],
  },

  // ---------- Focus Refresh ----------
  {
    id: "eye-focus-refresh",
    title: "Focus Refresh",
    categoryId: EYE_CATEGORY_IDS.FOCUS_REFRESH,
    duration: 3,
    description: "A short sequence to sharpen focus before your next subject.",
    benefits: [
      "Re-sharpens visual focus",
      "Helps switch between tasks",
      "Clears visual fatigue",
    ],
    steps: [
      {
        title: "Center and Breathe",
        instruction: "Sit tall and take one slow breath.",
        duration: 20,
      },
      {
        title: "Near-Far Focus",
        instruction:
          "Shift focus between something close and something far, several times.",
        duration: 50,
      },
      {
        title: "Eye Roll",
        instruction: "Roll your eyes slowly in a full circle, both directions.",
        duration: 40,
      },
      {
        title: "Soft Gaze",
        instruction: "Let your eyes rest softly without focusing on anything.",
        duration: 40,
      },
      {
        title: "Return Ready",
        instruction:
          "Blink a few times and bring your attention back to your work.",
        duration: 30,
      },
    ],
  },
  {
    id: "clarity-reset-eyes",
    title: "Clarity Reset",
    categoryId: EYE_CATEGORY_IDS.FOCUS_REFRESH,
    duration: 3,
    description:
      "A calming reset to clear visual clutter between study blocks.",
    benefits: [
      "Clears mental and visual fog",
      "Restores steady focus",
      "A gentle transition between subjects",
    ],
    steps: [
      {
        title: "Settle",
        instruction: "Sit comfortably and relax your jaw and shoulders.",
        duration: 20,
      },
      {
        title: "Blink Reset",
        instruction: "Blink slowly and fully, fifteen times.",
        duration: 30,
      },
      {
        title: "Figure Eight",
        instruction: "Trace a slow figure eight with your eyes.",
        duration: 40,
      },
      {
        title: "Distance Gaze",
        instruction: "Look at the farthest point you can see for a moment.",
        duration: 40,
      },
      {
        title: "Close and Rest",
        instruction: "Close your eyes gently for a few breaths.",
        duration: 50,
      },
    ],
  },

  // ---------- Evening Wind Down ----------
  {
    id: "evening-eye-wind-down",
    title: "Evening Eye Wind Down",
    categoryId: EYE_CATEGORY_IDS.EVENING_WIND_DOWN,
    duration: 3,
    description: "A slow, calming sequence to settle your eyes before sleep.",
    benefits: [
      "Helps eyes relax before bed",
      "Slows down a busy mind",
      "A gentle end-of-day ritual",
    ],
    steps: [
      {
        title: "Dim the Light",
        instruction: "If you can, lower the brightness around you.",
        duration: 20,
      },
      {
        title: "Palming",
        instruction: "Cup your warmed palms gently over your closed eyes.",
        duration: 50,
      },
      {
        title: "Slow Breathing",
        instruction: "Breathe slowly while keeping your eyes covered.",
        duration: 40,
      },
      {
        title: "Gentle Eye Roll",
        instruction: "Open your eyes and roll them slowly, both directions.",
        duration: 30,
      },
      {
        title: "Final Rest",
        instruction: "Close your eyes once more and let them fully relax.",
        duration: 40,
      },
    ],
  },
  {
    id: "pre-sleep-eye-relaxation",
    title: "Pre-Sleep Eye Relaxation",
    categoryId: EYE_CATEGORY_IDS.EVENING_WIND_DOWN,
    duration: 3,
    description:
      "A quiet sequence to ease your eyes into rest at the end of the day.",
    benefits: [
      "Eases eyes into rest",
      "Pairs well with winding down for sleep",
      "Very gentle, low effort",
    ],
    steps: [
      {
        title: "Settle In",
        instruction: "Lie back or sit comfortably and close your eyes.",
        duration: 20,
      },
      {
        title: "Slow Blinking",
        instruction:
          "Blink slowly a few times, then let your eyes stay closed.",
        duration: 30,
      },
      {
        title: "Palming",
        instruction: "Cup your palms gently over your closed eyes.",
        duration: 50,
      },
      {
        title: "Deep Breath",
        instruction: "Take several slow, deep breaths with your eyes resting.",
        duration: 50,
      },
      {
        title: "Release",
        instruction:
          "Let your eyelids feel heavy and relaxed before opening them.",
        duration: 30,
      },
    ],
  },

  // ---------- Long Study Session Recovery ----------
  {
    id: "long-study-session-recovery",
    title: "Long Study Session Recovery",
    categoryId: EYE_CATEGORY_IDS.LONG_STUDY_RECOVERY,
    duration: 4,
    description: "A fuller recovery sequence after hours of focused study.",
    benefits: [
      "Recovers from extended focus",
      "Combines several relief techniques",
      "Best after long sessions",
    ],
    steps: [
      {
        title: "Step Away",
        instruction: "Step back from your study space for a moment.",
        duration: 20,
      },
      {
        title: "Blink Reset",
        instruction: "Blink slowly and fully, fifteen times.",
        duration: 30,
      },
      {
        title: "20-20-20 Look Away",
        instruction: "Look at something roughly 20 feet away for 20 seconds.",
        duration: 30,
      },
      {
        title: "Palming",
        instruction: "Cup your palms gently over your closed eyes and breathe.",
        duration: 50,
      },
      {
        title: "Eye Rolls",
        instruction: "Roll your eyes slowly in both directions.",
        duration: 40,
      },
      {
        title: "Near-Far Focus",
        instruction: "Shift focus between something close and something far.",
        duration: 40,
      },
      {
        title: "Return Gently",
        instruction: "Open your eyes slowly and blink a few times.",
        duration: 30,
      },
    ],
  },
  {
    id: "deep-eye-recovery",
    title: "Deep Eye Recovery",
    categoryId: EYE_CATEGORY_IDS.LONG_STUDY_RECOVERY,
    duration: 4,
    description:
      "A thorough, unhurried sequence for eyes that have worked hard.",
    benefits: [
      "A deeper reset than a quick break",
      "Eases built-up tension",
      "Leaves eyes feeling rested",
    ],
    steps: [
      {
        title: "Settle In",
        instruction: "Sit comfortably and relax your shoulders.",
        duration: 20,
      },
      {
        title: "Eyelid Massage",
        instruction: "Gently massage your closed eyelids in small circles.",
        duration: 40,
      },
      {
        title: "Distance Gaze",
        instruction: "Rest your eyes on the farthest point you can see.",
        duration: 40,
      },
      {
        title: "Figure Eight",
        instruction: "Trace a slow figure eight with your eyes.",
        duration: 40,
      },
      {
        title: "Palming",
        instruction: "Cup your palms over your closed eyes and breathe slowly.",
        duration: 50,
      },
      {
        title: "Final Blinks",
        instruction: "Blink slowly and fully to close the session.",
        duration: 50,
      },
    ],
  },
];
