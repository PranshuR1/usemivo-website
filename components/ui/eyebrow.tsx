import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        onDark
          ? "border-cream/15 bg-cream/5 text-accent"
          : "border-accent/25 bg-accent/10 text-accent-deep",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", onDark ? "bg-accent" : "bg-accent-deep")} />
      {children}
    </div>
  );
}
