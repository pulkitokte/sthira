// src/components/atmosphere/AmbientQuote.jsx
// Displays today's atmospheric quote in an editorial, understated style.

export default function AmbientQuote({ quote, accentColor }) {
  if (!quote) return null;

  return (
    <p
      className="font-display font-light text-ink leading-[1.7] text-center"
      style={{
        fontSize: "0.9rem",
        opacity: 0.72,
        letterSpacing: "0.01em",
        borderLeft: `2px solid ${accentColor ?? "rgba(185,175,160,0.35)"}`,
        paddingLeft: "0.85rem",
        textAlign: "left",
      }}
    >
      {quote}
    </p>
  );
}

