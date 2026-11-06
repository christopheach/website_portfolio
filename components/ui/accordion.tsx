"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

const accordionItemVariants = cva("group/accordion-item", {
  variants: {
    variant: {
      default: "border-b last:border-b-0",
      card: "rounded-lg border bg-card transition-colors hover:bg-secondary/60 data-[state=open]:bg-secondary/60",
    },
  },
  defaultVariants: { variant: "default" },
});

function AccordionItem({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & VariantProps<typeof accordionItemVariants>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      data-variant={variant ?? "default"}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 rounded-[inherit] py-4 text-left text-sm font-medium outline-none transition-colors",
          "group-data-[variant=card]/accordion-item:px-4 md:group-data-[variant=card]/accordion-item:px-5",
          "focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none"
      {...props}
    >
      <div
        className={cn(
          "pb-4 leading-relaxed text-muted-foreground group-data-[variant=card]/accordion-item:px-4 md:group-data-[variant=card]/accordion-item:px-5",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, accordionItemVariants };
