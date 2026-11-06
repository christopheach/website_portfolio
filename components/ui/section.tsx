import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionVariants = cva("relative scroll-mt-24", {
  variants: {
    spacing: {
      none: "",
      sm: "py-12 md:py-16",
      default: "py-20 md:py-28",
      lg: "py-24 md:py-36",
    },
  },
  defaultVariants: { spacing: "default" },
});

function Section({
  className,
  spacing,
  contained = true,
  children,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants> & { contained?: boolean }) {
  return (
    <section data-slot="section" className={cn(sectionVariants({ spacing }), className)} {...props}>
      {contained ? <div className="container-page">{children}</div> : children}
    </section>
  );
}

const sectionHeaderVariants = cva("flex flex-col gap-3", {
  variants: {
    align: {
      center: "mx-auto max-w-xl items-center text-center",
      start: "items-start text-left",
    },
    spacing: {
      none: "",
      default: "mb-12 md:mb-14",
    },
  },
  defaultVariants: { align: "center", spacing: "default" },
});

function SectionHeader({ className, align, spacing, ...props }: React.ComponentProps<"header"> & VariantProps<typeof sectionHeaderVariants>) {
  return <header data-slot="section-header" className={cn(sectionHeaderVariants({ align, spacing }), className)} {...props} />;
}

function SectionEyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="section-eyebrow" className={cn("text-xs font-medium text-muted-foreground", className)} {...props} />;
}

const sectionTitleVariants = cva("font-medium tracking-[-0.035em] text-balance text-foreground", {
  variants: {
    size: {
      default: "text-3xl leading-[1.1] md:text-[2.5rem]",
      lg: "text-4xl leading-[1.05] md:text-5xl",
      sm: "text-2xl leading-tight md:text-3xl",
    },
  },
  defaultVariants: { size: "default" },
});

function SectionTitle({
  className,
  size,
  as: Comp = "h2",
  ...props
}: React.ComponentProps<"h2"> & VariantProps<typeof sectionTitleVariants> & { as?: "h1" | "h2" | "h3" }) {
  return <Comp data-slot="section-title" className={cn(sectionTitleVariants({ size }), className)} {...props} />;
}

function SectionDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="section-description"
      className={cn("max-w-md text-sm leading-relaxed text-pretty text-muted-foreground md:text-[0.9375rem]", className)}
      {...props}
    />
  );
}

export { Section, SectionHeader, SectionEyebrow, SectionTitle, SectionDescription, sectionVariants, sectionTitleVariants };
