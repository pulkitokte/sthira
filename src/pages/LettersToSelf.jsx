import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Lock } from "lucide-react";
import { useLettersToSelf, LETTERS_VIEW } from "../hooks/useLettersToSelf";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import FeatureHeader from "../components/layout/FeatureHeader";
import LetterCard from "../components/letters/LetterCard";
import LetterComposer from "../components/letters/LetterComposer";
import LetterOpenView from "../components/letters/LetterOpenView";
import LettersEmptyState from "../components/letters/LettersEmptyState";
import { PATHS } from "../constants/navigation";

export default function LettersToSelf() {
  const navigate = useNavigate();
  const location = useLocation();
  const letters = useLettersToSelf();
  useDocumentTitle("Letters to Self");

  const {
    available,
    future,
    isEmpty,
    view,
    selectedLetter,
    letterToDelete,
    canSave,
    title,
    setTitle,
    body,
    setBody,
    mood,
    setMood,
    deliveryType,
    setDeliveryType,
    unlockDate,
    setUnlockDate,
    openCompose,
    openLetter,
    goToTimeline,
    saveLetter,
    confirmDelete,
    executeDelete,
    cancelDelete,
  } = letters;

  const isTimeline = view === LETTERS_VIEW.TIMELINE;
  const isCompose = view === LETTERS_VIEW.COMPOSE;
  const isOpen = view === LETTERS_VIEW.OPEN;

  const headerTitle = isCompose
    ? "New Letter"
    : isOpen
      ? "Your Letter"
      : "Letters to Self";

  const handleBack = () => {
    if (isTimeline) {
      if (location.key === "default") {
        navigate(PATHS.HOME);
      } else {
        navigate(-1);
      }
    } else {
      goToTimeline();
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #faf8f4 0%, #f7f4ef 50%, #faf8f4 100%)",
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: "-10%",
            right: "-15%",
            background:
              "radial-gradient(circle, rgba(185,175,160,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <FeatureHeader
        title={headerTitle}
        onBack={handleBack}
        showSettings={isTimeline}
        rightAction={
          isTimeline && !isEmpty ? (
            <button
              onClick={openCompose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
              style={{ background: "#869F8A" }}
              aria-label="Write a new letter"
            >
              <Plus size={15} strokeWidth={2} />
              New
            </button>
          ) : null
        }
      />

      <div className="relative max-w-lg mx-auto px-4 py-8 pb-20">
        {isTimeline && (
          <>
            {isEmpty ? (
              <LettersEmptyState onCompose={openCompose} />
            ) : (
              <div className="flex flex-col gap-8">
                {available.length > 0 && (
                  <div className="space-y-3">
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone px-1">
                      Available to read
                    </p>
                    <div className="flex flex-col gap-3">
                      {available.map((letter) => (
                        <LetterCard
                          key={letter.id}
                          letter={letter}
                          onOpen={openLetter}
                          onDelete={confirmDelete}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {future.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                      <Lock
                        size={11}
                        strokeWidth={1.5}
                        className="text-stone opacity-50"
                      />
                      <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70">
                        Sealed for later
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      {future.map((letter) => (
                        <LetterCard
                          key={letter.id}
                          letter={letter}
                          onOpen={openLetter}
                          onDelete={confirmDelete}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="pb-4" />
              </div>
            )}
          </>
        )}

        {isCompose && (
          <LetterComposer
            title={title}
            setTitle={setTitle}
            body={body}
            setBody={setBody}
            mood={mood}
            setMood={setMood}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            unlockDate={unlockDate}
            setUnlockDate={setUnlockDate}
            onSave={saveLetter}
            onCancel={goToTimeline}
            canSave={canSave}
          />
        )}

        {isOpen && selectedLetter && (
          <LetterOpenView
            letter={selectedLetter}
            onDelete={confirmDelete}
            onBack={goToTimeline}
          />
        )}
      </div>

      {letterToDelete && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-8 bg-ink/20">
          <div className="w-full max-w-lg rounded-3xl bg-canvas p-6 shadow-2xl space-y-4">
            <p className="font-display text-base font-medium text-ink">
              Delete "{letterToDelete.title}"?
            </p>
            <p className="text-sm text-stone font-light leading-relaxed">
              This letter will be gone permanently. This cannot be undone.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
