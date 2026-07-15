import IllustrationSurface from "./IllustrationSurface";

export default function ChildPoseIllustration() {
  return (
    <IllustrationSurface label="Figure kneeling and folded forward in child's pose">
      <path d="M 95 118 Q 60 125 30 122" />
      <circle cx="24" cy="122" r="10" />
      {/* arms extended forward along ground */}
      <line x1="45" y1="122" x2="15" y2="122" />
      {/* legs folded under */}
      <line x1="90" y1="120" x2="95" y2="132" />
    </IllustrationSurface>
  );
}
