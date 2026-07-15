import IllustrationSurface from "./IllustrationSurface";

export default function WallPushupIllustration() {
  return (
    <IllustrationSurface label="Figure performing a wall pushup">
      {/* wall */}
      <line
        x1="100"
        y1="20"
        x2="100"
        y2="132"
        opacity="0.3"
        strokeDasharray="2 5"
      />
      <circle cx="56" cy="42" r="12" />
      <line x1="60" y1="53" x2="66" y2="90" />
      <line x1="66" y1="90" x2="66" y2="132" />
      <line x1="63" y1="90" x2="63" y2="132" />
      {/* arm bent against wall */}
      <line x1="58" y1="58" x2="92" y2="66" />
    </IllustrationSurface>
  );
}
