"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type NumberTickerProps = Omit<React.ComponentProps<"span">, "children"> & {
  value: number;
  prefix?: string;
  suffix?: string;
  /** BCP 47 locale for digit grouping. */
  locale?: string;
  /** Seconds. */
  duration?: number;
};

/**
 * Counts up to `value` when scrolled into view. The final value is server
 * rendered for SEO and screen readers; the animated digits are aria-hidden.
 */
function NumberTicker({ value, prefix, suffix, locale = "en", duration = 1.8, className, ...props }: NumberTickerProps) {
  const digitsRef = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(digitsRef, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const format = React.useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const finalText = `${prefix ?? ""}${format.format(value)}${suffix ?? ""}`;

  // Reset to zero before the section scrolls into view.
  React.useEffect(() => {
    if (reduceMotion || !digitsRef.current) return;
    digitsRef.current.textContent = format.format(0);
  }, [reduceMotion, format]);

  React.useEffect(() => {
    const node = digitsRef.current;
    if (!inView || !node) return;
    if (reduceMotion) {
      node.textContent = format.format(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format.format(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration, format]);

  return (
    <span data-slot="number-ticker" className={cn("tabular-nums", className)} {...props}>
      <span className="sr-only">{finalText}</span>
      <span aria-hidden>
        {prefix}
        <span ref={digitsRef}>{format.format(value)}</span>
        {suffix}
      </span>
    </span>
  );
}

export { NumberTicker };
