export const SLEEP_RITUALS = [
  {
    id: 'five-minute-reset',
    title: '5 Minute Reset',
    duration: 5,
    description: 'A brief pause to separate the day from the night.',
    steps: [
      { title: 'Set Down the Day', instruction: 'Put your phone face-down or in another room. The day is done.', suggestedSeconds: 30 },
      { title: 'Loosen Your Shoulders', instruction: 'Roll your shoulders back slowly, three times.', suggestedSeconds: 40 },
      { title: 'Slow Your Breath', instruction: 'Inhale for four counts, hold for two, exhale for six. Repeat four times.', suggestedSeconds: 90 },
      { title: 'Settle', instruction: 'Lie down or sit comfortably. Let your body feel heavy and supported.', suggestedSeconds: 60 },
    ],
  },
  {
    id: 'gentle-evening-stretch',
    title: 'Gentle Evening Stretch',
    duration: 10,
    description: 'A slow stretch to release the tension the day left behind.',
    steps: [
      { title: 'Neck Release', instruction: 'Tilt your head toward one shoulder and hold gently for a few breaths. Switch sides.', suggestedSeconds: 60 },
      { title: 'Shoulder Rolls', instruction: 'Roll both shoulders backward in large, slow circles. Then forward.', suggestedSeconds: 50 },
      { title: 'Seated Forward Fold', instruction: 'Sit and reach toward your feet, letting your spine lengthen without straining.', suggestedSeconds: 60 },
      { title: 'Supine Spinal Twist', instruction: 'Lie on your back and let one knee fall across your body. Hold softly, then switch.', suggestedSeconds: 80 },
      { title: 'Deep Breathing', instruction: 'Lying flat, breathe slowly and fully. Let each exhale be longer than the inhale.', suggestedSeconds: 90 },
      { title: 'Rest', instruction: 'Stay still. Let your body feel the effects of the stretch without doing anything.', suggestedSeconds: 60 },
    ],
  },
  {
    id: 'screen-detox',
    title: 'Screen Detox',
    duration: 10,
    description: 'A gentle sequence to step away from screens and return to your body.',
    steps: [
      { title: 'Put the Phone Away', instruction: 'Place your phone out of reach or in another room. You are done with screens for the night.', suggestedSeconds: 30 },
      { title: 'Dim the Lights', instruction: 'Lower the brightness in your space. Let your eyes begin to relax.', suggestedSeconds: 30 },
      { title: 'Drink Water', instruction: 'Have a slow glass of water. No rush.', suggestedSeconds: 60 },
      { title: 'Eye Palming', instruction: 'Rub your palms together gently and cup them over your closed eyes. Breathe slowly.', suggestedSeconds: 60 },
      { title: 'Slow Breathing', instruction: 'Breathe in through your nose for four counts, out through your mouth for six. Repeat five times.', suggestedSeconds: 90 },
      { title: 'Settle In', instruction: 'Move to where you will sleep. Let the body know the day is over.', suggestedSeconds: 60 },
    ],
  },
  {
    id: 'gratitude-reflection',
    title: 'Gratitude Reflection',
    duration: 10,
    description: 'A quiet moment to close the day with awareness and gentleness.',
    steps: [
      { title: 'Pause and Arrive', instruction: 'Sit or lie comfortably. Take three slow breaths before you begin.', suggestedSeconds: 40 },
      { title: 'One Thing That Went Well', instruction: 'Think of one small moment today that felt good — however small. Hold it for a moment.', suggestedSeconds: 90 },
      { title: 'One Thing You Showed Up For', instruction: 'Notice one thing you did today, however ordinary, that took some effort.', suggestedSeconds: 90 },
      { title: 'Release the Unfinished', instruction: 'Whatever did not get done today is still there tomorrow. Let it rest for now.', suggestedSeconds: 60 },
      { title: 'Body Scan', instruction: 'Slowly notice each part of your body from feet to head. Release any holding as you go.', suggestedSeconds: 90 },
      { title: 'Rest into Sleep', instruction: 'Let your breath slow to its natural rhythm. You have done enough.', suggestedSeconds: 60 },
    ],
  },
  {
    id: 'full-wind-down',
    title: 'Full 20 Minute Wind-Down',
    duration: 20,
    description: 'A complete evening sequence — movement, breath, and reflection — to prepare for rest.',
    steps: [
      { title: 'Begin by Setting Down the Day', instruction: 'Phone away. Lights dimmed. Sit quietly for a moment and notice that you have finished.', suggestedSeconds: 60 },
      { title: 'Drink Water', instruction: 'A slow glass of water to close out the day.', suggestedSeconds: 60 },
      { title: 'Neck Release', instruction: 'Tilt your head gently toward each shoulder. Three breaths on each side.', suggestedSeconds: 60 },
      { title: 'Shoulder Rolls', instruction: 'Slow circles backward, then forward. Five each direction.', suggestedSeconds: 60 },
      { title: 'Seated Forward Fold', instruction: 'Reach toward your feet with a soft, unhurried stretch.', suggestedSeconds: 60 },
      { title: 'Supine Spinal Twist', instruction: 'Lie on your back. Let one knee fall across your body and hold gently. Switch sides.', suggestedSeconds: 80 },
      { title: 'Eye Palming', instruction: 'Cup warmed palms over your closed eyes. Breathe slowly in the dark.', suggestedSeconds: 60 },
      { title: 'Box Breathing', instruction: 'Breathe in for four, hold for four, out for four, hold for four. Four full cycles.', suggestedSeconds: 90 },
      { title: 'Gratitude Moment', instruction: 'Think of one small good thing from today. Hold it without judgment.', suggestedSeconds: 60 },
      { title: 'Body Scan', instruction: 'From feet to head, notice and release. Move slowly, without rushing.', suggestedSeconds: 90 },
      { title: 'Rest', instruction: 'Let go of the day. Your body knows how to sleep. Trust it.', suggestedSeconds: 90 },
    ],
  },
]

export const BEDTIME_REFLECTIONS = [
  'Your body now has space to rest.',
  'Rest is also part of growth.',
  'The day is behind you. This time belongs to sleep.',
  'You showed up today. Now let the body recover.',
  'Sleep is not the end of productivity — it is the foundation of it.',
  'Every hour of rest prepares you for the day to come.',
  'Nothing is required of you right now.',
]

export function getSleepRitualById(id) {
  return SLEEP_RITUALS.find((r) => r.id === id) ?? null
}

/**
 * Deterministic bedtime reflection — stable per ritual id, varies across rituals.
 */
export function getBedtimeReflection(ritualId) {
  const index = SLEEP_RITUALS.findIndex((r) => r.id === ritualId)
  return BEDTIME_REFLECTIONS[((index >= 0 ? index : 0)) % BEDTIME_REFLECTIONS.length]
}