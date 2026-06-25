import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Brain, Pause, Play } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import IntentionSelector from "../components/focus/IntentionSelector";
import CompletionScreen from "../components/common/CompletionScreen";
import MissingSelectionState from "../components/common/MissingSelectionState";
import { useFocus } from "../context/FocusContext";
import { useTimer } from "../hooks/useTimer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  getFocusSessionById,
  CALM_MESSAGES,
  FOCUS_INTENTIONS,
} from "../data/focusSessions";
import {
  formatSeconds,
  getCalmMessage,
  getCompletionText,
  formatActualDuration,
} from "../utils/focusUtils";
import { PATHS } from "../constants/navigation";

const STATUS = { INTRO: "intro", ACTIVE: "active", COMPLETED: "completed" };

export default function FocusPlayer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addFocusCompletion } = useFocus();
  const session = state?.sessionId
    ? getFocusSessionById(state.sessionId)
    : null;

  const [status, setStatus] = useState(STATUS.INTRO);
  const [selectedIntention, setSelectedIntention] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [actualSeconds, setActualSeconds] = useState(0);
  const [wasCompleted, setWasCompleted] = useState(false);

  const totalSeconds = (session?.duration ?? 0) * 60;

  // Called unconditionally — hook order must be stable across render branches.
  // The timer only ticks when status === ACTIVE and not paused.
  useDocumentTitle(session ? `${session.title} · Focus` : "Focus Session");

  const secondsLeft = useTimer(totalSeconds, {
    isPaused: status !== STATUS.ACTIVE || isPaused,
    onComplete: () => {
      setActualSeconds(totalSeconds);
      setWasCompleted(true);
      if (session) addFocusCompletion(session, totalSeconds, selectedIntention);
      setStatus(STATUS.COMPLETED);
    },
  });

  if (!session) {
    return (
      <MissingSelectionState
        icon={Brain}
        heading="No session selected"
        description="Head back to Focus Sessions and choose a session length to begin."
        buttonLabel="Browse Focus Sessions"
        onButtonClick={() => navigate(PATHS.FOCUS_SESSIONS)}
      />
    );
  }

  const elapsed = totalSeconds - secondsLeft;
  const calmMessage = getCalmMessage(elapsed, CALM_MESSAGES);
  const intentionLabel =
    FOCUS_INTENTIONS.find((i) => i.id === selectedIntention)?.label ?? null;

  const handleBegin = () => {
    setIsPaused(false);
    setStatus(STATUS.ACTIVE);
  };

  const handleEndEarly = () => {
    const elapsedSecs = totalSeconds - secondsLeft;
    setActualSeconds(elapsedSecs);
    setWasCompleted(false);
    addFocusCompletion(session, elapsedSecs, selectedIntention);
    setStatus(STATUS.COMPLETED);
  };

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (status === STATUS.INTRO) {
    return (
      <PageContainer className="flex flex-1 flex-col gap-8">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-stone">
            Focus Session
          </p>
          <h1 className="mt-2 font-display text-[26px] font-semibold leading-snug text-ink">
            {session.title}
          </h1>
          <p className="mt-2 leading-relaxed text-stone">
            {session.description}
          </p>
          <div className="mt-4">
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-stone">
              {session.duration} minutes
            </span>
          </div>
        </div>

        <IntentionSelector
          selected={selectedIntention}
          onSelect={setSelectedIntention}
        />

        <div className="mt-auto">
          <p className="mb-3 text-center text-xs text-stone">
            Find a comfortable, distraction-free space before you begin.
          </p>
          <button
            onClick={handleBegin}
            className="w-full rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors hover:bg-moss-dark"
          >
            Begin Session
          </button>
        </div>
      </PageContainer>
    );
  }

  // ── COMPLETED ─────────────────────────────────────────────────────────────
  if (status === STATUS.COMPLETED) {
    return (
      <CompletionScreen
        icon={Brain}
        accent="moss"
        heading={wasCompleted ? `${session.title} complete.` : "Session ended."}
        description={getCompletionText(session, actualSeconds, wasCompleted)}
        stats={[
          { value: formatActualDuration(actualSeconds), label: "Focused" },
          { value: intentionLabel ?? "Open", label: "Intention" },
        ]}
        buttonLabel="Back to Focus Sessions"
        onButtonClick={() => navigate(PATHS.FOCUS_SESSIONS)}
      />
    );
  }

  // ── ACTIVE ────────────────────────────────────────────────────────────────
  return (
    <PageContainer className="flex flex-1 flex-col items-center">
      {/* Session identity */}
      <div className="w-full pt-2 text-center">
        <p className="font-display text-sm font-medium text-stone">
          {session.title}
        </p>
        {intentionLabel && (
          <span className="mt-2 inline-block rounded-full bg-sage/15 px-3 py-1 text-xs font-medium text-moss">
            {intentionLabel}
          </span>
        )}
      </div>

      {/* Large timer — the centrepiece of the active screen */}
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <span
          className={`font-display tabular-nums tracking-tight transition-colors duration-500 ${
            isPaused ? "text-stone/40" : "text-moss"
          }`}
          style={{ fontSize: "clamp(4rem, 18vw, 5rem)", lineHeight: 1 }}
          aria-label={`${Math.floor(secondsLeft / 60)} minutes ${secondsLeft % 60} seconds remaining`}
          aria-live="off"
        >
          {formatSeconds(secondsLeft)}
        </span>

        {isPaused ? (
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-stone">
            Paused
          </span>
        ) : (
          <p className="max-w-[190px] text-center text-sm leading-relaxed text-stone/60">
            {calmMessage}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="w-full space-y-3 pb-2">
        <button
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? "Resume session" : "Pause session"}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface py-3.5 font-display font-semibold text-ink shadow-soft transition-colors hover:bg-canvas"
        >
          {isPaused ? (
            <>
              <Play size={18} strokeWidth={2} aria-hidden="true" />
              Resume
            </>
          ) : (
            <>
              <Pause size={18} strokeWidth={2} aria-hidden="true" />
              Pause
            </>
          )}
        </button>
        <button
          onClick={handleEndEarly}
          className="w-full rounded-full py-3 font-display text-sm font-medium text-stone/50 transition-colors hover:text-stone"
        >
          End session early
        </button>
      </div>
    </PageContainer>
  );
}
