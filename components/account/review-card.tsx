"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FormError, FormNote, inputClass } from "@/components/account/field";
import { useLoad } from "@/components/account/use-load";
import {
  AccountError,
  deleteMyReview,
  fetchMyReview,
  getAccountState,
  getServerAccountState,
  submitReview,
  subscribeToAccount,
  type MySpotReview,
} from "@/lib/mivo-account";
import { cn } from "@/lib/utils";

const MAX_BODY = 1000;

// "Sam Rivera" → "Sam R." so a review doesn't show someone's full name unless they type it.
function suggestedName(name: string | null) {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  return parts.length === 1 ? parts[0] : `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

function StarPicker({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  return (
    <div role="radiogroup" aria-label="Your rating" className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} ${n === 1 ? "star" : "stars"}`}
          onClick={() => onChange(n)}
          className="rounded-lg p-1 text-accent-deep transition-transform hover:scale-110"
        >
          <Star size={28} className={n <= value ? "fill-current" : "opacity-30"} />
        </button>
      ))}
    </div>
  );
}

function ReviewForm({ initial, onSaved }: { initial: MySpotReview; onSaved: (next: MySpotReview | null) => void }) {
  const { session } = useSyncExternalStore(subscribeToAccount, getAccountState, getServerAccountState);
  const existing = initial.review;
  const [rating, setRating] = useState(existing?.rating ?? 0);
  const [body, setBody] = useState(existing?.body ?? "");
  const [name, setName] = useState(existing?.display_name ?? suggestedName(session?.user.name ?? null));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (rating < 1) return setError("Pick 1 to 5 stars.");
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      onSaved(await submitReview(rating, body, name));
      setSaved(true);
    } catch (caught) {
      setError(caught instanceof AccountError ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    setBusy(true);
    setError(null);
    try {
      await deleteMyReview();
      onSaved(null);
    } catch (caught) {
      setError(caught instanceof AccountError ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="mt-5 space-y-5">
      <StarPicker value={rating} onChange={setRating} />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">What was it like? (optional)</span>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value.slice(0, MAX_BODY))}
          rows={4}
          placeholder="Where you put your Spot, and what changed."
          className={cn(inputClass, "h-auto py-3 leading-relaxed")}
        />
        <span className="mt-1 block text-right text-xs text-ink-muted">
          {body.length}/{MAX_BODY}
        </span>
      </label>
      <Field
        label="Name shown with your review"
        value={name}
        maxLength={40}
        required
        onChange={(event) => setName(event.target.value)}
      />
      {error && <FormError>{error}</FormError>}
      {saved && (
        <FormNote>
          Thanks! Your review is on the <Link href="/shop#reviews" className="underline underline-offset-4">shop page</Link>.
          It can take a few minutes to appear.
        </FormNote>
      )}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" busy={busy}>
          {existing ? "Update review" : "Post review"}
        </Button>
        {existing && (
          <Button type="button" variant="ghost" disabled={busy} onClick={remove}>
            Delete review
          </Button>
        )}
      </div>
    </form>
  );
}

// Shown above the order list once an order has been mailed. Hidden for everyone else, and while
// the reviews backend isn't switched on.
export function ReviewCard() {
  const result = useLoad(fetchMyReview, 0);
  const [override, setOverride] = useState<MySpotReview | null>(null);

  if (result.status !== "ready") return null;
  const current = override ?? result.data;
  if (!current.eligible) return null;
  const hidden = current.review?.status === "hidden";

  return (
    <article className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
      <h3 className="text-xl font-semibold text-ink">{current.review ? "Your review" : "How are your Spots?"}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-body">
        {hidden
          ? "We've taken this review off the shop page. Email us if you think that's a mistake."
          : "Your rating and name appear on the shop page. One review per account; you can change or delete it any time."}
      </p>
      <ReviewForm
        key={current.review?.updated_at ?? "new"}
        initial={current}
        onSaved={(next) => setOverride(next ?? { eligible: true, review: null })}
      />
    </article>
  );
}
