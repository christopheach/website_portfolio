"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Wrap every GSAP animation in gsap.matchMedia() with this query so reduced-motion users get static content. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION_OK = "(prefers-reduced-motion: no-preference) and (min-width: 1024px)";

export { gsap, ScrollTrigger, useGSAP };
