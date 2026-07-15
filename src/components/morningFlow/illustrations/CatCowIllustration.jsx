import IllustrationSurface from "./IllustrationSurface";

export default function CatCowIllustration() {
  return (
    <IllustrationSurface label="Figure in tabletop position for cat cow">
      <circle cx="28" cy="82" r="11" />
      <line x1="38" y1="86" x2="90" y2="86" />
      {/* front support arm */}
      <line x1="40" y1="88" x2="40" y2="118" />
      {/* back leg */}
      <line x1="88" y1="88" x2="88" y2="118" />
      <path d="M 40 82 Q 65 68 90 82" strokeDasharray="3 5" opacity="0.5" />
      <path d="M 40 90 Q 65 100 90 90" strokeDasharray="3 5" opacity="0.5" />
    </IllustrationSurface>
  );
}
