"use client";

import { useEffect, useState } from "react";
import { AccountError } from "@/lib/mivo-account";

export type Loaded<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error"; error: AccountError };

// Runs `load` on mount and again whenever `nonce` changes, keeping the last result on screen
// while a refresh is in flight. `load` must be a stable function (a module-level export).
export function useLoad<T>(load: () => Promise<T>, nonce: number): Loaded<T> {
  const [result, setResult] = useState<Loaded<T>>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    load()
      .then((data) => !cancelled && setResult({ status: "ready", data }))
      .catch((error) => {
        if (cancelled) return;
        setResult({
          status: "error",
          error: error instanceof AccountError ? error : new AccountError("Something went wrong. Please try again."),
        });
      });
    return () => {
      cancelled = true;
    };
  }, [load, nonce]);

  return result;
}
