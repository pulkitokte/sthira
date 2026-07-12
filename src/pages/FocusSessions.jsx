import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import FeatureHeader from "../components/layout/FeatureHeader";
import FocusSessionCard from "../components/focus/FocusSessionCard";
import { FOCUS_SESSIONS } from "../data/focusSessions";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

export default function FocusSessions() {
  const navigate = useNavigate();
  useDocumentTitle("Focus Sessions");

  const handleSelect = (session) => {
    navigate(PATHS.FOCUS_PLAYER, { state: { sessionId: session.id } });
  };

  return (
    <>
      <FeatureHeader title="Focus Sessions" />
      <PageContainer className="flex flex-col gap-6">
        <p className="leading-relaxed text-stone">
          A quiet space for focused work. Choose a session length, set an
          intention if you like, and let Sthira hold the time while you focus.
        </p>
        <div className="flex flex-col gap-3">
          {FOCUS_SESSIONS.map((session) => (
            <FocusSessionCard
              key={session.id}
              session={session}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </PageContainer>
    </>
  );
}
