// src/components/layout/FeatureHeader.jsx
// Reusable header for feature pages — single source of truth for
// feature-page headers across the app.
//
// Batch 73: sr-only <h1> for heading hierarchy; back button's accessible
// name now includes the visible title (previously fully overridden by
// aria-label="Go back").
// Batch 74: default back behavior now uses useSafeBack instead of a
// bare navigate(-1), fixing a real "trapped on screen" scenario for
// every page that relies on FeatureHeader's default back handling
// (i.e. doesn't pass its own onBack) when reached with no prior
// session history.

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { PATHS } from "../../constants/navigation";
import { useSafeBack } from "../../hooks/useSafeBack";

export default function FeatureHeader({
  title,
  onBack,
  showSettings = true,
  rightAction = null,
}) {
  const navigate = useNavigate();
  const safeBack = useSafeBack();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      safeBack();
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
