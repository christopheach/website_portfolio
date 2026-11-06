import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const marqueeVariants = cva("group/marquee flex overflow-hidden [--marquee-gap:0.75rem]", {
  variants: {
    fade: {
      true: "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
      false: "",
    },
    pauseOnHover: {
      true: "",
      false: "",
    },
  },
  defaultVariants: { fade: true, pauseOnHover: true },
});

type MarqueeProps = React.ComponentProps<"div"> &
  VariantProps<typeof marqueeVariants> & {
    /** Seconds for one full loop. */
    duration?: number;
    reverse?: boolean;
  };

/**
 * Infinite horizontal loop. Content is rendered twice; the copy is hidden from
 * assistive tech. With reduced motion the track stops and wraps instead.
 */
function Marquee({ className, fade, pauseOnHover, duration = 40, reverse = false, children, style, ...props }: MarqueeProps) {
  return (
    <div
      data-slot="marquee"
      className={cn(marqueeVariants({ fade, pauseOnHover }), className)}
      style={{ "--marquee-duration": `${duration}s`, ...style } as React.CSSProperties}
      {...props}
    >
      <div
        data-slot="marquee-track"
        className={cn(
          "flex w-max shrink-0 gap-(--marquee-gap) animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover !== false && "group-hover/marquee:[animation-play-state:paused]",
          "motion-reduce:w-full motion-reduce:animate-none",
        )}
      >
        <MarqueeGroup>{children}</MarqueeGroup>
        <MarqueeGroup aria-hidden className="motion-reduce:hidden">
          {children}
        </MarqueeGroup>
      </div>
    </div>
  );
}

function MarqueeGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="marquee-group"
      className={cn("flex shrink-0 items-center gap-(--marquee-gap) motion-reduce:flex-wrap motion-reduce:shrink", className)}
      {...props}
    />
  );
}

function MarqueeItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="marquee-item" className={cn("shrink-0", className)} {...props} />;
}

export { Marquee, MarqueeItem, marqueeVariants };
