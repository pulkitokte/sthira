// src/data/wisdomData.js
// 60+ wisdom entries for the Daily Wisdom feature.
// Inspired by mindfulness, nature, philosophy, stillness, self-compassion, slow living.
// Intentionally avoids hustle culture, toxic positivity, productivity pressure.

export const WISDOM_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "reflection", label: "Reflection" },
  { id: "rest", label: "Rest" },
  { id: "focus", label: "Focus" },
  { id: "self-compassion", label: "Self-Compassion" },
  { id: "nature", label: "Nature" },
  { id: "presence", label: "Presence" },
];

export const WISDOM_ENTRIES = [
  // ── Reflection ────────────────────────────────────────────────────────────
  {
    id: "w001",
    text: "Small steps, taken gently, still carry you forward.",
    author: null,
    category: "reflection",
  },
  {
    id: "w002",
    text: "You do not need to hurry to become who you are.",
    author: null,
    category: "reflection",
  },
  {
    id: "w003",
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    category: "reflection",
  },
  {
    id: "w004",
    text: "It is not length of life, but depth of life.",
    author: "Ralph Waldo Emerson",
    category: "reflection",
  },
  {
    id: "w005",
    text: "What we think, we become.",
    author: "attributed to Buddha",
    category: "reflection",
  },
  {
    id: "w006",
    text: "The question is not what you look at, but what you see.",
    author: "Henry David Thoreau",
    category: "reflection",
  },
  {
    id: "w007",
    text: "Everything you need is already within you, waiting to be remembered.",
    author: null,
    category: "reflection",
  },
  {
    id: "w008",
    text: "Not all who wander are lost.",
    author: "J.R.R. Tolkien",
    category: "reflection",
  },
  {
    id: "w009",
    text: "A wise person knows the limits of their wisdom.",
    author: null,
    category: "reflection",
  },
  {
    id: "w010",
    text: "The journey inward is the longest and most rewarding of all.",
    author: null,
    category: "reflection",
  },

  // ── Rest ─────────────────────────────────────────────────────────────────
  {
    id: "w011",
    text: "Rest is not laziness. It is the soil in which clarity grows.",
    author: null,
    category: "rest",
  },
  {
    id: "w012",
    text: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
    category: "rest",
  },
  {
    id: "w013",
    text: "Sleep is the best meditation.",
    author: "Dalai Lama",
    category: "rest",
  },
  {
    id: "w014",
    text: "There is virtue in work and there is virtue in rest. Use both and overlook neither.",
    author: "Alan Cohen",
    category: "rest",
  },
  {
    id: "w015",
    text: "To do nothing is sometimes a great remedy.",
    author: "Hippocrates",
    category: "rest",
  },
  {
    id: "w016",
    text: "Letting go gives us freedom, and freedom is the only condition for happiness.",
    author: "Thich Nhat Hanh",
    category: "rest",
  },
  {
    id: "w017",
    text: "The time to relax is when you don't have time for it.",
    author: "Sydney J. Harris",
    category: "rest",
  },
  {
    id: "w018",
    text: "Do less and be more.",
    author: null,
    category: "rest",
  },
  {
    id: "w019",
    text: "Your worth is not measured by your productivity.",
    author: null,
    category: "rest",
  },
  {
    id: "w020",
    text: "Resting is not giving up. It is gathering strength for the next step.",
    author: null,
    category: "rest",
  },

  // ── Focus ─────────────────────────────────────────────────────────────────
  {
    id: "w021",
    text: "Stillness is not empty. It is full of answers.",
    author: null,
    category: "focus",
  },
  {
    id: "w022",
    text: "The ability to simplify means to eliminate the unnecessary so that the necessary may speak.",
    author: "Hans Hofmann",
    category: "focus",
  },
  {
    id: "w023",
    text: "One thing at a time is the oldest wisdom there is.",
    author: null,
    category: "focus",
  },
  {
    id: "w024",
    text: "Where attention goes, energy flows.",
    author: null,
    category: "focus",
  },
  {
    id: "w025",
    text: "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
    author: "Alexander Graham Bell",
    category: "focus",
  },
  {
    id: "w026",
    text: "It is not enough to be busy. The question is: what are we busy about?",
    author: "Henry David Thoreau",
    category: "focus",
  },
  {
    id: "w027",
    text: "Do one thing at a time, and while doing it put your whole soul into it.",
    author: "Swami Vivekananda",
    category: "focus",
  },
  {
    id: "w028",
    text: "The mind is a wonderful servant but a terrible master.",
    author: "attributed to Robin Sharma",
    category: "focus",
  },
  {
    id: "w029",
    text: "Clarity comes not from thinking more, but from thinking less.",
    author: null,
    category: "focus",
  },
  {
    id: "w030",
    text: "Focus is the art of knowing what to ignore.",
    author: null,
    category: "focus",
  },

  // ── Self-Compassion ───────────────────────────────────────────────────────
  {
    id: "w031",
    text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    author: "attributed to Buddha",
    category: "self-compassion",
  },
  {
    id: "w032",
    text: "Talk to yourself like someone you love.",
    author: "Brené Brown",
    category: "self-compassion",
  },
  {
    id: "w033",
    text: "You are allowed to be both a masterpiece and a work in progress simultaneously.",
    author: "Sophia Bush",
    category: "self-compassion",
  },
  {
    id: "w034",
    text: "Be gentle with yourself. You are a child of the universe, no less than the trees and the stars.",
    author: "Desiderata",
    category: "self-compassion",
  },
  {
    id: "w035",
    text: "The most important relationship you have is the one with yourself.",
    author: null,
    category: "self-compassion",
  },
  {
    id: "w036",
    text: "What if you simply devoted this year to loving yourself more?",
    author: null,
    category: "self-compassion",
  },
  {
    id: "w037",
    text: "Imperfection is not inadequacy. It is the ordinary condition of all human beings.",
    author: null,
    category: "self-compassion",
  },
  {
    id: "w038",
    text: "Give yourself the same compassion you would give a good friend.",
    author: null,
    category: "self-compassion",
  },
  {
    id: "w039",
    text: "You don't have to earn rest. You don't have to earn kindness.",
    author: null,
    category: "self-compassion",
  },
  {
    id: "w040",
    text: "Healing is not linear. Neither is learning. Neither is growth.",
    author: null,
    category: "self-compassion",
  },

  // ── Nature ────────────────────────────────────────────────────────────────
  {
    id: "w041",
    text: "Adopt the pace of nature: her secret is patience.",
    author: "Ralph Waldo Emerson",
    category: "nature",
  },
  {
    id: "w042",
    text: "In every walk with nature, one receives far more than one seeks.",
    author: "John Muir",
    category: "nature",
  },
  {
    id: "w043",
    text: "Look deep into nature, and then you will understand everything better.",
    author: "Albert Einstein",
    category: "nature",
  },
  {
    id: "w044",
    text: "The tree that bends in the storm survives. The tree that cannot bend, breaks.",
    author: null,
    category: "nature",
  },
  {
    id: "w045",
    text: "Even the darkest night will end and the sun will rise.",
    author: "Victor Hugo",
    category: "nature",
  },
  {
    id: "w046",
    text: "Rivers know this: there is no hurry. We shall get there some day.",
    author: "A.A. Milne",
    category: "nature",
  },
  {
    id: "w047",
    text: "Nature does not hurry, yet everything is accomplished.",
    author: "Lao Tzu",
    category: "nature",
  },
  {
    id: "w048",
    text: "The ocean is made of drops. So are you — made of small moments.",
    author: null,
    category: "nature",
  },
  {
    id: "w049",
    text: "A seed does not know the tree it will become. It simply grows.",
    author: null,
    category: "nature",
  },
  {
    id: "w050",
    text: "The sky is not less beautiful because you cannot see all of it.",
    author: null,
    category: "nature",
  },

  // ── Presence ──────────────────────────────────────────────────────────────
  {
    id: "w051",
    text: "The present moment is the only moment available to us, and it is the door to all moments.",
    author: "Thich Nhat Hanh",
    category: "presence",
  },
  {
    id: "w052",
    text: "Yesterday is history, tomorrow is a mystery. Today is a gift. That is why it is called the present.",
    author: "attributed to Alice Morse Earle",
    category: "presence",
  },
  {
    id: "w053",
    text: "Be here now.",
    author: "Ram Dass",
    category: "presence",
  },
  {
    id: "w054",
    text: "Wherever you are, be all there.",
    author: "Jim Elliot",
    category: "presence",
  },
  {
    id: "w055",
    text: "Life is what happens when you are busy making other plans.",
    author: "John Lennon",
    category: "presence",
  },
  {
    id: "w056",
    text: "The secret of health for both mind and body is not to mourn for the past, nor to worry about the future, but to live the present moment wisely and earnestly.",
    author: "attributed to Buddha",
    category: "presence",
  },
  {
    id: "w057",
    text: "Drink your tea slowly and reverently, as if it is the axis on which the world earth revolves.",
    author: "Thich Nhat Hanh",
    category: "presence",
  },
  {
    id: "w058",
    text: "The simplest things, attended to fully, become extraordinary.",
    author: null,
    category: "presence",
  },
  {
    id: "w059",
    text: "Nothing is lost upon a person who is bent on growth. Nothing wasted on one who is always preparing.",
    author: "Eudora Welty",
    category: "presence",
  },
  {
    id: "w060",
    text: "There is only now. And look, how rich this moment is.",
    author: null,
    category: "presence",
  },
  {
    id: "w061",
    text: "If you are present, you have everything you need.",
    author: null,
    category: "presence",
  },
  {
    id: "w062",
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "attributed to Buddha",
    category: "presence",
  },
  {
    id: "w063",
    text: "Mindfulness is simply being aware of what is happening right now without wishing it were different.",
    author: "James Baraz",
    category: "presence",
  },
];

/**
 * Get a wisdom entry by id.
 */
export function getWisdomById(id) {
  return WISDOM_ENTRIES.find((w) => w.id === id) ?? null;
}

/**
 * Get all entries for a given category.
 * Returns all if category is "all" or not provided.
 */
export function getWisdomByCategory(categoryId) {
  if (!categoryId || categoryId === "all") return WISDOM_ENTRIES;
  return WISDOM_ENTRIES.filter((w) => w.category === categoryId);
}
