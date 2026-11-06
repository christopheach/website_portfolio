import { cn } from "@/lib/utils";

type LogoProps = {
  name: string;
  initials: string;
  href?: string;
  label: string;
  className?: string;
};

export function Logo({ name, initials, href = "#top", label, className }: LogoProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-2 rounded-md text-sm font-semibold tracking-tight outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid size-6 place-items-center rounded-md bg-primary text-[0.625rem] font-bold text-primary-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.3)]"
      >
        {initials}
      </span>
      <span>{name}</span>
    </a>
  );
}
