import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of Use — Mivo" };

const h2 = "pt-4 font-display text-2xl italic text-ink";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p className="text-sm text-ink-muted">Updated November 3, 2026.</p>
      <p>
        By downloading and using Mivo, you agree to use the app as intended: as a tool
        for personal awareness, not as a substitute for professional medical or mental
        health advice.
      </p>

      <h2 className={h2}>Mivo Plus</h2>
      <p>
        Mivo Plus is bought inside the app with your Apple ID, as a monthly or yearly
        subscription or as a one-time Lifetime purchase. The price is shown in the app
        before you confirm. Subscriptions renew automatically unless you cancel at least
        24 hours before the period ends, and you can manage or cancel them in Settings &gt;
        Apple ID &gt; Subscriptions. The yearly plan may start with a free trial; if you
        cancel before it ends you are not charged. Apple handles billing and refunds for
        Plus.
      </p>

      <h2 className={h2}>Using Mivo safely</h2>
      <p>
        Do not use Mivo while driving. Mivo adds friction and awareness to your phone
        use. It does not lock you out of your phone, and it is not an emergency or safety
        system.
      </p>

      <h2 className={h2}>Changes and questions</h2>
      <p>
        We may update these terms as Mivo grows, and we will change the date above when we
        do. If you need anything in writing, reach out and we will get it to you directly.
      </p>
    </LegalPage>
  );
}
