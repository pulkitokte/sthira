import IllustrationSurface from "./IllustrationSurface";
import BaseStandingFigure from "./BaseStandingFigure";

export default function ChestStretchIllustration() {
  return (
    <IllustrationSurface label="Figure stretching the chest with hands clasped behind the back">
      <BaseStandingFigure>
        <path d="M 60 58 Q 78 68 68 88" />
        <path d="M 60 58 Q 46 66 64 86" />
      </BaseStandingFigure>
    </IllustrationSurface>
  );
}
