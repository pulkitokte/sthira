// src/components/common/Button.jsx
// Standardized button primitive: consistent height, radius, font weight,
// spacing, hover/pressed/disabled states across the app. Existing
// feature-specific buttons keep their own accent colors by passing a
// custom className/style — this only standardizes shape and behavior,
// not per-feature color identity, per Part 2's "keep feature identity"
// guidance applied consistently across Parts 1–7.

const VARIANT_STYLES = {
  primary: "bg-moss text-canvas hover:bg-moss-dark",
  secondary: "border border-border text-ink hover:border-sage/60 bg-transparent",
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
        "transition-colors duration-200 ease-out",
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
      {...props}
    >
      {children}
    </button>
  );
}