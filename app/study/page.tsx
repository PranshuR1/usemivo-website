import type { Metadata } from "next";
import { StudySession } from "@/components/study/study-session";

// The study timer page, opened from the account page, the home page or by hand.
export const metadata: Metadata = {
  title: "Study session",
  robots: { index: false, follow: false },
};

export default function StudyHomePage() {
  return <StudySession backHref="/account#study" backLabel="Back to your account" />;
}
