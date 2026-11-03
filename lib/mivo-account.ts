// The website's side of a Mivo account: the same Supabase project the app signs in to.
// It uses plain fetch against Supabase's auth and RPC endpoints, so the site needs no extra
// dependency. The anon key is the project's public client key (the same one shipped in the
// iPhone app); every call that matters is checked by the signed-in user's own token on the server.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_MIVO_API_URL ?? "https://pgmbqxcshgvznxdbpyre.supabase.co";
export const ANON_KEY =
  process.env.NEXT_PUBLIC_MIVO_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnbWJxeGNzaGd2em54ZGJweXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTM5NDMsImV4cCI6MjA5NTYyOTk0M30.-Q1t6Ao6xDyuxWkdgofn0br2l0WjVVj9YqIOeH3aLT8";

const STORAGE_KEY = "mivo.web.session";
const REFRESH_MARGIN_SECONDS = 60;

export type Provider = "google" | "apple";

export type Session = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // seconds since the epoch
  user: { id: string; email: string; name: string | null; provider: string };
};

export type AccountState = {
  ready: boolean;
  session: Session | null;
  recovery: boolean; // arrived from a password-reset email
  notice: string | null; // a message from an OAuth redirect (for example a failed sign-in)
};

export class AccountError extends Error {
  constructor(
    message: string,
    readonly code: "invalid" | "exists" | "rate" | "auth" | "network" | "unavailable" | "server" = "server"
  ) {
    super(message);
  }
}

// --- session store (read with useSyncExternalStore) -------------------------------------------

const serverState: AccountState = { ready: false, session: null, recovery: false, notice: null };
let state: AccountState = serverState;
let started = false;
const listeners = new Set<() => void>();

function emit(next: AccountState) {
  state = next;
  listeners.forEach((listener) => listener());
}

export function getAccountState() {
  return state;
}

export function getServerAccountState() {
  return serverState;
}

export function subscribeToAccount(listener: () => void) {
  listeners.add(listener);
  if (!started) {
    started = true;
    void start();
  }
  return () => {
    listeners.delete(listener);
  };
}

function readStored(): Session | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function writeStored(session: Session | null) {
  try {
    if (session) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Private mode or blocked storage: the session simply lasts until the tab closes.
  }
}

function setSession(session: Session | null, extra: Partial<AccountState> = {}) {
  writeStored(session);
  emit({ ready: true, session, recovery: false, notice: null, ...extra });
}

async function start() {
  const fromRedirect = await readRedirect();
  if (fromRedirect) return;

  const stored = readStored();
  if (!stored) return emit({ ...serverState, ready: true });

  try {
    const fresh = await ensureFresh(stored);
    setSession(fresh);
  } catch (error) {
    // A network blip keeps the saved session; a rejected refresh token means signed out.
    if (error instanceof AccountError && error.code === "network") emit({ ...serverState, ready: true, session: stored });
    else setSession(null);
  }
}

// Supabase sends people back from Google, Apple and password-reset emails with the session in
// the URL fragment. Read it once, then clear it so it never sits in the address bar or history.
async function readRedirect(): Promise<boolean> {
  const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
  const query = new URLSearchParams(window.location.search);
  const params = new URLSearchParams(hash);
  const failure = params.get("error_description") ?? query.get("error_description");

  if (!params.get("access_token") && !failure) return false;

  // If Supabase sent the person back to another page of the site (its redirect list decides), carry
  // the same fragment on to /account, which finishes the sign-in.
  if (window.location.pathname !== "/account") {
    window.location.replace(`/account${window.location.hash}`);
    return true;
  }
  window.history.replaceState(null, "", window.location.pathname);

  if (failure) {
    setSession(null, { notice: failure.replace(/\+/g, " ") });
    return true;
  }

  try {
    const accessToken = params.get("access_token")!;
    const user = await fetchUser(accessToken);
    const expiresIn = Number(params.get("expires_in") ?? 3600);
    setSession(
      {
        accessToken,
        refreshToken: params.get("refresh_token") ?? "",
        expiresAt: Math.floor(Date.now() / 1000) + expiresIn,
        user,
      },
      { recovery: params.get("type") === "recovery" }
    );
  } catch {
    setSession(null, { notice: "We couldn't finish signing you in. Please try again." });
  }
  return true;
}

// --- Supabase calls ----------------------------------------------------------------------------

type GoTrueUser = {
  id: string;
  email?: string;
  app_metadata?: { provider?: string };
  user_metadata?: { name?: string; full_name?: string };
};

function toUser(raw: GoTrueUser): Session["user"] {
  return {
    id: raw.id,
    email: raw.email ?? "",
    name: raw.user_metadata?.name ?? raw.user_metadata?.full_name ?? null,
    provider: raw.app_metadata?.provider ?? "email",
  };
}

async function call(path: string, init: RequestInit & { token?: string } = {}) {
  const { token, ...rest } = init;
  let response: Response;
  try {
    response = await fetch(`${SUPABASE_URL}${path}`, {
      ...rest,
      headers: {
        apikey: ANON_KEY,
        "content-type": "application/json",
        authorization: `Bearer ${token ?? ANON_KEY}`,
        ...(rest.headers ?? {}),
      },
    });
  } catch {
    throw new AccountError("We couldn't reach Mivo. Check your connection and try again.", "network");
  }
  const text = await response.text();
  const body = text ? safeJson(text) : null;
  if (!response.ok) throw toError(response.status, body);
  return body;
}

function safeJson(text: string) {
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function toError(status: number, body: Record<string, unknown> | null) {
  const raw = String(body?.error_description ?? body?.msg ?? body?.message ?? body?.error ?? "");
  const lower = raw.toLowerCase();
  if (lower.includes("invalid login") || lower.includes("invalid_credentials")) {
    return new AccountError("That email and password don't match. If you signed up with Google or Apple, use that button.", "invalid");
  }
  if (lower.includes("already registered") || lower.includes("already been registered") || lower.includes("user_already_exists")) {
    return new AccountError("There's already a Mivo account with that email. Sign in instead.", "exists");
  }
  if (lower.includes("password") && lower.includes("characters")) {
    return new AccountError("Use a password with at least 6 characters.", "invalid");
  }
  if (status === 429 || lower.includes("rate limit") || lower.includes("rate_limited")) {
    return new AccountError("Too many tries. Wait a minute and try again.", "rate");
  }
  // Part of the backend that hasn't been switched on yet (its function doesn't exist).
  if (lower.includes("could not find the function") || lower.includes("schema cache")) {
    return new AccountError("This part of your account is still being switched on. Please check back soon.", "unavailable");
  }
  if (lower.includes("room_full")) return new AccountError("This room is full right now. Try again in a minute.", "invalid");
  if (lower === "removed") return new AccountError("You were removed from this room.", "invalid");
  if (lower.includes("name_required")) return new AccountError("Enter a first name.", "invalid");
  if (lower.includes("not_eligible")) {
    return new AccountError("Reviews open once one of your Spot orders has been mailed.", "invalid");
  }
  if (lower.includes("invalid_rating")) return new AccountError("Pick 1 to 5 stars.", "invalid");
  if (lower.includes("invalid_name")) return new AccountError("Enter a name of up to 40 characters.", "invalid");
  if (lower.includes("invalid_body")) return new AccountError("Keep your review under 1,000 characters.", "invalid");
  if (lower.includes("session_limit_reached")) return new AccountError("Your account has reached its session limit.", "invalid");
  if (status === 401 || lower.includes("jwt") || lower.includes("authentication_required")) {
    return new AccountError("Your session ended. Please sign in again.", "auth");
  }
  return new AccountError(raw || "Something went wrong. Please try again.", "server");
}

async function fetchUser(accessToken: string) {
  return toUser((await call("/auth/v1/user", { token: accessToken })) as GoTrueUser);
}

function toSession(body: Record<string, unknown>): Session {
  const expiresIn = Number(body.expires_in ?? 3600);
  return {
    accessToken: String(body.access_token),
    refreshToken: String(body.refresh_token ?? ""),
    expiresAt: Number(body.expires_at ?? Math.floor(Date.now() / 1000) + expiresIn),
    user: toUser(body.user as GoTrueUser),
  };
}

async function ensureFresh(session: Session) {
  if (session.expiresAt - REFRESH_MARGIN_SECONDS > Math.floor(Date.now() / 1000)) return session;
  if (!session.refreshToken) throw new AccountError("Your session ended. Please sign in again.", "auth");
  const body = await call("/auth/v1/token?grant_type=refresh_token", {
    method: "POST",
    body: JSON.stringify({ refresh_token: session.refreshToken }),
  });
  return toSession(body as Record<string, unknown>);
}

export async function signInWithPassword(email: string, password: string) {
  const body = await call("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email: email.trim(), password }),
  });
  setSession(toSession(body as Record<string, unknown>));
}

// Returns "signed-in", or "check-email" when the project asks new accounts to confirm first.
export async function createAccount(name: string, email: string, password: string) {
  const body = (await call("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify({ email: email.trim(), password, data: { name: name.trim() } }),
  })) as Record<string, unknown>;
  if (body.access_token) {
    setSession(toSession(body));
    return "signed-in" as const;
  }
  return "check-email" as const;
}

export async function requestPasswordReset(email: string) {
  const redirect = encodeURIComponent(`${window.location.origin}/account`);
  await call(`/auth/v1/recover?redirect_to=${redirect}`, {
    method: "POST",
    body: JSON.stringify({ email: email.trim() }),
  });
}

export async function updatePassword(password: string) {
  const token = await accessToken();
  await call("/auth/v1/user", { method: "PUT", token, body: JSON.stringify({ password }) });
  emit({ ...state, recovery: false });
}

export function oauthUrl(provider: Provider) {
  const redirect = encodeURIComponent(`${window.location.origin}/account`);
  return `${SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${redirect}`;
}

export async function signOut() {
  const current = state.session;
  setSession(null);
  if (!current) return;
  try {
    await call("/auth/v1/logout", { method: "POST", token: current.accessToken });
  } catch {
    // The local session is already gone; a failed server logout only leaves a token to expire.
  }
}

async function accessToken() {
  const current = state.session;
  if (!current) throw new AccountError("Please sign in.", "auth");
  const fresh = await ensureFresh(current);
  if (fresh !== current) setSession(fresh, { recovery: state.recovery });
  return fresh.accessToken;
}

async function rpc<T>(name: string, args: Record<string, unknown> = {}): Promise<T> {
  const token = await accessToken();
  return (await call(`/rest/v1/rpc/${name}`, { method: "POST", token, body: JSON.stringify(args) })) as T;
}

// --- Spots and orders --------------------------------------------------------------------------

export type MySpot = {
  spot_id: string;
  status: "claimed" | "disabled" | "unclaimed";
  claimed_at: string | null;
};

export type SpotOrder = {
  order_id: string;
  item: "single" | "pack" | "other";
  spots: number;
  amount_subtotal: number;
  amount_shipping: number;
  amount_total: number;
  currency: string;
  status: "paid" | "mailed" | "delivered" | "refunded" | "cancelled";
  mailed_at: string | null;
  tracking_url: string | null;
  ship_name: string | null;
  ship_address: string | null;
  created_at: string;
};

export const fetchMySpots = () => rpc<MySpot[]>("my_physical_spots");

export const releaseSpot = (spotId: string) => rpc<null>("release_physical_spot", { input_spot_id: spotId });

export const fetchMyOrders = () => rpc<SpotOrder[]>("my_spot_orders");

// Only buyers whose order has been mailed can review. One review per account; saving again replaces it.
export type MySpotReview = {
  eligible: boolean;
  review: {
    rating: number;
    body: string;
    display_name: string;
    status: "published" | "hidden";
    updated_at: string;
  } | null;
};

export const fetchMyReview = () => rpc<MySpotReview>("my_spot_review");

export const submitReview = (rating: number, body: string, displayName: string) =>
  rpc<MySpotReview>("submit_spot_review", { input_rating: rating, input_body: body, input_display_name: displayName });

export const deleteMyReview = () => rpc<boolean>("delete_my_spot_review");

// What the registry says an ID is to the signed-in person asking. It never says who owns a Spot
// someone else has claimed. Failed lookups are throttled per account on the server.
export type SpotState = { state: "unclaimed" | "yours" | "taken" | "disabled" | "invalid"; claimed_at?: string | null };

export const resolveSpot = (spotId: string) => rpc<SpotState>("resolve_physical_spot", { input_spot_id: spotId });

// --- Study sessions and rooms --------------------------------------------------------------------

// A finished session. "ios" ones were filmed on the phone (recorded_seconds is the video); "web"
// ones are timer time from usemivo.app/study and carry no video and no scroll time; "desktop" ones
// ran on a computer (Mivo for Mac) and count only focused_seconds, the time spent on the task.
export type StudySession = {
  id: string;
  task: string;
  started_at: string;
  ended_at: string;
  recorded_seconds: number;
  scroll_seconds_earned: number;
  source: "ios" | "web" | "desktop";
  focused_seconds?: number | null;
};

// What the website sends: it can't claim video or scroll time, so those fields aren't here.
export type NewStudySession = Pick<StudySession, "id" | "task" | "started_at" | "ended_at">;

export type RoomSitter = { id: string; name: string };

export type StudyRoom =
  | { has_room: false }
  | {
      has_room: true;
      code: string;
      display_name: string;
      is_open: boolean;
      show_task: boolean;
      studying: boolean;
      task: string | null;
      started_at: string | null;
      sitting: RoomSitter[];
    };

// What a visitor with the link sees. A closed room and a wrong code answer the same way.
export type RoomView =
  | { found: false }
  | {
      found: true;
      now: string; // the server's clock, so the timer is right even if the visitor's clock is off
      name: string;
      studying: boolean;
      task: string | null;
      started_at: string | null;
      sitting: string[];
    };

async function publicRpc<T>(name: string, args: Record<string, unknown>): Promise<T> {
  return (await call(`/rest/v1/rpc/${name}`, { method: "POST", body: JSON.stringify(args) })) as T;
}

export const fetchMyStudy = () => rpc<StudySession[]>("my_study_sessions");

export const saveStudySessions = (sessions: NewStudySession[]) =>
  rpc<{ accepted: number; rejected: number }>("sync_study_sessions", {
    input_sessions: sessions.map((session) => ({ ...session, source: "web" })),
  });

export const deleteWebSession = (id: string) => rpc<boolean>("delete_study_session", { input_id: id });

export const deleteStudyHistory = () => rpc<number>("delete_my_study_history");

export const fetchMyRoom = () => rpc<StudyRoom>("my_study_room");

export const ensureRoom = () => rpc<StudyRoom>("ensure_study_room");

export const updateRoom = (changes: { display_name?: string; is_open?: boolean; show_task?: boolean }) =>
  rpc<StudyRoom>("update_study_room", {
    input_display_name: changes.display_name ?? null,
    input_is_open: changes.is_open ?? null,
    input_show_task: changes.show_task ?? null,
  });

export const rotateRoomCode = () => rpc<StudyRoom>("rotate_study_room_code");

export const removeSitter = (id: string) => rpc<StudyRoom>("remove_study_room_visitor", { input_visitor_id: id });

export const pingRoom = (task: string, startedAt: number) =>
  rpc<StudyRoom>("study_room_ping", { input_task: task, input_started_at: new Date(startedAt).toISOString() });

export const endRoomSession = () => rpc<StudyRoom>("study_room_end");

// These two work without an account: the code in the link is the only thing they need.
export const viewRoom = (code: string) => publicRpc<RoomView>("study_room_view", { input_code: code });

export const sitInRoom = (code: string, visitorId: string, name: string) =>
  publicRpc<RoomView>("study_room_sit", { input_code: code, input_visitor_id: visitorId, input_name: name });
