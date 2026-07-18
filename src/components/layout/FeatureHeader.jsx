// src/components/layout/FeatureHeader.jsx
// Reusable header for feature pages — single source of truth for
// feature-page headers across the app.
//
// Batch 73: two accessibility fixes, both visually invisible (sr-only),
// zero layout/style change:
// 1. Added a visually-hidden <h1> with the page title, so screen-reader
//    users navigating by heading structure can find each page's title —
//    previously the title only existed as plain text inside the back
//    button, with no heading element anywhere on these pages.
// 2. The back button's aria-label="Go back" previously completely
//    overrode its accessible name, discarding the adjacent visible
//    title text (a WCAG 2.5.3 Label-in-Name mismatch). Replaced with a
//    sr-only "Back to " prefix + the existing visible title, so the
//    accessible name now includes the visible label, and the ArrowLeft
//    icon is marked aria-hidden so it isn't announced redundantly.
//
// Height is still pinned to --feature-header-height (globals.css).

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { PATHS } from "../../constants/navigation";

export default function FeatureHeader({
  title,
  onBack,
  showSettings = true,
  rightAction = null,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between bg-canvas px-6 py-5"
      style={{ minHeight: "var(--feature-header-height)" }}
    >
      <h1 className="sr-only">{title}</h1>

      <button
        onClick={handleBack}
        className="-ml-2 flex items-center gap-1.5 rounded-full px-2 py-1.5 text-moss transition-colors hover:bg-moss/10"
      >
        <ArrowLeft size={19} strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">Back to </span>
        <span className="font-display text-base font-medium">{title}</span>
      </button>

      <div className="flex items-center gap-1">
        {rightAction}
        {showSettings && (
          <button
            onClick={() => navigate(PATHS.SETTINGS)}
            aria-label="Settings"
            className="rounded-full p-2 text-stone transition-colors hover:bg-moss/10 hover:text-moss"
          >
            <SettingsIcon size={19} strokeWidth={2} />
          </button>
        )}
      </div>
    </header>
  );
}
