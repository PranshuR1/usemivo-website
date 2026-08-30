import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of Use — Mivo" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        By downloading and using Mivo, you agree to use the app as intended: as a tool
        for personal awareness, not as a substitute for professional medical or mental
        health advice.
      </p>
      <p>
        The full terms of use are being finalized. If you need anything in writing
        sooner, reach out and we&apos;ll get it to you directly.
      </p>
    </LegalPage>
  );
}
