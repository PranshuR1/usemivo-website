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
      <h2 className="pt-4 font-display text-2xl italic text-ink">
        Signing in with Google or Apple
      </h2>
      <p>
        If you choose to sign in with Google or Apple, we receive your name, email
        address and a unique account identifier from them. We use these only to create
        your Mivo account and sign you in. We don&apos;t ask for access to your
        contacts, files, calendar or any other Google or Apple data, and we never sell
        this information or use it for advertising.
      </p>
      <p>
        Mivo&apos;s use of information received from Google APIs adheres to the{" "}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          className="text-accent-deep underline underline-offset-4"
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>
    </LegalPage>
  );
}
