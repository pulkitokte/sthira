// src/components/layout/PageContainer.jsx
// Root page wrapper for all Sthira pages.
// Batch 47: added sthira-page-enter animation.
// Batch 48: added responsive padding tokens and safe-area bottom clearance.
// Batch 52 (Final Visual Polish): removed overflow-x-hidden from <main>.
//   overflow-x: hidden on <main> clipped box-shadows on cards (they render
//   outside the element bounds on hover lift) and caused a flicker on Android
//   WebView when combined with the translateY stagger animation.
//   Horizontal overflow is already prevented by `body { overflow-x: hidden }`
//   in index.css, so this rule on <main> was redundant and harmful.
// Batch 70: sthira-page-enter's keyframes now live in globals.css keyed to
//   the shared --motion-slow token, so page entrance timing stays in sync
//   with every other transition in the app. No class name or markup change
//   here — only the underlying animation definition moved/standardized.

export default function PageContainer({ children, className = "" }) {
  return (
    <main
      className={[
        "sthira-page-enter",
        "sthira-page-container",
        "mx-auto max-w-lg px-4 pb-28 pt-6",
        "w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </main>
  );
}
