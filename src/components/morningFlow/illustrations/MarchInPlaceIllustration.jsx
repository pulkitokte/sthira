import IllustrationSurface from "./IllustrationSurface";

export default function MarchInPlaceIllustration() {
  return (
    <IllustrationSurface label="Figure marching in place">
      <circle cx="60" cy="28" r="13" />
      <line x1="60" y1="41" x2="60" y2="58" />
      <line x1="60" y1="58" x2="60" y2="100" />
      {/* standing leg */}
      <line x1="60" y1="100" x2="52" y2="135" />
      {/* raised knee leg */}
      <line x1="60" y1="100" x2="78" y2="90" />
      <line x1="78" y1="90" x2="72" y2="112" />
      {/* arms swinging opposite */}
      <line x1="60" y1="63" x2="78" y2="82" />
      <line x1="60" y1="63" x2="42" y2="88" />
    </IllustrationSurface>
  );
}
