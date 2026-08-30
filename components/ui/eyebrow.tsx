import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]",
        light ? "text-bg/60" : "text-accent-deep",
        className
      )}
    >
      <span className={cn("h-px w-8", light ? "bg-bg/30" : "bg-accent/40")} />
      {children}
    </div>
  );
}
