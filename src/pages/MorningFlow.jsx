// src/pages/MorningFlow.jsx
// Morning Flow — Sthira's flagship feature.
// Architecture + UI foundation phase only: no workout engine, no
// exercises, no timers, no progress tracking. Future phases will
// populate the category sections and wire the "Start Today's Flow" CTA.

import PageContainer from "../components/layout/PageContainer";
import FeatureHeader from "../components/layout/FeatureHeader";
import MorningFlowHero from "../components/morningFlow/MorningFlowHero";
import MorningFlowCategorySection from "../components/morningFlow/MorningFlowCategorySection";
import MorningFlowBenefitsGrid from "../components/morningFlow/MorningFlowBenefitsGrid";
import { MORNING_FLOW_CATEGORIES } from "../data/morningFlowCategories";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function MorningFlow() {
  useDocumentTitle("Morning Flow");

  // Intentionally a no-op in this phase — wired for future phases to
  // connect to the real workout flow.
  const handleStart = () => {};

  return (
    <>
      <FeatureHeader title="Morning Flow" />
      <PageContainer className="flex flex-col gap-8">
        <MorningFlowHero onStart={handleStart} />

        {MORNING_FLOW_CATEGORIES.map((category) => (
          <MorningFlowCategorySection key={category.id} category={category} />
        ))}

        <MorningFlowBenefitsGrid />

        <p className="text-center text-sm text-stone font-light italic opacity-60 pt-2 pb-4">
          Consistency matters more than intensity.
        </p>
      </PageContainer>
    </>
  );
}
