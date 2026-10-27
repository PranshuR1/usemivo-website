import { BuyButton } from "@/components/ui/buy-button";
import { spotProducts, usd } from "@/data/shop";

export function SpotProducts() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {spotProducts.map((product) => (
        <article
          key={product.id}
          className="flex flex-col rounded-3xl border border-ink/10 bg-surface p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">
              {product.kicker}
            </p>
            {product.badge && (
              <span className="inline-flex shrink-0 items-center rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-accent-deep">
                {product.badge}
              </span>
            )}
          </div>
          <h3 className="mt-4 font-display text-3xl italic text-ink">{product.name}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-body">{product.blurb}</p>
          <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-4xl font-semibold tracking-tight text-ink">{usd(product.price)}</span>
            <span className="text-sm text-ink-muted">
              {product.shipping > 0 ? `+ ${usd(product.shipping)} shipping` : "free shipping"}
            </span>
          </p>
          <div className="mt-auto pt-8">
            <BuyButton href={product.checkoutUrl} />
          </div>
        </article>
      ))}
    </div>
  );
}
