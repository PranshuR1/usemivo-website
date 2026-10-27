import { cn } from "@/lib/utils";
import { perMonthOfYearly, plusPlans, usd, yearlySavingsPercent } from "@/data/shop";

export function PlusPlans() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {plusPlans.map((plan) => {
        const featured = plan.id === "annual";
        return (
          <article
            key={plan.id}
            className={cn(
              "flex flex-col rounded-3xl border p-8",
              featured ? "border-accent/50 bg-surface-raised" : "border-ink/10 bg-surface"
            )}
          >
            <div className="flex min-h-7 items-start justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-muted">
                {plan.name}
              </h3>
              {plan.badge && (
                <span className="inline-flex shrink-0 items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold tracking-wide text-bg">
                  {plan.badge}
                </span>
              )}
            </div>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight text-ink">{usd(plan.price)}</span>
              <span className="text-sm text-ink-muted">{plan.period}</span>
            </p>
            <p className="mt-3 text-sm text-ink-body">{plan.note}</p>
            {featured && (
              <p className="mt-1 text-sm text-ink-muted">
                About {perMonthOfYearly()} a month, {yearlySavingsPercent()}% less than paying monthly.
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
