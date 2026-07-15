import IllustrationSurface from "./IllustrationSurface";
import MotionArc from "./MotionArc";

export default function AnkleMobilityIllustration() {
  return (
    <IllustrationSurface label="Figure mobilizing the ankle">
      <circle cx="60" cy="28" r="13" />
      <line x1="60" y1="41" x2="60" y2="58" />
      <line x1="60" y1="58" x2="60" y2="100" />
      {/* standing leg */}
      <line x1="60" y1="100" x2="52" y2="135" />
      {/* lifted foot, ankle circled */}
      <line x1="60" y1="100" x2="76" y2="118" />
      <line x1="76" y1="118" x2="82" y2="124" />
      <line x1="60" y1="65" x2="46" y2="95" />
      <line x1="60" y1="65" x2="74" y2="95" />
      <MotionArc cx="79" cy="121" r="8" startAngle={0} endAngle={330} />
    </IllustrationSurface>
  );
}
