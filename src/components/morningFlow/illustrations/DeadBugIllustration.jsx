import IllustrationSurface from "./IllustrationSurface";

export default function DeadBugIllustration() {
  return (
    <IllustrationSurface label="Figure lying on back with opposite arm and leg raised">
      <circle cx="24" cy="105" r="11" />
      <line x1="35" y1="105" x2="80" y2="105" />
      {/* raised arm */}
      <line x1="35" y1="103" x2="20" y2="78" />
      {/* flat arm */}
      <line x1="35" y1="107" x2="18" y2="120" />
      {/* raised leg */}
      <line x1="80" y1="105" x2="100" y2="82" />
      {/* bent flat leg */}
      <line x1="80" y1="105" x2="90" y2="118" />
      <line x1="90" y1="118" x2="90" y2="132" />
    </IllustrationSurface>
  );
}
