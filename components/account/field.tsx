import { cn } from "@/lib/utils";

export const inputClass =
  "h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-[15px] text-ink placeholder:text-ink-muted/70 transition-colors hover:border-ink/30 focus:border-accent-deep";

export function Field({
  label,
  className,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input {...input} className={inputClass} />
    </label>
  );
}

export function FormError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="rounded-xl border border-red-800/20 bg-red-50 px-4 py-3 text-sm text-red-900">
      {children}
    </p>
  );
}

export function FormNote({ children }: { children: React.ReactNode }) {
  return (
    <p role="status" className="rounded-xl border border-kept/30 bg-kept/10 px-4 py-3 text-sm text-ink">
      {children}
    </p>
  );
}
