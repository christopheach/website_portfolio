import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-colors [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "border border-border bg-secondary text-secondary-foreground",
        outline: "border border-input text-foreground",
        glass: "border border-white/10 bg-white/[0.04] text-foreground/90 backdrop-blur-md",
        overlay: "bg-black/55 text-white backdrop-blur-md",
      },
      size: {
        sm: "h-5 rounded-sm px-1.5 text-[0.6875rem]",
        default: "h-6 rounded-md px-2 text-xs",
        lg: "h-7 rounded-full px-3 text-xs",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

const badgeDotVariants = cva("relative inline-flex size-1.5 rounded-full", {
  variants: {
    tone: {
      primary: "bg-primary",
      success: "bg-success",
      muted: "bg-muted-foreground",
    },
    pulse: {
      true: "after:absolute after:inset-0 after:rounded-full after:bg-inherit after:motion-safe:animate-ping",
      false: "",
    },
  },
  defaultVariants: { tone: "primary", pulse: false },
});

function BadgeDot({ className, tone, pulse, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeDotVariants>) {
  return <span data-slot="badge-dot" aria-hidden className={cn(badgeDotVariants({ tone, pulse }), className)} {...props} />;
}

export { Badge, BadgeDot, badgeVariants };
