// src/hooks/useCompanion.js
// Manages Gentle Companion UI state.
// Persistence and message selection live in companionEngine.js.

import { useState, useCallback, useMemo } from "react";
import {
  getTodayCompanionMessage,
  getRefreshMessage,
  toggleFavorite,
  loadFavoriteIds,
  loadFavoriteMessages,
  isFavorited,
  getTimeOfDay,
  selectCategory,
  getCategoryLabel,
} from "../utils/companionEngine";
import { getTodayEntry } from "../utils/emotionalWeather";
import { loadBreathingHistory } from "../utils/breathingEngine";

export function useCompanion() {
  // Build context from available app data
  const context = useMemo(() => {
    const weatherEntry = getTodayEntry();
    const timeOfDay = getTimeOfDay();

    // Attempt to read streak from localStorage (progress context key)
    let streak = 0;
    try {
      const raw = localStorage.getItem("sthira_progress");
      if (raw) {
        const parsed = JSON.parse(raw);
        streak = parsed?.currentStreak ?? 0;
      }
    } catch (_) {}

    // Wellness data
    let wellnessStress = null;
    let wellnessEnergy = null;
    try {
      const raw = localStorage.getItem("sthira_wellness");
      if (raw) {
        const parsed = JSON.parse(raw);
        const today = new Date().toISOString().slice(0, 10);
        const entry = parsed?.entries?.find?.((e) => e.date === today);
        if (entry) {
          wellnessStress = entry.stress ?? null;
          wellnessEnergy = entry.energy ?? null;
        }
      }
    } catch (_) {}

    return {
      timeOfDay,
      streak,
      weatherId: weatherEntry?.weather ?? null,
      wellnessStress,
      wellnessEnergy,
    };
  }, []);

  const [currentMessage, setCurrentMessage] = useState(() =>
    getTodayCompanionMessage(context),
  );
  const [favoriteIds, setFavoriteIds] = useState(() => loadFavoriteIds());

  const favoriteMessages = useMemo(
    () => loadFavoriteMessages(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [favoriteIds],
  );

  const categoryLabel = useMemo(
    () => getCategoryLabel(currentMessage?.category),
    [currentMessage],
  );

  const currentIsFavorited = useMemo(
    () => (currentMessage ? favoriteIds.includes(currentMessage.id) : false),
    [currentMessage, favoriteIds],
  );

  // ── Actions ───────────────────────────────────────────────────────────────

  const refreshMessage = useCallback(() => {
    const next = getRefreshMessage(currentMessage?.id, context);
    setCurrentMessage(next);
  }, [currentMessage, context]);

  const handleToggleFavorite = useCallback((messageId) => {
    toggleFavorite(messageId);
    setFavoriteIds(loadFavoriteIds());
  }, []);

  const isFav = useCallback((id) => favoriteIds.includes(id), [favoriteIds]);

  return {
    currentMessage,
    categoryLabel,
    currentIsFavorited,
    favoriteMessages,
    favoritesCount: favoriteIds.length,
    context,
    refreshMessage,
    handleToggleFavorite,
    isFav,
  };
}
