"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronsLeftRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type CompareSliderProps = Omit<React.ComponentProps<"div">, "defaultValue"> & {
  /** Initial divider position, 0–100. */
  defaultValue?: number;
  /** Accessible name for the divider handle. */
  label: string;
};

/**
 * Before/after comparison. Built on the Radix Slider so the divider is
 * keyboard accessible (arrow keys, Home/End) and announced as a slider.
 */
function CompareSlider({ defaultValue = 50, label, className, children, style, ...props }: CompareSliderProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div
      data-slot="compare-slider"
      className={cn("relative isolate overflow-hidden select-none", className)}
      style={{ "--compare-position": `${value}%`, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_12px_rgb(0_0_0/0.5)]"
        style={{ left: "var(--compare-position)" }}
      />
      <SliderPrimitive.Root
        data-slot="compare-slider-control"
        value={[value]}
        onValueChange={([next]) => setValue(next ?? value)}
        min={0}
        max={100}
        step={1}
        className="absolute inset-0 z-30 flex cursor-ew-resize touch-pan-y items-center"
      >
        <SliderPrimitive.Track className="relative h-full grow">
          <SliderPrimitive.Range className="hidden" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          aria-label={label}
          className="grid size-9 place-items-center rounded-full bg-white text-black shadow-lg outline-none transition-shadow focus-visible:ring-4 focus-visible:ring-ring"
        >
          <ChevronsLeftRightIcon className="size-4" aria-hidden />
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  );
}

function CompareSliderBefore({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="compare-slider-before" className={cn("absolute inset-0", className)} {...props} />;
}

/** Revealed to the right of the divider. */
function CompareSliderAfter({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="compare-slider-after"
      className={cn("absolute inset-0 z-10", className)}
      style={{ clipPath: "inset(0 0 0 var(--compare-position))", ...style }}
      {...props}
    />
  );
}

const compareSliderLabelVariants = cva(
  "pointer-events-none absolute top-3 z-20 rounded-md bg-black/55 px-2 py-1 text-[0.6875rem] font-medium text-white backdrop-blur-md",
  {
    variants: { side: { before: "left-3", after: "right-3" } },
    defaultVariants: { side: "before" },
  },
);

function CompareSliderLabel({
  className,
  side,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof compareSliderLabelVariants>) {
  return <span data-slot="compare-slider-label" className={cn(compareSliderLabelVariants({ side }), className)} {...props} />;
}

export { CompareSlider, CompareSliderBefore, CompareSliderAfter, CompareSliderLabel };
