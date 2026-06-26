// src/hooks/useEveningReflection.js
// Manages all Evening Reflection UI state.
// All persistence lives in eveningReflection.js utilities.

import { useState, useCallback } from "react";
import {
  loadReflections,
  createReflection,
  deleteReflection,
  groupReflectionsByDate,
} from "../utils/eveningReflection";
import { CLOSING_MESSAGES } from "../data/eveningReflectionData";

export const REFLECTION_VIEW = {
  TIMELINE: "timeline",   // Main list of past reflections
  FORM: "form",           // Active reflection form
  COMPLETION: "completion", // Post-save gentle closing screen
  DETAIL: "detail",       // Full view of a single past reflection
};

export function useEveningReflection() {
  const [reflections, setReflections] = useState(() => loadReflections());
  const [view, setView] = useState(REFLECTION_VIEW.TIMELINE);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [closingMessage, setClosingMessage] = useState(null);

  // Form state
  const [mood, setMood] = useState(null);
  const [wentWell, setWentWell] = useState("");
  const [difficult, setDifficult] = useState("");
  const [tomorrowIntention, setTomorrowIntention] = useState("");

  const grouped = groupReflectionsByDate(reflections);
  const isEmpty = reflections.length === 0;

  // ── Navigation ──────────────────────────────────────────────────────────

  const openForm = useCallback(() => {
    // Reset form fields each time
    setMood(null);
    setWentWell("");
    setDifficult("");
    setTomorrowIntention("");
    setView(REFLECTION_VIEW.FORM);
  }, []);

  const openDetail = useCallback((entry) => {
    setSelectedEntry(entry);
    setView(REFLECTION_VIEW.DETAIL);
  }, []);

  const goToTimeline = useCallback(() => {
    setSelectedEntry(null);
    setView(REFLECTION_VIEW.TIMELINE);
  }, []);

  // ── Save ────────────────────────────────────────────────────────────────

  const saveReflection = useCallback(() => {
    const entry = createReflection({ mood, wentWell, difficult, tomorrowIntention });
    setReflections(loadReflections());
    setSelectedEntry(entry);
    const msg = CLOSING_MESSAGES[Math.floor(Math.random() * CLOSING_MESSAGES.length)];
    setClosingMessage(msg);
    setView(REFLECTION_VIEW.COMPLETION);
  }, [mood, wentWell, difficult, tomorrowIntention]);

  // ── Delete ───────────────────────────────────────────────────────────────

  const removeReflection = useCallback((id) => {
    deleteReflection(id);
    setReflections(loadReflections());
    setSelectedEntry(null);
    setView(REFLECTION_VIEW.TIMELINE);
  }, []);

  // ── Check if any content entered (to enable save) ───────────────────────
  const hasAnyContent =
    mood !== null ||
    wentWell.trim().length > 0 ||
    difficult.trim().length > 0 ||
    tomorrowIntention.trim().length > 0;

  return {
    // State
    reflections,
    grouped,
    isEmpty,
    view,
    selectedEntry,
    closingMessage,
    hasAnyContent,
    // Form fields
    mood,
    setMood,
    wentWell,
    setWentWell,
    difficult,
    setDifficult,
    tomorrowIntention,
    setTomorrowIntention,
    // Actions
    openForm,
    openDetail,
    goToTimeline,
    saveReflection,
    removeReflection,
  };
}