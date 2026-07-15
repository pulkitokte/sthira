import IllustrationSurface from "./IllustrationSurface";

export default function SupermanHoldIllustration() {
  return (
    <IllustrationSurface label="Figure lying face down with arms and legs lifted">
      <circle cx="26" cy="102" r="11" />
      <line x1="36" y1="104" x2="86" y2="104" />
      {/* raised arm */}
      <line x1="36" y1="102" x2="14" y2="90" />
      {/* raised legs */}
      <line x1="86" y1="104" x2="110" y2="98" />
      <path d="M 30 96 Q 14 96 12 88" strokeDasharray="3 5" opacity="0.4" />
      <path
        d="M 100 100 Q 112 100 112 92"
        strokeDasharray="3 5"
        opacity="0.4"
      />
    </IllustrationSurface>
  );
}
