// src/components/common/Button.jsx
// Standardized button primitive.
// Batch 80: converted to forwardRef. Previously a plain function
// component, which meant any ref passed to it (e.g. Arrival.jsx's
// focus-on-mount for the Begin button) silently failed to attach —
// this fixes that real accessibility gap for every current and future
// consumer of Button. No prop, styling, or behavior changes otherwise.

import { forwardRef } from "react";

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

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "default",
    fullWidth = false,
    disabled = false,
    className = "",
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
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
});

export default Button;
