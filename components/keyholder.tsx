"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// The page a Mivo keyholder lands on from an email. No account: the token in the link
// is the only credential, and the server only ever shows what that one link is for.
//
//   kind "invite":  someone asked this person to be their keyholder.
//   kind "request": the person says they finished and wants their apps unlocked.

const API = `${process.env.NEXT_PUBLIC_MIVO_API_URL ?? "https://pgmbqxcshgvznxdbpyre.supabase.co"}/functions/v1/lockin-keyholder`;

type InviteView = {
  kind: "invite";
  owner_name: string;
  keyholder_name: string;
  status: "waiting" | "agreed";
};

type RequestView = {
  kind: "request";
  owner_name: string;
  keyholder_name: string;
  task: string;
  summary: string;
  ends_at: string;
  note: string | null;
  status: "pending" | "approved" | "declined" | "expired";
};

type View = InviteView | RequestView;

type Load =
  | { state: "loading" }
  | { state: "gone" }
  | { state: "error" }
  | { state: "ready"; view: View };

export function KeyholderPage() {
  const token = useSearchParams().get("token") ?? "";
  const [load, setLoad] = useState<Load>({ state: token ? "loading" : "gone" });

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetch(`${API}?token=${encodeURIComponent(token)}`)
      .then(async (response) => {
        if (cancelled) return;
        if (response.status === 410 || response.status === 400) return setLoad({ state: "gone" });
        if (!response.ok) return setLoad({ state: "error" });
        setLoad({ state: "ready", view: (await response.json()) as View });
      })
      .catch(() => !cancelled && setLoad({ state: "error" }));
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <section className="w-full max-w-md">
        <div className="mx-auto mb-5 grid h-[72px] w-[72px] place-items-center rounded-lg bg-surface font-sans text-2xl font-extrabold text-accent-deep">
          mivo
        </div>
        {load.state === "loading" && <Message title="One moment" body="Opening your link." />}
        {load.state === "gone" && (
          <Message
            title="This link isn't active"
            body="It may have expired, already been used, or been taken back. If you were expecting to help someone, ask them to send a new one."
          />
        )}
        {load.state === "error" && (
          <Message
            title="Couldn't load this"
            body="Check your connection and reload the page. Nothing has been approved or declined."
          />
        )}
        {load.state === "ready" && load.view.kind === "invite" && (
          <Invite token={token} view={load.view} />
        )}
        {load.state === "ready" && load.view.kind === "request" && (
          <Request token={token} view={load.view} />
        )}
      </section>
    </main>
  );
}

function Message({ title, body }: { title: string; body: string }) {
  return (
    <div className="text-center">
      <h1 className="font-display text-4xl italic text-ink">{title}</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-body">{body}</p>
    </div>
  );
}

async function send(token: string, decision: string, note?: string): Promise<string | null> {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, decision, note }),
    });
    if (!response.ok) return null;
    return ((await response.json()) as { status: string }).status;
  } catch {
    return null;
  }
}

function Invite({ token, view }: { token: string; view: InviteView }) {
  const [status, setStatus] = useState(view.status);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const who = view.owner_name || "A friend";

  if (status === "agreed") {
    return (
      <Message
        title="You're their keyholder"
        body={`Thank you. When ${who} says they've finished, you'll get an email with what they did and a button to approve or decline. You don't need to do anything until then.`}
      />
    );
  }

  return (
    <div className="text-center">
      <h1 className="font-display text-4xl italic text-ink">Be {who}&apos;s keyholder?</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-body">
        {who} is using Mivo to stay off their phone while they get something done. A keyholder is
        the friend who decides whether their apps unlock. No app or account needed.
      </p>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
        You&apos;ll only hear from Mivo when they ask. You&apos;ll see the task and one sentence
        about what they showed, never their photos or apps.
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setFailed(false);
          const result = await send(token, "accept");
          setBusy(false);
          if (result === "agreed") setStatus("agreed");
          else setFailed(true);
        }}
        className="mt-6 block w-full rounded-lg bg-accent px-4 py-4 text-[15px] font-bold text-on-accent disabled:opacity-60"
      >
        {busy ? "One moment…" : "Yes, I'll be their keyholder"}
      </button>
      {failed && (
        <p className="mt-3 text-[14px] text-ink-body">That didn&apos;t go through. Try again.</p>
      )}
    </div>
  );
}

function Request({ token, view }: { token: string; view: RequestView }) {
  const [status, setStatus] = useState(view.status);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<"approve" | "decline" | null>(null);
  const [failed, setFailed] = useState(false);
  const who = view.owner_name || "Your friend";

  if (status === "approved") {
    return <Message title="Approved" body={`${who}'s apps are unlocking now. Thank you.`} />;
  }
  if (status === "declined") {
    return (
      <Message
        title="Declined"
        body={`${who} will see that, and can keep going and ask again.`}
      />
    );
  }
  if (status === "expired") {
    return (
      <Message
        title="This one has ended"
        body={`${who}'s lock has run out, so their apps are open already. Nothing to do.`}
      />
    );
  }

  async function decide(decision: "approve" | "decline") {
    setBusy(decision);
    setFailed(false);
    const result = await send(token, decision, note.trim() || undefined);
    setBusy(null);
    if (result === "approved" || result === "declined" || result === "expired") setStatus(result);
    else setFailed(true);
  }

  return (
    <div>
      <h1 className="text-center font-display text-4xl italic text-ink">{who} says they&apos;re done</h1>
      <div className="mt-6 rounded-lg bg-surface p-4">
        <p className="text-[12px] font-bold uppercase tracking-widest text-ink-muted">They set out to</p>
        <p className="mt-1 text-[17px] font-semibold text-ink">{view.task}</p>
        <p className="mt-4 text-[12px] font-bold uppercase tracking-widest text-ink-muted">
          What Milo saw
        </p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink-body">{view.summary}</p>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
        Milo is the Mivo companion who looks at their work first. You have the last word. If you
        approve, their apps open right away.
      </p>
      <label className="mt-5 block text-[13px] font-semibold text-ink" htmlFor="note">
        A note for them (optional)
      </label>
      <textarea
        id="note"
        value={note}
        onChange={(event) => setNote(event.target.value.slice(0, 200))}
        rows={2}
        placeholder="e.g. Send me a photo of the page first"
        className="mt-2 w-full rounded-lg bg-surface p-3 text-[15px] text-ink placeholder:text-ink-muted"
      />
      <button
        type="button"
        disabled={busy !== null}
        onClick={() => decide("approve")}
        className="mt-4 block w-full rounded-lg bg-accent px-4 py-4 text-[15px] font-bold text-on-accent disabled:opacity-60"
      >
        {busy === "approve" ? "One moment…" : "Approve — unlock their apps"}
      </button>
      <button
        type="button"
        disabled={busy !== null}
        onClick={() => decide("decline")}
        className="mt-3 block w-full rounded-lg bg-surface px-4 py-4 text-[15px] font-bold text-ink disabled:opacity-60"
      >
        {busy === "decline" ? "One moment…" : "Not yet"}
      </button>
      {failed && (
        <p className="mt-3 text-center text-[14px] text-ink-body">
          That didn&apos;t go through. Nothing was changed. Try again.
        </p>
      )}
    </div>
  );
}
