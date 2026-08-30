import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy — Mivo" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        Mivo is built around a simple rule: your usage data belongs to you. We collect
        only what&apos;s needed to show you honest screen-time insights, and we never
        sell your data.
      </p>
      <p>
        The full, detailed privacy policy for Mivo is being finalized. In the meantime,
        you can review what Mivo stores and manage your data directly from the
        in-app Privacy Center, including data export and account deletion.
      </p>
    </LegalPage>
  );
}
