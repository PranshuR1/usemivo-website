import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Support — Mivo" };

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
    </LegalPage>
  );
}
