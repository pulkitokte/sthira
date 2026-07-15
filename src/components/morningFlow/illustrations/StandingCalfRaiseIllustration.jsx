import IllustrationSurface from "./IllustrationSurface";

export default function StandingCalfRaiseIllustration() {
  return (
    <IllustrationSurface label="Figure standing on toes for a calf raise">
      <circle cx="60" cy="28" r="13" />
      <line x1="60" y1="41" x2="60" y2="58" />
      <line x1="60" y1="58" x2="60" y2="100" />
      <line x1="60" y1="65" x2="46" y2="95" />
      <line x1="60" y1="65" x2="74" y2="95" />
      {/* legs to raised heels */}
      <line x1="60" y1="100" x2="46" y2="128" />
      <line x1="46" y1="128" x2="52" y2="132" />
      <line x1="60" y1="100" x2="74" y2="128" />
      <line x1="74" y1="128" x2="80" y2="132" />
      <path d="M 46 122 L 46 116" strokeDasharray="2 4" opacity="0.4" />
      <path d="M 74 122 L 74 116" strokeDasharray="2 4" opacity="0.4" />
    </IllustrationSurface>
  );
}
