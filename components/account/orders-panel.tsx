"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/account/field";
import { useLoad } from "@/components/account/use-load";
import { fetchMyOrders, type SpotOrder } from "@/lib/mivo-account";
import { footer } from "@/data/content";
import { spotProducts, usd } from "@/data/shop";
import { cn } from "@/lib/utils";

// Every pack size is stored as item "pack", so the size (spots) picks the product name.
const itemName = (order: SpotOrder) =>
  order.item === "other"
    ? "Mivo order"
    : spotProducts.find((product) => product.spots === order.spots)?.name ?? `Mivo Spots (${order.spots})`;

const money = (cents: number) => usd(cents / 100);

const date = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const steps = ["Paid", "Mailed", "Delivered"] as const;

function stepIndex(status: SpotOrder["status"]) {
  return status === "delivered" ? 2 : status === "mailed" ? 1 : 0;
}

function OrderCard({ order }: { order: SpotOrder }) {
  const ended = order.status === "refunded" || order.status === "cancelled";
  const reached = stepIndex(order.status);
  const help = `mailto:${footer.contact.email}?subject=${encodeURIComponent(`Mivo order ${order.order_id}`)}`;

  return (
    <article className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Order {order.order_id}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-ink">{itemName(order)}</h3>
          <p className="mt-0.5 text-sm text-ink-muted">Placed {date(order.created_at)}</p>
        </div>
        <p className="text-right">
          <span className="block text-2xl font-semibold tracking-tight text-ink">{money(order.amount_total)}</span>
          <span className="text-xs text-ink-muted">
            {money(order.amount_subtotal)} + {order.amount_shipping > 0 ? `${money(order.amount_shipping)} shipping` : "free shipping"}
          </span>
        </p>
      </div>

      {ended ? (
        <p className="mt-5 rounded-xl bg-bg-alt px-4 py-3 text-sm text-ink-body">
          {order.status === "refunded" ? "This order was refunded." : "This order was cancelled."}
        </p>
      ) : (
        <ol className="mt-6 grid grid-cols-3 gap-2">
          {steps.map((step, index) => {
            const done = index <= reached;
            return (
              <li key={step} className="flex flex-col gap-2">
                <span className={cn("h-1.5 rounded-full", done ? "bg-accent" : "bg-ink/10")} />
                <span className={cn("flex items-center gap-1.5 text-sm", done ? "font-medium text-ink" : "text-ink-muted")}>
                  {done && <Check size={14} className="text-accent-deep" />}
                  {step}
                  {index === 1 && order.mailed_at && done && (
                    <span className="text-xs font-normal text-ink-muted">· {date(order.mailed_at)}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      )}

      <div className="mt-6 grid gap-5 border-t border-ink/10 pt-5 text-sm sm:grid-cols-2">
        {order.ship_address && (
          <div>
            <p className="text-ink-muted">Ships to</p>
            <p className="mt-1 whitespace-pre-line leading-relaxed text-ink">
              {order.ship_name ? `${order.ship_name}\n` : ""}
              {order.ship_address}
            </p>
          </div>
        )}
        <div>
          <p className="text-ink-muted">Need a hand?</p>
          <p className="mt-1 leading-relaxed text-ink-body">
            {order.tracking_url && (
              <>
                <a href={order.tracking_url} target="_blank" rel="noreferrer noopener" className="font-medium text-accent-deep underline underline-offset-4">
                  Track this package
                </a>
                {" · "}
              </>
            )}
            <a href={help} className="underline underline-offset-4 hover:text-ink">
              Email us about this order
            </a>
            {" · "}
            <Link href="/shipping-returns" className="underline underline-offset-4 hover:text-ink">
              Shipping &amp; returns
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}

export function OrdersPanel() {
  const [nonce, setNonce] = useState(0);
  const result = useLoad(fetchMyOrders, nonce);

  if (result.status === "loading") return <p className="py-10 text-center text-ink-muted">Loading your orders…</p>;

  if (result.status === "error") {
    // Until the order history is switched on in the backend, the lookup function doesn't exist yet.
    const notReady = result.error.code === "unavailable";
    return notReady ? (
      <div className="rounded-3xl border border-ink/10 bg-surface p-8 text-center shadow-card">
        <h3 className="font-display text-3xl text-ink">Order history is on its way</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-body">
          We&apos;re switching on order tracking. Your order and its Stripe receipt are safe in the meantime. Questions?{" "}
          <a href={`mailto:${footer.contact.email}`} className="underline underline-offset-4">
            {footer.contact.email}
          </a>
          .
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        <FormError>{result.error.message}</FormError>
        <Button variant="secondary" onClick={() => setNonce((n) => n + 1)}>
          Try again
        </Button>
      </div>
    );
  }

  const orders = result.data;

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-ink/20 bg-surface/60 p-8 text-center sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent-deep">
          <Package size={26} />
        </span>
        <h3 className="mt-5 font-display text-3xl text-ink">No orders on this account</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-body">
          Orders placed while you&apos;re signed in show up here, and so do orders paid with the same email you use for
          Google or Apple sign-in. Bought as a guest with a different email? Send us your receipt and we&apos;ll attach
          the order to this account.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/shop"
            className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-on-accent hover:brightness-105"
          >
            Shop Mivo Spots
          </Link>
          <a
            href={`mailto:${footer.contact.email}?subject=${encodeURIComponent("Please attach my order to my account")}`}
            className="inline-flex h-11 items-center rounded-full border border-ink/15 bg-surface px-6 text-sm font-medium text-ink hover:bg-white"
          >
            Email us a receipt
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <OrderCard key={order.order_id} order={order} />
      ))}
    </div>
  );
}
