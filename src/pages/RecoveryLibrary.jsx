import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import FeatureHeader from "../components/layout/FeatureHeader";
import RecoveryCategorySection from "../components/recovery/RecoveryCategorySection";
import PersonalizedRecoverySection from "../components/recovery/PersonalizedRecoverySection";
import { RECOVERY_CATEGORIES } from "../data/recoveryCategories";
import { getSessionsByCategory } from "../utils/recovery";
import {
  getPersonalizedRecoverySessions,
  getRecoveryPersonalizationReason,
} from "../utils/personalization";
import { useOnboarding } from "../context/OnboardingContext";
import { useWellness } from "../context/WellnessContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

export default function RecoveryLibrary() {
  const navigate = useNavigate();
  const { data: onboardingData } = useOnboarding();
  const { todayEntry } = useWellness();
  useDocumentTitle("Study Break Recovery");

  const personalizedSessions = getPersonalizedRecoverySessions(
    onboardingData,
    todayEntry,
  );
  const personalizationReason = getRecoveryPersonalizationReason(
    onboardingData,
    todayEntry,
  );

  const handleSelectSession = (session) => {
    navigate(PATHS.RECOVERY_PLAYER, { state: { sessionId: session.id } });
  };

  return (
    <>
      <FeatureHeader title="Study Break Recovery" />
      <PageContainer className="flex flex-col gap-8">
        <p className="leading-relaxed text-stone">
          Short, guided pauses to recover between study sessions — no equipment,
          no pressure, just a few minutes for your body and mind.
        </p>

        {personalizedSessions.length > 0 && (
          <PersonalizedRecoverySection
            sessions={personalizedSessions}
            reason={personalizationReason}
            onSelectSession={handleSelectSession}
          />
        )}

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
    </>
  );
}
