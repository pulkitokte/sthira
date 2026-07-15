import IllustrationSurface from "./IllustrationSurface";
import BaseStandingFigure from "./BaseStandingFigure";
import MotionArc from "./MotionArc";

export default function GentleTwistIllustration() {
  return (
    <IllustrationSurface label="Figure performing a gentle torso twist">
      <BaseStandingFigure>
        <line x1="60" y1="65" x2="50" y2="76" />
        <line x1="60" y1="65" x2="70" y2="76" />
      </BaseStandingFigure>
      <MotionArc cx="60" cy="75" r="22" startAngle={200} endAngle={340} />
    </IllustrationSurface>
  );
}
