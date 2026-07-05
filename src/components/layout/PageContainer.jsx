// src/components/layout/PageContainer.jsx
// Root page wrapper for all Sthira pages.
// Batch 47: adds page-enter animation and sthira-section class
// to all direct <section> children for natural staggered appearance.
// All existing props and behavior preserved.

export default function PageContainer({ children, className = "" }) {
  return (
    <main
      className={`sthira-page-enter mx-auto max-w-lg px-4 pb-28 pt-6 ${className}`}
    >
      {children}
    </main>
  );
}
