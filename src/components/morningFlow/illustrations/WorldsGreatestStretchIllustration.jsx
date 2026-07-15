import IllustrationSurface from "./IllustrationSurface";

export default function WorldsGreatestStretchIllustration() {
  return (
    <IllustrationSurface label="Figure in a lunge with rotation and reach">
      <circle cx="72" cy="46" r="12" />
      <line x1="72" y1="58" x2="70" y2="98" />
      {/* front leg lunged */}
      <line x1="70" y1="98" x2="85" y2="110" />
      <line x1="85" y1="110" x2="85" y2="132" />
      {/* back leg extended */}
      <line x1="70" y1="98" x2="48" y2="118" />
      <line x1="48" y1="118" x2="38" y2="134" />
      {/* reaching arm */}
      <line x1="70" y1="64" x2="88" y2="38" />
      <line x1="70" y1="64" x2="55" y2="90" />
    </IllustrationSurface>
  );
}
