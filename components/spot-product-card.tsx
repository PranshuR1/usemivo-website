"use client";

import { useState } from "react";
import { BuyButton } from "@/components/ui/buy-button";
import { spotPlaces, spotProducts, usd } from "@/data/shop";
import { missingPicks } from "@/lib/spot-picks";

type Product = (typeof spotProducts)[number];

export function SpotProductCard({ product }: { product: Product }) {
  const [picks, setPicks] = useState<string[]>(() => Array(product.spots).fill(""));
  const missing = missingPicks(picks);
  const each = product.spots > 1 ? product.price / product.spots : null;

  return (
    <article className="flex flex-col rounded-3xl border border-ink/10 bg-surface p-8">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">{product.kicker}</p>
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
          {each !== null && ` · ${usd(each)} each`}
        </span>
      </p>

      <fieldset className="mt-6 rounded-2xl border border-ink/10 bg-white/60 px-4 py-4">
        <legend className="px-1 text-sm font-medium text-ink">
          {product.spots === 1 ? "Where will your Spot go?" : "Where will each Spot go?"}
        </legend>
        <ul className="grid gap-3 sm:grid-cols-2">
          {picks.map((key, index) => (
            <li key={index}>
              <label className="block">
                <span className="mb-1 block text-xs text-ink-muted">
                  {product.spots === 1 ? "Your Spot" : `Spot ${index + 1}`}
                </span>
                <select
                  value={key}
                  required
                  onChange={(event) =>
                    setPicks((current) => current.map((value, i) => (i === index ? event.target.value : value)))
                  }
                  className="h-11 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink transition-colors hover:border-ink/30 focus:border-accent-deep"
                >
                  <option value="" disabled>
                    Choose a place
                  </option>
                  {spotPlaces.map((place) => (
                    <option key={place.key} value={place.key}>
                      {place.label}
                    </option>
                  ))}
                </select>
              </label>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-ink-muted" aria-live="polite">
          {missing > 0
            ? `Choose a place for ${missing === product.spots ? (missing === 1 ? "your Spot" : "each Spot") : `the other ${missing}`} to check out.`
            : "We note your picks on your order and on the card."}{" "}
          A Spot works anywhere, so a pick only helps you tell them apart. Not sure? Pick “Not sure yet”.
        </p>
      </fieldset>

      <div className="mt-auto pt-6">
        <BuyButton
          href={product.checkoutUrl}
          picks={picks}
          blockedLabel={missing > 0 ? (product.spots === 1 ? "Choose a place to check out" : `Choose ${missing} more to check out`) : undefined}
        />
      </div>
    </article>
  );
}
