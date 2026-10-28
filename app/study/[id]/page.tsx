import type { Metadata } from "next";
import { StudySession } from "@/components/study/study-session";

// A plain timer page for a Mivo Spot, reached from the Spot fallback page. It does
// not look the ID up; the ID is only used for the link back. Nothing leaves the device.
export const metadata: Metadata = {
  title: "Study session",
  robots: { index: false, follow: false },
};

export default async function StudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StudySession backHref={`/s/${encodeURIComponent(id)}`} />;
}
