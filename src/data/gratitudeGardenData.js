// src/data/gratitudeGardenData.js
// Constants and category definitions for the Gratitude Garden feature.

export const GRATITUDE_CATEGORIES = [
  {
    id: "people",
    label: "People",
    color: "rgba(134, 159, 138, 1)",
    bg: "rgba(134, 159, 138, 0.12)",
    border: "rgba(134, 159, 138, 0.3)",
  },
  {
    id: "nature",
    label: "Nature",
    color: "rgba(100, 150, 110, 1)",
    bg: "rgba(100, 150, 110, 0.12)",
    border: "rgba(100, 150, 110, 0.3)",
  },
  {
    id: "learning",
    label: "Learning",
    color: "rgba(120, 140, 175, 1)",
    bg: "rgba(120, 140, 175, 0.12)",
    border: "rgba(120, 140, 175, 0.3)",
  },
  {
    id: "health",
    label: "Health",
    color: "rgba(160, 130, 100, 1)",
    bg: "rgba(160, 130, 100, 0.12)",
    border: "rgba(160, 130, 100, 0.3)",
  },
  {
    id: "small-joys",
    label: "Small Joys",
    color: "rgba(185, 155, 90, 1)",
    bg: "rgba(185, 155, 90, 0.12)",
    border: "rgba(185, 155, 90, 0.3)",
  },
  {
    id: "other",
    label: "Other",
    color: "rgba(150, 140, 130, 1)",
    bg: "rgba(150, 140, 130, 0.12)",
    border: "rgba(150, 140, 130, 0.3)",
  },
];

/**
 * Get a category object by id.
 * Falls back to "other" if not found.
 */
export function getCategoryById(id) {
  return (
    GRATITUDE_CATEGORIES.find((c) => c.id === id) ??
    GRATITUDE_CATEGORIES[GRATITUDE_CATEGORIES.length - 1]
  );
}

/**
 * Garden element definitions.
 * Each element is a pure SVG/CSS shape — no canvas, no external libs.
 * Cycling through these as entries grow creates organic visual variety.
 */
export const GARDEN_ELEMENTS = [
  { type: "leaf-round", color: "#a8c5a0" },
  { type: "petal-soft", color: "#c9b99a" },
  { type: "leaf-long", color: "#8fad90" },
  { type: "bloom", color: "#b8c9a0" },
  { type: "sprout", color: "#9dbfa0" },
  { type: "petal-soft", color: "#d4c4a0" },
  { type: "leaf-round", color: "#b0c8b0" },
  { type: "bloom", color: "#c4b090" },
  { type: "sprout", color: "#a5c4a8" },
  { type: "leaf-long", color: "#b8a888" },
];

export const MAX_GARDEN_ELEMENTS = 50;
