// src/pages/FirstBreath.jsx
// The First Breath — rebuilt from scratch as a single, fully automatic
// ~4.5s intro. No interaction, no buttons, no keyboard progression.
// Exactly one hook (useIntroTimeline) drives exactly one illustration
// component (SproutIllustration), then crossfades into the existing
// SthiraLogo and navigates Home.

import { useNavigate } from "react-router-dom";
import SthiraLogo from "../components/common/SthiraLogo";
import SproutIllustration from "../components/firstBreath/SproutIllustration";
import { useIntroTimeline } from "../hooks/useIntroTimeline";
import { markFirstBreathComplete } from "../hooks/useFirstBreathStatus";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

export default function FirstBreath() {
  const navigate = useNavigate();
  useDocumentTitle("Welcome");

  const handleComplete = () => {
    markFirstBreathComplete();
    navigate(PATHS.HOME, { replace: true });
  };

  const { stageId } = useIntroTimeline({ onComplete: handleComplete });

  const isLogoStage = stageId === "logo";
  const isGrowthStage = Boolean(stageId) && !isLogoStage;

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, rgba(255,253,248,1) 0%, rgba(250,246,238,1) 60%, rgba(247,242,232,1) 100%)",
      }}
    >
      <div
        role="status"
        aria-label="Welcome to Sthira"
        className="relative h-24 w-24 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: isGrowthStage ? 1 : 0,
            transition: "opacity 800ms ease-in-out",
          }}
          aria-hidden="true"
        >
          {isGrowthStage && <SproutIllustration stageId={stageId} />}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: isLogoStage ? 1 : 0,
            transition: "opacity 800ms ease-in-out",
          }}
          aria-hidden="true"
        >
          <SthiraLogo size={56} iconSize={26} />
        </div>
      </div>
    </div>
  );
}
