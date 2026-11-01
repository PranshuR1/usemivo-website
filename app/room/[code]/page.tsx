import type { Metadata } from "next";
import { RoomVisitor } from "@/components/room/room-visitor";

// A study room: the page a friend opens from the link. It looks the code up with the one call
// that works without an account, and shows only what the owner chose to share. The code is in the
// address, so the page is not indexed and sends no referrer.
export const metadata: Metadata = {
  title: "Study room — Mivo",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function RoomPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <RoomVisitor code={code} />;
}
