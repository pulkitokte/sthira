import { RECOVERY_CATEGORY_IDS } from "./recoveryCategories";

export const RECOVERY_SESSIONS = [
  // ---------- 2 Minute Reset ----------
  {
    id: "quick-reset-break",
    title: "Quick Reset",
    categoryId: RECOVERY_CATEGORY_IDS.TWO_MINUTE_RESET,
    duration: 2,
    description: "A fast reset to loosen up between study blocks.",
    steps: [
      {
        title: "Stand Tall",
        instruction: "Push your chair back and stand up, feet hip-width apart.",
      },
      {
        title: "Reach Up",
        instruction: "Raise both arms overhead and lengthen your spine.",
      },
      {
        title: "Roll Shoulders",
        instruction: "Roll your shoulders back in slow circles, five times.",
      },
      {
        title: "Shake It Out",
        instruction: "Gently shake out your hands and arms for a few seconds.",
      },
      {
        title: "Settle Back In",
        instruction: "Take one slow breath before returning to your seat.",
      },
    ],
    benefits: [
      "Loosens stiff shoulders",
      "Breaks mental fatigue",
      "Takes under two minutes",
    ],
  },
  {
    id: "instant-refresh",
    title: "Instant Refresh",
    categoryId: RECOVERY_CATEGORY_IDS.TWO_MINUTE_RESET,
    duration: 2,
    description: "A quick full-body wake-up you can do right at your desk.",
    steps: [
      {
        title: "Sit Tall",
        instruction: "Sit at the edge of your chair with your spine straight.",
      },
      {
        title: "Neck Tilt",
        instruction:
          "Gently tilt your head toward one shoulder, then the other.",
      },
      {
        title: "Spinal Twist",
        instruction:
          "Place one hand on the opposite knee and twist gently toward it.",
      },
      {
        title: "Wrist Stretch",
        instruction: "Extend one arm forward and gently pull the fingers back.",
      },
      {
        title: "Reset Breath",
        instruction: "Close your eyes and take three slow, even breaths.",
      },
    ],
    benefits: [
      "Refreshes a tired mind",
      "Eases sitting stiffness",
      "No need to leave your desk",
    ],
  },

  // ---------- Desk Stretch ----------
  {
    id: "seated-stretch-break",
    title: "Seated Stretch Break",
    categoryId: RECOVERY_CATEGORY_IDS.DESK_STRETCH,
    duration: 3,
    description: "Gentle stretches you can do without leaving your chair.",
    steps: [
      {
        title: "Seated Cat-Cow",
        instruction: "Hands on knees, arch and round your spine slowly.",
      },
      {
        title: "Side Reach",
        instruction:
          "Raise one arm overhead and lean gently to the opposite side.",
      },
      {
        title: "Forward Fold",
        instruction: "Fold forward over your knees and let your arms hang.",
      },
      {
        title: "Seated Twist",
        instruction: "Hold the back of your chair and twist gently toward it.",
      },
      {
        title: "Ankle Rolls",
        instruction:
          "Lift one foot and roll your ankle slowly in both directions.",
      },
      {
        title: "Return to Center",
        instruction:
          "Sit tall and take one easy breath before continuing your work.",
      },
    ],
    benefits: [
      "Eases lower back tightness",
      "Improves seated posture",
      "No equipment needed",
    ],
  },
  {
    id: "chair-side-mobility",
    title: "Chair-Side Mobility",
    categoryId: RECOVERY_CATEGORY_IDS.DESK_STRETCH,
    duration: 3,
    description: "Light mobility work to keep your joints comfortable.",
    steps: [
      {
        title: "Knee Lifts",
        instruction: "Lift one knee toward your chest, then switch sides.",
      },
      {
        title: "Shoulder Squeeze",
        instruction: "Draw your shoulder blades together and hold briefly.",
      },
      {
        title: "Hip Circles",
        instruction:
          "While seated, gently circle your hips in both directions.",
      },
      {
        title: "Wrist Circles",
        instruction: "Rotate both wrists slowly in each direction.",
      },
      {
        title: "Standing Calf Raise",
        instruction: "Stand and rise onto your toes a few times.",
      },
    ],
    benefits: [
      "Keeps joints from stiffening",
      "Improves circulation",
      "Easy to repeat hourly",
    ],
  },

  // ---------- Eye Recovery ----------
  {
    id: "20-20-20-eye-break",
    title: "20-20-20 Eye Break",
    categoryId: RECOVERY_CATEGORY_IDS.EYE_RECOVERY,
    duration: 2,
    description: "The simple rule eye doctors recommend, guided step by step.",
    steps: [
      {
        title: "Look Away",
        instruction: "Look at something roughly 20 feet away from your screen.",
      },
      {
        title: "Hold Your Gaze",
        instruction:
          "Keep looking at that distant point, letting your eyes relax.",
      },
      {
        title: "Blink Slowly",
        instruction: "Blink slowly and fully ten times.",
      },
      {
        title: "Soft Focus",
        instruction:
          "Let your gaze soften, not focusing on anything in particular.",
      },
      {
        title: "Return Gently",
        instruction: "Bring your eyes back to your screen slowly.",
      },
    ],
    benefits: [
      "Reduces eye strain",
      "Re-moistens dry eyes",
      "Easy to repeat hourly",
    ],
  },
  {
    id: "eye-strain-relief",
    title: "Eye Strain Relief",
    categoryId: RECOVERY_CATEGORY_IDS.EYE_RECOVERY,
    duration: 3,
    description: "A short sequence to soothe tired eyes after screen time.",
    steps: [
      {
        title: "Palming",
        instruction:
          "Rub your palms together gently, then cup them over your closed eyes.",
      },
      {
        title: "Breathe in the Dark",
        instruction:
          "Keep your eyes covered and breathe slowly for a few seconds.",
      },
      {
        title: "Eye Rolls",
        instruction:
          "Open your eyes and roll them slowly in a full circle, both directions.",
      },
      {
        title: "Near-Far Focus",
        instruction:
          "Focus on your thumb up close, then on something far away. Repeat a few times.",
      },
      {
        title: "Final Blink",
        instruction: "Close this with several slow, complete blinks.",
      },
    ],
    benefits: [
      "Soothes dry, tired eyes",
      "Relaxes eye muscles",
      "Helps refocus before continuing work",
    ],
  },

  // ---------- Neck & Shoulder Relief ----------
  {
    id: "neck-tension-release",
    title: "Neck Tension Release",
    categoryId: RECOVERY_CATEGORY_IDS.NECK_SHOULDER_RELIEF,
    duration: 3,
    description:
      "Targeted relief for the tightness that builds from looking down.",
    steps: [
      {
        title: "Chin Tuck",
        instruction:
          "Gently draw your chin back, as if making a double chin, and hold.",
      },
      {
        title: "Side Tilt",
        instruction:
          "Tilt your head toward one shoulder, holding gently, then switch.",
      },
      {
        title: "Slow Neck Rolls",
        instruction:
          "Roll your head in a slow, gentle circle, both directions.",
      },
      {
        title: "Shoulder Shrugs",
        instruction:
          "Raise your shoulders to your ears, then release them down.",
      },
      {
        title: "Gentle Forward Stretch",
        instruction: "Lower your chin toward your chest and hold softly.",
      },
    ],
    benefits: [
      "Eases tech-neck tension",
      "Improves head posture",
      "Relieves tightness from screen time",
    ],
  },
  {
    id: "shoulder-unwind",
    title: "Shoulder Unwind",
    categoryId: RECOVERY_CATEGORY_IDS.NECK_SHOULDER_RELIEF,
    duration: 3,
    description: "Loosen rounded, tense shoulders from long hours at a desk.",
    steps: [
      {
        title: "Shoulder Rolls",
        instruction: "Roll both shoulders backward in slow, full circles.",
      },
      {
        title: "Cross-Body Stretch",
        instruction:
          "Bring one arm across your chest and hold it gently with the other.",
      },
      {
        title: "Behind-Back Clasp",
        instruction:
          "Clasp your hands behind your back and lift gently to open your chest.",
      },
      {
        title: "Wall Angels",
        instruction:
          "With your back against a wall, slide your arms up and down slowly.",
      },
      {
        title: "Final Roll",
        instruction:
          "Finish with a few more slow shoulder rolls, letting them drop.",
      },
    ],
    benefits: [
      "Opens a rounded, hunched posture",
      "Eases shoulder tightness",
      "Counters desk slouching",
    ],
  },

  // ---------- Deep Breathing ----------
  {
    id: "calm-breath",
    title: "Calm Breath",
    categoryId: RECOVERY_CATEGORY_IDS.DEEP_BREATHING,
    duration: 2,
    description: "A short breathing reset to settle a busy mind.",
    steps: [
      {
        title: "Get Comfortable",
        instruction: "Sit comfortably with your feet flat on the floor.",
      },
      {
        title: "Inhale Slowly",
        instruction: "Breathe in slowly through your nose for a count of four.",
      },
      {
        title: "Hold Gently",
        instruction: "Hold your breath gently for a count of two.",
      },
      {
        title: "Exhale Fully",
        instruction:
          "Breathe out slowly through your mouth for a count of six.",
      },
      {
        title: "Repeat",
        instruction: "Repeat this cycle three more times at your own pace.",
      },
    ],
    benefits: [
      "Lowers stress quickly",
      "Settles a racing mind",
      "Can be done anywhere",
    ],
  },
  {
    id: "box-breathing-pause",
    title: "Box Breathing Pause",
    categoryId: RECOVERY_CATEGORY_IDS.DEEP_BREATHING,
    duration: 3,
    description: "A structured breathing pattern used to restore calm focus.",
    steps: [
      {
        title: "Inhale",
        instruction: "Breathe in slowly through your nose for a count of four.",
      },
      { title: "Hold", instruction: "Hold your breath for a count of four." },
      {
        title: "Exhale",
        instruction:
          "Breathe out slowly through your mouth for a count of four.",
      },
      {
        title: "Hold Again",
        instruction: "Hold the empty breath for a count of four.",
      },
      {
        title: "Repeat the Box",
        instruction: "Repeat this full cycle three to four times.",
      },
    ],
    benefits: [
      "Restores steady focus",
      "Calms pre-exam nerves",
      "Simple to remember",
    ],
  },

  // ---------- Focus Refresh ----------
  {
    id: "mental-reset",
    title: "Mental Reset",
    categoryId: RECOVERY_CATEGORY_IDS.FOCUS_REFRESH,
    duration: 2,
    description:
      "A short pause to clear mental clutter before your next study block.",
    steps: [
      {
        title: "Step Away",
        instruction: "Step back from your desk and stand for a moment.",
      },
      {
        title: "Unfocus Your Eyes",
        instruction: "Let your gaze soften and rest on nothing in particular.",
      },
      {
        title: "Three Breaths",
        instruction: "Take three slow, deliberate breaths.",
      },
      {
        title: "Name One Thing",
        instruction: "Silently name one thing you can see, hear, and feel.",
      },
      {
        title: "Return Ready",
        instruction: "Sit back down when you feel ready to begin again.",
      },
    ],
    benefits: [
      "Clears mental fatigue",
      "Helps you return with focus",
      "No equipment needed",
    ],
  },
  {
    id: "clarity-break",
    title: "Clarity Break",
    categoryId: RECOVERY_CATEGORY_IDS.FOCUS_REFRESH,
    duration: 3,
    description: "A short reset to settle scattered thoughts between subjects.",
    steps: [
      {
        title: "Pause Fully",
        instruction:
          "Stop what you're doing and set down anything in your hands.",
      },
      {
        title: "Slow Breathing",
        instruction:
          "Take five slow breaths, letting each exhale be longer than the inhale.",
      },
      {
        title: "Loosen Your Body",
        instruction: "Gently roll your shoulders and neck to release tension.",
      },
      {
        title: "One Intention",
        instruction: "Silently decide what you'll focus on next.",
      },
      {
        title: "Begin Again",
        instruction: "Return to your work with that one intention in mind.",
      },
    ],
    benefits: [
      "Helps switch between subjects",
      "Reduces scattered focus",
      "Builds a calm study rhythm",
    ],
  },
];
