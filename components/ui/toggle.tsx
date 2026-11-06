"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none transition-colors",
    "focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: "rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground data-[state=on]:bg-secondary data-[state=on]:text-foreground",
        outline: "rounded-md border border-input hover:bg-secondary data-[state=on]:bg-secondary",
        pill: "rounded-full border border-transparent text-muted-foreground hover:text-foreground data-[state=on]:border-border data-[state=on]:bg-secondary data-[state=on]:text-foreground",
        slot: "rounded-md border bg-secondary/60 tabular-nums hover:bg-accent data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size, className }))} {...props} />;
}

export { Toggle, toggleVariants };
