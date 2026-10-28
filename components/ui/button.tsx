import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "secondary" | "danger" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-10px_rgb(212_135_42/0.9)] hover:brightness-105",
  dark: "bg-espresso text-cream hover:bg-espresso-raised",
  secondary: "border border-ink/15 bg-surface text-ink shadow-sm hover:border-ink/30 hover:bg-white",
  danger: "border border-red-800/25 bg-red-50 text-red-900 hover:bg-red-100",
  ghost: "text-ink-body hover:bg-ink/5 hover:text-ink",
};

export function Button({
  variant = "primary",
  busy = false,
  className,
  children,
  disabled,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; busy?: boolean }) {
  return (
    <button
      {...rest}
      disabled={disabled || busy}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
    >
      {busy ? "One moment…" : children}
    </button>
  );
}
