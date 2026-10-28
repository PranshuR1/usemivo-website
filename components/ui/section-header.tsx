import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  heading,
  sub,
  onDark = false,
  align = "center",
  children,
}: {
  eyebrow: string;
  heading: string;
  sub?: string;
  onDark?: boolean;
  align?: "center" | "left";
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className={cn("flex", align === "center" && "justify-center")}>
        <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      </div>
      <h2
        className={cn(
          "mt-6 text-balance font-display text-4xl leading-[1.06] tracking-[-0.015em] sm:text-5xl",
          onDark ? "text-cream" : "text-ink"
        )}
      >
        {heading}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-5 text-pretty text-lg leading-relaxed",
            align === "center" && "mx-auto max-w-xl",
            onDark ? "text-cream-muted" : "text-ink-body"
          )}
        >
          {sub}
        </p>
      )}
      {children}
    </div>
  );
}
