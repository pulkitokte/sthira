import IllustrationSurface from "./IllustrationSurface";

export default function GluteBridgeIllustration() {
  return (
    <IllustrationSurface label="Figure lying on back performing a glute bridge">
      <circle cx="24" cy="105" r="11" />
      <line x1="35" y1="105" x2="80" y2="98" />
      {/* bent knee, foot on ground */}
      <line x1="80" y1="98" x2="95" y2="112" />
      <line x1="95" y1="112" x2="95" y2="132" />
      {/* arms flat along ground */}
      <line x1="35" y1="105" x2="20" y2="118" />
      <path d="M 60 92 Q 80 82 96 96" strokeDasharray="3 5" opacity="0.45" />
    </IllustrationSurface>
  );
}
