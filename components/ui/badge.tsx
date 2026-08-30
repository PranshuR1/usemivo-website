export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent-deep">
      <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
      {children}
    </div>
  );
}
