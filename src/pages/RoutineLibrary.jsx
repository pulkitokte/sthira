import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import CategorySection from "../components/routine/CategorySection";
import { ROUTINE_CATEGORIES } from "../data/routineCategories";
import { getRoutinesByCategory } from "../utils/routines";
import { PATHS } from "../constants/navigation";

export default function RoutineLibrary() {
  const navigate = useNavigate();

  const handleSelectRoutine = (routine) => {
    navigate(PATHS.ROUTINE_PLAYER, { state: { routineId: routine.id } });
  };

  return (
    <PageContainer className="flex flex-col gap-10">
      <p className="leading-relaxed text-stone">
        Pick what your body needs right now — every routine here is built around
        easing into movement, not pushing through it.
      </p>

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
