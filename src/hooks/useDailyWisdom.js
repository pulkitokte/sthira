// src/hooks/useDailyWisdom.js
// Manages all Daily Wisdom UI state.
// Persistence lives in dailyWisdom.js utilities.

import { useState, useCallback, useMemo } from "react";
import {
  getTodayWisdom,
  loadFavoriteIds,
  toggleFavorite,
  loadFavoriteEntries,
  searchWisdom,
} from "../utils/dailyWisdom";
import { WISDOM_ENTRIES, getWisdomByCategory } from "../data/wisdomData";

export const WISDOM_VIEW = {
  TODAY: "today", // Daily wisdom card
  ARCHIVE: "archive", // Browse all entries
  FAVORITES: "favorites", // Saved favorites
};

export function useDailyWisdom() {
  const [view, setView] = useState(WISDOM_VIEW.TODAY);
  const [favoriteIds, setFavoriteIds] = useState(() => loadFavoriteIds());
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Today's wisdom — stable, does not change on re-render
  const todayWisdom = useMemo(() => getTodayWisdom(), []);

  // Filtered archive entries
  const archiveEntries = useMemo(() => {
    const byCategory = getWisdomByCategory(activeCategory);
    return searchWisdom(searchQuery, byCategory);
  }, [activeCategory, searchQuery]);

  // Favorite entries (full objects)
  const favoriteEntries = useMemo(
    () => loadFavoriteEntries(),
    // Re-derive whenever favoriteIds changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [favoriteIds],
  );

  // ── Favorites ──────────────────────────────────────────────────────────────

  const handleToggleFavorite = useCallback((wisdomId) => {
    toggleFavorite(wisdomId);
    // Re-sync local state from storage
    setFavoriteIds(loadFavoriteIds());
  }, []);

  const isFav = useCallback(
    (wisdomId) => favoriteIds.includes(wisdomId),
    [favoriteIds],
  );

  // ── Navigation ──────────────────────────────────────────────────────────────

  const goToToday = useCallback(() => setView(WISDOM_VIEW.TODAY), []);
  const goToArchive = useCallback(() => setView(WISDOM_VIEW.ARCHIVE), []);
  const goToFavorites = useCallback(() => setView(WISDOM_VIEW.FAVORITES), []);

  return {
    // State
    view,
    todayWisdom,
    favoriteIds,
    favoriteEntries,
    archiveEntries,
    activeCategory,
    searchQuery,
    // Derived
    isFav,
    favoritesCount: favoriteIds.length,
    totalCount: WISDOM_ENTRIES.length,
    // Actions
    handleToggleFavorite,
    setActiveCategory,
    setSearchQuery,
    goToToday,
    goToArchive,
    goToFavorites,
  };
}
