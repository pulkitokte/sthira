// src/components/breathing/BreathingPlayer.jsx
// Full-screen breathing player — pre-start, active session, and completion screens.
// Receives session data and breathingState from the parent page.

import { useEffect } from "react";
import { phaseLabel } from "../../utils/breathingEngine";
import { SESSION_STATUS } from "../../hooks/useBreathingSession";
import { Pause, Play, X } from "lucide-react";

/**
 * Animated breathing circle using CSS transform — no extra dependencies.
 */
function BreathingCircle({ scale, transitionMs, phase }) {
  const colorMap = {
    inhale: "rgba(134, 159, 138, 0.18)",
    hold: "rgba(134, 159, 138, 0.28)",
    exhale: "rgba(134, 159, 138, 0.12)",
    rest: "rgba(134, 159, 138, 0.08)",
  };

  const ringColorMap = {
    inhale: "rgba(134, 159, 138, 0.55)",
    hold: "rgba(134, 159, 138, 0.70)",
    exhale: "rgba(134, 159, 138, 0.40)",
    rest: "rgba(134, 159, 138, 0.25)",
  };

  const bg = colorMap[phase] ?? colorMap.inhale;
  const ring = ringColorMap[phase] ?? ringColorMap.inhale;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 240, height: 240 }}
    >
      {/* Outer pulse ring */}
      <div
        style={{
          position: "absolute",
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: `1.5px solid ${ring}`,
          transform: `scale(${scale * 1.12})`,
          transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1),
                       border-color 800ms ease`,
          willChange: "transform",
        }}
      />
      {/* Main circle */}
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: bg,
          border: `1.5px solid ${ring}`,
          transform: `scale(${scale})`,
          transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1),
                       background-color 800ms ease,
                       border-color 800ms ease`,
          willChange: "transform",
        }}
      />
    </div>
  );
}

export default function BreathingPlayer({ session, breathingState, onBack }) {
  const {
    status,
    progress,
    phase,
    scale,
    transitionMs,
    supportiveMessage,
    completionMsg,
    formattedRemaining,
    start,
    pause,
    resume,
    end,
    reset,
  } = breathingState;

  // Lock body scroll while player is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ─── Completion Screen ───────────────────────────────────────────────────
  if (status === SESSION_STATUS.DONE && completionMsg) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-canvas px-8">
        <div className="max-w-sm w-full text-center space-y-6">
          {/* Resting circle */}
          <div
            className="mx-auto rounded-full"
            style={{
              width: 80,
              height: 80,
              background: "rgba(134, 159, 138, 0.15)",
              border: "1.5px solid rgba(134, 159, 138, 0.45)",
            }}
          />
          <div className="space-y-3">
            <p className="font-display text-2xl font-light text-ink tracking-tight">
              {completionMsg.heading}
            </p>
            <p className="text-base text-stone leading-relaxed font-light">
              {completionMsg.body}
            </p>
          </div>
          <div className="pt-4 space-y-3">
            <button
              onClick={reset}
              className="w-full py-3 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-opacity hover:opacity-90"
              style={{ background: "#869F8A" }}
            >
              Try again
            </button>
            <button
              onClick={onBack}
              className="w-full py-3 rounded-full font-display text-stone text-sm font-medium tracking-wide hover:text-ink transition-colors"
            >
              Back to sessions
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Pre-start Screen ────────────────────────────────────────────────────
  if (status === SESSION_STATUS.IDLE) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col bg-canvas">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-14 pb-4">
          <button
            onClick={onBack}
            className="text-stone hover:text-ink transition-colors p-1"
            aria-label="Back"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
          <span className="text-sm text-stone font-light tracking-wide">
            {session.totalMinutes} min
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20 space-y-10">
          {/* Static preview circle */}
          <div
            className="rounded-full"
            style={{
              width: 200,
              height: 200,
              background: "rgba(134, 159, 138, 0.12)",
              border: "1.5px solid rgba(134, 159, 138, 0.4)",
            }}
          />

          <div className="text-center space-y-3 max-w-xs">
            <h2 className="font-display text-2xl font-light text-ink tracking-tight">
              {session.title}
            </h2>
            <p className="text-sm text-stone font-light leading-relaxed">
              {session.description}
            </p>
          </div>

          {/* Rhythm preview — only show phases with non-zero duration */}
          <div className="flex items-center gap-6 text-center">
            {session.inhale > 0 && (
              <div>
                <p className="font-display text-lg font-light text-ink">
                  {session.inhale}s
                </p>
                <p className="text-xs text-stone tracking-widest uppercase mt-0.5">
                  Inhale
                </p>
              </div>
            )}
            {session.hold > 0 && (
              <div>
                <p className="font-display text-lg font-light text-ink">
                  {session.hold}s
                </p>
                <p className="text-xs text-stone tracking-widest uppercase mt-0.5">
                  Hold
                </p>
              </div>
            )}
            {session.exhale > 0 && (
              <div>
                <p className="font-display text-lg font-light text-ink">
                  {session.exhale}s
                </p>
                <p className="text-xs text-stone tracking-widest uppercase mt-0.5">
                  Exhale
                </p>
              </div>
            )}
            {session.rest > 0 && (
              <div>
                <p className="font-display text-lg font-light text-ink">
                  {session.rest}s
                </p>
                <p className="text-xs text-stone tracking-widest uppercase mt-0.5">
                  Rest
                </p>
              </div>
            )}
          </div>

          <button
            onClick={start}
            className="px-10 py-3.5 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ background: "#869F8A" }}
          >
            Begin
          </button>
        </div>
      </div>
    );
  }

  // ─── Active Session Screen ───────────────────────────────────────────────
  const isPaused = status === SESSION_STATUS.PAUSED;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-canvas">
      {/* Minimal top bar */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4">
        <span className="text-sm text-stone font-light tracking-wide">
          {session.title}
        </span>
        <button
          onClick={end}
          className="text-stone hover:text-ink transition-colors text-xs tracking-wide font-light"
          aria-label="End session"
        >
          End
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-px bg-border mx-6">
        <div
          className="h-full transition-all duration-1000"
          style={{
            width: `${progress * 100}%`,
            background: "#869F8A",
            opacity: 0.5,
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 pb-20">
        <BreathingCircle
          scale={scale}
          transitionMs={transitionMs}
          phase={phase}
        />

        {/* Phase label */}
        <div className="min-h-[3.5rem] flex items-center justify-center">
          <p
            className="font-display text-2xl font-light text-ink transition-all duration-700"
            style={{ letterSpacing: "0.12em" }}
          >
            {isPaused ? "Paused" : phaseLabel(phase)}
          </p>
        </div>

        {/* Time remaining */}
        <p className="text-sm text-stone font-light tabular-nums tracking-wide">
          {formattedRemaining} remaining
        </p>

        {/* Supportive message */}
        <p
          className="text-sm text-stone font-light italic text-center max-w-[220px] leading-relaxed transition-opacity duration-1000"
          style={{ opacity: isPaused ? 0.4 : 0.8 }}
        >
          {supportiveMessage}
        </p>
      </div>

      {/* Pause / Resume */}
      <div className="pb-12 flex justify-center">
        <button
          onClick={isPaused ? resume : pause}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            background: "rgba(134, 159, 138, 0.15)",
            border: "1.5px solid rgba(134, 159, 138, 0.4)",
          }}
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? (
            <Play size={20} strokeWidth={1.5} className="text-ink ml-0.5" />
          ) : (
            <Pause size={20} strokeWidth={1.5} className="text-ink" />
          )}
        </button>
      </div>
    </div>
  );
}
