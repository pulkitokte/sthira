import { PATHS } from '../constants/navigation'

// ─────────────────────────────────────────────────────────────────────────────
// Ritual shape
// ─────────────────────────────────────────────────────────────────────────────
// id           — unique, stable identifier
// title        — short editorial heading (2–3 words)
// reflection   — one calm sentence
// suggestion   — what to actually do
// cta          — button label
// navigation   — { path, state } for the CTA tap

// ─────────────────────────────────────────────────────────────────────────────
// Signal-based override rituals
// Applied when a wellness or onboarding signal is strong enough to trump
// the weekday calendar. Priority: stress > energy > study load > activity.
// ─────────────────────────────────────────────────────────────────────────────

export const SIGNAL_RITUALS = {
  HIGH_STRESS: {
    id: 'signal-high-stress',
    title: 'Pause & Breathe',
    reflection:
      'Before moving into your next task, take two minutes for yourself. A brief pause can reset the rhythm of the whole day.',
    suggestion:
      'A short breathing session — just a few slow, deliberate breaths — is often the most useful thing on a heavy day.',
    cta: 'Try a breathing session',
    navigation: {
      path: PATHS.RECOVERY_PLAYER,
      state: { sessionId: 'box-breathing-pause' },
    },
  },

  LOW_ENERGY: {
    id: 'signal-low-energy',
    title: 'Gentle Start',
    reflection:
      'Low energy is information, not failure. Today, move gently and let the body lead.',
    suggestion:
      'A short, easy routine — even five minutes — can shift your energy more than rest alone.',
    cta: 'Start a gentle routine',
    navigation: { path: PATHS.LIBRARY, state: null },
  },

  HEAVY_STUDY: {
    id: 'signal-heavy-study',
    title: 'Rest Your Eyes',
    reflection:
      'Long study sessions are hard on the eyes. A small recovery break today protects your focus for tomorrow.',
    suggestion:
      'Step away from the screen for two minutes and let your eyes rest on something distant.',
    cta: 'Try eye recovery',
    navigation: { path: PATHS.EYE_RELAX, state: null },
  },

  BEGINNER: {
    id: 'signal-beginner',
    title: 'Begin Gently',
    reflection:
      'Every habit starts with a single day. There is no right amount — just the willingness to begin.',
    suggestion:
      'A five-minute beginner routine is all it takes today. Nothing more is needed.',
    cta: 'Browse beginner routines',
    navigation: { path: PATHS.LIBRARY, state: null },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Weekday rituals — indexed 0 (Sunday) through 6 (Saturday)
// Each day has a small pool so the engine can rotate across weeks without
// losing day-of-week character. New entries should always be appended.
// ─────────────────────────────────────────────────────────────────────────────

export const WEEKDAY_RITUALS = {
  // Sunday
  0: [
    {
      id: "sun-restore",
      title: "Move Slowly",
      reflection:
        "Sunday is for restoration. Move slowly and without purpose — not to improve, just to feel present in the body.",
      suggestion:
        "A long, unhurried stretch or an easy fifteen-minute flow. Nothing that needs effort.",
      cta: "Browse morning routines",
      navigation: { path: PATHS.LIBRARY, state: null },
    },
    {
      id: "sun-check-in",
      title: "Sunday Reset",
      reflection:
        "The end of one week and the breath before the next. A quiet check-in with yourself is the best thing you can do today.",
      suggestion:
        "Spend a few minutes on your wellness check-in, then let the rest of the day be easy.",
      cta: "Open wellness check-in",
      navigation: { path: PATHS.WELLNESS_TRACKER, state: null },
    },
    {
      id: "sun-hydrate",
      title: "Rest & Replenish",
      reflection:
        "Rest days are also recovery days. Water, movement, and a little stillness go a long way.",
      suggestion:
        "Log your water, do a short stretch, and notice one thing that went well this week.",
      cta: "Log water",
      navigation: { path: PATHS.HYDRATION, state: null },
    },
  ],

  // Monday
  1: [
    {
      id: "mon-intention",
      title: "Begin the Week",
      reflection:
        "Monday is not a deadline — it is an opening. Begin with movement before the week has a chance to fill up.",
      suggestion:
        "Five to ten minutes of morning movement before you open anything on your screen.",
      cta: "Start a morning routine",
      navigation: { path: PATHS.LIBRARY, state: null },
    },
    {
      id: "mon-steady",
      title: "Steady Ground",
      reflection:
        "A calm, steady Monday often shapes the whole week that follows. Build the foundation now.",
      suggestion:
        "A short morning routine and a full glass of water before your first study block.",
      cta: "Start a morning routine",
      navigation: { path: PATHS.LIBRARY, state: null },
    },
    {
      id: "mon-settle",
      title: "Settle In",
      reflection:
        "Before the week accelerates, take a moment to arrive. Notice how the body feels today.",
      suggestion:
        "A gentle wellness check-in followed by a five-minute stretch.",
      cta: "Open wellness check-in",
      navigation: { path: PATHS.WELLNESS_TRACKER, state: null },
    },
  ],

  // Tuesday
  2: [
    {
      id: "tue-momentum",
      title: "Build Momentum",
      reflection:
        "Tuesday is when the week finds its rhythm. Movement now supports the focus you need later.",
      suggestion:
        "A ten-minute routine to build energy before your longest study session of the day.",
      cta: "Start a morning routine",
      navigation: { path: PATHS.LIBRARY, state: null },
    },
    {
      id: "tue-posture",
      title: "Check Your Posture",
      reflection:
        "Hours of sitting accumulate quickly. A short posture reset midday can undo much of that tension.",
      suggestion:
        "A seated neck and shoulder stretch — three minutes, no equipment needed.",
      cta: "Try neck relief",
      navigation: {
        path: PATHS.RECOVERY_PLAYER,
        state: { sessionId: "neck-tension-release" },
      },
    },
    {
      id: "tue-water",
      title: "Stay Hydrated",
      reflection:
        "Mild dehydration is one of the quietest causes of low focus. A full day of water changes more than you might expect.",
      suggestion:
        "Log a glass of water now and aim to check in every hour through the afternoon.",
      cta: "Log water",
      navigation: { path: PATHS.HYDRATION, state: null },
    },
  ],

  // Wednesday
  3: [
    {
      id: "wed-midpoint",
      title: "Midweek Pause",
      reflection:
        "Wednesday is the pivot of the week. A short pause now — physical or reflective — helps carry you through to the other side.",
      suggestion:
        "A five-minute study break recovery session, chosen for whatever your body needs most.",
      cta: "Browse study break sessions",
      navigation: { path: PATHS.RECOVERY_LIBRARY, state: null },
    },
    {
      id: "wed-eyes",
      title: "Screen Break",
      reflection:
        "By mid-week, screen fatigue has been building since Monday. A deliberate eye break today is one of the best things you can do.",
      suggestion:
        "A two-minute eye recovery session before your afternoon study block.",
      cta: "Try eye recovery",
      navigation: { path: PATHS.EYE_RELAX, state: null },
    },
    {
      id: "wed-reflect",
      title: "Notice the Week",
      reflection:
        "You are halfway through. How is the week actually going? A quick check-in takes less than a minute.",
      suggestion:
        "A wellness check-in to notice your energy, focus, and stress at the midpoint.",
      cta: "Open wellness check-in",
      navigation: { path: PATHS.WELLNESS_TRACKER, state: null },
    },
  ],

  // Thursday
  4: [
    {
      id: "thu-sustain",
      title: "Sustain the Effort",
      reflection:
        "Thursday is when fatigue starts to show. Movement and water keep the body from becoming a distraction.",
      suggestion:
        "A short morning routine and a full hydration check before your first session.",
      cta: "Start a morning routine",
      navigation: { path: PATHS.LIBRARY, state: null },
    },
    {
      id: "thu-shoulder",
      title: "Unwind Your Shoulders",
      reflection:
        "By Thursday, tension tends to sit in the neck and shoulders. A few minutes of relief now will carry you through the day.",
      suggestion:
        "A shoulder unwind session — slow, deliberate, and just long enough.",
      cta: "Try shoulder relief",
      navigation: {
        path: PATHS.RECOVERY_PLAYER,
        state: { sessionId: "shoulder-unwind" },
      },
    },
    {
      id: "thu-breath",
      title: "A Steady Breath",
      reflection:
        "When the week feels heavy, breathing is the fastest reset available. Try it before your next task.",
      suggestion:
        "A two-minute calm breath session — just before you sit down to study.",
      cta: "Try breathing session",
      navigation: {
        path: PATHS.RECOVERY_PLAYER,
        state: { sessionId: "calm-breath" },
      },
    },
  ],

  // Friday
  5: [
    {
      id: "fri-recover",
      title: "Longer Recovery",
      reflection:
        "Friday deserves a little more than a five-minute break. You have carried the week — recover it properly.",
      suggestion:
        "A fifteen-minute morning reset, or a fuller study break recovery session.",
      cta: "Start a morning routine",
      navigation: { path: PATHS.LIBRARY, state: null },
    },
    {
      id: "fri-close",
      title: "Close the Week Well",
      reflection:
        "How you end a week shapes how you begin the next. A moment of reflection is more useful than one more hour of study.",
      suggestion:
        "A wellness check-in, a glass of water, and permission to finish the day early.",
      cta: "Open wellness check-in",
      navigation: { path: PATHS.WELLNESS_TRACKER, state: null },
    },
    {
      id: "fri-stretch",
      title: "End of Week Stretch",
      reflection:
        "Five days of sitting accumulate in the hips, back, and neck. A longer stretch today is an investment in the weekend.",
      suggestion:
        "A deep stretch reset — unhurried, floor-based, and restorative.",
      cta: "Start a routine",
      navigation: { path: PATHS.LIBRARY, state: null },
    },
  ],

  // Saturday
  6: [
    {
      id: "sat-explore",
      title: "Move Differently",
      reflection:
        "Saturday is an invitation to move outside the routine. Something slightly longer, slightly different.",
      suggestion:
        "A full twenty-minute flow — or simply the longest routine you have not yet tried.",
      cta: "Browse morning routines",
      navigation: { path: PATHS.LIBRARY, state: null },
    },
    {
      id: "sat-eyes",
      title: "Rest the Eyes",
      reflection:
        "Even on a rest day, screens find their way in. A short eye recovery session is a quiet act of care.",
      suggestion:
        "A screen fatigue reset — five minutes, sitting comfortably wherever you are.",
      cta: "Try eye recovery",
      navigation: {
        path: PATHS.EYE_RECOVERY_PLAYER,
        state: { sessionId: "screen-fatigue-reset" },
      },
    },
    {
      id: "sat-reflect",
      title: "Weekend Reflection",
      reflection:
        "The week is behind you. A short reflection on how you showed up — gently, without judgment — is a good Saturday practice.",
      suggestion: "A wellness check-in and a glance at this week's reflection.",
      navigation: { path: PATHS.WELLNESS_TRACKER, state: null },
    },
  ],
};