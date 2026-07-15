import IllustrationSurface from "./IllustrationSurface";

export default function WeightShiftIllustration() {
  return (
    <IllustrationSurface label="Figure shifting weight side to side in a wide stance">
      <circle cx="66" cy="28" r="13" />
      <line x1="66" y1="41" x2="63" y2="58" />
      <line x1="63" y1="58" x2="63" y2="100" />
      {/* wide stance legs */}
      <line x1="63" y1="100" x2="42" y2="132" />
      <line x1="63" y1="100" x2="84" y2="132" />
      {/* arms relaxed */}
      <line x1="63" y1="65" x2="48" y2="88" />
      <line x1="63" y1="65" x2="80" y2="88" />
      <path d="M 30 105 L 45 105" opacity="0.35" strokeDasharray="2 4" />
      <path d="M 96 105 L 81 105" opacity="0.35" strokeDasharray="2 4" />
    </IllustrationSurface>
  );
}
