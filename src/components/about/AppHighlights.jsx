import { Lock, ShieldCheck, Sunrise, Wind, Leaf } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Lock, label: "Local-first" },
  { icon: ShieldCheck, label: "Privacy-focused" },
  { icon: Sunrise, label: "Morning Routines" },
  { icon: Wind, label: "Study Break Recovery" },
  { icon: Leaf, label: "Wellness Reflections" },
];

export default function AppHighlights() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5">
      <div className="flex flex-wrap gap-2.5">
        {HIGHLIGHTS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-2 rounded-full border border-border bg-canvas px-4 py-2 text-sm font-medium text-ink"
          >
            <Icon size={15} className="text-moss" strokeWidth={1.8} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
