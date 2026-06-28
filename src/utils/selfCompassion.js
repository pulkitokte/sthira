// src/utils/selfCompassion.js
// Pure utilities for the Self-Compassion Toolkit.
// No UI. Testable. Supports future favorites, analytics, personalization.

const FEEDBACK_KEY = "sthira_self_compassion_feedback";

/**
 * Load the full feedback record from localStorage.
 * Structure: { [cardId]: { helpful: number, notNow: number } }
 */
export function loadFeedback() {
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

/**
 * Record a feedback response for a card.
 * type: "helpful" | "notNow"
 */
export function recordFeedback(cardId, type) {
  try {
    const feedback = loadFeedback();
    if (!feedback[cardId]) {
      feedback[cardId] = { helpful: 0, notNow: 0 };
    }
    if (type === "helpful") {
      feedback[cardId].helpful += 1;
    } else if (type === "notNow") {
      feedback[cardId].notNow += 1;
    }
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedback));
  } catch (_) {
    // Fail silently
  }
}

/**
 * Get feedback counts for a specific card.
 * Returns { helpful: number, notNow: number }
 */
export function getFeedbackForCard(cardId) {
  const feedback = loadFeedback();
  return feedback[cardId] ?? { helpful: 0, notNow: 0 };
}

/**
 * Get total helpful count across all cards — for future insights.
 */
export function getTotalHelpfulCount() {
  const feedback = loadFeedback();
  return Object.values(feedback).reduce((sum, f) => sum + (f.helpful ?? 0), 0);
}

/**
 * Get total visit/interaction count across all cards — for future analytics.
 */
export function getTotalInteractionCount() {
  const feedback = loadFeedback();
  return Object.values(feedback).reduce(
    (sum, f) => sum + (f.helpful ?? 0) + (f.notNow ?? 0),
    0,
  );
}

/**
 * Get the most-used card id — for future personalization/recommendations.
 */
export function getMostUsedCard() {
  const feedback = loadFeedback();
  let maxId = null;
  let maxCount = 0;
  for (const [id, counts] of Object.entries(feedback)) {
    const total = (counts.helpful ?? 0) + (counts.notNow ?? 0);
    if (total > maxCount) {
      maxCount = total;
      maxId = id;
    }
  }
  return maxId;
}

/**
 * Get a random encouragement message index, avoiding the last shown.
 * Used to rotate messages in the encouragement card.
 */
export function getNextEncouragementIndex(total, currentIndex) {
  if (total <= 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * total);
  } while (next === currentIndex);
  return next;
}
