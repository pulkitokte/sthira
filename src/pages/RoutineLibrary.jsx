import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import CategorySection from "../components/routine/CategorySection";
import PersonalizedSection from "../components/routine/PersonalizedSection";
import { ROUTINE_CATEGORIES } from "../data/routineCategories";
import { getRoutinesByCategory } from "../utils/routines";
import {
  getPersonalizedRoutines,
  getRoutinePersonalizationReason,
} from "../utils/personalization";
import { useOnboarding } from "../context/OnboardingContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

export default function RoutineLibrary() {
  const navigate = useNavigate();
  const { data: onboardingData } = useOnboarding();
  useDocumentTitle("Morning Library");

  const personalizedRoutines = getPersonalizedRoutines(onboardingData);
  const personalizationReason = getRoutinePersonalizationReason(onboardingData);

  const handleSelectRoutine = (routine) => {
    navigate(PATHS.ROUTINE_PLAYER, { state: { routineId: routine.id } });
  };

  return (
    <PageContainer className="flex flex-col gap-8">
      <p className="leading-relaxed text-stone">
        Pick what your body needs right now — every routine here is built around
        easing into movement, not pushing through it.
      </p>

      {personalizedRoutines.length > 0 && (
        <PersonalizedSection
          routines={personalizedRoutines}
          reason={personalizationReason}
          onSelectRoutine={handleSelectRoutine}
        />
      )}

      {ROUTINE_CATEGORIES.map((category) => {
        const routines = getRoutinesByCategory(category.id);
        if (routines.length === 0) return null;
        return (
          <CategorySection
            key={category.id}
            category={category}
            routines={routines}
            onSelectRoutine={handleSelectRoutine}
          />
        );
      })}
    </PageContainer>
  );
}
