import { useNavigate } from "react-router-dom";
import { Plus, List, Leaf } from "lucide-react";
import FeatureHeader from "../components/layout/FeatureHeader";
import { useGratitudeGarden, GARDEN_VIEW } from "../hooks/useGratitudeGarden";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import GardenVisual from "../components/garden/GardenVisual";
import GratitudeEntryCard from "../components/garden/GratitudeEntryCard";
import GratitudeCategoryBadge from "../components/garden/GratitudeCategoryBadge";
import GardenEmptyState from "../components/garden/GardenEmptyState";
import { GRATITUDE_CATEGORIES } from "../data/gratitudeGardenData";
import { formatGratitudeDate } from "../utils/gratitudeGarden";

export default function GratitudeGarden() {
  const navigate = useNavigate();
  const garden = useGratitudeGarden();
  useDocumentTitle("Gratitude Garden");

  const {
    grouped,
    totalCount,
    isEmpty,
    view,
    justSaved,
    entryToDelete,
    canSave,
    text,
    setText,
    category,
    setCategory,
    openNew,
    openTimeline,
    openOverview,
    goBack,
    saveEntry,
    confirmDelete,
    executeDelete,
    cancelDelete,
  } = garden;

  const isOverview = view === GARDEN_VIEW.OVERVIEW;
  const isNew = view === GARDEN_VIEW.NEW;
  const isTimeline = view === GARDEN_VIEW.TIMELINE;

  const headerTitle = isNew
    ? "Add a moment"
    : isTimeline
      ? "All moments"
      : "Gratitude Garden";

  const handleBack = () => {
    if (isOverview) {
      navigate(-1);
    } else {
      openOverview();
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <FeatureHeader
        title={headerTitle}
        onBack={handleBack}
        showSettings={false}
        rightAction={
          isOverview && !isEmpty ? (
            <div className="flex items-center gap-2">
              <button
                onClick={openTimeline}
                className="p-2 rounded-xl text-stone hover:text-ink hover:bg-surface transition-all"
                aria-label="View timeline"
              >
                <List size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={openNew}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
                style={{ background: "#869F8A" }}
                aria-label="Add gratitude moment"
              >
                <Plus size={15} strokeWidth={2} />
                Add
              </button>
            </div>
          ) : isTimeline ? (
            <button
              onClick={openNew}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
              style={{ background: "#869F8A" }}
            >
              <Plus size={15} strokeWidth={2} />
              Add
            </button>
          ) : null
        }
      />

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* ── Overview ── */}
        {isOverview && (
          <>
            {isEmpty ? (
              <GardenEmptyState onPlant={openNew} />
            ) : (
              <div className="flex flex-col gap-6">
                {/* Count */}
                <div className="space-y-1">
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone">
                    Your garden
                  </p>
                  <p className="font-display text-2xl font-light text-ink">
                    {totalCount === 1
                      ? "1 moment planted."
                      : `${totalCount} moments planted.`}
                  </p>
                  <p className="text-sm text-stone font-light leading-relaxed">
                    Each one a quiet reminder of what is good.
                  </p>
                </div>

                {/* Garden visual */}
                <GardenVisual totalCount={totalCount} />

                {/* Recent entries preview */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone">
                      Recent
                    </p>
                    <button
                      onClick={openTimeline}
                      className="text-xs text-stone font-light hover:text-ink transition-colors"
                    >
                      See all →
                    </button>
                  </div>

                  {/* Show last 3 entries */}
                  {garden.entries.slice(0, 3).map((entry) => (
                    <GratitudeEntryCard
                      key={entry.id}
                      entry={entry}
                      onDelete={confirmDelete}
                    />
                  ))}
                </div>

                <div className="pb-4" />
              </div>
            )}
          </>
        )}

        {/* ── New Entry Form ── */}
        {isNew && (
          <div className="flex flex-col gap-7">
            {/* Gentle intro */}
            <p className="text-stone font-light text-sm leading-relaxed">
              What is one thing you are grateful for right now? It can be as
              small or large as feels true.
            </p>

            {/* Text input */}
            <div className="space-y-2">
              <label
                htmlFor="gratitude-text"
                className="block font-display text-sm font-medium text-ink"
              >
                I am grateful for…
                <span className="text-clay ml-1 text-xs">required</span>
              </label>
              <textarea
                id="gratitude-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="A kind word, a warm cup of tea, a moment of quiet…"
                rows={4}
                autoFocus
                className="w-full rounded-2xl border border-border bg-canvas px-4 py-3.5 text-sm text-ink font-light leading-relaxed placeholder:text-stone placeholder:opacity-50 resize-none focus:border-sage focus:outline-none transition-colors"
                style={{ fontFamily: "inherit" }}
              />
              {text.length > 0 && (
                <p className="text-right text-xs text-stone font-light opacity-60">
                  {text.length} characters
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-3">
              <p className="font-display text-sm font-medium text-ink">
                Category
                <span className="text-stone font-light ml-1 text-xs">
                  (optional)
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {GRATITUDE_CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(isSelected ? null : cat.id)}
                      className="rounded-full font-display text-xs font-medium px-3.5 py-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1"
                      style={{
                        background: isSelected ? cat.bg : "transparent",
                        border: `1.5px solid ${isSelected ? cat.border : "rgba(160,150,130,0.25)"}`,
                        color: isSelected ? cat.color : "#8a8070",
                        transform: isSelected ? "scale(1.04)" : "scale(1)",
                      }}
                      aria-pressed={isSelected}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Just saved celebration */}
            {justSaved && (
              <div
                className="rounded-2xl p-4 text-center"
                style={{
                  background: "rgba(134, 159, 138, 0.1)",
                  border: "1px solid rgba(134, 159, 138, 0.25)",
                }}
              >
                <p className="font-display text-sm font-medium text-ink">
                  🌿 Planted.
                </p>
                <p className="text-xs text-stone font-light mt-1">
                  Your garden has grown.
                </p>
              </div>
            )}

            {/* Actions */}
            {!justSaved && (
              <div className="flex flex-col gap-3 pt-1 pb-8">
                <button
                  onClick={saveEntry}
                  disabled={!canSave}
                  className="w-full py-3.5 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    background: canSave
                      ? "#869F8A"
                      : "rgba(134, 159, 138, 0.35)",
                    cursor: canSave ? "pointer" : "not-allowed",
                  }}
                >
                  Plant this moment
                </button>
                <button
                  onClick={openOverview}
                  className="w-full py-3 rounded-full font-display text-sm font-medium text-stone hover:text-ink transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Timeline ── */}
        {isTimeline && (
          <>
            {isEmpty ? (
              <GardenEmptyState onPlant={openNew} />
            ) : (
              <div className="flex flex-col gap-8">
                {grouped.map(({ date, entries }) => (
                  <div key={date} className="flex flex-col gap-3">
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone px-1">
                      {formatGratitudeDate(date)}
                    </p>
                    {entries.map((entry) => (
                      <GratitudeEntryCard
                        key={entry.id}
                        entry={entry}
                        onDelete={confirmDelete}
                      />
                    ))}
                  </div>
                ))}
                <div className="pb-4" />
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Delete Confirmation Modal ────────────────────────────────────── */}
      {entryToDelete && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-8 bg-ink/20">
          <div className="w-full max-w-lg rounded-3xl bg-canvas p-6 shadow-2xl space-y-4">
            <p className="font-display text-base font-medium text-ink">
              Remove this moment?
            </p>
            <p className="text-sm text-stone font-light leading-relaxed line-clamp-2">
              "{entryToDelete.text}"
            </p>
            <p className="text-xs text-stone font-light opacity-70">
              This cannot be undone.
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={cancelDelete}
                className="flex-1 rounded-full border border-border py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-surface"
              >
                Keep it
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 rounded-full bg-clay py-3 font-display text-sm font-semibold text-canvas"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
