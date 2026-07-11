// src/pages/LettersToSelf.jsx
// Letters to Self — compose, timeline, and open views.
// Warm, ceremonial, deeply personal.
//
// TEMPORARY DEBUG TRACING — added only to diagnose the back-button bug.
// No logic has been changed. Remove all console.log lines once the root
// cause is confirmed.

import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Lock } from "lucide-react";
import { useLettersToSelf, LETTERS_VIEW } from "../hooks/useLettersToSelf";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import LetterCard from "../components/letters/LetterCard";
import LetterComposer from "../components/letters/LetterComposer";
import LetterOpenView from "../components/letters/LetterOpenView";
import LettersEmptyState from "../components/letters/LettersEmptyState";

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
    console.log("[DEBUG] handleBack fired");
    console.log("[DEBUG] view:", view);
    console.log("[DEBUG] isTimeline:", isTimeline);
    console.log("[DEBUG] location.pathname:", location.pathname);
    console.log("[DEBUG] location.key:", location.key);
    console.log("[DEBUG] window.history.length:", window.history.length);

    if (isTimeline) {
      console.log("[DEBUG] branch: calling navigate(-1) now");
      navigate(-1);
      console.log("[DEBUG] navigate(-1) call completed (sync return)");
    } else {
      console.log("[DEBUG] branch: calling goToTimeline() now");
      goToTimeline();
      console.log("[DEBUG] goToTimeline() call completed");
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
      {/* ── Ambient orb ─────────────────────────────────────────────────── */}
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

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-4"
        style={{
          background: "rgba(250,248,244,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(185,175,160,0.12)",
        }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                console.log("[DEBUG] back button onClick fired");
                handleBack();
              }}
              className="p-2 -ml-2 rounded-xl transition-all"
              style={{ color: "#8a8070" }}
              aria-label="Go back"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <h1
              className="font-display font-light text-ink tracking-tight"
              style={{ fontSize: "1.15rem" }}
            >
              {headerTitle}
            </h1>
          </div>

          {/* New letter button — only on timeline when letters exist */}
          {isTimeline && !isEmpty && (
            <button
              onClick={openCompose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
              style={{ background: "#869F8A" }}
              aria-label="Write a new letter"
            >
              <Plus size={15} strokeWidth={2} />
              New
            </button>
          )}
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="relative max-w-lg mx-auto px-4 py-8 pb-20">
        {/* ── Timeline ── */}
        {isTimeline && (
          <>
            {isEmpty ? (
              <LettersEmptyState onCompose={openCompose} />
            ) : (
              <div className="flex flex-col gap-8">
                {/* Available letters */}
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

                {/* Future / sealed letters */}
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

        {/* ── Compose ── */}
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

        {/* ── Open letter ── */}
        {isOpen && selectedLetter && (
          <LetterOpenView
            letter={selectedLetter}
            onDelete={confirmDelete}
            onBack={goToTimeline}
          />
        )}
      </div>

      {/* ── Delete confirmation modal ─────────────────────────────────── */}
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
