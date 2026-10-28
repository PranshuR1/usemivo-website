export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-3.5 py-1.5 text-xs font-medium tracking-wide text-ink-body shadow-sm">
      <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
      {children}
    </div>
  );
}
