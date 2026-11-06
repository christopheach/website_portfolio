import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconTileVariants = cva("inline-grid shrink-0 place-items-center [&_svg]:pointer-events-none", {
  variants: {
    variant: {
      primary:
        "bg-primary text-primary-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.3),0_8px_24px_-10px_var(--color-primary)]",
      muted: "border bg-secondary text-foreground",
      outline: "border border-primary/40 text-primary",
    },
    size: {
      sm: "size-8 rounded-md [&_svg]:size-4",
      default: "size-10 rounded-lg [&_svg]:size-5",
      lg: "size-12 rounded-xl [&_svg]:size-6",
    },
  },
  defaultVariants: { variant: "primary", size: "default" },
});

function IconTile({ className, variant, size, ...props }: React.ComponentProps<"span"> & VariantProps<typeof iconTileVariants>) {
  return <span data-slot="icon-tile" aria-hidden className={cn(iconTileVariants({ variant, size }), className)} {...props} />;
}

export { IconTile, iconTileVariants };
