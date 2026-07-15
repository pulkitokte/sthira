import IllustrationSurface from "./IllustrationSurface";
import BaseStandingFigure from "./BaseStandingFigure";
import MotionArc from "./MotionArc";

export default function ShoulderRollIllustration() {
  return (
    <IllustrationSurface label="Figure performing shoulder rolls">
      <BaseStandingFigure>
        <line x1="60" y1="60" x2="46" y2="92" />
        <line x1="60" y1="60" x2="74" y2="92" />
      </BaseStandingFigure>
      <MotionArc cx="42" cy="58" r="10" startAngle={180} endAngle={480} />
      <MotionArc cx="78" cy="58" r="10" startAngle={180} endAngle={480} />
    </IllustrationSurface>
  );
}
