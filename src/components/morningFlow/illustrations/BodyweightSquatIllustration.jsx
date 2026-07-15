import IllustrationSurface from "./IllustrationSurface";

export default function BodyweightSquatIllustration() {
  return (
    <IllustrationSurface label="Figure performing a bodyweight squat">
      <circle cx="60" cy="35" r="13" />
      <line x1="60" y1="48" x2="60" y2="82" />
      {/* bent legs */}
      <line x1="60" y1="82" x2="44" y2="105" />
      <line x1="44" y1="105" x2="46" y2="132" />
      <line x1="60" y1="82" x2="76" y2="105" />
      <line x1="76" y1="105" x2="74" y2="132" />
      {/* arms extended forward for balance */}
      <line x1="60" y1="58" x2="38" y2="66" />
      <line x1="60" y1="58" x2="82" y2="66" />
    </IllustrationSurface>
  );
}
