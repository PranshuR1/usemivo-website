import type { Metadata } from "next";
import { Suspense } from "react";
import { KeyholderPage } from "@/components/keyholder";

// Where a Mivo keyholder lands from an emailed link: https://usemivo.app/keyholder/?token=…
// The token is the only credential; the page never lists or searches anything.
export const metadata: Metadata = {
  title: "Mivo keyholder",
  robots: { index: false, follow: false },
};

export default function KeyholderRoute() {
  return (
    <Suspense fallback={null}>
      <KeyholderPage />
    </Suspense>
  );
}
