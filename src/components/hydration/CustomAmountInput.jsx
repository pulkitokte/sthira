import { useState } from "react";
import { Plus } from "lucide-react";

export default function CustomAmountInput({ onLog }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const amount = parseInt(value, 10);
    if (amount > 0) {
      onLog(amount);
      setValue("");
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setValue("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-3.5 text-sm font-medium text-stone transition-colors hover:border-dew/60 hover:text-dew"
      >
        <Plus size={16} /> Log a custom amount
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        inputMode="numeric"
        min="1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Amount in ml"
        autoFocus
        className="flex-1 rounded-2xl border border-border bg-surface px-4 py-3.5 text-ink placeholder:text-stone/60 focus:border-dew focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        className="rounded-2xl bg-moss px-5 py-3.5 font-display font-semibold text-canvas"
      >
        Add
      </button>
      <button
        onClick={handleCancel}
        className="rounded-2xl border border-border px-4 py-3.5 text-sm text-stone"
      >
        Cancel
      </button>
    </div>
  );
}
