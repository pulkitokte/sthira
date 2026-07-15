// src/components/morningFlow/MorningFlowMilestoneToast.jsx
// Tiny, non-blocking encouragement message. No modal, no overlay
// backdrop, no interaction required — it fades in and quietly fades
// itself out. Purely presentational; owns only its own visibility timer.

import { useState, useEffect } from "react";

export default function MorningFlowMilestoneToast({ message }) {
  const [visible, setVisible] = useState(Boolean(message));

  useEffect(() => {
    setVisible(Boolean(message));
    if (!message) return undefined;
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return (
    <div className="flex justify-center" role="status" aria-live="polite">
      <span
        className={`rounded-full bg-moss px-4 py-1.5 text-xs font-display font-medium text-canvas shadow-soft transition-all duration-500 ease-out ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {message}
      </span>
    </div>
  );
}
