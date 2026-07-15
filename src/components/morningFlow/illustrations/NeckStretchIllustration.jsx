import IllustrationSurface from "./IllustrationSurface";
import BaseStandingFigure from "./BaseStandingFigure";

export default function NeckStretchIllustration() {
  return (
    <IllustrationSurface label="Figure gently stretching the side of the neck">
      <circle cx="50" cy="32" r="13" />
      <line x1="50" y1="45" x2="60" y2="58" />
      <line x1="60" y1="58" x2="60" y2="100" />
      <line x1="60" y1="100" x2="46" y2="135" />
      <line x1="60" y1="100" x2="74" y2="135" />
      {/* arm reaching over head */}
      <line x1="70" y1="60" x2="52" y2="32" />
      {/* other arm relaxed */}
      <line x1="60" y1="65" x2="72" y2="92" />
    </IllustrationSurface>
  );
}
