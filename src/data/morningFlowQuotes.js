// src/data/morningFlowQuotes.js
// Motivational quotes for the Morning Flow completion screen.
// Deterministic "quote of the day" selection, same date-hash pattern
// already used in companionEngine.js's selectMessage().

export const MORNING_FLOW_QUOTES = [
  "Small movements, done consistently, become a strong body.",
  "You showed up for yourself this morning. That matters.",
  "Every gentle stretch is a quiet act of self-care.",
  "Progress is rarely loud. It looks like this — showing up.",
  "The body you move today carries you through the rest of the day.",
  "Consistency, not intensity, is what changes a life.",
  "A calm start to the morning is a gift to your whole day.",
];

export function getQuoteOfTheDay() {
  const today = new Date().toISOString().slice(0, 10);
  const hash = today.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return MORNING_FLOW_QUOTES[hash % MORNING_FLOW_QUOTES.length];
}
