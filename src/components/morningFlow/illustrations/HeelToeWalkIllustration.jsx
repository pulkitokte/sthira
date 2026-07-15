import IllustrationSurface from "./IllustrationSurface";

export default function HeelToeWalkIllustration() {
  return (
    <IllustrationSurface label="Figure walking heel to toe in a straight line">
      <circle cx="55" cy="28" r="13" />
      <line x1="55" y1="41" x2="58" y2="58" />
      <line x1="58" y1="58" x2="60" y2="100" />
      {/* front foot */}
      <line x1="60" y1="100" x2="66" y2="135" />
      {/* back foot, inline */}
      <line x1="60" y1="100" x2="54" y2="135" />
      {/* arms slightly out */}
      <line x1="58" y1="63" x2="40" y2="72" />
      <line x1="58" y1="63" x2="76" y2="72" />
      <line
        x1="30"
        y1="137"
        x2="90"
        y2="137"
        opacity="0.25"
        strokeDasharray="2 5"
      />
    </IllustrationSurface>
  );
}
