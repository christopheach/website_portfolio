import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const ratingVariants = cva("inline-flex items-center gap-0.5 text-amber-400", {
  variants: {
    size: { sm: "[&_svg]:size-3", default: "[&_svg]:size-3.5", lg: "[&_svg]:size-4" },
  },
  defaultVariants: { size: "default" },
});

function Rating({
  value,
  max = 5,
  label,
  size,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof ratingVariants> & { value: number; max?: number; label: string }) {
  return (
    <div data-slot="rating" role="img" aria-label={label} className={cn(ratingVariants({ size }), className)} {...props}>
      {Array.from({ length: max }, (_, index) => (
        <StarIcon
          key={index}
          aria-hidden
          className={cn(index < Math.round(value) ? "fill-current" : "fill-transparent text-muted-foreground/50")}
        />
      ))}
    </div>
  );
}

export { Rating };
