// src/hooks/useGratitudeGarden.js
// Manages all Gratitude Garden UI state.
// All persistence logic lives in gratitudeGarden.js utilities.

import { useState, useCallback } from "react";
import {
  loadGratitudeEntries,
  createGratitudeEntry,
  deleteGratitudeEntry,
  groupGratitudeByDate,
} from "../utils/gratitudeGarden";

export const GARDEN_VIEW = {
  OVERVIEW: "overview", // Garden visual + stats
  NEW: "new", // New entry form
  TIMELINE: "timeline", // Grouped entry list
  CONFIRM_DELETE: "confirm_delete",
};

export function useGratitudeGarden() {
  const [entries, setEntries] = useState(() => loadGratitudeEntries());
  const [view, setView] = useState(GARDEN_VIEW.OVERVIEW);
  const [entryToDelete, setEntryToDelete] = useState(null);

  // Form state
  const [text, setText] = useState("");
  const [category, setCategory] = useState(null);
  const [justSaved, setJustSaved] = useState(false);

  const grouped = groupGratitudeByDate(entries);
  const totalCount = entries.length;
  const isEmpty = entries.length === 0;

  // ── Navigation ──────────────────────────────────────────────────────────

  const openOverview = useCallback(() => {
    setView(GARDEN_VIEW.OVERVIEW);
  }, []);

  const openNew = useCallback(() => {
    setText("");
    setCategory(null);
    setJustSaved(false);
    setView(GARDEN_VIEW.NEW);
  }, []);

  const openTimeline = useCallback(() => {
    setView(GARDEN_VIEW.TIMELINE);
  }, []);

  const goBack = useCallback(() => {
    setView(GARDEN_VIEW.OVERVIEW);
  }, []);

  // ── Save ────────────────────────────────────────────────────────────────

  const saveEntry = useCallback(() => {
    if (!text.trim()) return;
    createGratitudeEntry({ text, category: category ?? "other" });
    setEntries(loadGratitudeEntries());
    setJustSaved(true);
    // Brief celebration then return to overview
    setTimeout(() => {
      setJustSaved(false);
      setView(GARDEN_VIEW.OVERVIEW);
    }, 1800);
  }, [text, category]);

  // ── Delete ───────────────────────────────────────────────────────────────

  const confirmDelete = useCallback((entry) => {
    setEntryToDelete(entry);
  }, []);

  const executeDelete = useCallback(() => {
    if (!entryToDelete) return;
    deleteGratitudeEntry(entryToDelete.id);
    setEntries(loadGratitudeEntries());
    setEntryToDelete(null);
  }, [entryToDelete]);

  const cancelDelete = useCallback(() => {
    setEntryToDelete(null);
  }, []);

  const canSave = text.trim().length > 0;

  return {
    // State
    entries,
    grouped,
    totalCount,
    isEmpty,
    view,
    justSaved,
    entryToDelete,
    canSave,
    // Form
    text,
    setText,
    category,
    setCategory,
    // Actions
    openOverview,
    openNew,
    openTimeline,
    goBack,
    saveEntry,
    confirmDelete,
    executeDelete,
    cancelDelete,
  };
}
