// src/components/layout/PageContainer.jsx
// Root page wrapper for all Sthira pages.
// Batch 47: added sthira-page-enter animation.
// Batch 48: adds responsive padding tokens, safe-area bottom clearance,
//           and landscape guard via CSS classes.
// All existing props and behaviour preserved.

export default function PageContainer({ children, className = "" }) {
  return (
    <main
      className={[
        // Batch 47 entrance animation
        "sthira-page-enter",
        // Batch 48 responsive container class
        "sthira-page-container",
        // Layout: centred, max-width, horizontal padding, bottom safe area
        "mx-auto max-w-lg px-4 pb-28 pt-6",
        // Ensure no horizontal overflow on small screens
        "w-full overflow-x-hidden",
        // Consumer overrides
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </main>
  );
}