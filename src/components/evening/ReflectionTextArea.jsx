// src/components/evening/ReflectionTextArea.jsx
// Reusable labelled textarea for reflection questions.

export default function ReflectionTextArea({
  question,
  placeholder,
  value,
  onChange,
  id,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-display text-sm font-medium text-ink leading-snug"
      >
        {question}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-2xl border border-border bg-canvas px-4 py-3.5 text-sm text-ink font-light leading-relaxed placeholder:text-stone placeholder:opacity-50 resize-none focus:border-sage focus:outline-none transition-colors"
        style={{ fontFamily: "inherit" }}
      />
    </div>
  );
}
