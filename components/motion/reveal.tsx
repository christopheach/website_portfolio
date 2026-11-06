"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const delayedVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } }),
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "ul" | "ol" | "header";
};

/** Fades and lifts its content once, when it enters the viewport. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      data-reveal
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={delayedVariants}
      custom={delay}
    >
      {children}
    </Component>
  );
}

/** Staggers the reveal of its direct <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: Omit<RevealProps, "delay"> & { stagger?: number }) {
  const Component = motion[as];
  return (
    <Component
      data-reveal
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<RevealProps, "delay">) {
  const Component = motion[as];
  return (
    <Component data-reveal className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
