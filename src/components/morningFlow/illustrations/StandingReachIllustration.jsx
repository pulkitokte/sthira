import IllustrationSurface from "./IllustrationSurface";

export default function StandingReachIllustration() {
  return (
    <IllustrationSurface label="Figure reaching forward while balancing on one leg">
      <circle cx="58" cy="55" r="12" />
      <line x1="60" y1="67" x2="64" y2="95" />
      {/* standing leg */}
      <line x1="64" y1="95" x2="58" y2="132" />
      {/* extended back leg */}
      <line x1="64" y1="95" x2="90" y2="88" />
      {/* reaching arm forward/down */}
      <line x1="60" y1="70" x2="34" y2="88" />
      {/* trailing arm */}
      <line x1="62" y1="72" x2="70" y2="58" />
    </IllustrationSurface>
  );
}
