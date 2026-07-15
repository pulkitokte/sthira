import IllustrationSurface from "./IllustrationSurface";

export default function TreePoseIllustration() {
  return (
    <IllustrationSurface label="Figure in tree pose balancing on one leg">
      <circle cx="60" cy="28" r="13" />
      <line x1="60" y1="41" x2="60" y2="58" />
      <line x1="60" y1="58" x2="60" y2="100" />
      {/* standing leg */}
      <line x1="60" y1="100" x2="55" y2="135" />
      {/* bent leg resting against standing thigh */}
      <line x1="60" y1="100" x2="78" y2="105" />
      <line x1="78" y1="105" x2="60" y2="95" />
      {/* hands together at chest */}
      <line x1="60" y1="63" x2="60" y2="75" />
    </IllustrationSurface>
  );
}
