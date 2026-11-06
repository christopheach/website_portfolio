import * as React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";

import type { MediaAsset } from "@/config/media";
import { cn } from "@/lib/utils";

const avatarVariants = cva("relative inline-flex shrink-0 overflow-hidden rounded-full bg-muted", {
  variants: {
    size: {
      xs: "size-6",
      sm: "size-7",
      default: "size-9",
      lg: "size-11",
    },
    ring: {
      none: "",
      default: "ring-2 ring-background",
    },
  },
  defaultVariants: { size: "default", ring: "none" },
});

function Avatar({ className, size, ring, ...props }: React.ComponentProps<"span"> & VariantProps<typeof avatarVariants>) {
  return <span data-slot="avatar" className={cn(avatarVariants({ size, ring }), className)} {...props} />;
}

/** Avatars are decorative next to a visible name, so alt defaults to "". */
function AvatarImage({ asset, sizes = "48px", className }: { asset: MediaAsset; sizes?: string; className?: string }) {
  if (!asset.src) return <span data-slot="avatar-image" aria-hidden className="absolute inset-0 bg-stripes" />;
  return (
    <Image
      data-slot="avatar-image"
      src={asset.src}
      alt={asset.alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-fallback"
      className={cn("absolute inset-0 grid place-items-center bg-secondary text-[0.6875rem] font-medium text-foreground", className)}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-2.5 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background", className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants };
