import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Support — Mivo" };

const h2 = "pt-4 font-display text-2xl italic text-ink";

export default function SupportPage() {
  return (
    <LegalPage title="Support">
      <p>
        Running into an issue, have feedback, or just want to say hi? We read every
        message ourselves.
      </p>
      <p>
        Email us and we&apos;ll get back to you as soon as we can — usually within a
        day or two.
      </p>

      <h2 className={h2}>Questions about a Spots order</h2>
      <p>
        Write from the email address you used at checkout and tell us what is wrong:
        a Spot that does not scan, an order that has not arrived, or an address to fix.
        Orders are mailed within 3 business days, and the details are on the
        Shipping &amp; Returns page.
      </p>

      <h2 className={h2}>Questions about Mivo Plus</h2>
      <p>
        Plus is billed by Apple. You can manage or cancel it in Settings &gt; Apple ID &gt;
        Subscriptions on your iPhone, and ask for a refund at reportaproblem.apple.com.
      </p>
    </LegalPage>
  );
}
