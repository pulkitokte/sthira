import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import FeatureHeader from "../components/layout/FeatureHeader";
import Button from "../components/common/Button";
import HeaderActionButton from "../components/common/HeaderActionButton";
import {
  useEveningReflection,
  REFLECTION_VIEW,
} from "../hooks/useEveningReflection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import ReflectionMoodSelector from "../components/evening/ReflectionMoodSelector";
import ReflectionTextArea from "../components/evening/ReflectionTextArea";
import ReflectionEntryCard from "../components/evening/ReflectionEntryCard";
import ReflectionEmptyState from "../components/evening/ReflectionEmptyState";
import { REFLECTION_QUESTIONS } from "../data/eveningReflectionData";
import {
  formatReflectionDate,
  formatReflectionTime,
} from "../utils/eveningReflection";
import { getReflectionMoodById } from "../data/eveningReflectionData";

function MoodBadge({ moodId }) {
  const mood = getReflectionMoodById(moodId);
  if (!mood) return null;
  return (
    <span
      className="inline-block rounded-full font-display text-sm font-medium px-3.5 py-1.5"
      style={{
        background: mood.bg,
        border: `1px solid ${mood.border}`,
        color: mood.color,
      }}
    >
      {mood.label}
    </span>
  );
}

function DetailBlock({ question, answer }) {
  if (!answer || answer.trim().length === 0) return null;
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-display font-semibold uppercase tracking-[0.12em] text-stone">
        {question}
      </p>
      <p className="text-base text-ink font-light leading-[1.8] whitespace-pre-wrap">
        {answer}
      </p>
    </div>
  );
}

export default function EveningReflection() {
  const navigate = useNavigate();
  const reflection = useEveningReflection();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useDocumentTitle("Evening Reflection");

  const {
    grouped,
    isEmpty,
    view,
    selectedEntry,
    closingMessage,
    mood,
    setMood,
    wentWell,
    setWentWell,
    difficult,
    setDifficult,
    tomorrowIntention,
    setTomorrowIntention,
    openForm,
    openDetail,
    goToTimeline,
    saveReflection,
    removeReflection,
  } = reflection;

  const isTimeline = view === REFLECTION_VIEW.TIMELINE;
  const isForm = view === REFLECTION_VIEW.FORM;
  const isCompletion = view === REFLECTION_VIEW.COMPLETION;
  const isDetail = view === REFLECTION_VIEW.DETAIL;

  const headerTitle = isForm
    ? "Tonight's Reflection"
    : isDetail
      ? "Reflection"
      : isCompletion
        ? "Done"
        : "Evening Reflection";

  const handleBack = () => {
    if (isTimeline) {
      navigate(-1);
    } else if (isForm || isCompletion) {
      goToTimeline();
    } else if (isDetail) {
      setConfirmingDelete(false);
      goToTimeline();
    }
  };

  const handleDelete = () => {
    if (selectedEntry) {
      removeReflection(selectedEntry.id);
      setConfirmingDelete(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <FeatureHeader
        title={headerTitle}
        onBack={handleBack}
        showSettings={isTimeline}
        rightAction={
          isTimeline && !isEmpty ? (
            <HeaderActionButton
              icon={Plus}
              label="New"
              onClick={openForm}
              ariaLabel="New reflection"
            />
          ) : null
        }
      />

      <div className="max-w-lg mx-auto px-4 py-8">
        {isTimeline && (
          <>
            {isEmpty ? (
              <ReflectionEmptyState onBegin={openForm} />
            ) : (
              <div className="flex flex-col gap-8">
                {grouped.map(({ date, entries }) => (
                  <div key={date} className="flex flex-col gap-3">
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone px-1">
                      {formatReflectionDate(date)}
                    </p>
                    {entries.map((entry) => (
                      <ReflectionEntryCard
                        key={entry.id}
                        entry={entry}
                        onOpen={openDetail}
                      />
                    ))}
                  </div>
                ))}
                <div className="pb-4" />
              </div>
            )}
          </>
        )}

        {isForm && (
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-stone">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
              <p className="text-stone font-light text-sm leading-relaxed">
                All fields are optional. Write as much or as little as feels
                right.
              </p>
            </div>

            <ReflectionMoodSelector selected={mood} onChange={setMood} />

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-6">
              <ReflectionTextArea
                id="went-well"
                question={REFLECTION_QUESTIONS[0].question}
                placeholder={REFLECTION_QUESTIONS[0].placeholder}
                value={wentWell}
                onChange={setWentWell}
              />
              <ReflectionTextArea
                id="difficult"
                question={REFLECTION_QUESTIONS[1].question}
                placeholder={REFLECTION_QUESTIONS[1].placeholder}
                value={difficult}
                onChange={setDifficult}
              />
              <ReflectionTextArea
                id="tomorrow-intention"
                question={REFLECTION_QUESTIONS[2].question}
                placeholder={REFLECTION_QUESTIONS[2].placeholder}
                value={tomorrowIntention}
                onChange={setTomorrowIntention}
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 pb-8">
              <Button variant="primary" fullWidth onClick={saveReflection}>
                Save reflection
              </Button>
              <Button variant="ghost" fullWidth onClick={goToTimeline}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {isCompletion && closingMessage && (
          <div className="flex flex-col items-center justify-center text-center px-4 py-16 gap-8">
            <div
              className="w-20 h-20 rounded-full"
              style={{
                background: "rgba(134, 159, 138, 0.12)",
                border: "1.5px solid rgba(134, 159, 138, 0.35)",
              }}
            />

            <div className="space-y-3 max-w-xs">
              <p className="font-display text-2xl font-light text-ink tracking-tight">
                {closingMessage.heading}
              </p>
              <p className="text-base text-stone font-light leading-relaxed">
                {closingMessage.body}
              </p>
            </div>

            <div className="w-full max-w-xs flex flex-col gap-3 pt-2">
              <Button variant="primary" fullWidth onClick={goToTimeline}>
                View all reflections
              </Button>
              <Button variant="ghost" fullWidth onClick={() => navigate(-1)}>
                Back to home
              </Button>
            </div>
          </div>
        )}

        {isDetail && selectedEntry && (
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone">
                  {formatReflectionDate(selectedEntry.date)}
                </p>
                <p className="text-xs text-stone font-light">
                  {formatReflectionTime(selectedEntry.timestamp)}
                </p>
              </div>
              {selectedEntry.mood && <MoodBadge moodId={selectedEntry.mood} />}
            </div>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-6">
              <DetailBlock
                question="What went well today?"
                answer={selectedEntry.wentWell}
              />
              <DetailBlock
                question="What felt difficult today?"
                answer={selectedEntry.difficult}
              />
              <DetailBlock
                question="Carrying into tomorrow"
                answer={selectedEntry.tomorrowIntention}
              />

              {!selectedEntry.wentWell &&
                !selectedEntry.difficult &&
                !selectedEntry.tomorrowIntention && (
                  <p className="text-sm text-stone font-light italic opacity-60">
                    No text was recorded for this reflection.
                  </p>
                )}
            </div>

            <div className="h-px bg-border" />

            <div>
              {!confirmingDelete ? (
                <button
                  onClick={() => setConfirmingDelete(true)}
                  className="flex items-center gap-2 text-clay font-display text-sm font-medium hover:opacity-80 transition-opacity min-h-[44px]"
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                  Delete this reflection
                </button>
              ) : (
                <div
                  className="rounded-2xl p-4 space-y-3"
                  style={{
                    background: "rgba(170, 120, 100, 0.06)",
                    border: "1px solid rgba(170, 120, 100, 0.2)",
                  }}
                >
                  <p className="text-sm text-stone leading-relaxed">
                    Delete this reflection? This cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => setConfirmingDelete(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="danger" fullWidth onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="pb-4" />
          </div>
        )}
      </div>
    </div>
  );
}
