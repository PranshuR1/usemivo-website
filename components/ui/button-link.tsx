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
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300";

  const variants = {
    primary:
      "h-12 px-7 bg-accent text-bg hover:bg-accent-deep shadow-[0_0_0_0_rgba(212,135,42,0)] hover:shadow-[0_8px_30px_-6px_rgba(212,135,42,0.55)]",
    secondary:
      "h-12 px-7 border border-ink/15 text-ink hover:border-ink/30 hover:bg-ink/5",
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
