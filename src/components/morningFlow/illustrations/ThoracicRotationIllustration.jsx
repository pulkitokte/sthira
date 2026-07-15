import IllustrationSurface from "./IllustrationSurface";
import MotionArc from "./MotionArc";

export default function ThoracicRotationIllustration() {
  return (
    <IllustrationSurface label="Figure performing thoracic rotation">
      <circle cx="28" cy="82" r="11" />
      <line x1="38" y1="86" x2="90" y2="86" />
      <line x1="40" y1="88" x2="40" y2="118" />
      <line x1="88" y1="88" x2="88" y2="118" />
      {/* rotating arm reaching up */}
      <line x1="45" y1="86" x2="45" y2="55" />
      <MotionArc cx="45" cy="70" r="14" startAngle={250} endAngle={420} />
    </IllustrationSurface>
  );
}
