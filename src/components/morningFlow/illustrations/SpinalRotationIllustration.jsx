import IllustrationSurface from "./IllustrationSurface";
import BaseStandingFigure from "./BaseStandingFigure";
import MotionArc from "./MotionArc";

export default function SpinalRotationIllustration() {
  return (
    <IllustrationSurface label="Figure performing a seated spinal rotation">
      <BaseStandingFigure>
        <line x1="60" y1="65" x2="48" y2="72" />
        <line x1="60" y1="65" x2="72" y2="72" />
      </BaseStandingFigure>
      <MotionArc cx="60" cy="70" r="26" startAngle={195} endAngle={345} />
    </IllustrationSurface>
  );
}
