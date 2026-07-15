import IllustrationSurface from "./IllustrationSurface";
import BaseStandingFigure from "./BaseStandingFigure";
import MotionArc from "./MotionArc";

export default function HipCircleIllustration() {
  return (
    <IllustrationSurface label="Figure performing hip circles">
      <BaseStandingFigure>
        <line x1="60" y1="65" x2="46" y2="95" />
        <line x1="60" y1="65" x2="74" y2="95" />
      </BaseStandingFigure>
      <MotionArc cx="60" cy="100" r="18" startAngle={0} endAngle={330} />
    </IllustrationSurface>
  );
}
