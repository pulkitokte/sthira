import IllustrationSurface from "./IllustrationSurface";
import MotionArc from "./MotionArc";

export default function BreathingRecoveryIllustration() {
  return (
    <IllustrationSurface label="Figure seated calmly for breathing recovery">
      <circle cx="60" cy="60" r="13" />
      <line x1="60" y1="73" x2="60" y2="105" />
      {/* crossed legs */}
      <line x1="60" y1="105" x2="40" y2="120" />
      <line x1="60" y1="105" x2="80" y2="120" />
      {/* hands resting on knees */}
      <line x1="60" y1="85" x2="44" y2="102" />
      <line x1="60" y1="85" x2="76" y2="102" />
      <MotionArc cx="60" cy="80" r="26" startAngle={250} endAngle={290} />
      <MotionArc cx="60" cy="80" r="34" startAngle={255} endAngle={285} />
    </IllustrationSurface>
  );
}
