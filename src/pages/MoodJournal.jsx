import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import FeatureHeader from "../components/layout/FeatureHeader";
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
      <FeatureHeader
        title={headerTitle}
        onBack={handleBack}
        showSettings={false}
        rightAction={
          isTimeline && !isEmpty ? (
            <button
              onClick={openNewEntry}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
              style={{ background: "#869F8A" }}
              aria-label="New journal entry"
            >
              <Plus size={15} strokeWidth={2} />
              New
            </button>
          ) : null
        }
      />

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
