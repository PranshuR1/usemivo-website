import type { Metadata } from "next";
import { AccountPage } from "@/components/account/account-page";

// Sign in, create an account, and manage Mivo Spots and orders. Everything on the page depends on the
// signed-in person, so it is not indexed.
export const metadata: Metadata = {
  title: "Your account — Mivo",
  description: "Sign in to manage your Mivo Spots and orders.",
  robots: { index: false, follow: false },
};

export default function AccountRoute() {
  return <AccountPage />;
}
