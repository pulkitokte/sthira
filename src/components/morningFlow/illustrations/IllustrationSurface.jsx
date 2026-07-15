// src/components/morningFlow/illustrations/IllustrationSurface.jsx
// Shared SVG shell for every Morning Flow exercise illustration.
// Enforces consistent viewBox, stroke width, color, and accessibility
// across all 31 illustrations, so individual components only need to
// draw shapes — never repeat styling decisions.
//
// Future-ready: a wrapping element (this <svg>) is the single place a
// future batch would add a CSS class for subtle breathing/movement
// animation, or swap in a Lottie player, without touching any of the
// 31 individual illustration components or the registry.

export default function IllustrationSurface({
  children,
  viewBox = "0 0 120 140",
  label,
}) {
  return (
    <svg
      viewBox={viewBox}
      className="w-full h-full text-sage"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}
