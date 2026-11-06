import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cva, type VariantProps } from "class-variance-authority";

import type { MediaAsset } from "@/config/media";
import { cn } from "@/lib/utils";

const mediaImageVariants = cva("relative isolate overflow-hidden bg-muted", {
  variants: {
    aspect: {
      auto: "",
      square: "aspect-square",
      video: "aspect-video",
      photo: "aspect-[4/3]",
      portrait: "aspect-[4/5]",
      tall: "aspect-[3/4]",
    },
    radius: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      full: "rounded-full",
    },
  },
  defaultVariants: { aspect: "auto", radius: "lg" },
});

type MediaImageProps = Omit<ImageProps, "src" | "alt" | "fill" | "width" | "height" | "className"> &
  VariantProps<typeof mediaImageVariants> & {
    asset: MediaAsset;
    /** Classes for the wrapper (size, position). */
    className?: string;
    /** Classes for the <img> itself (object-position, hover transforms). */
    imageClassName?: string;
    /** Overlays rendered above the image (gradients, labels). */
    children?: React.ReactNode;
  };

/**
 * The single entry point for imagery. It always fills its wrapper, so control
 * size through `aspect` or wrapper classes. An asset with an empty `src`
 * renders the template's striped placeholder instead of an image.
 */
function MediaImage({
  asset,
  aspect,
  radius,
  className,
  imageClassName,
  sizes = "100vw",
  children,
  ...imageProps
}: MediaImageProps) {
  return (
    <div data-slot="media-image" className={cn(mediaImageVariants({ aspect, radius }), className)}>
      {asset.src ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          placeholder={asset.blurDataURL ? "blur" : "empty"}
          blurDataURL={asset.blurDataURL}
          className={cn("object-cover", imageClassName)}
          {...imageProps}
        />
      ) : (
        <div
          data-slot="media-placeholder"
          role={asset.alt ? "img" : undefined}
          aria-label={asset.alt || undefined}
          aria-hidden={asset.alt ? undefined : true}
          className="absolute inset-0 bg-surface bg-stripes"
        />
      )}
      {children}
    </div>
  );
}

export { MediaImage, mediaImageVariants };
export type { MediaImageProps };
