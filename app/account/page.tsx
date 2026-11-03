import type { Metadata } from "next";
import { AccountPage } from "@/components/account/account-page";

// Sign in, create an account, and see study history and the study room. Everything on the page depends on the
// signed-in person, so it is not indexed.
export const metadata: Metadata = {
  title: "Your account — Mivo",
  description: "Sign in to see your study history, streak and study room.",
  robots: { index: false, follow: false },
};

export default function AccountRoute() {
  return <AccountPage />;
}
