import IllustrationSurface from "./IllustrationSurface";

export default function ForwardFoldIllustration() {
  return (
    <IllustrationSurface label="Figure folded forward stretching the back of the legs">
      <line x1="52" y1="55" x2="46" y2="135" />
      <line x1="68" y1="55" x2="74" y2="135" />
      <path d="M 60 50 Q 62 75 60 95" />
      <circle cx="60" cy="102" r="11" />
      {/* arms hanging */}
      <line x1="58" y1="62" x2="52" y2="118" />
      <line x1="62" y1="62" x2="68" y2="118" />
    </IllustrationSurface>
  );
}
