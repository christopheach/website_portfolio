import { cn } from "@/lib/utils";

type LogoProps = {
  name: string;
  href?: string;
  label: string;
  className?: string;
};

export function Logo({ name, href = "#top", label, className }: LogoProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex h-9 items-center rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
        className,
      )}
    >
      <img src="/logo-studio-cabines.svg" alt={name} width={3181} height={1543} className="h-full w-auto" />
    </a>
  );
}
