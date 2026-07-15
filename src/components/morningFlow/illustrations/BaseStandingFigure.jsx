// src/components/morningFlow/illustrations/BaseStandingFigure.jsx
// Shared neutral standing skeleton (head, neck, spine, legs) reused by
// every illustration whose pose is a standing variant differing only
// in arm position or head tilt. Reduces duplication across roughly a
// third of the 31 exercise illustrations.

export default function BaseStandingFigure({ children }) {
  return (
    <>
      <circle cx="60" cy="28" r="13" />
      <line x1="60" y1="41" x2="60" y2="58" />
      <line x1="60" y1="58" x2="60" y2="100" />
      <line x1="60" y1="100" x2="46" y2="135" />
      <line x1="60" y1="100" x2="74" y2="135" />
      {children}
    </>
  );
}
