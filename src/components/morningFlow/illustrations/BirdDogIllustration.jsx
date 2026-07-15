import IllustrationSurface from "./IllustrationSurface";

export default function BirdDogIllustration() {
  return (
    <IllustrationSurface label="Figure in tabletop position with arm and leg extended">
      <circle cx="30" cy="80" r="11" />
      <line x1="40" y1="84" x2="88" y2="84" />
      {/* supporting arm + leg */}
      <line x1="44" y1="86" x2="44" y2="116" />
      <line x1="84" y1="86" x2="84" y2="116" />
      {/* extended opposite arm */}
      <line x1="42" y1="82" x2="15" y2="72" />
      {/* extended opposite leg */}
      <line x1="86" y1="84" x2="112" y2="94" />
    </IllustrationSurface>
  );
}
