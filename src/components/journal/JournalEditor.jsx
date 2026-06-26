// src/components/journal/JournalEditor.jsx
// Shared editor used for both new entries and editing existing ones.

import { useState } from "react";
import { X } from "lucide-react";
import { MOOD_OPTIONS, getPromptForDate } from "../../data/journalPrompts";
import MoodBadge from "./MoodBadge";

export default function JournalEditor({
  initialMood = null,
  initialText = "",
  onSave,
  onCancel,
  isEditing = false,
}) {
  const [selectedMood, setSelectedMood] = useState(initialMood);
  const [text, setText] = useState(initialText);
  const [showPrompt, setShowPrompt] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const prompt = getPromptForDate(today);

  const canSave = selectedMood !== null;

  const handleSave = () => {
    if (!canSave) return;
    onSave({ mood: selectedMood, text });
  };

  const handleInsertPrompt = () => {
    const prefix = text.trim() ? text.trimEnd() + "\n\n" : "";
    setText(prefix + prompt + "\n");
    setShowPrompt(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Mood selector */}
      <div className="space-y-3">
        <p className="font-display text-sm font-medium text-ink">
          How are you feeling?
          <span className="text-clay ml-1 text-xs">required</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className="rounded-full font-display text-xs font-medium px-3.5 py-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  background: isSelected ? mood.bg : "transparent",
                  border: `1.5px solid ${isSelected ? mood.border : "rgba(160,150,130,0.25)"}`,
                  color: isSelected ? mood.color : "#8a8070",
                  transform: isSelected ? "scale(1.04)" : "scale(1)",
                }}
                aria-pressed={isSelected}
              >
                {mood.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Text area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-medium text-ink">
            Your reflection
            <span className="text-stone font-light ml-1 text-xs">
              (optional)
            </span>
          </p>
          {!showPrompt && (
            <button
              onClick={() => setShowPrompt(true)}
              className="text-xs text-stone font-light hover:text-ink transition-colors"
            >
              Use a prompt
            </button>
          )}
        </div>

        {/* Prompt suggestion */}
        {showPrompt && (
          <div
            className="rounded-2xl p-4 flex items-start justify-between gap-3"
            style={{
              background: "rgba(134, 159, 138, 0.07)",
              border: "1px solid rgba(134, 159, 138, 0.25)",
            }}
          >
            <div className="flex-1 space-y-2">
              <p className="text-sm text-stone font-light italic leading-relaxed">
                "{prompt}"
              </p>
              <button
                onClick={handleInsertPrompt}
                className="text-xs font-medium"
                style={{ color: "#869F8A" }}
              >
                Use this prompt
              </button>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-stone hover:text-ink transition-colors shrink-0"
              aria-label="Dismiss prompt"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write whatever feels true right now…"
          rows={7}
          className="w-full rounded-2xl border border-border bg-canvas px-4 py-3.5 text-sm text-ink font-light leading-relaxed placeholder:text-stone placeholder:opacity-60 resize-none focus:border-sage focus:outline-none"
          style={{ fontFamily: "inherit" }}
        />
        <p className="text-right text-xs text-stone font-light opacity-60">
          {text.length > 0 ? `${text.length} characters` : ""}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 rounded-full border border-border py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-surface"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="flex-1 rounded-full py-3 font-display text-sm font-semibold text-canvas transition-opacity"
          style={{
            background: canSave ? "#869F8A" : "rgba(134, 159, 138, 0.35)",
            cursor: canSave ? "pointer" : "not-allowed",
          }}
        >
          {isEditing ? "Save changes" : "Save entry"}
        </button>
      </div>
    </div>
  );
}
