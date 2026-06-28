// src/data/selfCompassionData.js
// All content for the Self-Compassion Toolkit.
// Language is warm, honest, non-clinical, non-toxic.
// No clichés. No hustle. No forced positivity.

// ── Support card definitions ───────────────────────────────────────────────

export const COMPASSION_CARDS = [
  {
    id: "failed",
    title: "When I Feel Like I've Failed",
    subtitle: "For moments of disappointment and self-blame.",
    emoji: "🌧️",
    gradient:
      "linear-gradient(160deg, rgba(100,130,180,0.1) 0%, rgba(80,110,160,0.07) 100%)",
    border: "rgba(100,130,180,0.2)",
    accentColor: "#3a5a80",
    lightBg: "rgba(100,130,180,0.07)",
  },
  {
    id: "overwhelmed",
    title: "When I'm Overwhelmed",
    subtitle: "Short grounding practices for when it's too much.",
    emoji: "🌊",
    gradient:
      "linear-gradient(160deg, rgba(80,130,160,0.1) 0%, rgba(60,110,145,0.07) 100%)",
    border: "rgba(80,130,160,0.2)",
    accentColor: "#2a5570",
    lightBg: "rgba(80,130,160,0.07)",
  },
  {
    id: "hard-on-self",
    title: "When I'm Being Hard On Myself",
    subtitle: "Self-kindness when the inner critic is loud.",
    emoji: "🕊️",
    gradient:
      "linear-gradient(160deg, rgba(140,130,155,0.1) 0%, rgba(120,110,140,0.07) 100%)",
    border: "rgba(140,130,155,0.2)",
    accentColor: "#4a3a60",
    lightBg: "rgba(140,130,155,0.07)",
  },
  {
    id: "encouragement",
    title: "I Need Encouragement",
    subtitle: "Gentle words for difficult days.",
    emoji: "🌱",
    gradient:
      "linear-gradient(160deg, rgba(134,159,138,0.12) 0%, rgba(110,145,115,0.08) 100%)",
    border: "rgba(134,159,138,0.25)",
    accentColor: "#2a5a30",
    lightBg: "rgba(134,159,138,0.08)",
  },
  {
    id: "reminders",
    title: "Gentle Reminders",
    subtitle: "Timeless truths to return to.",
    emoji: "☁️",
    gradient:
      "linear-gradient(160deg, rgba(185,175,160,0.12) 0%, rgba(160,155,148,0.08) 100%)",
    border: "rgba(185,175,160,0.25)",
    accentColor: "#5a5040",
    lightBg: "rgba(185,175,160,0.08)",
  },
];

// ── Content for each card ──────────────────────────────────────────────────

export const COMPASSION_CONTENT = {
  failed: {
    intro:
      "A difficult moment does not tell the whole story. Mistakes are part of every real journey — not evidence that yours has gone wrong.",
    items: [
      {
        id: "f1",
        heading: "Everyone makes mistakes.",
        body: "Not occasionally. Regularly. The people you admire have made mistakes you will never know about. Mistakes are not an exception to a good life — they are part of one.",
      },
      {
        id: "f2",
        heading: "One difficult moment does not define you.",
        body: "You are not the worst thing that happened today. You are the whole of everything you have done, tried, felt, and survived. A single chapter does not write the book.",
      },
      {
        id: "f3",
        heading: "What would you say to a friend?",
        body: "If a person you cared about came to you carrying this same mistake, what would you say to them? Try saying that to yourself. You deserve at least the same kindness.",
      },
      {
        id: "f4",
        heading: "Failure and learning are the same movement.",
        body: "Every time something does not go the way you hoped, you are gathering information. That is not consolation — it is literally how every skill, wisdom, and capacity develops.",
      },
      {
        id: "f5",
        heading: "You are allowed to grieve a disappointment.",
        body: "You do not have to immediately reframe this as a lesson or a gift. You can simply feel disappointed for a while. That is honest. Honesty is where healing begins.",
      },
      {
        id: "f6",
        heading: "Beginning again is not starting over.",
        body: "When you begin again after a setback, you carry everything you have already learned. That is not zero. That is a foundation.",
      },
    ],
  },

  overwhelmed: {
    intro:
      "When everything feels like too much, the most useful thing is usually the smallest next thing. You do not have to solve everything. Just this moment.",
    items: [
      {
        id: "o1",
        heading: "Name five things you can see.",
        body: "Look around slowly. A chair. A shadow. A colour on the wall. A texture on the floor. Something small. Just notice. This is enough.",
      },
      {
        id: "o2",
        heading: "Slow your breathing.",
        body: "Breathe in for 4 counts, then breathe out for 6. The longer exhale tells your nervous system that you are safe. Do this three times. Nothing else is needed right now.",
      },
      {
        id: "o3",
        heading: "Focus only on the next small step.",
        body: "Not the whole mountain. Not even the path. Just the next foothold. What is one small thing — the smallest possible thing — you could do right now?",
      },
      {
        id: "o4",
        heading: "Put something down.",
        body: "Not everything has to be held all at once. Is there one task, one worry, one obligation you could set aside for the next hour? You can pick it up again later if you need to.",
      },
      {
        id: "o5",
        heading: "Drink a glass of water slowly.",
        body: "This is not a metaphor. Your body is real and it needs simple things. Water. A slow breath. A moment to sit still. These are not small things — they are the foundation.",
      },
      {
        id: "o6",
        heading: "You do not have to feel okay right now.",
        body: "You are allowed to be overwhelmed. Naming it is not weakness — it is accuracy. And accuracy is the first step toward finding a way through.",
      },
    ],
  },

  "hard-on-self": {
    intro:
      "The inner critic often speaks in the language of urgency and certainty. But it is not always right. Curiosity is gentler and usually more accurate.",
    items: [
      {
        id: "h1",
        heading: "Replace criticism with curiosity.",
        body: "Instead of asking 'why did I do that?' as an accusation, try asking it as a genuine question. What was happening for you? What did you need? Curiosity opens doors that criticism slams shut.",
      },
      {
        id: "h2",
        heading: "The standards you hold for yourself may be unrealistic.",
        body: "Not because you are aiming too high, but because the version of you doing the judging rarely accounts for sleep, stress, circumstance, or the difficulty of simply being human.",
      },
      {
        id: "h3",
        heading: "Harsh self-judgment rarely helps.",
        body: "It feels productive, but mostly it just hurts. Research consistently shows that self-compassion — not self-criticism — leads to better performance, learning, and resilience.",
      },
      {
        id: "h4",
        heading: "Speak to yourself as you would speak to someone you love.",
        body: "Not indulgently. Not dishonestly. But with the same patience, context, and care you would offer a person whose wellbeing mattered to you.",
      },
      {
        id: "h5",
        heading: "Notice the voice. You are not the voice.",
        body: "The critical inner voice is something that speaks to you — it is not you. You are the one who can choose how much to believe it and how much to gently set it aside.",
      },
      {
        id: "h6",
        heading: "Effort matters even when outcomes don't cooperate.",
        body: "You may have done everything right and still had things go wrong. These two things can be true at the same time. One does not cancel the other.",
      },
    ],
  },

  encouragement: {
    intro:
      "These are offered without conditions. You do not have to earn them or deserve them. They are simply here.",
    items: [
      "You have navigated difficult days before. You are doing it again.",
      "Showing up, even imperfectly, still counts as showing up.",
      "Something about the way you keep going is worth noticing.",
      "You are allowed to have a hard day without it meaning something is wrong with you.",
      "The fact that you care so much is evidence of your character, not your inadequacy.",
      "A slow day is still a day. A quiet week is still a week. You are still moving.",
      "You do not have to be extraordinary. Ordinary, consistent, and kind is more than enough.",
      "Somewhere in your story, there is more than you are giving yourself credit for.",
      "Rest is not surrender. It is part of the strategy.",
      "You are further along than you were. That is always true, even when it doesn't feel like it.",
      "The difficulty of what you are carrying does not reflect a failure of strength.",
      "There is no version of growth that does not include confusion and setback.",
      "You are enough for this moment, even if this moment is hard.",
      "Asking for help is not a retreat. It is good sense.",
      "It is okay to not be at your best. Best is not required every day.",
      "The people who love you are not waiting for you to perform better.",
      "Whatever you did today — it was enough for today.",
      "Small progress still moves the line. You are not standing still.",
      "You are not falling behind. There is no race.",
      "Being gentle with yourself is not giving up. It is taking care of what matters.",
      "This hard chapter is not the whole book.",
      "You are allowed to feel proud of things that no one else noticed.",
      "The version of you showing up right now — tired, uncertain, trying — is still worthy.",
      "Comparison will almost never give you accurate information about your own worth.",
      "The things you are managing quietly are real accomplishments.",
      "You have permission to begin again, as many times as you need.",
      "Not every day can be a good one. That is not a flaw — it is just life.",
      "Something in you keeps trying. That something matters.",
      "Your worth is not negotiable and it is not conditional.",
      "Right now, in this moment, you are doing the best you can. That is the truth.",
    ],
  },

  reminders: {
    intro:
      "These are not new ideas. They are things that are easy to forget and worth returning to.",
    items: [
      {
        id: "r1",
        heading: "Rest is productive.",
        body: "Rest is not a reward you earn after working hard enough. It is a requirement. Without it, nothing else works well.",
      },
      {
        id: "r2",
        heading: "You are allowed to begin again.",
        body: "At any point. After any amount of time. Beginning again is not failure — it is one of the most human things a person can do.",
      },
      {
        id: "r3",
        heading: "Growth is rarely linear.",
        body: "It looks more like weather than a graph. Sometimes nothing visible happens for a long time, and then something shifts. Trust the process even when you cannot see it.",
      },
      {
        id: "r4",
        heading: "Feelings are not facts.",
        body: "They are real. They are important. They deserve attention. But feeling like a failure does not make you one. Feeling hopeless does not mean hope is gone.",
      },
      {
        id: "r5",
        heading: "You do not have to have it all figured out.",
        body: "Nobody does. The appearance of certainty in others is almost always just that — an appearance. Living with open questions is part of the territory.",
      },
      {
        id: "r6",
        heading: "Comparison steals the present.",
        body: "Other people's timelines, achievements, and apparent ease are not reliable data about your own path. Your journey has its own pace and its own meaning.",
      },
      {
        id: "r7",
        heading: "Small things compound.",
        body: "A small kindness to yourself repeated daily becomes a different relationship with yourself over time. Small things are not insignificant — they are the substance of life.",
      },
      {
        id: "r8",
        heading: "You are more than your output.",
        body: "Your value as a person is not measured by what you produce, accomplish, or achieve. That was always true, even if the world sometimes suggests otherwise.",
      },
    ],
  },
};

/**
 * Get a card definition by id.
 */
export function getCardById(id) {
  return COMPASSION_CARDS.find((c) => c.id === id) ?? null;
}
