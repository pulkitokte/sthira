// src/components/compassion/FeedbackPrompt.jsx
// Gentle anonymous feedback prompt shown at the bottom of each support screen.
// "Did this help a little?"

import { FEEDBACK_STATE } from "../../hooks/useSelfCompassion";

export default function FeedbackPrompt({
  feedbackState,
  feedbackResponse,
  onSubmit,
  onDismiss,
}) {
  if (feedbackState === FEEDBACK_STATE.DISMISSED) return null;

  if (feedbackState === FEEDBACK_STATE.ANSWERED) {
    return (
      <div
        className="rounded-2xl p-4 text-center"
        style={{
          background: "rgba(134,159,138,0.08)",
          border: "1px solid rgba(134,159,138,0.18)",
        }}
      >
        <p className="text-sm text-stone font-light leading-relaxed">
          {feedbackResponse === "helpful"
            ? "Thank you. That is good to know."
            : "That is okay. Something else might be more useful."}
        </p>
      </div>
    );
  }

  // Pending state
  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{
        background: "rgba(185,175,160,0.07)",
        border: "1px solid rgba(185,175,160,0.18)",
      }}
    >
      <p className="text-sm text-stone font-light text-center">
        Did this help a little?
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onSubmit("helpful")}
          className="flex-1 py-2.5 rounded-full font-display text-sm font-medium text-canvas transition-opacity hover:opacity-90"
          style={{ background: "#869F8A" }}
        >
          Yes, thank you
        </button>
        <button
          onClick={() => onSubmit("notNow")}
          className="flex-1 py-2.5 rounded-full font-display text-sm font-medium text-stone border border-border hover:text-ink transition-colors"
        >
          Not right now
        </button>
      </div>
    </div>
  );
}
