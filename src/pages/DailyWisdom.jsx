// src/pages/DailyWisdom.jsx
// Daily Wisdom page — today's card, favorites, and full archive with search/filter.

import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, X } from "lucide-react";
import { useDailyWisdom, WISDOM_VIEW } from "../hooks/useDailyWisdom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import WisdomCard from "../components/wisdom/WisdomCard";
import WisdomCategoryFilter from "../components/wisdom/WisdomCategoryFilter";
import WisdomArchiveCard from "../components/wisdom/WisdomArchiveCard";

// ── Tab bar ──────────────────────────────────────────────────────────────────
function WisdomTabs({ view, onToday, onArchive, onFavorites, favoritesCount }) {
  const tabs = [
    { id: WISDOM_VIEW.TODAY, label: "Today", onClick: onToday },
    { id: WISDOM_VIEW.ARCHIVE, label: "All Wisdom", onClick: onArchive },
    {
      id: WISDOM_VIEW.FAVORITES,
      label: `Saved${favoritesCount > 0 ? ` (${favoritesCount})` : ""}`,
      onClick: onFavorites,
    },
  ];

  return (
    <div
      className="flex rounded-2xl p-1 gap-1"
      style={{ background: "rgba(185,175,160,0.1)" }}
    >
      {tabs.map((tab) => {
        const isActive = view === tab.id;
        return (
          <button
            key={tab.id}
            onClick={tab.onClick}
            className="flex-1 py-2 rounded-xl font-display text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{
              background: isActive ? "#fff" : "transparent",
              color: isActive ? "#3a4a3e" : "#8a8070",
              boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
            aria-pressed={isActive}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Empty favorites state ────────────────────────────────────────────────────
function FavoritesEmpty({ onBrowse }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-5 px-6">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(185,175,160,0.1)",
          border: "1.5px solid rgba(185,175,160,0.25)",
        }}
      >
        <span className="text-xl">♡</span>
      </div>
      <div className="space-y-2 max-w-xs">
        <p className="font-display text-base font-light text-ink">
          No saved wisdom yet.
        </p>
        <p className="text-sm text-stone font-light leading-relaxed">
          Tap the heart on any wisdom card to save it here.
        </p>
      </div>
      <button
        onClick={onBrowse}
        className="px-7 py-2.5 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
        style={{ background: "#869F8A" }}
      >
        Browse all wisdom
      </button>
    </div>
  );
}

// ── Archive empty ────────────────────────────────────────────────────────────
function ArchiveEmpty({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-4 px-6">
      <p className="font-display text-base font-light text-ink">
        No results found.
      </p>
      <button
        onClick={onClear}
        className="text-sm text-stone font-light hover:text-ink transition-colors"
      >
        Clear search
      </button>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function DailyWisdom() {
  const navigate = useNavigate();
  const wisdom = useDailyWisdom();
  useDocumentTitle("Daily Wisdom");

  const {
    view,
    todayWisdom,
    favoriteEntries,
    archiveEntries,
    activeCategory,
    searchQuery,
    isFav,
    favoritesCount,
    totalCount,
    handleToggleFavorite,
    setActiveCategory,
    setSearchQuery,
    goToToday,
    goToArchive,
    goToFavorites,
  } = wisdom;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #f8f6f2 0%, #f5f2ee 60%, #f8f6f2 100%)",
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-4"
        style={{
          background: "rgba(248,246,242,0.9)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(185,175,160,0.12)",
        }}
      >
        <div className="max-w-lg mx-auto space-y-4">
          {/* Back + title */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-xl transition-all"
              style={{ color: "#8a8070" }}
              aria-label="Go back"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <h1
              className="font-display font-light text-ink tracking-tight"
              style={{ fontSize: "1.2rem" }}
            >
              Daily Wisdom
            </h1>
          </div>

          {/* Tabs */}
          <WisdomTabs
            view={view}
            onToday={goToToday}
            onArchive={goToArchive}
            onFavorites={goToFavorites}
            favoritesCount={favoritesCount}
          />
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6 pb-20">
        {/* ── Today view ── */}
        {view === WISDOM_VIEW.TODAY && (
          <div className="space-y-8">
            {/* Main card */}
            <WisdomCard
              entry={todayWisdom}
              isFavorited={isFav(todayWisdom?.id)}
              onToggleFavorite={handleToggleFavorite}
              isToday
            />

            {/* Gentle note */}
            <p className="text-center text-xs text-stone font-light italic opacity-50">
              A new thought arrives each day.
            </p>

            {/* Browse prompt */}
            <div
              className="rounded-2xl p-5 flex items-center justify-between gap-4"
              style={{
                background: "rgba(185,175,160,0.07)",
                border: "1px solid rgba(185,175,160,0.18)",
              }}
            >
              <div className="space-y-1">
                <p className="font-display text-sm font-medium text-ink">
                  Explore all {totalCount} entries
                </p>
                <p className="text-xs text-stone font-light">
                  Filter by category or search by topic.
                </p>
              </div>
              <button
                onClick={goToArchive}
                className="shrink-0 px-4 py-2 rounded-full font-display text-xs font-semibold text-canvas transition-opacity hover:opacity-90"
                style={{ background: "#869F8A" }}
              >
                Browse
              </button>
            </div>
          </div>
        )}

        {/* ── Archive view ── */}
        {view === WISDOM_VIEW.ARCHIVE && (
          <div className="space-y-5">
            {/* Search bar */}
            <div className="relative">
              <Search
                size={15}
                strokeWidth={1.5}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone opacity-50"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wisdom…"
                className="w-full pl-9 pr-9 py-3 rounded-2xl border border-border bg-canvas text-sm text-ink font-light placeholder:text-stone placeholder:opacity-50 focus:border-sage focus:outline-none transition-colors"
                style={{ fontFamily: "inherit" }}
              />
              {searchQuery.length > 0 && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone opacity-50 hover:opacity-80 transition-opacity"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category filter */}
            <WisdomCategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
            />

            {/* Count */}
            <p className="text-xs text-stone font-light px-1">
              {archiveEntries.length === totalCount
                ? `${totalCount} entries`
                : `${archiveEntries.length} of ${totalCount} entries`}
            </p>

            {/* Entries */}
            {archiveEntries.length === 0 ? (
              <ArchiveEmpty
                onClear={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              />
            ) : (
              <div className="flex flex-col gap-3">
                {archiveEntries.map((entry) => (
                  <WisdomArchiveCard
                    key={entry.id}
                    entry={entry}
                    isFavorited={isFav(entry.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Favorites view ── */}
        {view === WISDOM_VIEW.FAVORITES && (
          <div className="space-y-5">
            {favoriteEntries.length === 0 ? (
              <FavoritesEmpty onBrowse={goToArchive} />
            ) : (
              <>
                <p className="text-xs text-stone font-light px-1">
                  {favoriteEntries.length}{" "}
                  {favoriteEntries.length === 1 ? "entry" : "entries"} saved
                </p>
                <div className="flex flex-col gap-3">
                  {favoriteEntries.map((entry) => (
                    <WisdomArchiveCard
                      key={entry.id}
                      entry={entry}
                      isFavorited={isFav(entry.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
