// src/hooks/useSelfCompassion.js
// Manages all Self-Compassion Toolkit UI state.
// Persistence lives in selfCompassion.js utilities.

import { useState, useCallback } from "react";
import {
  recordFeedback,
  getNextEncouragementIndex,
} from "../utils/selfCompassion";
import { COMPASSION_CONTENT } from "../data/selfCompassionData";

export const COMPASSION_VIEW = {
  HOME: "home", // Card grid
  SUPPORT: "support", // Open support screen
};

export const FEEDBACK_STATE = {
  PENDING: "pending", // Not yet answered
  ANSWERED: "answered", // Just answered — show thank you
  DISMISSED: "dismissed", // Won't show again this session
};

export function useSelfCompassion() {
  const [view, setView] = useState(COMPASSION_VIEW.HOME);
  const [activeCard, setActiveCard] = useState(null);

  // Encouragement rotation
  const encouragementItems = COMPASSION_CONTENT.encouragement?.items ?? [];
  const [encouragementIndex, setEncouragementIndex] = useState(() =>
    Math.floor(Math.random() * Math.max(encouragementItems.length, 1)),
  );

  // Feedback state per session (resets on navigate away)
  const [feedbackState, setFeedbackState] = useState(FEEDBACK_STATE.PENDING);
  const [feedbackResponse, setFeedbackResponse] = useState(null); // "helpful" | "notNow"

  // ── Navigation ──────────────────────────────────────────────────────────

  const openCard = useCallback((card) => {
    setActiveCard(card);
    setFeedbackState(FEEDBACK_STATE.PENDING);
    setFeedbackResponse(null);
    setView(COMPASSION_VIEW.SUPPORT);
  }, []);

  const goHome = useCallback(() => {
    setActiveCard(null);
    setView(COMPASSION_VIEW.HOME);
  }, []);

  // ── Encouragement rotation ────────────────────────────────────────────────

  const nextEncouragement = useCallback(() => {
    setEncouragementIndex((prev) =>
      getNextEncouragementIndex(encouragementItems.length, prev),
    );
  }, [encouragementItems.length]);

  // ── Feedback ──────────────────────────────────────────────────────────────

  const submitFeedback = useCallback(
    (type) => {
      if (!activeCard) return;
      recordFeedback(activeCard.id, type);
      setFeedbackResponse(type);
      setFeedbackState(FEEDBACK_STATE.ANSWERED);
    },
    [activeCard],
  );

  const dismissFeedback = useCallback(() => {
    setFeedbackState(FEEDBACK_STATE.DISMISSED);
  }, []);

  // Content for the active card
  const activeContent = activeCard
    ? (COMPASSION_CONTENT[activeCard.id] ?? null)
    : null;

  const currentEncouragement = encouragementItems[encouragementIndex] ?? null;

  return {
    // State
    view,
    activeCard,
    activeContent,
    feedbackState,
    feedbackResponse,
    currentEncouragement,
    encouragementIndex,
    encouragementTotal: encouragementItems.length,
    // Actions
    openCard,
    goHome,
    nextEncouragement,
    submitFeedback,
    dismissFeedback,
  };
}
