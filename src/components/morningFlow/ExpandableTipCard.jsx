// src/components/morningFlow/ExpandableTipCard.jsx
// Reusable expandable card for Safety Tips / Common Mistakes / Beginner
// Notes. Touch target enlarged to a full-width 44px+ row; revealed
// content fades in gently.

import { memo, useState } from "react";
import { ChevronDown } from "lucide-react";

function ExpandableTipCard({ title, icon: Icon, items }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="w-full flex items-center justify-between gap-3 p-4 min-h-[48px]"
        aria-expanded={isOpen}
        aria-label={`${title}, ${isOpen ? "expanded" : "collapsed"}`}
      >
        <div className="flex items-center gap-2.5">
          {Icon && (
            <Icon size={15} strokeWidth={1.8} className="text-stone shrink-0" />
          )}
          <span className="font-display text-sm font-medium text-ink">
            {title}
          </span>
        </div>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-stone shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul className="mf-fade-in px-4 pb-4 space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-stone leading-relaxed"
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full bg-sage shrink-0"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(ExpandableTipCard);
