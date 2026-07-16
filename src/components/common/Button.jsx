// src/components/common/Button.jsx
// Standardized button primitive.
// Batch 70: added active/pressed feedback (subtle scale-down, fast
// timing via --motion-press) and confirmed focus-visible relies on the
// global outline rule rather than duplicating it here.

const VARIANT_STYLES = {
  primary: "bg-moss text-canvas hover:bg-moss-dark",
  secondary:
    "border border-border text-ink hover:border-sage/60 bg-transparent",
  ghost: "text-stone hover:text-ink hover:bg-surface bg-transparent",
  danger: "bg-clay text-canvas hover:opacity-90",
};

const SIZE_STYLES = {
  default: "py-3.5 px-6 text-sm",
  compact: "py-2.5 px-4 text-xs",
};

export default function Button({
  children,
  variant = "primary",
  size = "default",
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={[
        "rounded-full font-display font-semibold tracking-wide",
        "transition-all duration-200 ease-out",
        "active:scale-[0.98]",
        "focus-visible:outline-none",
        "min-h-[44px]",
        fullWidth ? "w-full" : "",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transitionDuration: "var(--motion-base)" }}
      {...props}
    >
      {children}
    </button>
  );
}
