import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const glowVariants = cva("pointer-events-none absolute -z-10 rounded-full", {
  variants: {
    variant: {
      primary: "bg-[radial-gradient(closest-side,var(--color-glow),transparent)]",
      soft: "bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--color-glow)_45%,transparent),transparent)]",
      white: "bg-[radial-gradient(closest-side,oklch(1_0_0/0.08),transparent)]",
    },
    blur: { none: "", default: "blur-2xl", lg: "blur-3xl" },
  },
  defaultVariants: { variant: "primary", blur: "default" },
});

/** Decorative light leak. Position and size it with className. */
function Glow({ className, variant, blur, ...props }: React.ComponentProps<"div"> & VariantProps<typeof glowVariants>) {
  return <div data-slot="glow" aria-hidden className={cn(glowVariants({ variant, blur }), className)} {...props} />;
}

export { Glow };
