// src/hooks/useLettersToSelf.js
// Manages all Letters to Self UI state.
// Persistence lives in lettersToSelf.js utilities.

import { useState, useCallback, useMemo } from "react";
import {
  loadLetters,
  createLetter,
  deleteLetter,
  groupLetters,
  isLetterUnlocked,
  getTomorrowKey,
} from "../utils/lettersToSelf";
import { DELIVERY_TYPES } from "../data/lettersData";

export const LETTERS_VIEW = {
  TIMELINE: "timeline", // Main list
  COMPOSE: "compose", // Write new letter
  OPEN: "open", // Reading a letter
};

export function useLettersToSelf() {
  const [letters, setLetters] = useState(() => loadLetters());
  const [view, setView] = useState(LETTERS_VIEW.TIMELINE);
  const [selectedLetter, setSelected] = useState(null);
  const [letterToDelete, setToDelete] = useState(null);

  // Compose form state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState(null);
  const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPES.ANYTIME);
  const [unlockDate, setUnlockDate] = useState(getTomorrowKey());

  const { available, future } = useMemo(() => groupLetters(letters), [letters]);
  const isEmpty = letters.length === 0;
  const canSave = title.trim().length > 0 && body.trim().length > 0;

  // ── Navigation ──────────────────────────────────────────────────────────

  const openCompose = useCallback(() => {
    setTitle("");
    setBody("");
    setMood(null);
    setDeliveryType(DELIVERY_TYPES.ANYTIME);
    setUnlockDate(getTomorrowKey());
    setView(LETTERS_VIEW.COMPOSE);
  }, []);

  const openLetter = useCallback((letter) => {
    // Only open if unlocked
    if (!isLetterUnlocked(letter)) return;
    setSelected(letter);
    setView(LETTERS_VIEW.OPEN);
  }, []);

  const goToTimeline = useCallback(() => {
    setSelected(null);
    setView(LETTERS_VIEW.TIMELINE);
  }, []);

  // ── Save ─────────────────────────────────────────────────────────────────

  const saveLetter = useCallback(() => {
    if (!canSave) return;
    createLetter({ title, body, mood, deliveryType, unlockDate });
    setLetters(loadLetters());
    setView(LETTERS_VIEW.TIMELINE);
  }, [title, body, mood, deliveryType, unlockDate, canSave]);

  // ── Delete ───────────────────────────────────────────────────────────────

  const confirmDelete = useCallback((letter) => {
    setToDelete(letter);
  }, []);

  const executeDelete = useCallback(() => {
    if (!letterToDelete) return;
    deleteLetter(letterToDelete.id);
    setLetters(loadLetters());
    setToDelete(null);
    // If we were reading the letter being deleted, go back to timeline
    if (selectedLetter?.id === letterToDelete.id) {
      setSelected(null);
      setView(LETTERS_VIEW.TIMELINE);
    }
  }, [letterToDelete, selectedLetter]);

  const cancelDelete = useCallback(() => setToDelete(null), []);

  return {
    // State
    letters,
    available,
    future,
    isEmpty,
    view,
    selectedLetter,
    letterToDelete,
    canSave,
    // Form
    title,
    setTitle,
    body,
    setBody,
    mood,
    setMood,
    deliveryType,
    setDeliveryType,
    unlockDate,
    setUnlockDate,
    // Actions
    openCompose,
    openLetter,
    goToTimeline,
    saveLetter,
    confirmDelete,
    executeDelete,
    cancelDelete,
    setView,
  };
}
