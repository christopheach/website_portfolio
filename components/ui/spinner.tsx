import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("relative inline-grid shrink-0 place-items-center", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-6",
      lg: "size-10",
    },
    tone: {
      default: "text-foreground/80",
      muted: "text-muted-foreground",
      primary: "text-primary",
      /** On top of photos and video. */
      overlay: "text-white drop-shadow-[0_1px_6px_rgb(0_0_0/0.5)]",
    },
  },
  defaultVariants: { size: "default", tone: "default" },
});

type SpinnerProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof spinnerVariants> & {
    /** Read by screen readers. Pass "" when the surrounding element already announces the loading state. */
    label?: string;
  };

/**
 * A camera aperture whose blades turn while something loads, with a soft "focus" ring breathing around it.
 * With reduced motion it gently pulses instead of turning.
 */
function Spinner({ className, size, tone, label = "Chargement…", ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role={label ? "status" : undefined}
      aria-hidden={label ? undefined : true}
      className={cn(spinnerVariants({ size, tone }), className)}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border border-current opacity-0 motion-safe:animate-focus-ring"
      />
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-full motion-safe:animate-aperture motion-reduce:animate-pulse"
      >
        <circle cx="12" cy="12" r="10" />
        {/* Six aperture blades. */}
        <path d="m14.31 8 5.74 9.94" />
        <path d="M9.69 8h11.48" />
        <path d="m7.38 12 5.74-9.94" />
        <path d="M9.69 16 3.95 6.06" />
        <path d="M14.31 16H2.83" />
        <path d="m16.62 12-5.74 9.94" />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </span>
  );
}

export { Spinner, spinnerVariants };
