// src/hooks/useSanctuary.js
// Manages all Digital Sanctuary UI state.
// Persistence lives in sanctuary.js utilities.

import { useState, useCallback, useEffect } from "react";
import {
  loadAmbiencePreference,
  saveAmbiencePreference,
  getRandomSanctuaryMessage,
  getRandomQuietExercise,
  recordSanctuaryVisit,
} from "../utils/sanctuary";
import { GROUNDING_STEPS } from "../data/sanctuaryData";

export const SANCTUARY_SECTION = {
  HOME: "home", // Main sanctuary landing
  GROUNDING: "grounding", // Grounding ritual active
};

export function useSanctuary() {
  const [section, setSection] = useState(SANCTUARY_SECTION.HOME);
  const [message, setMessage] = useState(() => getRandomSanctuaryMessage());
  const [ambience, setAmbienceState] = useState(() => loadAmbiencePreference());
  const [exercise, setExercise] = useState(() => getRandomQuietExercise());

  // Grounding ritual state
  const [groundingStep, setGroundingStep] = useState(0);
  const [groundingComplete, setGroundingComplete] = useState(false);

  // Record visit on mount
  useEffect(() => {
    recordSanctuaryVisit();
  }, []);

  // ── Message ──────────────────────────────────────────────────────────────

  const refreshMessage = useCallback(() => {
    setMessage((prev) => getRandomSanctuaryMessage(prev));
  }, []);

  // ── Ambience ─────────────────────────────────────────────────────────────

  const selectAmbience = useCallback((id) => {
    setAmbienceState(id);
    saveAmbiencePreference(id);
  }, []);

  // ── Exercise ─────────────────────────────────────────────────────────────

  const refreshExercise = useCallback(() => {
    setExercise((prev) => getRandomQuietExercise(prev));
  }, []);

  // ── Grounding ritual ─────────────────────────────────────────────────────

  const startGrounding = useCallback(() => {
    setGroundingStep(0);
    setGroundingComplete(false);
    setSection(SANCTUARY_SECTION.GROUNDING);
  }, []);

  const nextGroundingStep = useCallback(() => {
    if (groundingStep < GROUNDING_STEPS.length - 1) {
      setGroundingStep((s) => s + 1);
    } else {
      setGroundingComplete(true);
    }
  }, [groundingStep]);

  const finishGrounding = useCallback(() => {
    setGroundingStep(0);
    setGroundingComplete(false);
    setSection(SANCTUARY_SECTION.HOME);
  }, []);

  const currentGroundingStep = GROUNDING_STEPS[groundingStep];
  const groundingProgress = (groundingStep + 1) / GROUNDING_STEPS.length;

  return {
    // State
    section,
    message,
    ambience,
    exercise,
    groundingStep,
    groundingComplete,
    currentGroundingStep,
    groundingProgress,
    // Actions
    refreshMessage,
    selectAmbience,
    refreshExercise,
    startGrounding,
    nextGroundingStep,
    finishGrounding,
    setSection,
  };
}
