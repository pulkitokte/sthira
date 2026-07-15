import IllustrationSurface from "./IllustrationSurface";
import BaseStandingFigure from "./BaseStandingFigure";
import MotionArc from "./MotionArc";

export default function NeckRollIllustration() {
  return (
    <IllustrationSurface label="Figure performing neck rolls">
      <BaseStandingFigure>
        <line x1="60" y1="65" x2="46" y2="95" />
        <line x1="60" y1="65" x2="74" y2="95" />
      </BaseStandingFigure>
      <MotionArc cx="60" cy="28" r="21" startAngle={210} endAngle={520} />
    </IllustrationSurface>
  );
}
