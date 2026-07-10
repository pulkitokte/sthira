import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import EyeRecoveryCategorySection from "../components/eyeRecovery/EyeRecoveryCategorySection";
import { EYE_RECOVERY_CATEGORIES } from "../data/eyeRecoveryCategories";
import { getEyeSessionsByCategory } from "../utils/eyeRecovery";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useScrollRestoration } from "../hooks/useScrollRestoration";
import { PATHS } from "../constants/navigation";

export default function EyeRelax() {
  const navigate = useNavigate();
  const location = useLocation();
  useDocumentTitle("Eye Recovery");
  useScrollRestoration(PATHS.EYE_RELAX);

  // Only shown when arriving via an in-app CTA (e.g. Wellness Tracker's
  // "Try Eye Recovery" insight). Bottom-nav and direct-URL entry never set
  // this state, so this page's normal top-level behavior is unaffected.
  const cameFromCTA = Boolean(location.state?.from);

  const handleSelectSession = (session) => {
    navigate(PATHS.EYE_RECOVERY_PLAYER, { state: { sessionId: session.id } });
  };

  return (
    <PageContainer className="flex flex-col gap-8">
      {cameFromCTA && (
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="-ml-2 -mt-2 flex w-fit items-center gap-1.5 rounded-full px-2 py-1.5 text-moss transition-colors hover:bg-moss/10"
        >
          <ArrowLeft size={19} strokeWidth={2} />
          <span className="font-display text-base font-medium">Back</span>
        </button>
      )}

      <p className="leading-relaxed text-stone">
        Short, guided pauses to ease tired eyes after screens, study, and
        scrolling.
      </p>

      {EYE_RECOVERY_CATEGORIES.map((category) => {
        const sessions = getEyeSessionsByCategory(category.id);
        if (sessions.length === 0) return null;
        return (
          <EyeRecoveryCategorySection
            key={category.id}
            category={category}
            sessions={sessions}
            onSelectSession={handleSelectSession}
          />
        );
      })}
    </PageContainer>
  );
}
