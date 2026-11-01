import { fetchMyStudy } from "@/lib/mivo-account";
import { flushQueue } from "@/lib/study-sync";

// One load for every panel that shows study history: first send up anything finished on this
// browser that is still waiting, then read what the account holds. Module-level so useLoad can
// rely on it being the same function every render.
export async function loadStudy() {
  await flushQueue();
  return fetchMyStudy();
}
