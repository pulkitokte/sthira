// src/pages/LaunchSplash.jsx
// Placeholder splash for returning users. Phase 1: routing and timing
// structure only — no final visuals. Reuses the existing SthiraLogo
// component rather than inventing new visual assets.

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SthiraLogo from "../components/common/SthiraLogo";
import { markSplashCompletedThisSession } from "../utils/launchSession";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { SPLASH_DURATION_MS } from "../constants/firstBreath";
import { PATHS } from "../constants/navigation";

export default function LaunchSplash() {
  const navigate = useNavigate();
  useDocumentTitle("Sthira");

  useEffect(() => {
    const timer = setTimeout(() => {
      markSplashCompletedThisSession();
      navigate(PATHS.HOME, { replace: true });
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-canvas"
      role="status"
      aria-label="Loading Sthira"
    >
      <SthiraLogo size={48} iconSize={22} />
    </div>
  );
}
