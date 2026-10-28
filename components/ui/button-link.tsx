import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "secondary" | "secondary-dark" | "ghost";
  showArrow?: boolean;
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300";

  const variants = {
    primary:
      "h-12 px-7 bg-accent text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-10px_rgb(212_135_42/0.9)] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_16px_30px_-10px_rgb(212_135_42/0.9)]",
    dark: "h-12 px-7 bg-espresso text-cream hover:-translate-y-0.5 hover:bg-espresso-raised",
    secondary:
      "h-12 px-7 border border-ink/15 bg-surface text-ink shadow-sm hover:border-ink/30 hover:bg-white",
    "secondary-dark":
      "h-12 px-7 border border-cream/20 text-cream hover:border-cream/40 hover:bg-cream/10",
    ghost: "h-auto px-0 text-ink-body hover:text-ink",
  };

  const external = href.startsWith("http");

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {children}
      {showArrow && (
        <ArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
