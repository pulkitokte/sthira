// src/hooks/useCompanion.js
// Manages Gentle Companion UI state.
// Persistence and message selection live in companionEngine.js utilities.
// Batch 50: removed unused import of loadBreathingHistory.
//           removed unused getTimeOfDay import (context derivation is now internal).

import { useState, useCallback, useMemo } from "react";
import {
  getTodayCompanionMessage,
  getRefreshMessage,
  toggleFavorite,
  loadFavoriteIds,
  loadFavoriteMessages,
  getCategoryLabel,
} from "../utils/companionEngine";

export function useCompanion() {
  const [currentMessage, setCurrentMessage] = useState(() =>
    getTodayCompanionMessage(),
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
    const next = getRefreshMessage(currentMessage?.id);
    setCurrentMessage(next);
  }, [currentMessage]);

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
    refreshMessage,
    handleToggleFavorite,
    isFav,
  };
}
