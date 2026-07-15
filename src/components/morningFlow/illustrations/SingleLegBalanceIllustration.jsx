import IllustrationSurface from "./IllustrationSurface";
import BaseStandingFigure from "./BaseStandingFigure";

export default function SingleLegBalanceIllustration() {
  return (
    <IllustrationSurface label="Figure balancing on one leg">
      <circle cx="60" cy="28" r="13" />
      <line x1="60" y1="41" x2="60" y2="58" />
      <line x1="60" y1="58" x2="60" y2="100" />
      {/* standing leg */}
      <line x1="60" y1="100" x2="55" y2="135" />
      {/* lifted leg bent behind */}
      <line x1="60" y1="100" x2="72" y2="112" />
      <line x1="72" y1="112" x2="66" y2="122" />
      {/* arms out for balance */}
      <line x1="60" y1="63" x2="32" y2="65" />
      <line x1="60" y1="63" x2="88" y2="65" />
    </IllustrationSurface>
  );
}
