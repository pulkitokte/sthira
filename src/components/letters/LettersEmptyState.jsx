// src/components/letters/LettersEmptyState.jsx
// Premium empty state for the letters timeline.

export default function LettersEmptyState({ onCompose }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-6 px-6">
      {/* Envelope visual — pure CSS */}
      <div className="relative">
        <div
          className="w-20 h-14 rounded-xl flex items-end justify-center pb-2"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,252,245,1) 0%, rgba(248,244,236,1) 100%)",
            border: "1px solid rgba(185,175,160,0.3)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}
        >
          {/* Envelope flap line */}
          <div
            className="absolute top-0 left-0 right-0 h-6 rounded-t-xl"
            style={{
              borderBottom: "1px solid rgba(185,175,160,0.2)",
              background:
                "linear-gradient(180deg, rgba(248,244,236,1) 0%, rgba(245,240,232,1) 100%)",
            }}
          />
          <div
            className="w-8 h-px"
            style={{ background: "rgba(185,175,160,0.3)" }}
          />
        </div>
        {/* Shadow line */}
        <div
          className="mx-auto mt-1 rounded-full"
          style={{
            width: 48,
            height: 3,
            background: "rgba(185,175,160,0.15)",
          }}
        />
      </div>

      <div className="space-y-2 max-w-xs">
        <p className="font-display text-lg font-light text-ink tracking-tight">
          No letters yet.
        </p>
        <p className="text-sm text-stone font-light leading-relaxed">
          Leave gentle words for the person you are becoming. A letter to
          yourself is one of the kindest things you can write.
        </p>
      </div>

      <button
        onClick={onCompose}
        className="px-8 py-3 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-opacity hover:opacity-90"
        style={{ background: "#869F8A" }}
      >
        Write your first letter
      </button>
    </div>
  );
}
