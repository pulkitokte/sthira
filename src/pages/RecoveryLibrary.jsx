import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import RecoveryCategorySection from "../components/recovery/RecoveryCategorySection";
import { RECOVERY_CATEGORIES } from "../data/recoveryCategories";
import { getSessionsByCategory } from "../utils/recovery";
import { PATHS } from "../constants/navigation";

export default function RecoveryLibrary() {
  const navigate = useNavigate();

  const handleSelectSession = (session) => {
    navigate(PATHS.RECOVERY_PLAYER, { state: { sessionId: session.id } });
  };

  return (
    <PageContainer className="flex flex-col gap-8">
      <p className="leading-relaxed text-stone">
        Short, guided pauses to recover between study sessions — no equipment,
        no pressure, just a few minutes for your body and mind.
      </p>

      {RECOVERY_CATEGORIES.map((category) => {
        const sessions = getSessionsByCategory(category.id);
        if (sessions.length === 0) return null;
        return (
          <RecoveryCategorySection
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
