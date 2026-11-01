// Sessions finished on this browser while signed in are saved to the account. If the save can't
// happen right then (offline, or the account service is still being switched on), the session waits
// here, on this device, and goes up the next time the page loads signed in. Saving is idempotent on
// the session id, so a retry never doubles a session.

import { getAccountState, saveStudySessions, type NewStudySession } from "./mivo-account";

const QUEUE_KEY = "mivo.study.pending";
const MAX_QUEUED = 200;
const CHUNK = 50;

export type PendingSession = NewStudySession & { userId: string };

export function parseQueue(raw: unknown): PendingSession[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (item): item is PendingSession =>
      typeof item === "object" &&
      item !== null &&
      typeof item.id === "string" &&
      typeof item.userId === "string" &&
      typeof item.task === "string" &&
      typeof item.started_at === "string" &&
      typeof item.ended_at === "string"
  );
}

function readQueue(): PendingSession[] {
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    return raw ? parseQueue(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: PendingSession[]) {
  try {
    if (queue.length) window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-MAX_QUEUED)));
    else window.localStorage.removeItem(QUEUE_KEY);
  } catch {
    // Storage blocked or full: the session is only saved if the next attempt works.
  }
}

/** Remembers a finished session so it can be saved, now or later. */
export function queueSession(userId: string, session: NewStudySession) {
  const queue = readQueue().filter((item) => item.id !== session.id);
  writeQueue([...queue, { ...session, userId }]);
}

/**
 * Tries to save every waiting session that belongs to the signed-in person. Resolves with how many
 * were saved; leaves the rest queued when the save fails.
 */
export async function flushQueue(): Promise<number> {
  const user = getAccountState().session?.user;
  if (!user) return 0;
  const mine = readQueue().filter((item) => item.userId === user.id);
  let saved = 0;
  for (let index = 0; index < mine.length; index += CHUNK) {
    const chunk = mine.slice(index, index + CHUNK);
    try {
      await saveStudySessions(chunk.map(({ id, task, started_at, ended_at }) => ({ id, task, started_at, ended_at })));
    } catch {
      break;
    }
    const done = new Set(chunk.map((item) => item.id));
    writeQueue(readQueue().filter((item) => !done.has(item.id)));
    saved += chunk.length;
  }
  return saved;
}

/** Sessions still waiting for the signed-in person. */
export function pendingCount(): number {
  const user = getAccountState().session?.user;
  return user ? readQueue().filter((item) => item.userId === user.id).length : 0;
}
