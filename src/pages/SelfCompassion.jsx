import FeatureHeader from "../components/layout/FeatureHeader";
import { useSelfCompassion, COMPASSION_VIEW } from "../hooks/useSelfCompassion";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import CompassionCard from "../components/compassion/CompassionCard";
import CompassionSupportScreen from "../components/compassion/CompassionSupportScreen";
import { COMPASSION_CARDS } from "../data/selfCompassionData";

export default function SelfCompassion() {
  const sc = useSelfCompassion();
  useDocumentTitle("Self-Compassion");

  const {
    view,
    activeCard,
    activeContent,
    feedbackState,
    feedbackResponse,
    currentEncouragement,
    encouragementIndex,
    encouragementTotal,
    openCard,
    goHome,
    nextEncouragement,
    submitFeedback,
    dismissFeedback,
  } = sc;

  // When in support view, delegate entirely to that component
  if (view === COMPASSION_VIEW.SUPPORT && activeCard) {
    return (
      <CompassionSupportScreen
        card={activeCard}
        content={activeContent}
        onBack={goHome}
        feedbackState={feedbackState}
        feedbackResponse={feedbackResponse}
        onFeedbackSubmit={submitFeedback}
        onFeedbackDismiss={dismissFeedback}
        currentEncouragement={currentEncouragement}
        encouragementIndex={encouragementIndex}
        encouragementTotal={encouragementTotal}
        onNextEncouragement={nextEncouragement}
      />
    );
  }

  // ── Home grid ─────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #faf8f4 0%, #f7f4ef 50%, #faf8f4 100%)",
      }}
    >
      {/* Ambient orb */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 360,
            height: 360,
            top: "-8%",
            right: "-12%",
            background:
              "radial-gradient(circle, rgba(185,175,160,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <FeatureHeader title="Self-Compassion" showSettings={false} />

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="relative max-w-lg mx-auto px-4 py-8 space-y-8 pb-20">
        {/* Intro */}
        <div className="space-y-2">
          <p
            className="font-display font-light text-ink leading-snug"
            style={{ fontSize: "1.1rem" }}
          >
            A gentle place to return to.
          </p>
          <p className="text-sm text-stone font-light leading-relaxed">
            Choose what feels most relevant right now. There is no wrong answer.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {COMPASSION_CARDS.map((card) => (
            <CompassionCard key={card.id} card={card} onOpen={openCard} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-stone font-light italic opacity-40 pt-2">
          This space is private. Nothing here is shared.
        </p>
      </div>
    </div>
  );
}
