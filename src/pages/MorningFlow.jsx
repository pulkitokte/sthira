// src/pages/MorningFlow.jsx
// Morning Flow — Sthira's flagship feature.
// Phase 3: "Start Today's Flow" now navigates into the real player.

import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import FeatureHeader from "../components/layout/FeatureHeader";
import MorningFlowHero from "../components/morningFlow/MorningFlowHero";
import MorningFlowCategorySection from "../components/morningFlow/MorningFlowCategorySection";
import MorningFlowBenefitsGrid from "../components/morningFlow/MorningFlowBenefitsGrid";
import { MORNING_FLOW_CATEGORIES } from "../data/morningFlowCategories";
import { getExercisesByCategory } from "../data/morningFlowExercises";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

export default function MorningFlow() {
  const navigate = useNavigate();
  useDocumentTitle("Morning Flow");

  const handleStart = () => navigate(PATHS.MORNING_FLOW_PLAYER);

  return (
    <>
      <FeatureHeader title="Morning Flow" />
      <PageContainer className="flex flex-col gap-8">
        <MorningFlowHero onStart={handleStart} />

        {MORNING_FLOW_CATEGORIES.map((category) => (
          <MorningFlowCategorySection
            key={category.id}
            category={category}
            exercises={getExercisesByCategory(category.id)}
          />
        ))}

        <MorningFlowBenefitsGrid />

        <p className="text-center text-sm text-stone font-light italic opacity-60 pt-2 pb-4">
          Consistency matters more than intensity.
        </p>
      </PageContainer>
    </>
  );
}
