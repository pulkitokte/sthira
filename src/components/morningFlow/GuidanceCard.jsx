// src/components/morningFlow/GuidanceCard.jsx
// Premium, calm coaching message card. Purely presentational.
// aria-live announces message changes gently for screen reader users.

import { memo } from "react";
import { MessageCircle } from "lucide-react";

function GuidanceCard({ message }) {
  if (!message) return null;

  return (
    <div
      className="mf-fade-in rounded-2xl p-4 flex items-start gap-3"
      style={{
        background: "rgba(134,159,138,0.07)",
        border: "1px solid rgba(134,159,138,0.18)",
      }}
      role="status"
      aria-live="polite"
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: "rgba(134,159,138,0.14)",
          border: "1px solid rgba(134,159,138,0.25)",
        }}
        aria-hidden="true"
      >
        <MessageCircle size={14} strokeWidth={1.8} className="text-sage" />
      </div>
      <p className="font-display text-sm font-light text-ink leading-relaxed pt-1">
        {message}
      </p>
    </div>
  );
}

export default memo(GuidanceCard);
