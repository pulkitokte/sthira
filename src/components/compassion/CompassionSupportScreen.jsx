// src/components/compassion/CompassionSupportScreen.jsx
// The full-screen support experience for each card.
// Warm, generous whitespace, editorial typography.

import { RefreshCw } from "lucide-react";
import FeatureHeader from "../layout/FeatureHeader";
import FeedbackPrompt from "./FeedbackPrompt";
import { FEEDBACK_STATE } from "../../hooks/useSelfCompassion";

// ── Content item renderers ────────────────────────────────────────────────────

function ContentItem({ item, card, index }) {
  return (
    <div
      className="rounded-2xl p-5 space-y-2"
      style={{
        background: card.lightBg,
        border: `1px solid ${card.border}`,
      }}
    >
      <p
        className="font-display text-sm font-medium leading-snug"
        style={{ color: card.accentColor }}
      >
        {item.heading}
      </p>
      <p className="text-sm text-stone font-light leading-[1.8]">{item.body}</p>
    </div>
  );
}

function EncouragementDisplay({ message, onNext, index, total, card }) {
  return (
    <div className="space-y-5">
      {/* Main message card */}
      <div
        className="rounded-3xl p-7 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,252,248,1) 0%, rgba(248,245,238,1) 100%)",
          border: `1px solid ${card.border}`,
          boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        }}
      >
        {/* Decorative orb */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: card.lightBg,
            transform: "translate(40%, -40%)",
          }}
          aria-hidden="true"
        />

        <p
          className="relative font-display font-light text-ink leading-[1.75]"
          style={{ fontSize: "1.05rem" }}
        >
          {message}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-stone font-light opacity-60">
          {index + 1} of {total}
        </p>
        <button
          onClick={onNext}
          className="flex items-center gap-1.5 text-xs text-stone font-light hover:text-ink transition-colors"
          aria-label="Show another message"
        >
          <RefreshCw size={12} strokeWidth={1.5} />
          Another
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CompassionSupportScreen({
  card,
  content,
  onBack,
  feedbackState,
  feedbackResponse,
  onFeedbackSubmit,
  onFeedbackDismiss,
  // Encouragement-specific
  currentEncouragement,
  encouragementIndex,
  encouragementTotal,
  onNextEncouragement,
}) {
  const isEncouragement = card.id === "encouragement";

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #faf8f4 0%, #f7f4ef 50%, #faf8f4 100%)",
      }}
    >
      <FeatureHeader
        title={
          <span className="inline-flex items-center gap-2">
            <span className="text-lg leading-none">{card.emoji}</span>
            {card.title}
          </span>
        }
        onBack={onBack}
        showSettings={false}
      />

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6 pb-20">
        {/* Intro */}
        {content?.intro && (
          <p className="text-sm text-stone font-light leading-relaxed">
            {content.intro}
          </p>
        )}

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: "rgba(185,175,160,0.18)" }}
        />

        {/* Content items */}
        {isEncouragement ? (
          <EncouragementDisplay
            message={currentEncouragement}
            onNext={onNextEncouragement}
            index={encouragementIndex}
            total={encouragementTotal}
            card={card}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {content?.items?.map((item, i) => (
              <ContentItem key={item.id} item={item} card={card} index={i} />
            ))}
          </div>
        )}

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: "rgba(185,175,160,0.12)" }}
        />

        {/* Feedback */}
        <FeedbackPrompt
          feedbackState={feedbackState}
          feedbackResponse={feedbackResponse}
          onSubmit={onFeedbackSubmit}
          onDismiss={onFeedbackDismiss}
        />

        <div className="pb-4" />
      </div>
    </div>
  );
}
