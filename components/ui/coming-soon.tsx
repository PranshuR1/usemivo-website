export function ComingSoon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-accent-deep">
      {children}
    </span>
  );
}
