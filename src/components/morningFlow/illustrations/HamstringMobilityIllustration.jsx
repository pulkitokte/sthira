import IllustrationSurface from "./IllustrationSurface";

export default function HamstringMobilityIllustration() {
  return (
    <IllustrationSurface label="Figure stretching the hamstring with leg raised">
      <circle cx="58" cy="40" r="12" />
      <line x1="58" y1="52" x2="60" y2="90" />
      {/* standing leg */}
      <line x1="60" y1="90" x2="55" y2="132" />
      {/* extended leg on raised surface */}
      <line x1="60" y1="90" x2="90" y2="80" />
      <line x1="0" y1="86" x2="0" y2="86" opacity="0" />
      <line
        x1="90"
        y1="80"
        x2="105"
        y2="80"
        opacity="0.35"
        strokeDasharray="2 4"
      />
      {/* torso hinged slightly */}
      <line x1="58" y1="58" x2="80" y2="72" />
    </IllustrationSurface>
  );
}
