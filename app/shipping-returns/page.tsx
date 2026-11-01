import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Shipping & Returns — Mivo",
  description: "How Mivo Spots ship, what shipping costs, and how returns and refunds work.",
  alternates: { canonical: "/shipping-returns" },
};

const h2 = "pt-4 font-display text-2xl italic text-ink";

export default function ShippingReturnsPage() {
  return (
    <LegalPage title="Shipping & Returns">
      <p className="text-sm text-ink-muted">Applies to Mivo Spots orders. Updated October 26, 2026.</p>

      <h2 className={h2}>Where and how we ship</h2>
      <p>
        We ship to US addresses only for now. Orders go out from Georgia by USPS
        First-Class Mail, within 3 business days of your order. Delivery usually takes a
        few days after that.
      </p>
      <p>
        Spots travel as a letter, and USPS does not track letters, so there is no tracking
        number. If you want to know when yours is on its way, email us and we will tell you
        the day it was mailed.
      </p>

      <h2 className={h2}>What shipping costs</h2>
      <p>
        One Spot is $14.99 plus $2.99 shipping. The 3-pack is $34.99, the 5-pack $54.99 and the 10-pack $99.99, all with free shipping.
        Sales tax, where it is required, is added at checkout and shown before you pay.
      </p>

      <h2 className={h2}>If it does not arrive</h2>
      <p>
        If your order has not arrived 14 days after it was mailed, email us and we will send
        another one at no charge.
      </p>

      <h2 className={h2}>If a Spot does not work</h2>
      <p>
        If a Spot does not scan, arrives damaged, or is not what you ordered, email us within
        30 days of delivery. We will send a replacement or refund you in full, shipping
        included. You do not need to send the Spot back.
      </p>

      <h2 className={h2}>If you change your mind</h2>
      <p>
        You can return an order within 30 days of delivery for a refund of the price you paid
        for the Spots. Shipping is not refunded. Email us first so we can tell you whether to
        send it back. If we ask for it back, you cover the return postage.
      </p>

      <h2 className={h2}>Refunds</h2>
      <p>
        Refunds go back to the card you paid with. Your bank usually shows them within 5 to
        10 business days.
      </p>

      <h2 className={h2}>Mivo Plus</h2>
      <p>
        Mivo Plus is bought through Apple, so Apple handles its billing and refunds. You can
        request a refund at{" "}
        <a
          href="https://reportaproblem.apple.com"
          className="text-accent-deep underline underline-offset-4"
        >
          reportaproblem.apple.com
        </a>
        .
      </p>
    </LegalPage>
  );
}
