// src/pages/FirstBreath.jsx
// The First Breath — redesigned as a fully automatic, non-interactive
// ~4.8s introduction. No tap, no buttons, no keyboard progression. The
// user watches seed -> root -> sprout -> leaves -> Sthira logo, then
// arrives at Home automatically.

import { useNavigate } from "react-router-dom";
import FirstBreathLayout from "../components/firstBreath/FirstBreathLayout";
import FirstBreathAnimationWrapper from "../components/firstBreath/FirstBreathAnimationWrapper";
import SproutIllustration from "../components/firstBreath/SproutIllustration";
import SthiraLogo from "../components/common/SthiraLogo";
import { useFirstBreathTimeline } from "../hooks/useFirstBreathTimeline";
import { useFirstBreathStatus } from "../hooks/useFirstBreathStatus";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

export default function FirstBreath() {
  const navigate = useNavigate();
  const { completeFirstBreath } = useFirstBreathStatus();
  useDocumentTitle("Welcome");

  const handleComplete = () => {
    completeFirstBreath();
    navigate(PATHS.HOME, { replace: true });
  };

  const { stageId } = useFirstBreathTimeline({ onComplete: handleComplete });

  const isLogoStage = stageId === "logo";
  const isGrowthStage = Boolean(stageId) && stageId !== "logo";

  return (
    <FirstBreathLayout stage={stageId}>
      <div
        role="status"
        aria-label="Welcome to Sthira"
        className="flex items-center justify-center w-full min-h-[70vh]"
      >
        <FirstBreathAnimationWrapper className="relative h-24 w-24 flex items-center justify-center">
          <div
            className="fb-crossfade-layer absolute inset-0 flex items-center justify-center"
            style={{ opacity: isGrowthStage ? 1 : 0 }}
            aria-hidden="true"
          >
            {isGrowthStage && <SproutIllustration stageId={stageId} />}
          </div>
          <div
            className="fb-crossfade-layer absolute inset-0 flex items-center justify-center"
            style={{ opacity: isLogoStage ? 1 : 0 }}
            aria-hidden="true"
          >
            <SthiraLogo size={56} iconSize={26} />
          </div>
        </FirstBreathAnimationWrapper>
      </div>
    </FirstBreathLayout>
  );
}
