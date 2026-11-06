"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type SlideshowContextValue = {
  index: number;
  count: number;
  setIndex: (index: number) => void;
  setCount: (count: number) => void;
};

const SlideshowContext = React.createContext<SlideshowContextValue | null>(null);

function useSlideshow() {
  const context = React.useContext(SlideshowContext);
  if (!context) throw new Error("Slideshow components must be used inside <Slideshow>.");
  return context;
}

type SlideshowProps = React.ComponentProps<"div"> & {
  /** Milliseconds between slides. */
  interval?: number;
  autoPlay?: boolean;
  /** Accessible name of the carousel region. */
  label: string;
};

/**
 * Cross-fading slideshow. Autoplay pauses on hover, focus, when off-screen
 * and entirely when the user prefers reduced motion.
 */
function Slideshow({ interval = 4500, autoPlay = true, label, className, children, ...props }: SlideshowProps) {
  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!autoPlay || reduceMotion || paused || !inView || count < 2) return;
    const id = window.setInterval(() => setIndex((current) => (current + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [autoPlay, reduceMotion, paused, inView, count, interval]);

  return (
    <SlideshowContext.Provider value={{ index, count, setIndex, setCount }}>
      <div
        ref={ref}
        data-slot="slideshow"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </SlideshowContext.Provider>
  );
}

function SlideshowContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { index, setCount } = useSlideshow();
  const items = React.Children.toArray(children);

  React.useEffect(() => setCount(items.length), [items.length, setCount]);

  return (
    <div data-slot="slideshow-content" className={cn("relative size-full overflow-hidden", className)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SlideshowItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="slideshow-item" role="group" aria-roledescription="slide" className={cn("size-full", className)} {...props} />;
}

const slideshowDotsVariants = cva("flex items-center gap-1.5", {
  variants: {
    position: {
      overlay: "absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/40 px-2 py-1.5 backdrop-blur-md",
      inline: "justify-center",
    },
  },
  defaultVariants: { position: "overlay" },
});

function SlideshowDots({
  className,
  position,
  getLabel,
}: VariantProps<typeof slideshowDotsVariants> & {
  className?: string;
  getLabel: (index: number, total: number) => string;
}) {
  const { index, count, setIndex } = useSlideshow();
  if (count < 2) return null;

  return (
    <div data-slot="slideshow-dots" className={cn(slideshowDotsVariants({ position }), className)}>
      {Array.from({ length: count }, (_, dot) => (
        <button
          key={dot}
          type="button"
          aria-label={getLabel(dot + 1, count)}
          aria-current={dot === index ? "true" : undefined}
          onClick={() => setIndex(dot)}
          className={cn(
            "h-1.5 rounded-full outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            dot === index ? "w-4 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70",
          )}
        />
      ))}
    </div>
  );
}

export { Slideshow, SlideshowContent, SlideshowItem, SlideshowDots, useSlideshow };
