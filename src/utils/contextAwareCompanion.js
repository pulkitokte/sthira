// src/utils/contextAwareCompanion.js
// State detection and 250+ message pools for the Context-Aware Gentle Companion.
// Pure functions only. Read-only. No side effects. No new storage.
// Deterministic — same context always produces same message.

import { getTimePhase, getCurrentSeason } from "./atmosphereEngine";
import { getTodayEntry as getTodayWeather } from "./emotionalWeather";
import {
  getTodayEnergyValue,
  classifyEnergy,
  ENERGY_STATES,
} from "./energyGuidance";
import { hasReflectedToday, getAllReflectionDates } from "./gentleStreaks";

// ── Safe reader ───────────────────────────────────────────────────────────────

function safeRead(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// ── Data helpers ──────────────────────────────────────────────────────────────

function getTodayHydrationPct() {
  const today = new Date().toISOString().slice(0, 10);
  const candidates = ["sthira_hydration", "sthira_hydration_data"];
  for (const key of candidates) {
    const data = safeRead(key);
    if (!data) continue;
    if (Array.isArray(data)) {
      const e = data.find((x) => x.date === today);
      if (e?.goal > 0)
        return Math.min(100, Math.round((e.total / e.goal) * 100));
    }
    if (data?.todayTotal != null && data?.goal > 0)
      return Math.min(100, Math.round((data.todayTotal / data.goal) * 100));
    if (data?.[today]?.total != null && data?.[today]?.goal > 0)
      return Math.min(
        100,
        Math.round((data[today].total / data[today].goal) * 100),
      );
  }
  return null;
}

function getTodayGratitudeCount() {
  const today = new Date().toISOString().slice(0, 10);
  const data = safeRead("sthira_gratitude_garden");
  if (!Array.isArray(data)) return 0;
  return data.filter((e) => e.date === today).length;
}

function getTodayLetterCount() {
  const today = new Date().toISOString().slice(0, 10);
  const data = safeRead("sthira_letters");
  if (!Array.isArray(data)) return 0;
  return data.filter((e) => (e.createdAt ?? "").slice(0, 10) === today).length;
}

function hasCompletedMorningRoutineToday() {
  // Reads the progress context storage to check for today's completion
  const today = new Date().toISOString().slice(0, 10);
  const candidates = ["sthira_progress", "sthira_progress_data"];
  for (const key of candidates) {
    const data = safeRead(key);
    if (!data) continue;
    // Common patterns: array of completions with date, or lastCompletedDate field
    if (Array.isArray(data)) {
      if (data.some((e) => (e.date ?? e.completedAt?.slice?.(0, 10)) === today))
        return true;
    }
    if (data?.lastCompletedDate === today) return true;
    if (data?.completions && Array.isArray(data.completions)) {
      if (data.completions.some((e) => (e.date ?? "").slice(0, 10) === today))
        return true;
    }
  }
  return false;
}

function hasReflectedEveningToday() {
  const today = new Date().toISOString().slice(0, 10);
  const data = safeRead("sthira_evening_reflections");
  if (!Array.isArray(data)) return false;
  return data.some((e) => e.date === today);
}

function hasWellnessCheckInToday() {
  const today = new Date().toISOString().slice(0, 10);
  const energyVal = getTodayEnergyValue();
  return energyVal !== null;
}

// ── Companion states ──────────────────────────────────────────────────────────

export const COMPANION_STATES = {
  GENTLE_MORNING: "gentle-morning",
  SLOW_MORNING: "slow-morning",
  FRESH_START: "fresh-start",
  CALM_AFTERNOON: "calm-afternoon",
  FOCUSED_AFTERNOON: "focused-afternoon",
  QUIET_EVENING: "quiet-evening",
  REFLECTIVE_EVENING: "reflective-evening",
  LATE_NIGHT: "late-night",
  RAINY_MOOD: "rainy-mood",
  SUNNY_MOOD: "sunny-mood",
  CLOUDY_MOOD: "cloudy-mood",
  FOGGY_MOOD: "foggy-mood",
  HIGH_ENERGY: "high-energy",
  LOW_ENERGY: "low-energy",
  HYDRATED: "hydrated",
  NEEDS_REST: "needs-rest",
  RECENT_REFLECTION: "recent-reflection",
  RECENT_GRATITUDE: "recent-gratitude",
  ROUTINE_COMPLETED: "routine-completed",
};

// ── State detection ───────────────────────────────────────────────────────────

/**
 * Determine the single best companion state given today's context.
 * Priority: specific activity completions > weather > energy > time
 */
export function detectCompanionState() {
  const phase = getTimePhase();
  const weatherEntry = getTodayWeather();
  const weatherId = weatherEntry?.weather ?? null;
  const energyVal = getTodayEnergyValue();
  const energyState = classifyEnergy(energyVal);

  const hydrationPct = getTodayHydrationPct();
  const gratitudeToday = getTodayGratitudeCount();
  const letterToday = getTodayLetterCount();
  const reflectedEvening = hasReflectedEveningToday();
  const reflectedAny = hasReflectedToday();
  const routineCompleted = hasCompletedMorningRoutineToday();
  const wellnessCheckedIn = hasWellnessCheckInToday();

  // ── Specific activity states (highest priority) ──────────────────────────

  if (routineCompleted) {
    return COMPANION_STATES.ROUTINE_COMPLETED;
  }

  if (gratitudeToday > 0) {
    return COMPANION_STATES.RECENT_GRATITUDE;
  }

  if (
    reflectedEvening ||
    (reflectedAny && (phase === "evening" || phase === "late-evening"))
  ) {
    return COMPANION_STATES.REFLECTIVE_EVENING;
  }

  // ── Weather states (second priority) ────────────────────────────────────

  if (weatherId === "rainy" || weatherId === "stormy") {
    return COMPANION_STATES.RAINY_MOOD;
  }

  if (weatherId === "sunny" || weatherId === "breezy") {
    return COMPANION_STATES.SUNNY_MOOD;
  }

  if (weatherId === "cloudy") {
    return COMPANION_STATES.CLOUDY_MOOD;
  }

  if (weatherId === "foggy") {
    return COMPANION_STATES.FOGGY_MOOD;
  }

  // ── Energy states (third priority) ──────────────────────────────────────

  if (energyState === ENERGY_STATES.LOW) {
    if (phase === "night" || phase === "late-evening") {
      return COMPANION_STATES.NEEDS_REST;
    }
    return COMPANION_STATES.LOW_ENERGY;
  }

  if (energyState === ENERGY_STATES.HIGH) {
    return COMPANION_STATES.HIGH_ENERGY;
  }

  // ── Hydration state ──────────────────────────────────────────────────────

  if (hydrationPct !== null && hydrationPct >= 70) {
    return COMPANION_STATES.HYDRATED;
  }

  // ── Time-based states (default tier) ────────────────────────────────────

  if (phase === "early-morning") {
    return COMPANION_STATES.FRESH_START;
  }

  if (phase === "morning") {
    // Low wellness energy without check-in → slow morning feel
    if (!wellnessCheckedIn) {
      return COMPANION_STATES.GENTLE_MORNING;
    }
    return COMPANION_STATES.GENTLE_MORNING;
  }

  if (phase === "afternoon") {
    return COMPANION_STATES.CALM_AFTERNOON;
  }

  if (phase === "evening") {
    return COMPANION_STATES.QUIET_EVENING;
  }

  if (phase === "late-evening" || phase === "night") {
    return COMPANION_STATES.LATE_NIGHT;
  }

  return COMPANION_STATES.GENTLE_MORNING;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MESSAGE POOLS — 250+ handcrafted messages
// ═══════════════════════════════════════════════════════════════════════════════

const MESSAGE_POOLS = {
  [COMPANION_STATES.GENTLE_MORNING]: [
    "It feels like today began softly.",
    "The morning is still finding its shape. So are you.",
    "A gentle beginning is still a beginning.",
    "There is no rush in this particular hour.",
    "The morning asks very little of you right now.",
    "You've arrived at today. That is the whole of what is needed.",
    "The day is still in its early, quiet form.",
    "Mornings like this one have a particular kind of stillness.",
    "Whatever today holds, it has not quite decided yet.",
    "Something in a soft morning is worth receiving.",
    "You are already in today. That is enough to begin.",
    "The first moments of a day are rarely urgent.",
    "A quiet morning is its own kind of gift.",
    "Today is here. There is no need to rush into it.",
    "This morning has a particular unhurried quality.",
  ],

  [COMPANION_STATES.SLOW_MORNING]: [
    "A slow morning is not a lost morning.",
    "Not everything needs to begin at full speed.",
    "The morning is being patient with you. Let it.",
    "Slow beginnings often lead to steadier days.",
    "Whatever pace feels right this morning — that is the right pace.",
    "Moving slowly today is honest, not lazy.",
    "Some mornings simply ask for more gentleness.",
    "This morning seems to be one that asks for patience.",
    "A morning like this one is a good time to simply breathe first.",
    "The day will still be here when you are ready to enter it more fully.",
    "Let the morning unfold at its own pace.",
    "There is wisdom in a slow start.",
    "You do not need to hurry yourself into today.",
    "This morning is asking something quieter of you.",
    "Not all mornings need to be productive to be worthwhile.",
  ],

  [COMPANION_STATES.FRESH_START]: [
    "The very first part of the day has a quality nothing else does.",
    "Something about this early hour is yours alone.",
    "The world is still quiet. So can you be.",
    "Early mornings carry a particular stillness worth sitting in.",
    "You are ahead of the day — gently.",
    "Whatever the rest of today holds, this beginning is peaceful.",
    "The day has not yet decided what it will be. Neither have you.",
    "This hour belongs to no one's schedule but your own.",
    "An early beginning is its own quiet gift.",
    "The day is still soft at this hour.",
    "There is something precious about the world before it wakes fully.",
    "You are here before most things have started.",
    "The early hours ask very little and offer quite a lot.",
    "This quiet beginning is already something.",
    "You arrived at today before it fully arrived.",
  ],

  [COMPANION_STATES.CALM_AFTERNOON]: [
    "The rhythm of today has become a little steadier.",
    "Afternoon has its own kind of settled quality.",
    "You have already been in today for a while. That is real.",
    "The middle of the day is a good time to simply continue.",
    "You have carried part of today already. The rest is still ahead.",
    "Afternoons tend to be about maintenance, not reinvention.",
    "A steady afternoon is more valuable than it seems.",
    "Something in the afternoon light asks for quiet persistence.",
    "You are partway through. That is its own accomplishment.",
    "The afternoon is not asking you to do more — just to continue.",
    "There is a kind of grace in simply keeping going through an afternoon.",
    "Midday is the part of the day that rewards patience.",
    "The afternoon does not need to be exciting to be worthwhile.",
    "You have been in today long enough to know its texture.",
    "The day is continuing, and so are you.",
  ],

  [COMPANION_STATES.FOCUSED_AFTERNOON]: [
    "There is a particular kind of focus that arrives in the afternoon.",
    "The afternoon can hold real depth, if you let it.",
    "Something in this part of the day supports sustained attention.",
    "The afternoon has a quality of continuation that the morning does not.",
    "You are in the productive heart of the day — without any pressure.",
    "This part of the afternoon tends to reward quiet concentration.",
    "A focused afternoon is a quiet kind of gift.",
    "The day is still open to something meaningful happening.",
    "Afternoons like this one are worth settling into.",
    "There is still time in today for something that matters.",
    "The afternoon holds more than it appears to from the outside.",
    "This hour tends to be good for the kind of attention that goes deep.",
    "Something in you knows how to settle into an afternoon.",
    "The middle of the day has its own kind of focus.",
    "Afternoons can carry the most substance of any part of the day.",
  ],

  [COMPANION_STATES.QUIET_EVENING]: [
    "The evening is settling. So can you.",
    "Nothing about this evening needs to be rushed.",
    "The day is beginning to close itself, gently.",
    "Evening has arrived without asking anything dramatic of you.",
    "Something in the evening hour suggests slowing down.",
    "You've made it to the end of the day's main stretch.",
    "The evening is a natural place to let the pace change.",
    "Whatever the day held, it is softening now.",
    "An evening like this one is for release, not review.",
    "The day has done what it could. The evening is for something quieter.",
    "This time of day asks very little. Let it ask very little.",
    "The evening light is different — and so is the permission it carries.",
    "You have arrived at the part of the day that belongs to rest.",
    "Evening is here. The day is becoming what it was.",
    "Something in this hour is asking you to soften.",
  ],

  [COMPANION_STATES.REFLECTIVE_EVENING]: [
    "You've made room for yourself today.",
    "Something quiet happened today — you turned toward yourself.",
    "The fact that you reflected today will carry into tomorrow.",
    "Reflection, even briefly, is a form of self-attention that compounds.",
    "You gave yourself the gift of noticing today.",
    "Today had a layer of meaning because you paused to look for it.",
    "Coming back to yourself is never a small thing.",
    "The evening feels different when you've already reflected.",
    "You've already done something worthwhile with today.",
    "A day that holds reflection holds more than just events.",
    "Something in you checked in today. That is always enough.",
    "The quiet work of turning inward has already happened today.",
    "Today was more than what happened — you noticed how it felt.",
    "Reflection is a way of honoring what the day actually was.",
    "You brought a certain attention to today that most days don't receive.",
  ],

  [COMPANION_STATES.LATE_NIGHT]: [
    "Rest is becoming part of today's journey.",
    "The night is here. Everything else can wait until morning.",
    "Whatever is unresolved, it will still be there to address tomorrow.",
    "Tonight is simply for being still.",
    "The day has given what it had. The night is for restoration.",
    "You have done enough today. Now is for rest.",
    "Something in the late hour asks only for quiet.",
    "Sleep is not an escape from today — it is how today completes.",
    "The mind works through things in sleep that effort cannot reach.",
    "Tonight is for letting go of today's edges.",
    "What is left undone has permission to wait.",
    "The night holds no expectations.",
    "Letting the day become yesterday is the work of this hour.",
    "Nothing needs to be decided in the dark.",
    "Rest is already the most productive thing available right now.",
  ],

  [COMPANION_STATES.RAINY_MOOD]: [
    "Rainy days have their own particular invitation to go inward.",
    "Something about today's weather is asking for softness.",
    "Rain tends to slow the world down — and that is not a bad thing.",
    "The rain outside is asking nothing of you except presence.",
    "Days like this one are for shelter — in every sense.",
    "Rainy days often make the simple things feel more meaningful.",
    "There is something honest about a day with weather like today's.",
    "The rain changes the quality of everything, including time.",
    "A difficult weather day has its own kind of permission.",
    "Something about rain makes the inside feel more like itself.",
    "This kind of day is good for staying close to what actually matters.",
    "The rain is reminding you that not everything needs to move fast.",
    "Softer weather tends to ask for softer pacing.",
    "Today is a good day to be gentle — with yourself and with everything.",
    "The rhythm of rain has a kind of steadiness worth borrowing.",
  ],

  [COMPANION_STATES.SUNNY_MOOD]: [
    "The sun is simply out — a straightforward kind of good.",
    "Something in today's light makes the small things more visible.",
    "A sunny day doesn't need to be seized. It can simply be inhabited.",
    "Today has a quality of openness that is worth receiving.",
    "The light today is uncomplicated. You can be too.",
    "There is a particular warmth to a day like this one.",
    "Sunlight doesn't ask anything. It simply is.",
    "A day with this quality of light is a gentle gift.",
    "Something about today feels a little lighter.",
    "The sun is in the background of today, quietly.",
    "Days like this one carry their own kind of ease.",
    "There is something generous about a sunny day.",
    "Today has a brightness that doesn't need to be translated.",
    "The warmth today is real. So is your place in it.",
    "A sunny day is always enough reason to notice something small.",
  ],

  [COMPANION_STATES.CLOUDY_MOOD]: [
    "Cloudy days have a softness that clear ones rarely do.",
    "Something about today's sky is asking for a quieter pace.",
    "A muted day has its own texture worth sitting with.",
    "Clouds tend to make the world feel a little more private.",
    "Today has a soft, unhurried quality.",
    "The overcast sky is not asking anything of you.",
    "A cloudy day is a good one for staying close to yourself.",
    "There is something comfortable about the quiet of a grey day.",
    "The diffused light of a cloudy day is easy to be in.",
    "Today doesn't need to be bright to be worthwhile.",
    "Something about today feels turned inward — and that is fine.",
    "A cloudy sky is not a troubled one. Just a softer one.",
    "The gentle light of an overcast day suits a quieter kind of day.",
    "Today has a quality of introspection that is worth honouring.",
    "A day without bright sun has its own distinct value.",
  ],

  [COMPANION_STATES.FOGGY_MOOD]: [
    "Fog makes everything a little less certain — and that is allowed.",
    "Something about today feels a little unclear. That is an honest way to be.",
    "Foggy days remind you that not everything needs to be visible to be real.",
    "Today is one of those days that asks for patience with not knowing.",
    "There is something peaceful in not being able to see too far ahead.",
    "Fog is temporary. So is the uncertainty it represents.",
    "A foggy day is not a bad day. It is simply a less clear one.",
    "Something in the fog of today is asking you to stay present with what is near.",
    "The world is a little less definite today. You can be too.",
    "On foggy days, the small nearby things become more important.",
    "Clarity is not required today. Presence is.",
    "Something about the way today feels makes sense if you stop trying to see through it.",
    "A day that feels foggy often asks for smaller, nearer focus.",
    "The fog is not hiding anything important. It is simply here.",
    "Uncertainty is the weather of many good days.",
  ],

  [COMPANION_STATES.HIGH_ENERGY]: [
    "There is a little more available today than usual.",
    "Something in today has a quality of readiness.",
    "You have a little more to work with today — that is worth noticing.",
    "Today feels like it has some room in it.",
    "More energy today does not mean more pressure. Just more possibility.",
    "The particular quality of today is worth using for what matters.",
    "Today seems to have given you something extra.",
    "A day with this kind of energy is worth entering with intention.",
    "Something in today feels a little more open.",
    "You have more capacity today than some days. That is simply a fact, not a demand.",
    "Today has a bit of forward momentum built into it.",
    "More energy is a resource, not an obligation.",
    "Something about today suggests things might move a little more easily.",
    "The day seems willing today. So can you be.",
    "Today's energy is yours to direct, gently.",
  ],

  [COMPANION_STATES.LOW_ENERGY]: [
    "Your body may be asking for something slower today.",
    "A low-energy day is not a failed day.",
    "Today does not need to be a big day.",
    "Whatever you can manage today — that is today's version of enough.",
    "Something in how you feel today is asking for gentleness.",
    "Moving slowly today is honest, not wrong.",
    "Less energy today means today asks something different of you.",
    "On days like this, small things are actually the right things.",
    "The quiet days have their own kind of value.",
    "Rest can be the most honest response to today.",
    "You do not need to push through. You can simply move through.",
    "A day with less energy is still a day worth being in.",
    "Today is a good day to ask very little of yourself.",
    "Low energy is not emptiness. It is information.",
    "Your body is asking something of you today. Listening is enough.",
  ],

  [COMPANION_STATES.HYDRATED]: [
    "Water has already been one kind thing you've done today.",
    "You've been taking care of the simplest things — that matters.",
    "One of the most basic forms of self-care has been present today.",
    "Hydration is a quiet act. You've been doing it.",
    "Water is not a small thing. You've been remembering it.",
    "Something small and essential has been part of your day.",
    "The simple care of staying hydrated is already in today.",
    "You've already done something quietly good for yourself.",
    "A well-hydrated day is a well-cared-for day.",
    "Something foundational has been attended to. That is always worth noting.",
    "The basic act of caring for your body has been present today.",
    "Water is one of the simplest forms of self-respect. You've practiced it.",
    "Today has included one of the most reliable forms of self-care.",
    "Something good and simple has already happened today.",
    "You've been attending to the basics — which is more than it sounds.",
  ],

  [COMPANION_STATES.NEEDS_REST]: [
    "The night is the right place for what today couldn't finish.",
    "Rest is becoming part of today's journey.",
    "Whatever is still unresolved will still be there after sleep.",
    "Your body is asking for something simple: rest.",
    "The most important thing available right now is sleep.",
    "Tonight is not for solving. It is for resting.",
    "You have done enough today. The night is for letting it be enough.",
    "Low energy in the evening is a message worth listening to.",
    "The day has used what it had. Now it is time to restore.",
    "Sleep is where today finishes itself.",
    "Your body knows what comes next. Let it lead.",
    "Tonight's rest is an investment in tomorrow's presence.",
    "The tiredness you feel is your body telling the truth.",
    "Resting now is not giving up. It is taking care of yourself.",
    "Nothing that matters will be lost by sleeping tonight.",
  ],

  [COMPANION_STATES.RECENT_REFLECTION]: [
    "You've already made space for yourself today.",
    "Something worthwhile happened today — you turned toward yourself.",
    "The act of reflecting is its own form of progress.",
    "You gave today a layer of meaning by paying attention to it.",
    "Returning to yourself, even briefly, is never a small thing.",
    "You've done something that most people skip.",
    "Today held a moment of self-attention. That is real.",
    "Reflection is a way of honoring what the day actually was.",
    "You noticed your own experience today. That takes something.",
    "Something quiet and important happened — you checked in with yourself.",
    "Your day included a moment of genuine self-attention.",
    "You brought awareness to today that most days don't receive.",
    "A day that includes reflection is a day with meaning.",
    "You came back to yourself today. That is always worth acknowledging.",
    "The quiet work of noticing has already been done today.",
  ],

  [COMPANION_STATES.RECENT_GRATITUDE]: [
    "You noticed something good today. That is already something.",
    "Something was worth appreciating today — and you found it.",
    "The act of noticing something good is its own form of care.",
    "You paused today to find something worth acknowledging. That matters.",
    "Gratitude is not passive. You chose it today.",
    "Something small and good was recognized today. That changes things slightly.",
    "The habit of noticing what is worth noticing is one you practiced today.",
    "You found something today that deserved a quiet thank you.",
    "A moment of gratitude shifts the whole quality of a day.",
    "Something good happened today, and you paid attention to it.",
    "You've already added something meaningful to today.",
    "Noticing the good is a skill. You used it today.",
    "Your gratitude garden received something from today. That is real.",
    "The small act of appreciation changes what a day is made of.",
    "You looked for something worth finding today — and you found it.",
  ],

  [COMPANION_STATES.ROUTINE_COMPLETED]: [
    "You've already done enough to begin.",
    "The morning routine is behind you — and something has shifted.",
    "A movement practice completed is a whole morning changed.",
    "You showed up for yourself this morning in a physical way.",
    "The body has already been cared for today.",
    "Whatever else today holds, it started with something real.",
    "You've done something for yourself that will carry through the day.",
    "The morning routine is not small. You've done it.",
    "Something grounding has already happened today.",
    "Your body was attended to this morning. That is always something.",
    "The routine is done. The rest of the day follows from that.",
    "You moved today. That changes the whole texture of what comes after.",
    "The morning practice is complete. The day is already different for it.",
    "You gave yourself movement this morning. That is a real gift.",
    "Something was done before the day began demanding things. That matters.",
  ],
};

// ── Fallback pool ─────────────────────────────────────────────────────────────

const FALLBACK_MESSAGES = [
  "You are here today. That is always the beginning.",
  "Today is unfolding at its own pace.",
  "Something in today is worth being present for.",
  "Whatever today holds, you are in it.",
  "The day is simply here, and so are you.",
  "Today has its own particular texture. You are in it.",
  "You arrived at today. That is enough to begin.",
  "Something quiet is always available, if you look for it.",
  "Today is yours, in whatever form it has taken.",
  "Nothing about today requires you to be different from how you are.",
];

// ── Deterministic selector ────────────────────────────────────────────────────

function deterministicIndex(seed, total) {
  if (total <= 0) return 0;
  const today = new Date().toISOString().slice(0, 10);
  const hash = (today + seed)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return hash % total;
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Detect state and return one deterministic contextual companion message.
 * Returns { text: string, state: COMPANION_STATES.* }
 */
export function getContextAwareCompanionMessage() {
  const state = detectCompanionState();
  const pool = MESSAGE_POOLS[state] ?? FALLBACK_MESSAGES;
  const text = pool[deterministicIndex(state, pool.length)];

  return { text, state };
}

/**
 * Expose the state label for the UI category eyebrow.
 */
export const STATE_LABELS = {
  [COMPANION_STATES.GENTLE_MORNING]: "Morning",
  [COMPANION_STATES.SLOW_MORNING]: "Morning",
  [COMPANION_STATES.FRESH_START]: "Early Morning",
  [COMPANION_STATES.CALM_AFTERNOON]: "Afternoon",
  [COMPANION_STATES.FOCUSED_AFTERNOON]: "Afternoon",
  [COMPANION_STATES.QUIET_EVENING]: "Evening",
  [COMPANION_STATES.REFLECTIVE_EVENING]: "Evening",
  [COMPANION_STATES.LATE_NIGHT]: "Night",
  [COMPANION_STATES.RAINY_MOOD]: "Rainy Day",
  [COMPANION_STATES.SUNNY_MOOD]: "Sunny Day",
  [COMPANION_STATES.CLOUDY_MOOD]: "Cloudy Day",
  [COMPANION_STATES.FOGGY_MOOD]: "Foggy Day",
  [COMPANION_STATES.HIGH_ENERGY]: "Good Energy",
  [COMPANION_STATES.LOW_ENERGY]: "Low Energy",
  [COMPANION_STATES.HYDRATED]: "Hydrated",
  [COMPANION_STATES.NEEDS_REST]: "Rest",
  [COMPANION_STATES.RECENT_REFLECTION]: "Reflection",
  [COMPANION_STATES.RECENT_GRATITUDE]: "Gratitude",
  [COMPANION_STATES.ROUTINE_COMPLETED]: "Morning Done",
};

export function getStateLabelForDisplay(state) {
  return STATE_LABELS[state] ?? "Today";
}
