// src/data/morningFlowExercises.js
// Morning Flow exercise database.
// Architecture-only phase: every exercise is fully described for display
// purposes, but nothing here drives timers, playback, or progress yet.
// thumbnailPlaceholder / illustrationPlaceholder / futureAnimationId are
// reserved keys for future asset and animation phases — they are not
// resolved to real files yet, only carried as data.

import { MORNING_FLOW_CATEGORY_IDS } from "./morningFlowCategories";

export const MORNING_FLOW_EXERCISES = [
  // ── Warm Up ─────────────────────────────────────────────────────────────
  {
    id: "warmup-neck-rolls",
    title: "Neck Rolls",
    description:
      "Slow, circular movements that release tension gathered from hours of looking down at screens.",
    difficulty: "Beginner",
    duration: "30 sec",
    category: MORNING_FLOW_CATEGORY_IDS.WARM_UP,
    targetMuscles: ["Neck", "Upper Trapezius"],
    benefits: [
      "Eases neck stiffness",
      "Improves head mobility",
      "Calms the nervous system",
    ],
    instructions: [
      "Stand or sit tall with relaxed shoulders",
      "Slowly drop your chin to your chest",
      "Roll your head gently to one side, then back, then the other side",
      "Keep the movement slow and controlled throughout",
    ],
    tips: [
      "Never force the stretch — stay within a comfortable range",
      "Breathe slowly as you roll",
    ],
    thumbnailPlaceholder: "warmup-neck-rolls-thumb",
    illustrationPlaceholder: "warmup-neck-rolls-illustration",
    futureAnimationId: "anim-warmup-neck-rolls",
  },
  {
    id: "warmup-shoulder-rolls",
    title: "Shoulder Rolls",
    description:
      "A simple rolling motion that loosens tight shoulders and improves posture before the day begins.",
    difficulty: "Beginner",
    duration: "30 sec",
    category: MORNING_FLOW_CATEGORY_IDS.WARM_UP,
    targetMuscles: ["Shoulders", "Upper Back"],
    benefits: [
      "Releases shoulder tension",
      "Improves posture awareness",
      "Increases blood flow to the upper body",
    ],
    instructions: [
      "Stand with arms relaxed at your sides",
      "Lift both shoulders up toward your ears",
      "Roll them back and down in a smooth circle",
      "Repeat, then reverse direction",
    ],
    tips: [
      "Keep the motion slow rather than fast and small",
      "Let your arms hang loose throughout",
    ],
    thumbnailPlaceholder: "warmup-shoulder-rolls-thumb",
    illustrationPlaceholder: "warmup-shoulder-rolls-illustration",
    futureAnimationId: "anim-warmup-shoulder-rolls",
  },
  {
    id: "warmup-arm-circles",
    title: "Arm Circles",
    description:
      "Gentle circular arm movements that warm up the shoulder joints and upper body.",
    difficulty: "Beginner",
    duration: "30 sec",
    category: MORNING_FLOW_CATEGORY_IDS.WARM_UP,
    targetMuscles: ["Shoulders", "Arms"],
    benefits: [
      "Warms up the shoulder joints",
      "Increases upper body circulation",
      "Prepares arms for movement ahead",
    ],
    instructions: [
      "Extend both arms out to your sides at shoulder height",
      "Make small circles forward for several seconds",
      "Reverse direction and circle backward",
      "Keep your core gently engaged throughout",
    ],
    tips: [
      "Start with small circles before making them larger",
      "Keep shoulders relaxed, not hunched",
    ],
    thumbnailPlaceholder: "warmup-arm-circles-thumb",
    illustrationPlaceholder: "warmup-arm-circles-illustration",
    futureAnimationId: "anim-warmup-arm-circles",
  },
  {
    id: "warmup-march-in-place",
    title: "March in Place",
    description:
      "A gentle rhythmic march that raises your heart rate and wakes up the whole body.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.WARM_UP,
    targetMuscles: ["Hip Flexors", "Legs", "Core"],
    benefits: [
      "Raises heart rate gently",
      "Improves coordination",
      "Warms up the legs and core",
    ],
    instructions: [
      "Stand tall with feet hip-width apart",
      "Lift one knee toward your chest, then lower it",
      "Alternate legs in a steady marching rhythm",
      "Swing your arms naturally as you march",
    ],
    tips: [
      "Keep the pace comfortable, not rushed",
      "Land softly on the balls of your feet",
    ],
    thumbnailPlaceholder: "warmup-march-in-place-thumb",
    illustrationPlaceholder: "warmup-march-in-place-illustration",
    futureAnimationId: "anim-warmup-march-in-place",
  },
  {
    id: "warmup-hip-circles",
    title: "Hip Circles",
    description:
      "Circular hip movements that loosen the lower back and hips after long periods of sitting.",
    difficulty: "Beginner",
    duration: "30 sec",
    category: MORNING_FLOW_CATEGORY_IDS.WARM_UP,
    targetMuscles: ["Hips", "Lower Back"],
    benefits: [
      "Loosens tight hips",
      "Eases lower back tension",
      "Improves range of motion",
    ],
    instructions: [
      "Stand with hands resting on your hips",
      "Make slow, wide circles with your hips",
      "Complete several circles in one direction",
      "Reverse and repeat in the other direction",
    ],
    tips: [
      "Keep knees soft, not locked",
      "Move at a pace that feels smooth, not forced",
    ],
    thumbnailPlaceholder: "warmup-hip-circles-thumb",
    illustrationPlaceholder: "warmup-hip-circles-illustration",
    futureAnimationId: "anim-warmup-hip-circles",
  },
  {
    id: "warmup-ankle-mobility",
    title: "Ankle Mobility",
    description:
      "Simple ankle rotations and flexes that prepare your feet and ankles for movement.",
    difficulty: "Beginner",
    duration: "30 sec",
    category: MORNING_FLOW_CATEGORY_IDS.WARM_UP,
    targetMuscles: ["Ankles", "Calves"],
    benefits: [
      "Improves ankle flexibility",
      "Supports balance and stability",
      "Reduces stiffness from sitting",
    ],
    instructions: [
      "Sit or stand while lifting one foot slightly off the ground",
      "Rotate your ankle slowly in one direction",
      "Reverse direction, then switch feet",
      "Point and flex your foot a few times to finish",
    ],
    tips: [
      "Hold onto something steady if balance feels tricky",
      "Keep the movement slow and deliberate",
    ],
    thumbnailPlaceholder: "warmup-ankle-mobility-thumb",
    illustrationPlaceholder: "warmup-ankle-mobility-illustration",
    futureAnimationId: "anim-warmup-ankle-mobility",
  },
  {
    id: "warmup-gentle-twists",
    title: "Gentle Twists",
    description:
      "A soft rotational movement through the torso that wakes up the spine and core.",
    difficulty: "Beginner",
    duration: "30 sec",
    category: MORNING_FLOW_CATEGORY_IDS.WARM_UP,
    targetMuscles: ["Obliques", "Spine"],
    benefits: [
      "Warms up the spine",
      "Gently activates the core",
      "Improves rotational mobility",
    ],
    instructions: [
      "Stand with feet hip-width apart and arms relaxed",
      "Gently rotate your torso to one side",
      "Return to center, then rotate to the other side",
      "Let your arms swing naturally with the motion",
    ],
    tips: [
      "Keep hips facing forward as the torso rotates",
      "Move slowly rather than swinging quickly",
    ],
    thumbnailPlaceholder: "warmup-gentle-twists-thumb",
    illustrationPlaceholder: "warmup-gentle-twists-illustration",
    futureAnimationId: "anim-warmup-gentle-twists",
  },

  // ── Mobility ────────────────────────────────────────────────────────────
  {
    id: "mobility-cat-cow",
    title: "Cat Cow",
    description:
      "A flowing spinal movement between arching and rounding the back, classic for morning mobility.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.MOBILITY,
    targetMuscles: ["Spine", "Core", "Lower Back"],
    benefits: [
      "Increases spinal flexibility",
      "Relieves back tension",
      "Coordinates breath with movement",
    ],
    instructions: [
      "Come onto your hands and knees in a tabletop position",
      "Inhale, drop your belly, and lift your chest and tailbone (Cow)",
      "Exhale, round your spine and tuck your chin (Cat)",
      "Flow slowly between the two positions",
    ],
    tips: [
      "Move with your breath, not against it",
      "Keep wrists stacked under shoulders throughout",
    ],
    thumbnailPlaceholder: "mobility-cat-cow-thumb",
    illustrationPlaceholder: "mobility-cat-cow-illustration",
    futureAnimationId: "anim-mobility-cat-cow",
  },
  {
    id: "mobility-thoracic-rotation",
    title: "Thoracic Rotation",
    description:
      "A kneeling rotation that targets the upper back, easing stiffness from long hours of sitting.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.MOBILITY,
    targetMuscles: ["Upper Back", "Shoulders", "Spine"],
    benefits: [
      "Improves upper back rotation",
      "Eases mid-back stiffness",
      "Supports better posture",
    ],
    instructions: [
      "Start on hands and knees, one hand resting behind your head",
      "Rotate your elbow up toward the ceiling",
      "Follow the movement with your gaze",
      "Return slowly and repeat on the other side",
    ],
    tips: [
      "Keep hips as still as possible during the rotation",
      "Move within a comfortable range only",
    ],
    thumbnailPlaceholder: "mobility-thoracic-rotation-thumb",
    illustrationPlaceholder: "mobility-thoracic-rotation-illustration",
    futureAnimationId: "anim-mobility-thoracic-rotation",
  },
  {
    id: "mobility-worlds-greatest-stretch",
    title: "World's Greatest Stretch",
    description:
      "A full-body mobility flow combining a lunge, rotation, and hamstring stretch in one movement.",
    difficulty: "Beginner",
    duration: "1 min",
    category: MORNING_FLOW_CATEGORY_IDS.MOBILITY,
    targetMuscles: ["Hips", "Hamstrings", "Spine", "Shoulders"],
    benefits: [
      "Opens hips and hamstrings together",
      "Improves total-body mobility",
      "Prepares the body for varied movement",
    ],
    instructions: [
      "Step one foot forward into a low lunge",
      "Place both hands on the ground inside your front foot",
      "Rotate your torso and reach one arm toward the ceiling",
      "Return hands down, then straighten the front leg to stretch the hamstring",
    ],
    tips: [
      "Move through each part slowly rather than rushing the flow",
      "Keep your back knee softly grounded",
    ],
    thumbnailPlaceholder: "mobility-worlds-greatest-stretch-thumb",
    illustrationPlaceholder: "mobility-worlds-greatest-stretch-illustration",
    futureAnimationId: "anim-mobility-worlds-greatest-stretch",
  },
  {
    id: "mobility-hip-flexor-stretch",
    title: "Hip Flexor Stretch",
    description:
      "A kneeling stretch that lengthens the front of the hip, tight from prolonged sitting.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.MOBILITY,
    targetMuscles: ["Hip Flexors", "Quadriceps"],
    benefits: [
      "Releases tight hip flexors",
      "Counters the effects of sitting",
      "Improves hip extension",
    ],
    instructions: [
      "Kneel on one knee with the other foot planted in front",
      "Gently shift your weight forward",
      "Feel a stretch along the front of the kneeling hip",
      "Hold, then switch sides",
    ],
    tips: [
      "Keep your torso upright rather than leaning forward",
      "Place a cushion under your knee if needed",
    ],
    thumbnailPlaceholder: "mobility-hip-flexor-stretch-thumb",
    illustrationPlaceholder: "mobility-hip-flexor-stretch-illustration",
    futureAnimationId: "anim-mobility-hip-flexor-stretch",
  },
  {
    id: "mobility-hamstring-mobility",
    title: "Hamstring Mobility",
    description:
      "A controlled forward reach that gently mobilizes tight hamstrings.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.MOBILITY,
    targetMuscles: ["Hamstrings", "Lower Back"],
    benefits: [
      "Improves hamstring flexibility",
      "Supports lower back comfort",
      "Prepares legs for standing movement",
    ],
    instructions: [
      "Stand with one heel resting on a low surface, leg straight",
      "Hinge gently forward from the hips",
      "Feel a stretch along the back of the extended leg",
      "Hold, then switch legs",
    ],
    tips: [
      "Keep your back long rather than rounding forward",
      "Bend the standing leg slightly if needed",
    ],
    thumbnailPlaceholder: "mobility-hamstring-mobility-thumb",
    illustrationPlaceholder: "mobility-hamstring-mobility-illustration",
    futureAnimationId: "anim-mobility-hamstring-mobility",
  },
  {
    id: "mobility-spinal-rotation",
    title: "Spinal Rotation",
    description:
      "A seated or standing rotation that restores mobility through the entire spine.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.MOBILITY,
    targetMuscles: ["Spine", "Obliques"],
    benefits: [
      "Increases spinal rotation",
      "Eases tension from prolonged sitting",
      "Improves everyday twisting movements",
    ],
    instructions: [
      "Sit or stand tall with arms crossed over your chest",
      "Rotate your torso slowly to one side",
      "Return to center, then rotate to the other side",
      "Keep your hips facing forward throughout",
    ],
    tips: [
      "Lead the rotation with your ribcage, not your arms",
      "Keep the movement slow and controlled",
    ],
    thumbnailPlaceholder: "mobility-spinal-rotation-thumb",
    illustrationPlaceholder: "mobility-spinal-rotation-illustration",
    futureAnimationId: "anim-mobility-spinal-rotation",
  },

  // ── Strength ────────────────────────────────────────────────────────────
  {
    id: "strength-bodyweight-squats",
    title: "Bodyweight Squats",
    description:
      "A foundational lower-body movement that builds strength using just your body weight.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.STRENGTH,
    targetMuscles: ["Quadriceps", "Glutes", "Core"],
    benefits: [
      "Builds functional leg strength",
      "Supports everyday movements like sitting and standing",
      "Engages the core for stability",
    ],
    instructions: [
      "Stand with feet shoulder-width apart",
      "Bend your knees and hips to lower into a squat",
      "Keep your chest lifted and weight in your heels",
      "Push through your heels to stand back up",
    ],
    tips: [
      "Only lower as far as feels comfortable and controlled",
      "Keep knees tracking over your toes",
    ],
    thumbnailPlaceholder: "strength-bodyweight-squats-thumb",
    illustrationPlaceholder: "strength-bodyweight-squats-illustration",
    futureAnimationId: "anim-strength-bodyweight-squats",
  },
  {
    id: "strength-wall-pushups",
    title: "Wall Pushups",
    description:
      "A beginner-friendly pushup variation performed against a wall to build upper body strength.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.STRENGTH,
    targetMuscles: ["Chest", "Shoulders", "Triceps"],
    benefits: [
      "Builds upper body strength gently",
      "Beginner-friendly alternative to floor pushups",
      "Improves shoulder stability",
    ],
    instructions: [
      "Stand an arm's length from a wall, hands placed at chest height",
      "Bend your elbows to bring your chest toward the wall",
      "Push back to the starting position",
      "Keep your body in a straight line throughout",
    ],
    tips: [
      "Step further from the wall to increase difficulty over time",
      "Keep your core gently engaged",
    ],
    thumbnailPlaceholder: "strength-wall-pushups-thumb",
    illustrationPlaceholder: "strength-wall-pushups-illustration",
    futureAnimationId: "anim-strength-wall-pushups",
  },
  {
    id: "strength-glute-bridge",
    title: "Glute Bridge",
    description:
      "A floor-based movement that strengthens the glutes and lower back.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.STRENGTH,
    targetMuscles: ["Glutes", "Hamstrings", "Lower Back"],
    benefits: [
      "Strengthens the glutes and hamstrings",
      "Supports lower back health",
      "Counters the effects of prolonged sitting",
    ],
    instructions: [
      "Lie on your back with knees bent, feet flat on the floor",
      "Press through your heels to lift your hips toward the ceiling",
      "Squeeze your glutes at the top",
      "Lower back down with control",
    ],
    tips: [
      "Avoid overarching your lower back at the top",
      "Keep feet hip-width apart for stability",
    ],
    thumbnailPlaceholder: "strength-glute-bridge-thumb",
    illustrationPlaceholder: "strength-glute-bridge-illustration",
    futureAnimationId: "anim-strength-glute-bridge",
  },
  {
    id: "strength-bird-dog",
    title: "Bird Dog",
    description:
      "A core stability exercise that challenges balance while extending opposite arm and leg.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.STRENGTH,
    targetMuscles: ["Core", "Lower Back", "Glutes"],
    benefits: [
      "Builds core stability",
      "Improves balance and coordination",
      "Supports a healthy lower back",
    ],
    instructions: [
      "Start on hands and knees in a tabletop position",
      "Extend one arm forward and the opposite leg back",
      "Hold briefly, keeping your hips level",
      "Return and repeat on the other side",
    ],
    tips: [
      "Move slowly to avoid rocking side to side",
      "Keep your gaze down to maintain a neutral neck",
    ],
    thumbnailPlaceholder: "strength-bird-dog-thumb",
    illustrationPlaceholder: "strength-bird-dog-illustration",
    futureAnimationId: "anim-strength-bird-dog",
  },
  {
    id: "strength-superman-hold",
    title: "Superman Hold",
    description: "A gentle back-strengthening hold performed lying face down.",
    difficulty: "Beginner",
    duration: "30 sec",
    category: MORNING_FLOW_CATEGORY_IDS.STRENGTH,
    targetMuscles: ["Lower Back", "Glutes", "Shoulders"],
    benefits: [
      "Strengthens the lower back",
      "Improves posture-supporting muscles",
      "Builds gentle full-back endurance",
    ],
    instructions: [
      "Lie face down with arms extended in front of you",
      "Lift your arms, chest, and legs slightly off the floor",
      "Hold the lifted position briefly",
      "Lower back down with control",
    ],
    tips: [
      "Keep the lift small and controlled, not forced",
      "Keep your neck in a neutral position",
    ],
    thumbnailPlaceholder: "strength-superman-hold-thumb",
    illustrationPlaceholder: "strength-superman-hold-illustration",
    futureAnimationId: "anim-strength-superman-hold",
  },
  {
    id: "strength-dead-bug",
    title: "Dead Bug",
    description:
      "A slow, controlled core exercise that trains stability without straining the back.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.STRENGTH,
    targetMuscles: ["Core", "Hip Flexors"],
    benefits: [
      "Builds deep core strength",
      "Protects the lower back during training",
      "Improves coordination between arms and legs",
    ],
    instructions: [
      "Lie on your back with arms reaching toward the ceiling and knees bent at 90 degrees",
      "Slowly lower one arm and the opposite leg toward the floor",
      "Return to the starting position",
      "Repeat on the other side",
    ],
    tips: [
      "Keep your lower back gently pressed into the floor",
      "Move slowly rather than quickly",
    ],
    thumbnailPlaceholder: "strength-dead-bug-thumb",
    illustrationPlaceholder: "strength-dead-bug-illustration",
    futureAnimationId: "anim-strength-dead-bug",
  },
  {
    id: "strength-standing-calf-raises",
    title: "Standing Calf Raises",
    description:
      "A simple rise onto the toes that strengthens the calves and improves ankle stability.",
    difficulty: "Beginner",
    duration: "30 sec",
    category: MORNING_FLOW_CATEGORY_IDS.STRENGTH,
    targetMuscles: ["Calves", "Ankles"],
    benefits: [
      "Strengthens the calves",
      "Improves ankle stability",
      "Supports better balance",
    ],
    instructions: [
      "Stand tall with feet hip-width apart",
      "Rise slowly onto the balls of your feet",
      "Hold briefly at the top",
      "Lower back down with control",
    ],
    tips: [
      "Hold onto a wall or chair for balance if needed",
      "Rise and lower slowly rather than bouncing",
    ],
    thumbnailPlaceholder: "strength-standing-calf-raises-thumb",
    illustrationPlaceholder: "strength-standing-calf-raises-illustration",
    futureAnimationId: "anim-strength-standing-calf-raises",
  },

  // ── Balance ─────────────────────────────────────────────────────────────
  {
    id: "balance-single-leg-balance",
    title: "Single Leg Balance",
    description:
      "A simple standing balance hold that trains stability and focus.",
    difficulty: "Beginner",
    duration: "30 sec per side",
    category: MORNING_FLOW_CATEGORY_IDS.BALANCE,
    targetMuscles: ["Ankles", "Core", "Legs"],
    benefits: [
      "Improves balance and stability",
      "Strengthens stabilizing muscles",
      "Builds body awareness",
    ],
    instructions: [
      "Stand tall and shift your weight onto one foot",
      "Lift the other foot slightly off the ground",
      "Hold steady, keeping your gaze forward",
      "Lower and switch sides",
    ],
    tips: [
      "Keep a chair nearby for light support if needed",
      "Focus on a fixed point ahead to help steady yourself",
    ],
    thumbnailPlaceholder: "balance-single-leg-balance-thumb",
    illustrationPlaceholder: "balance-single-leg-balance-illustration",
    futureAnimationId: "anim-balance-single-leg-balance",
  },
  {
    id: "balance-heel-toe-walk",
    title: "Heel Toe Walk",
    description:
      "A slow walking pattern placing heel directly in front of toe, training coordination and balance.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.BALANCE,
    targetMuscles: ["Ankles", "Core", "Legs"],
    benefits: [
      "Improves walking balance",
      "Trains coordination",
      "Strengthens stabilizing muscles in the legs",
    ],
    instructions: [
      "Stand tall and take a step forward, placing heel directly in front of the opposite toe",
      "Continue walking in a straight line this way",
      "Keep your arms relaxed for balance",
      "Turn slowly and repeat",
    ],
    tips: [
      "Move slowly rather than rushing each step",
      "Practice near a wall for light support if needed",
    ],
    thumbnailPlaceholder: "balance-heel-toe-walk-thumb",
    illustrationPlaceholder: "balance-heel-toe-walk-illustration",
    futureAnimationId: "anim-balance-heel-toe-walk",
  },
  {
    id: "balance-standing-reach",
    title: "Standing Reach",
    description:
      "A controlled reaching movement that challenges balance while extending the body.",
    difficulty: "Beginner",
    duration: "30 sec per side",
    category: MORNING_FLOW_CATEGORY_IDS.BALANCE,
    targetMuscles: ["Core", "Legs", "Shoulders"],
    benefits: [
      "Challenges balance through movement",
      "Improves reach and coordination",
      "Builds core control",
    ],
    instructions: [
      "Stand on one leg with a slight bend in the standing knee",
      "Reach the opposite arm and torso forward and down slightly",
      "Return to standing tall",
      "Repeat, then switch legs",
    ],
    tips: [
      "Keep the reach small at first, extending it as balance improves",
      "Engage your core throughout the movement",
    ],
    thumbnailPlaceholder: "balance-standing-reach-thumb",
    illustrationPlaceholder: "balance-standing-reach-illustration",
    futureAnimationId: "anim-balance-standing-reach",
  },
  {
    id: "balance-tree-pose",
    title: "Tree Pose",
    description:
      "A classic yoga balance pose that builds focus, stability, and calm.",
    difficulty: "Beginner",
    duration: "30 sec per side",
    category: MORNING_FLOW_CATEGORY_IDS.BALANCE,
    targetMuscles: ["Ankles", "Core", "Hips"],
    benefits: [
      "Builds balance and focus",
      "Strengthens the standing leg",
      "Encourages a calm, centered mind",
    ],
    instructions: [
      "Stand tall and shift weight onto one foot",
      "Rest the other foot against your calf or inner thigh, avoiding the knee",
      "Bring your hands together at your chest",
      "Hold steady, then switch sides",
    ],
    tips: [
      "Keep your gaze on one fixed point to help stability",
      "Rest your foot lower on the leg if balance feels difficult",
    ],
    thumbnailPlaceholder: "balance-tree-pose-thumb",
    illustrationPlaceholder: "balance-tree-pose-illustration",
    futureAnimationId: "anim-balance-tree-pose",
  },
  {
    id: "balance-weight-shift",
    title: "Weight Shift",
    description:
      "A gentle side-to-side shifting movement that builds foundational balance control.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.BALANCE,
    targetMuscles: ["Hips", "Legs", "Core"],
    benefits: [
      "Builds foundational balance control",
      "Improves side-to-side stability",
      "Gentle introduction to balance training",
    ],
    instructions: [
      "Stand with feet slightly wider than hip-width",
      "Slowly shift your weight onto one foot, lifting the other heel slightly",
      "Shift back to center, then shift to the other side",
      "Keep the movement slow and controlled",
    ],
    tips: [
      "Keep your upper body upright throughout",
      "Move only as far as feels stable",
    ],
    thumbnailPlaceholder: "balance-weight-shift-thumb",
    illustrationPlaceholder: "balance-weight-shift-illustration",
    futureAnimationId: "anim-balance-weight-shift",
  },

  // ── Cool Down ───────────────────────────────────────────────────────────
  {
    id: "cooldown-forward-fold",
    title: "Forward Fold",
    description:
      "A gentle forward bend that stretches the entire back of the body and calms the mind.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.COOL_DOWN,
    targetMuscles: ["Hamstrings", "Lower Back"],
    benefits: [
      "Stretches hamstrings and back",
      "Calms the nervous system",
      "Eases tension after movement",
    ],
    instructions: [
      "Stand with feet hip-width apart",
      "Slowly hinge forward from the hips, letting your head hang heavy",
      "Let your knees bend slightly if needed",
      "Hold, breathing slowly, then rise back up with control",
    ],
    tips: [
      "Bend your knees generously if your hamstrings feel tight",
      "Rise up slowly to avoid dizziness",
    ],
    thumbnailPlaceholder: "cooldown-forward-fold-thumb",
    illustrationPlaceholder: "cooldown-forward-fold-illustration",
    futureAnimationId: "anim-cooldown-forward-fold",
  },
  {
    id: "cooldown-child-pose",
    title: "Child's Pose",
    description:
      "A restful kneeling stretch that gently lengthens the back and invites stillness.",
    difficulty: "Beginner",
    duration: "45 sec",
    category: MORNING_FLOW_CATEGORY_IDS.COOL_DOWN,
    targetMuscles: ["Lower Back", "Hips", "Shoulders"],
    benefits: [
      "Gently stretches the back and hips",
      "Encourages slow, deep breathing",
      "Provides a restful pause",
    ],
    instructions: [
      "Kneel on the floor and sit back onto your heels",
      "Fold forward, extending your arms in front of you",
      "Rest your forehead gently on the floor",
      "Breathe slowly and stay as long as feels comfortable",
    ],
    tips: [
      "Widen your knees slightly for more comfort",
      "Place a cushion under your hips or forehead if helpful",
    ],
    thumbnailPlaceholder: "cooldown-child-pose-thumb",
    illustrationPlaceholder: "cooldown-child-pose-illustration",
    futureAnimationId: "anim-cooldown-child-pose",
  },
  {
    id: "cooldown-chest-stretch",
    title: "Chest Stretch",
    description:
      "A doorway-style stretch that opens the chest and counters rounded, hunched posture.",
    difficulty: "Beginner",
    duration: "30 sec",
    category: MORNING_FLOW_CATEGORY_IDS.COOL_DOWN,
    targetMuscles: ["Chest", "Shoulders"],
    benefits: [
      "Opens the chest",
      "Counters slouched posture",
      "Eases shoulder tightness",
    ],
    instructions: [
      "Stand tall and clasp your hands gently behind your back",
      "Lift your chest and gently roll your shoulders back",
      "Feel a stretch across the front of your chest",
      "Hold and breathe slowly",
    ],
    tips: [
      "Keep your neck relaxed, not straining upward",
      "Only lift as high as feels comfortable",
    ],
    thumbnailPlaceholder: "cooldown-chest-stretch-thumb",
    illustrationPlaceholder: "cooldown-chest-stretch-illustration",
    futureAnimationId: "anim-cooldown-chest-stretch",
  },
  {
    id: "cooldown-quad-stretch",
    title: "Quad Stretch",
    description:
      "A standing stretch for the front of the thigh, easing tightness from squats and walking.",
    difficulty: "Beginner",
    duration: "30 sec per side",
    category: MORNING_FLOW_CATEGORY_IDS.COOL_DOWN,
    targetMuscles: ["Quadriceps", "Hip Flexors"],
    benefits: [
      "Stretches the front of the thigh",
      "Eases tightness after leg work",
      "Improves hip flexibility",
    ],
    instructions: [
      "Stand tall, holding onto something steady if needed",
      "Bend one knee and bring your heel toward your glutes",
      "Hold your ankle or foot gently",
      "Hold, then switch legs",
    ],
    tips: [
      "Keep your knees close together throughout",
      "Stand near a wall or chair for balance support",
    ],
    thumbnailPlaceholder: "cooldown-quad-stretch-thumb",
    illustrationPlaceholder: "cooldown-quad-stretch-illustration",
    futureAnimationId: "anim-cooldown-quad-stretch",
  },
  {
    id: "cooldown-breathing-recovery",
    title: "Breathing Recovery",
    description:
      "A few minutes of slow, deep breathing to settle the body after movement.",
    difficulty: "Beginner",
    duration: "1 min",
    category: MORNING_FLOW_CATEGORY_IDS.COOL_DOWN,
    targetMuscles: ["Diaphragm", "Core"],
    benefits: [
      "Lowers heart rate gently",
      "Calms the nervous system",
      "Closes the flow with a moment of stillness",
    ],
    instructions: [
      "Sit or lie down comfortably",
      "Inhale slowly through your nose for a count of four",
      "Exhale slowly through your mouth for a count of six",
      "Repeat for several rounds, letting your body settle",
    ],
    tips: [
      "Let your shoulders soften with each exhale",
      "There is no need to rush — this is meant to feel unhurried",
    ],
    thumbnailPlaceholder: "cooldown-breathing-recovery-thumb",
    illustrationPlaceholder: "cooldown-breathing-recovery-illustration",
    futureAnimationId: "anim-cooldown-breathing-recovery",
  },
  {
    id: "cooldown-neck-stretch",
    title: "Neck Stretch",
    description:
      "A gentle side stretch for the neck that closes out the flow with quiet release.",
    difficulty: "Beginner",
    duration: "30 sec per side",
    category: MORNING_FLOW_CATEGORY_IDS.COOL_DOWN,
    targetMuscles: ["Neck", "Upper Trapezius"],
    benefits: [
      "Releases lingering neck tension",
      "Encourages a slower, calmer finish",
      "Complements the breathing recovery",
    ],
    instructions: [
      "Sit or stand tall with relaxed shoulders",
      "Gently tilt your head toward one shoulder",
      "Hold softly, feeling a stretch along the opposite side of your neck",
      "Return to center, then repeat on the other side",
    ],
    tips: [
      "Avoid pulling on your head — let gravity do the work",
      "Keep both shoulders relaxed and level",
    ],
    thumbnailPlaceholder: "cooldown-neck-stretch-thumb",
    illustrationPlaceholder: "cooldown-neck-stretch-illustration",
    futureAnimationId: "anim-cooldown-neck-stretch",
  },
];

/**
 * Get all exercises for a given category id.
 * Mirrors the getSessionsByCategory pattern already used by
 * utils/recovery.js and utils/eyeRecovery.js.
 */
export function getExercisesByCategory(categoryId) {
  return MORNING_FLOW_EXERCISES.filter(
    (exercise) => exercise.category === categoryId,
  );
}

/**
 * Get a single exercise by id. Future-ready for a workout player phase.
 */
export function getExerciseById(exerciseId) {
  return (
    MORNING_FLOW_EXERCISES.find((exercise) => exercise.id === exerciseId) ??
    null
  );
}
