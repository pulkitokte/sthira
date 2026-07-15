import IllustrationSurface from "./IllustrationSurface";

export default function QuadStretchIllustration() {
  return (
    <IllustrationSurface label="Figure standing on one leg stretching the front of the thigh">
      <circle cx="60" cy="28" r="13" />
      <line x1="60" y1="41" x2="60" y2="58" />
      <line x1="60" y1="58" x2="62" y2="100" />
      {/* standing leg */}
      <line x1="62" y1="100" x2="66" y2="135" />
      {/* bent leg held behind */}
      <line x1="62" y1="100" x2="78" y2="108" />
      <line x1="78" y1="108" x2="70" y2="88" />
      {/* arm reaching back to hold foot */}
      <line x1="60" y1="65" x2="70" y2="90" />
      {/* front arm relaxed */}
      <line x1="60" y1="65" x2="45" y2="88" />
    </IllustrationSurface>
  );
}
