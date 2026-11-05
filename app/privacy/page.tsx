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
      <h2 className="pt-4 font-display text-2xl italic text-ink">
        Mac activity and optional backup
      </h2>
      <p>
        Mivo for Mac stores detailed activity on your Mac. Detailed activity backup is
        off by default, including for existing installations. If you explicitly enable
        it in Mac Settings, new app names, window titles, captured website addresses,
        timestamps, focus sessions and recall notes are backed up to your account.
        Activity from before your consent is excluded. Turning backup off stops future
        uploads; data already backed up remains in your account. This choice is saved
        separately for each account on each Mac. Study sync is separate and excludes
        window titles and website addresses.
      </p>
      <h2 className="pt-4 font-display text-2xl italic text-ink">
        Studying and study rooms
      </h2>
      <p>
        When you finish a study session in the Mivo app or on usemivo.app while signed in,
        we save the task you named, when it started and ended, and how many seconds of it
        were on video. The video itself stays on your phone and is never uploaded. This is
        how the app and your account page show the same streak. You can delete your saved
        study history at any time from your account page, and deleting your account removes
        it.
      </p>
      <p>
        A study room is an optional link you can open and close. While it is open and you
        are in a session, anyone who has the link can see your first name, the task if you
        choose to show it, and how long you have been studying. They never see video, your
        email or your account. A visitor who chooses to sit with you gives a first name,
        which we keep only while they are on the page and for at most a day. You can remove
        a visitor, close the room or change its link whenever you like.
      </p>
      <p>
        Mivo Plus purchases are handled by Apple. We learn only whether your account has
        Plus, not your payment details.
      </p>
    </LegalPage>
  );
}
