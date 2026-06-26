// src/pages/MoodJournal.jsx
// Mood Journal page — timeline, new entry, detail, and edit views.
// All views are in-page — no nested routing needed.

import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import { useMoodJournal, JOURNAL_VIEW } from "../hooks/useMoodJournal";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import JournalEntryCard from "../components/journal/JournalEntryCard";
import JournalEntryDetail from "../components/journal/JournalEntryDetail";
import JournalEditor from "../components/journal/JournalEditor";
import JournalEmptyState from "../components/journal/JournalEmptyState";
import { formatEntryDate } from "../utils/moodJournal";

export default function MoodJournal() {
  const navigate = useNavigate();
  const journal = useMoodJournal();

  useDocumentTitle("Mood Journal");

  const {
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
  } = journal;

  // ── Shared header ────────────────────────────────────────────────────────
  const isTimeline = view === JOURNAL_VIEW.TIMELINE;
  const isNew = view === JOURNAL_VIEW.NEW;
  const isDetail = view === JOURNAL_VIEW.DETAIL;
  const isEdit = view === JOURNAL_VIEW.EDIT;

  const headerTitle = isNew
    ? "New Entry"
    : isDetail
      ? "Entry"
      : isEdit
        ? "Edit Entry"
        : "Mood Journal";

  const handleBack = () => {
    if (isTimeline) {
      navigate(-1);
    } else if (isDetail || isNew) {
      goToTimeline();
    } else if (isEdit) {
      // Go back to detail without losing selected entry
      journal.openDetail(selectedEntry);
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-canvas border-b border-border px-4 pt-12 pb-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-xl text-stone hover:text-ink hover:bg-surface transition-all"
              aria-label="Go back"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <h1 className="font-display text-xl font-semibold text-ink tracking-tight">
              {headerTitle}
            </h1>
          </div>

          {/* New entry button — only on timeline */}
          {isTimeline && !isEmpty && (
            <button
              onClick={openNewEntry}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
              style={{ background: "#869F8A" }}
              aria-label="New journal entry"
            >
              <Plus size={15} strokeWidth={2} />
              New
            </button>
          )}
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* ── Timeline ── */}
        {isTimeline && (
          <>
            {isEmpty ? (
              <JournalEmptyState onNewEntry={openNewEntry} />
            ) : (
              <div className="flex flex-col gap-8">
                {grouped.map(({ date, entries }) => (
                  <div key={date} className="flex flex-col gap-3">
                    {/* Date group header */}
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone px-1">
                      {formatEntryDate(date)}
                    </p>
                    {entries.map((entry) => (
                      <JournalEntryCard
                        key={entry.id}
                        entry={entry}
                        onOpen={openDetail}
                      />
                    ))}
                  </div>
                ))}

                {/* Bottom padding */}
                <div className="pb-4" />
              </div>
            )}
          </>
        )}

        {/* ── New Entry ── */}
        {isNew && (
          <JournalEditor
            onSave={saveNewEntry}
            onCancel={goToTimeline}
            isEditing={false}
          />
        )}

        {/* ── Detail ── */}
        {isDetail && selectedEntry && (
          <JournalEntryDetail
            entry={selectedEntry}
            onEdit={openEdit}
            onDelete={removeEntry}
          />
        )}

        {/* ── Edit ── */}
        {isEdit && selectedEntry && (
          <JournalEditor
            initialMood={selectedEntry.mood}
            initialText={selectedEntry.text}
            onSave={saveEditedEntry}
            onCancel={() => journal.openDetail(selectedEntry)}
            isEditing={true}
          />
        )}
      </div>
    </div>
  );
}
