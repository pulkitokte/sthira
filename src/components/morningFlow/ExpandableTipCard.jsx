// src/components/morningFlow/ExpandableTipCard.jsx
// Single reusable expandable card, used for Safety Tips, Common
// Mistakes, and Beginner Notes — avoids three near-identical
// implementations.

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ExpandableTipCard({ title, icon: Icon, items }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="w-full flex items-center justify-between gap-3 p-4"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          {Icon && <Icon size={15} strokeWidth={1.8} className="text-stone" />}
          <span className="font-display text-sm font-medium text-ink">
            {title}
          </span>
        </div>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-stone transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="px-4 pb-4 space-y-1.5">
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
