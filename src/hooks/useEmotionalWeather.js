// src/hooks/useEmotionalWeather.js
// Manages all Emotional Weather UI state.
// Persistence lives in emotionalWeather.js utilities.

import { useState, useCallback, useMemo } from "react";
import {
  loadWeatherEntries,
  getTodayEntry,
  createWeatherEntry,
  updateWeatherEntry,
  groupEntriesByMonth,
  getRecentWeatherIds,
} from "../utils/emotionalWeather";
import { getReflectionForWeather } from "../data/emotionalWeatherData";

export const WEATHER_VIEW = {
  TODAY: "today", // Check-in / today's status
  TIMELINE: "timeline", // Monthly grouped history
};

export function useEmotionalWeather() {
  const [entries, setEntries] = useState(() => loadWeatherEntries());
  const [view, setView] = useState(WEATHER_VIEW.TODAY);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [note, setNote] = useState("");

  // Derived
  const todayEntry = useMemo(() => getTodayEntry(), [entries]);
  const grouped = useMemo(() => groupEntriesByMonth(entries), [entries]);
  const recentIds = useMemo(() => getRecentWeatherIds(7), [entries]);
  const reflection = useMemo(
    () => getReflectionForWeather(getRecentWeatherIds(7)),
    [entries],
  );
  const isEmpty = entries.length === 0;
  const hasTodayEntry = todayEntry !== null;

  // ── Editing ───────────────────────────────────────────────────────────────

  const beginEdit = useCallback(() => {
    if (todayEntry) {
      setSelectedWeather(todayEntry.weather);
      setNote(todayEntry.note ?? "");
    } else {
      setSelectedWeather(null);
      setNote("");
    }
    setIsEditing(true);
  }, [todayEntry]);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
    setSelectedWeather(null);
    setNote("");
  }, []);

  // ── Save ─────────────────────────────────────────────────────────────────

  const saveEntry = useCallback(() => {
    if (!selectedWeather) return;

    if (todayEntry) {
      updateWeatherEntry(todayEntry.id, { weather: selectedWeather, note });
    } else {
      createWeatherEntry({ weather: selectedWeather, note });
    }

    setEntries(loadWeatherEntries());
    setIsEditing(false);
    setSelectedWeather(null);
    setNote("");
  }, [selectedWeather, note, todayEntry]);

  const canSave = selectedWeather !== null;

  return {
    // State
    entries,
    grouped,
    recentIds,
    reflection,
    todayEntry,
    hasTodayEntry,
    isEmpty,
    view,
    isEditing,
    canSave,
    // Form
    selectedWeather,
    setSelectedWeather,
    note,
    setNote,
    // Actions
    setView,
    beginEdit,
    cancelEdit,
    saveEntry,
  };
}
