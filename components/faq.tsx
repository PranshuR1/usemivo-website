import { ChevronDown } from "lucide-react";

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown
              size={18}
              className="shrink-0 text-ink-muted transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-body">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
