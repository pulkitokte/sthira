// src/pages/MindfulBreathing.jsx
// Mindful Breathing page — session list + full-screen player overlay.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Wind } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import { breathingSessions } from "../data/breathingSessions";
import BreathingSessionCard from "../components/breathing/BreathingSessionCard";
import BreathingPlayer from "../components/breathing/BreathingPlayer";
import {
  useBreathingSession,
  SESSION_STATUS,
} from "../hooks/useBreathingSession";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function MindfulBreathing() {
  const navigate = useNavigate();
  const [activeSession, setActiveSession] = useState(null);
  const breathingState = useBreathingSession(activeSession);

  useDocumentTitle("Mindful Breathing");

  const handleSelect = (session) => {
    breathingState.reset();
    setActiveSession(session);
  };

  const handleBack = () => {
    breathingState.reset();
    setActiveSession(null);
  };

  const showPlayer =
    activeSession !== null &&
    (breathingState.status === SESSION_STATUS.IDLE ||
      breathingState.status === SESSION_STATUS.RUNNING ||
      breathingState.status === SESSION_STATUS.PAUSED ||
      breathingState.status === SESSION_STATUS.DONE);

  return (
    <PageContainer className="flex flex-col gap-8">
      {/* Back navigation */}
      <div className="flex items-center gap-2 -ml-1">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl text-stone hover:text-ink hover:bg-surface transition-all"
          aria-label="Go back"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <h1 className="font-display text-xl font-semibold text-ink tracking-tight">
          Mindful Breathing
        </h1>
      </div>

      {/* Intro */}
      <section className="rounded-3xl bg-surface p-6 shadow-soft">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
          style={{
            background: "rgba(134, 159, 138, 0.15)",
            border: "1px solid rgba(134, 159, 138, 0.3)",
          }}
        >
          <Wind size={18} strokeWidth={1.5} className="text-sage" />
        </div>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-sage mb-2">
          Breathe
        </p>
        <p className="text-stone font-light leading-relaxed text-sm">
          A few minutes of intentional breathing can soften stress, steady
          attention, and create a quiet space between tasks.
        </p>
      </section>

      {/* Session list */}
      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold text-stone uppercase tracking-[0.12em] px-1">
          Choose a session
        </p>
        {breathingSessions.map((session) => (
          <BreathingSessionCard
            key={session.id}
            session={session}
            onSelect={handleSelect}
          />
        ))}
      </section>

      {/* Footnote */}
      <p className="text-xs text-stone font-light text-center pb-4">
        You can end any session early at any time.
      </p>

      {/* Player overlay */}
      {showPlayer && (
        <BreathingPlayer
          session={activeSession}
          breathingState={breathingState}
          onBack={handleBack}
        />
      )}
    </PageContainer>
  );
}
