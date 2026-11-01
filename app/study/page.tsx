import type { Metadata } from "next";
import { StudySession } from "@/components/study/study-session";

// The same timer page as /study/<spot id>, opened without a Spot: from the account page, or by hand.
export const metadata: Metadata = {
  title: "Study session",
  robots: { index: false, follow: false },
};

export default function StudyHomePage() {
  return <StudySession backHref="/account#study" backLabel="Back to your account" />;
}
