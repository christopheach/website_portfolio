import * as React from "react";

import { cn } from "@/lib/utils";

/** Camera viewfinder overlay: place inside a relatively positioned media frame. */
function Viewfinder({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="viewfinder"
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-10 p-4 font-medium text-white sm:p-5", className)}
      {...props}
    >
      <ViewfinderCorners />
      <div className="relative flex h-full flex-col justify-between">{children}</div>
    </div>
  );
}

function ViewfinderCorners() {
  const corner = "absolute size-5 border-white/80";
  return (
    <div data-slot="viewfinder-corners" className="absolute inset-3 sm:inset-4">
      <span className={cn(corner, "top-0 left-0 rounded-tl-sm border-t-2 border-l-2")} />
      <span className={cn(corner, "top-0 right-0 rounded-tr-sm border-t-2 border-r-2")} />
      <span className={cn(corner, "bottom-0 left-0 rounded-bl-sm border-b-2 border-l-2")} />
      <span className={cn(corner, "right-0 bottom-0 rounded-br-sm border-r-2 border-b-2")} />
      <span className="absolute top-1/2 left-1/2 size-6 -translate-1/2">
        <span className="absolute top-1/2 left-0 h-px w-full bg-white/70" />
        <span className="absolute top-0 left-1/2 h-full w-px bg-white/70" />
      </span>
    </div>
  );
}

function ViewfinderBar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="viewfinder-bar"
      className={cn("flex items-center justify-between gap-3 px-3 py-2 text-[0.6875rem] tabular-nums sm:px-4", className)}
      {...props}
    />
  );
}

function ViewfinderRec({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="viewfinder-rec" className={cn("inline-flex items-center gap-1.5", className)} {...props}>
      <span className="size-2 rounded-full bg-primary motion-safe:animate-rec" />
      {children}
    </span>
  );
}

export { Viewfinder, ViewfinderBar, ViewfinderRec };
