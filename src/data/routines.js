import { CATEGORY_IDS } from "./routineCategories";

export const ROUTINES = [
  // ---------- Quick Start (5 min) ----------
  {
    id: "wake-and-stretch",
    title: "Wake & Stretch",
    categoryId: CATEGORY_IDS.QUICK_START,
    duration: 5,
    difficulty: "Beginner",
    energyLevel: "Calm",
    description: "A gentle five minutes to ease out of bed and into the day.",
    exercises: [
      {
        name: "Neck Rolls",
        duration: 30,
        instructions: "Slow circular neck movement, both directions.",
        bodyFocus: "Neck",
      },
      {
        name: "Shoulder Rolls",
        duration: 30,
        instructions:
          "Roll your shoulders backward then forward in slow circles.",
        bodyFocus: "Shoulders",
      },
      {
        name: "Standing Side Reach",
        duration: 40,
        instructions:
          "Reach one arm overhead and lean gently to the side, then switch.",
        bodyFocus: "Spine",
      },
      {
        name: "Standing Forward Fold",
        duration: 40,
        instructions:
          "Hinge at the hips and let your upper body hang loosely, knees soft.",
        bodyFocus: "Hamstrings",
      },
      {
        name: "Cat-Cow",
        duration: 60,
        instructions:
          "On hands and knees, alternate arching and rounding your spine with your breath.",
        bodyFocus: "Spine",
      },
      {
        name: "Deep Breathing",
        duration: 60,
        instructions:
          "Stand tall and take slow, deep breaths to settle into your body.",
        bodyFocus: "Breath",
      },
    ],
  },
  {
    id: "morning-sunrise-flow",
    title: "Morning Sunrise Flow",
    categoryId: CATEGORY_IDS.QUICK_START,
    duration: 5,
    difficulty: "Easy",
    energyLevel: "Steady",
    description: "Light, flowing movement to greet the day with an open body.",
    exercises: [
      {
        name: "Mountain Pose",
        duration: 30,
        instructions:
          "Stand tall, feet grounded, arms relaxed by your sides, breathing evenly.",
        bodyFocus: "Posture",
      },
      {
        name: "Arm Circles",
        duration: 30,
        instructions:
          "Small circles with extended arms, switching direction halfway.",
        bodyFocus: "Shoulders",
      },
      {
        name: "Standing Side Bend",
        duration: 40,
        instructions:
          "Reach one arm up and over for a gentle stretch along your side.",
        bodyFocus: "Spine",
      },
      {
        name: "Ankle Circles",
        duration: 30,
        instructions: "Rotate each ankle slowly in both directions.",
        bodyFocus: "Ankles",
      },
      {
        name: "Toe Touches",
        duration: 40,
        instructions:
          "Bend forward gently and reach toward your toes, knees soft.",
        bodyFocus: "Hamstrings",
      },
      {
        name: "Standing Spinal Twist",
        duration: 50,
        instructions:
          "Hands on hips, rotate your torso slowly from side to side.",
        bodyFocus: "Spine",
      },
      {
        name: "Deep Breathing",
        duration: 40,
        instructions: "Finish with a few slow, grounding breaths.",
        bodyFocus: "Breath",
      },
    ],
  },
  {
    id: "five-minute-reset",
    title: "Five-Minute Reset",
    categoryId: CATEGORY_IDS.QUICK_START,
    duration: 5,
    difficulty: "Beginner",
    energyLevel: "Calm",
    description: "A short reset for stiff joints first thing in the morning.",
    exercises: [
      {
        name: "Seated Neck Stretch",
        duration: 30,
        instructions:
          "Tilt your head gently toward each shoulder, holding briefly on each side.",
        bodyFocus: "Neck",
      },
      {
        name: "Wrist Circles",
        duration: 30,
        instructions: "Rotate your wrists slowly in both directions.",
        bodyFocus: "Wrists",
      },
      {
        name: "Shoulder Blade Squeeze",
        duration: 30,
        instructions:
          "Draw your shoulder blades together gently, then release.",
        bodyFocus: "Upper Back",
      },
      {
        name: "Standing Spinal Twist",
        duration: 40,
        instructions: "Stand and rotate your torso gently from side to side.",
        bodyFocus: "Spine",
      },
      {
        name: "Calf Raises",
        duration: 40,
        instructions:
          "Rise onto your toes and lower slowly, staying controlled.",
        bodyFocus: "Legs",
      },
      {
        name: "Standing Forward Fold",
        duration: 40,
        instructions:
          "Fold forward from the hips, knees soft, letting your head hang.",
        bodyFocus: "Hamstrings",
      },
      {
        name: "Deep Breathing",
        duration: 50,
        instructions: "Close with a few slow, even breaths.",
        bodyFocus: "Breath",
      },
    ],
  },

  // ---------- Daily Energy (10 min) ----------
  {
    id: "energize-and-rise",
    title: "Energize & Rise",
    categoryId: CATEGORY_IDS.DAILY_ENERGY,
    duration: 10,
    difficulty: "Easy",
    energyLevel: "Energizing",
    description:
      "A steady build of light cardio and stretching to lift your energy.",
    exercises: [
      {
        name: "Low-Impact Jacks",
        duration: 45,
        instructions:
          "Step side to side while raising your arms overhead, light and controlled.",
        bodyFocus: "Full Body",
      },
      {
        name: "Marching in Place",
        duration: 40,
        instructions:
          "Lift your knees to hip height at a steady, comfortable pace.",
        bodyFocus: "Legs",
      },
      {
        name: "Arm Circles",
        duration: 30,
        instructions:
          "Large, controlled circles with extended arms, both directions.",
        bodyFocus: "Shoulders",
      },
      {
        name: "Standing Side Bend",
        duration: 40,
        instructions: "Reach overhead and bend gently to each side.",
        bodyFocus: "Spine",
      },
      {
        name: "Bodyweight Squats",
        duration: 50,
        instructions:
          "Lower your hips back and down, then rise, knees tracking over your toes.",
        bodyFocus: "Legs",
      },
      {
        name: "Cat-Cow",
        duration: 50,
        instructions:
          "Alternate arching and rounding your spine on hands and knees.",
        bodyFocus: "Spine",
      },
      {
        name: "Plank Hold",
        duration: 30,
        instructions:
          "Hold a forearm or hand plank with a straight, relaxed spine.",
        bodyFocus: "Core",
      },
      {
        name: "Child's Pose",
        duration: 45,
        instructions:
          "Sit back onto your heels with arms extended forward, breathing slowly.",
        bodyFocus: "Spine",
      },
      {
        name: "Deep Breathing",
        duration: 60,
        instructions: "Finish standing tall with a few full, deep breaths.",
        bodyFocus: "Breath",
      },
    ],
  },
  {
    id: "steady-momentum",
    title: "Steady Momentum",
    categoryId: CATEGORY_IDS.DAILY_ENERGY,
    duration: 10,
    difficulty: "Moderate",
    energyLevel: "Steady",
    description: "Build strength and warmth through the legs, hips, and core.",
    exercises: [
      {
        name: "Standing Cat-Cow",
        duration: 40,
        instructions: "Hands on thighs, arch and round your spine standing up.",
        bodyFocus: "Spine",
      },
      {
        name: "Walking Lunges",
        duration: 60,
        instructions:
          "Step forward into a controlled lunge, alternating legs as you move.",
        bodyFocus: "Legs",
      },
      {
        name: "Wall Push-Ups",
        duration: 45,
        instructions:
          "Hands on a wall, bend your elbows to bring your chest closer, then push back.",
        bodyFocus: "Chest",
      },
      {
        name: "Standing Spinal Twist",
        duration: 40,
        instructions: "Rotate your torso slowly from side to side, arms loose.",
        bodyFocus: "Spine",
      },
      {
        name: "Glute Bridges",
        duration: 50,
        instructions:
          "Lying down, lift your hips toward the ceiling, then lower with control.",
        bodyFocus: "Hips",
      },
      {
        name: "Side Lunges",
        duration: 50,
        instructions:
          "Step out to one side, bending that knee while keeping the other leg straight.",
        bodyFocus: "Legs",
      },
      {
        name: "Shoulder Rolls",
        duration: 30,
        instructions: "Roll your shoulders in slow, deliberate circles.",
        bodyFocus: "Shoulders",
      },
      {
        name: "Deep Breathing",
        duration: 45,
        instructions:
          "Stand tall and breathe slowly to bring your heart rate back down.",
        bodyFocus: "Breath",
      },
    ],
  },
  {
    id: "full-body-wake-up",
    title: "Full-Body Wake-Up",
    categoryId: CATEGORY_IDS.DAILY_ENERGY,
    duration: 10,
    difficulty: "Easy",
    energyLevel: "Energizing",
    description: "A balanced mix of movement to wake every part of the body.",
    exercises: [
      {
        name: "Jumping Jacks (Low Impact)",
        duration: 40,
        instructions:
          "Step side to side while raising your arms, keeping it light on the joints.",
        bodyFocus: "Full Body",
      },
      {
        name: "High Knees (Slow)",
        duration: 40,
        instructions:
          "March in place, lifting your knees higher with each step.",
        bodyFocus: "Legs",
      },
      {
        name: "Arm Swings",
        duration: 30,
        instructions:
          "Swing both arms forward and back in a relaxed, rhythmic motion.",
        bodyFocus: "Shoulders",
      },
      {
        name: "Bodyweight Squats",
        duration: 45,
        instructions: "Lower into a squat and rise, keeping your chest lifted.",
        bodyFocus: "Legs",
      },
      {
        name: "Standing Side Bend",
        duration: 35,
        instructions: "Reach overhead and lean gently to each side.",
        bodyFocus: "Spine",
      },
      {
        name: "Plank Hold",
        duration: 30,
        instructions:
          "Hold a steady plank, keeping your hips level with your shoulders.",
        bodyFocus: "Core",
      },
      {
        name: "Forward Fold",
        duration: 40,
        instructions:
          "Fold forward from the hips, letting your spine lengthen.",
        bodyFocus: "Hamstrings",
      },
      {
        name: "Deep Breathing",
        duration: 60,
        instructions:
          "Stand tall and take slow, full breaths to close the routine.",
        bodyFocus: "Breath",
      },
    ],
  },

  // ---------- Morning Reset (15 min) ----------
  {
    id: "reset-and-realign",
    title: "Reset & Realign",
    categoryId: CATEGORY_IDS.MORNING_RESET,
    duration: 15,
    difficulty: "Moderate",
    energyLevel: "Steady",
    description:
      "A fuller practice to loosen the spine and hips and steady the mind.",
    exercises: [
      {
        name: "Neck Rolls",
        duration: 30,
        instructions: "Slow circular neck movement in both directions.",
        bodyFocus: "Neck",
      },
      {
        name: "Shoulder Rolls",
        duration: 30,
        instructions: "Roll your shoulders backward then forward.",
        bodyFocus: "Shoulders",
      },
      {
        name: "Cat-Cow",
        duration: 60,
        instructions:
          "Alternate arching and rounding your spine on hands and knees.",
        bodyFocus: "Spine",
      },
      {
        name: "Child's Pose",
        duration: 45,
        instructions:
          "Sit back onto your heels, arms extended, breathing slowly.",
        bodyFocus: "Spine",
      },
      {
        name: "Low Lunge Stretch",
        duration: 60,
        instructions:
          "Step one foot forward into a low lunge, sinking gently through the hip.",
        bodyFocus: "Hips",
      },
      {
        name: "Standing Spinal Twist",
        duration: 50,
        instructions: "Rotate your torso slowly from side to side.",
        bodyFocus: "Spine",
      },
      {
        name: "Bodyweight Squats",
        duration: 60,
        instructions:
          "Lower into a squat and rise with control, keeping your chest lifted.",
        bodyFocus: "Legs",
      },
      {
        name: "Standing Side Bend",
        duration: 40,
        instructions: "Reach overhead and lean gently to each side.",
        bodyFocus: "Spine",
      },
      {
        name: "Wall Push-Ups",
        duration: 45,
        instructions:
          "Hands on a wall, bend your elbows to lower your chest, then push back.",
        bodyFocus: "Chest",
      },
      {
        name: "Deep Breathing",
        duration: 80,
        instructions:
          "Stand or sit tall, taking slow, deep breaths to close the practice.",
        bodyFocus: "Breath",
      },
    ],
  },
  {
    id: "deep-stretch-reset",
    title: "Deep Stretch Reset",
    categoryId: CATEGORY_IDS.MORNING_RESET,
    duration: 15,
    difficulty: "Easy",
    energyLevel: "Calm",
    description: "Slow, grounding stretches for a body that woke up stiff.",
    exercises: [
      {
        name: "Seated Forward Fold",
        duration: 60,
        instructions:
          "Sit with legs extended and reach gently toward your feet.",
        bodyFocus: "Hamstrings",
      },
      {
        name: "Butterfly Stretch",
        duration: 60,
        instructions:
          "Sit with the soles of your feet together, gently pressing your knees down.",
        bodyFocus: "Hips",
      },
      {
        name: "Cat-Cow",
        duration: 60,
        instructions:
          "Alternate arching and rounding your spine on hands and knees.",
        bodyFocus: "Spine",
      },
      {
        name: "Child's Pose",
        duration: 60,
        instructions:
          "Sit back onto your heels with arms extended forward, breathing slowly.",
        bodyFocus: "Spine",
      },
      {
        name: "Seated Spinal Twist",
        duration: 50,
        instructions: "Sitting tall, rotate your torso gently to each side.",
        bodyFocus: "Spine",
      },
      {
        name: "Neck Stretch",
        duration: 40,
        instructions: "Tilt your head toward each shoulder, holding gently.",
        bodyFocus: "Neck",
      },
      {
        name: "Standing Forward Fold",
        duration: 50,
        instructions: "Hinge at the hips and let your upper body hang loosely.",
        bodyFocus: "Hamstrings",
      },
      {
        name: "Deep Breathing",
        duration: 80,
        instructions:
          "Sit or stand comfortably and breathe slowly to close the practice.",
        bodyFocus: "Breath",
      },
    ],
  },

  // ---------- Full Morning Flow (20 min) ----------
  {
    id: "complete-morning-practice",
    title: "Complete Morning Practice",
    categoryId: CATEGORY_IDS.FULL_MORNING_FLOW,
    duration: 20,
    difficulty: "Moderate",
    energyLevel: "Energizing",
    description:
      "A full practice covering mobility, light strength, and breath.",
    exercises: [
      {
        name: "Neck Rolls",
        duration: 30,
        instructions: "Slow circular neck movement in both directions.",
        bodyFocus: "Neck",
      },
      {
        name: "Shoulder Rolls",
        duration: 30,
        instructions: "Roll your shoulders backward then forward.",
        bodyFocus: "Shoulders",
      },
      {
        name: "Cat-Cow",
        duration: 60,
        instructions:
          "Alternate arching and rounding your spine on hands and knees.",
        bodyFocus: "Spine",
      },
      {
        name: "Low-Impact Jacks",
        duration: 45,
        instructions:
          "Step side to side raising your arms overhead, light on the joints.",
        bodyFocus: "Full Body",
      },
      {
        name: "Bodyweight Squats",
        duration: 60,
        instructions: "Lower into a squat and rise with control.",
        bodyFocus: "Legs",
      },
      {
        name: "Walking Lunges",
        duration: 60,
        instructions: "Step forward into a controlled lunge, alternating legs.",
        bodyFocus: "Legs",
      },
      {
        name: "Plank Hold",
        duration: 40,
        instructions:
          "Hold a steady plank with hips level with your shoulders.",
        bodyFocus: "Core",
      },
      {
        name: "Wall Push-Ups",
        duration: 45,
        instructions:
          "Bend your elbows to lower your chest toward a wall, then push back.",
        bodyFocus: "Chest",
      },
      {
        name: "Standing Spinal Twist",
        duration: 50,
        instructions: "Rotate your torso slowly from side to side.",
        bodyFocus: "Spine",
      },
      {
        name: "Standing Side Bend",
        duration: 40,
        instructions: "Reach overhead and lean gently to each side.",
        bodyFocus: "Spine",
      },
      {
        name: "Child's Pose",
        duration: 60,
        instructions:
          "Sit back onto your heels with arms extended, breathing slowly.",
        bodyFocus: "Spine",
      },
      {
        name: "Deep Breathing",
        duration: 90,
        instructions:
          "Stand tall and take slow, full breaths to close the practice.",
        bodyFocus: "Breath",
      },
    ],
  },
  {
    id: "sunrise-strength-flow",
    title: "Sunrise Strength Flow",
    categoryId: CATEGORY_IDS.FULL_MORNING_FLOW,
    duration: 20,
    difficulty: "Moderate",
    energyLevel: "Energizing",
    description:
      "Light strength work woven through a flowing, breath-led sequence.",
    exercises: [
      {
        name: "Arm Circles",
        duration: 30,
        instructions:
          "Large controlled circles with extended arms, both directions.",
        bodyFocus: "Shoulders",
      },
      {
        name: "Marching in Place",
        duration: 40,
        instructions: "Lift your knees to hip height at a steady pace.",
        bodyFocus: "Legs",
      },
      {
        name: "Bodyweight Squats",
        duration: 60,
        instructions: "Lower into a squat and rise with control, chest lifted.",
        bodyFocus: "Legs",
      },
      {
        name: "Side Lunges",
        duration: 50,
        instructions:
          "Step out to one side, bending that knee while the other stays straight.",
        bodyFocus: "Legs",
      },
      {
        name: "Glute Bridges",
        duration: 50,
        instructions:
          "Lying down, lift your hips toward the ceiling, then lower with control.",
        bodyFocus: "Hips",
      },
      {
        name: "Plank Hold",
        duration: 40,
        instructions: "Hold a steady plank, engaging your core.",
        bodyFocus: "Core",
      },
      {
        name: "Wall Push-Ups",
        duration: 45,
        instructions:
          "Bend your elbows to lower your chest toward a wall, then push back.",
        bodyFocus: "Chest",
      },
      {
        name: "Standing Spinal Twist",
        duration: 50,
        instructions: "Rotate your torso slowly from side to side.",
        bodyFocus: "Spine",
      },
      {
        name: "Low Lunge Stretch",
        duration: 60,
        instructions:
          "Step one foot forward into a low lunge, sinking gently through the hip.",
        bodyFocus: "Hips",
      },
      {
        name: "Standing Forward Fold",
        duration: 50,
        instructions: "Hinge at the hips and let your upper body hang loosely.",
        bodyFocus: "Hamstrings",
      },
      {
        name: "Deep Breathing",
        duration: 90,
        instructions:
          "Stand tall and take slow, full breaths to close the practice.",
        bodyFocus: "Breath",
      },
    ],
  },

  // ---------- Beginner Friendly ----------
  {
    id: "first-steps",
    title: "First Steps",
    categoryId: CATEGORY_IDS.BEGINNER_FRIENDLY,
    duration: 5,
    difficulty: "Beginner",
    energyLevel: "Calm",
    description: "A gentle, no-pressure introduction to morning movement.",
    exercises: [
      {
        name: "Neck Rolls",
        duration: 30,
        instructions:
          "Slow circular neck movement, both directions, at your own pace.",
        bodyFocus: "Neck",
      },
      {
        name: "Shoulder Rolls",
        duration: 30,
        instructions: "Roll your shoulders gently backward then forward.",
        bodyFocus: "Shoulders",
      },
      {
        name: "Seated Forward Fold",
        duration: 50,
        instructions:
          "Sit and reach gently toward your feet, only as far as is comfortable.",
        bodyFocus: "Hamstrings",
      },
      {
        name: "Standing Side Reach",
        duration: 40,
        instructions: "Reach one arm overhead and lean gently to the side.",
        bodyFocus: "Spine",
      },
      {
        name: "Ankle Circles",
        duration: 30,
        instructions:
          "Rotate each ankle slowly, holding onto something stable if needed.",
        bodyFocus: "Ankles",
      },
      {
        name: "Deep Breathing",
        duration: 90,
        instructions: "Sit or stand comfortably and breathe slowly and fully.",
        bodyFocus: "Breath",
      },
    ],
  },
  {
    id: "gentle-beginnings",
    title: "Gentle Beginnings",
    categoryId: CATEGORY_IDS.BEGINNER_FRIENDLY,
    duration: 10,
    difficulty: "Beginner",
    energyLevel: "Calm",
    description:
      "A slightly longer, still very gentle routine for easing into a habit.",
    exercises: [
      {
        name: "Seated Neck Stretch",
        duration: 30,
        instructions:
          "Tilt your head gently toward each shoulder, holding briefly.",
        bodyFocus: "Neck",
      },
      {
        name: "Shoulder Rolls",
        duration: 30,
        instructions: "Roll your shoulders gently in both directions.",
        bodyFocus: "Shoulders",
      },
      {
        name: "Cat-Cow",
        duration: 60,
        instructions: "Move slowly between arching and rounding your spine.",
        bodyFocus: "Spine",
      },
      {
        name: "Child's Pose",
        duration: 60,
        instructions:
          "Sit back onto your heels with arms extended forward, resting.",
        bodyFocus: "Spine",
      },
      {
        name: "Seated Spinal Twist",
        duration: 50,
        instructions: "Sitting tall, rotate your torso gently to each side.",
        bodyFocus: "Spine",
      },
      {
        name: "Standing Forward Fold",
        duration: 50,
        instructions: "Hinge at the hips, knees soft, and let your head hang.",
        bodyFocus: "Hamstrings",
      },
      {
        name: "Standing Side Bend",
        duration: 40,
        instructions: "Reach overhead and bend gently to each side.",
        bodyFocus: "Spine",
      },
      {
        name: "Deep Breathing",
        duration: 90,
        instructions:
          "Sit or stand comfortably and breathe slowly to close the practice.",
        bodyFocus: "Breath",
      },
    ],
  },
];
