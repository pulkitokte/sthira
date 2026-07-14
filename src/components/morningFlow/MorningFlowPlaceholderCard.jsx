// src/components/morningFlow/MorningFlowPlaceholderCard.jsx
// Elegant placeholder used inside each Morning Flow category section.
// Architecture-only phase: purely visual, no exercise content, no
// interaction logic. Future phases will replace this with real
// exercise cards.

export default function MorningFlowPlaceholderCard() {
  return (
    <div
      className="rounded-2xl p-5 flex items-center justify-between gap-3"
      style={{
        background: "rgba(185,175,160,0.06)",
        border: "1px dashed rgba(185,175,160,0.28)",
      }}
    >
      <div className="space-y-1">
        <p className="font-display text-sm font-medium text-ink opacity-70">
          Coming soon
        </p>
        <p className="text-xs text-stone font-light">
          Gentle movements are being prepared for this section.
        </p>
      </div>
      <div
        className="w-9 h-9 rounded-xl shrink-0"
        style={{
          background: "rgba(185,175,160,0.12)",
          border: "1px solid rgba(185,175,160,0.22)",
        }}
      />
    </div>
  );
}
