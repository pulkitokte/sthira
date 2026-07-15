import IllustrationSurface from "./IllustrationSurface";

export default function HipFlexorStretchIllustration() {
  return (
    <IllustrationSurface label="Figure in a kneeling hip flexor stretch">
      <circle cx="65" cy="40" r="12" />
      <line x1="65" y1="52" x2="65" y2="95" />
      {/* front foot planted */}
      <line x1="65" y1="95" x2="80" y2="108" />
      <line x1="80" y1="108" x2="80" y2="130" />
      {/* back knee grounded */}
      <line x1="65" y1="95" x2="48" y2="112" />
      <line x1="48" y1="112" x2="46" y2="130" />
      {/* arms relaxed */}
      <line x1="65" y1="60" x2="52" y2="80" />
      <line x1="65" y1="60" x2="78" y2="80" />
    </IllustrationSurface>
  );
}
