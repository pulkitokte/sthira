// src/hooks/useMoodJournal.js
// Manages all journal UI state.
// Persistence logic lives in moodJournal.js utilities.

import { useState, useCallback } from "react";
import {
  loadJournalEntries,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  groupEntriesByDate,
} from "../utils/moodJournal";

export const JOURNAL_VIEW = {
  TIMELINE: "timeline", // Main list view
  NEW: "new", // New entry editor
  DETAIL: "detail", // Full entry view
  EDIT: "edit", // Edit existing entry
};

export function useMoodJournal() {
  const [entries, setEntries] = useState(() => loadJournalEntries());
  const [view, setView] = useState(JOURNAL_VIEW.TIMELINE);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const grouped = groupEntriesByDate(entries);
  const isEmpty = entries.length === 0;

  // ── Navigation ──────────────────────────────────────────────────────────

  const openNewEntry = useCallback(() => {
    setSelectedEntry(null);
    setView(JOURNAL_VIEW.NEW);
  }, []);

  const openDetail = useCallback((entry) => {
    setSelectedEntry(entry);
    setView(JOURNAL_VIEW.DETAIL);
  }, []);

  const openEdit = useCallback((entry) => {
    setSelectedEntry(entry);
    setView(JOURNAL_VIEW.EDIT);
  }, []);

  const goToTimeline = useCallback(() => {
    setSelectedEntry(null);
    setView(JOURNAL_VIEW.TIMELINE);
  }, []);

  // ── CRUD ────────────────────────────────────────────────────────────────

  const saveNewEntry = useCallback(({ mood, text }) => {
    const entry = createJournalEntry({ mood, text });
    setEntries(loadJournalEntries());
    setSelectedEntry(entry);
    setView(JOURNAL_VIEW.DETAIL);
  }, []);

  const saveEditedEntry = useCallback(
    ({ mood, text }) => {
      if (!selectedEntry) return;
      const updated = updateJournalEntry(selectedEntry.id, { mood, text });
      setEntries(loadJournalEntries());
      setSelectedEntry(updated);
      setView(JOURNAL_VIEW.DETAIL);
    },
    [selectedEntry],
  );

  const removeEntry = useCallback((id) => {
    deleteJournalEntry(id);
    setEntries(loadJournalEntries());
    setSelectedEntry(null);
    setView(JOURNAL_VIEW.TIMELINE);
  }, []);

  return {
    entries,
    grouped,
    isEmpty,
    view,
    selectedEntry,
    openNewEntry,
    openDetail,
    openEdit,
    goToTimeline,
    saveNewEntry,
    saveEditedEntry,
    removeEntry,
  };
}
