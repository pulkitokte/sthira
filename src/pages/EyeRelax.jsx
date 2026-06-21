import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import EyeRecoveryCategorySection from "../components/eyeRecovery/EyeRecoveryCategorySection";
import { EYE_RECOVERY_CATEGORIES } from "../data/eyeRecoveryCategories";
import { getEyeSessionsByCategory } from "../utils/eyeRecovery";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

export default function EyeRelax() {
  const navigate = useNavigate();
  useDocumentTitle("Eye Recovery");

  const handleSelectSession = (session) => {
    navigate(PATHS.EYE_RECOVERY_PLAYER, { state: { sessionId: session.id } });
  };

  return (
    <PageContainer className="flex flex-col gap-8">
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
