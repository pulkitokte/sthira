import IllustrationSurface from "./IllustrationSurface";
import BaseStandingFigure from "./BaseStandingFigure";
import MotionArc from "./MotionArc";

export default function ArmCircleIllustration() {
  return (
    <IllustrationSurface label="Figure performing arm circles">
      <BaseStandingFigure>
        <line x1="60" y1="63" x2="26" y2="68" />
        <line x1="60" y1="63" x2="94" y2="68" />
      </BaseStandingFigure>
      <MotionArc cx="26" cy="68" r="10" startAngle={0} endAngle={330} />
      <MotionArc cx="94" cy="68" r="10" startAngle={180} endAngle={510} />
    </IllustrationSurface>
  );
}
