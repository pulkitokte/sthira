// src/components/layout/FeatureHeader.jsx
// Reusable header for feature pages — single source of truth for
// feature-page headers across the app.
//
// Height is pinned to the --feature-header-height CSS variable (defined in
// globals.css) via minHeight, so any sticky element elsewhere that needs to
// sit directly beneath this header (e.g. tab bars) can reference the same
// variable instead of a hardcoded pixel value. If this component's padding
// or icon size ever changes, update --feature-header-height in one place
// and every consumer stays correct automatically.

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
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="-ml-2 flex items-center gap-1.5 rounded-full px-2 py-1.5 text-moss transition-colors hover:bg-moss/10"
      >
        <ArrowLeft size={19} strokeWidth={2} />
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
