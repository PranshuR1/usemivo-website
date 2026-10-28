"use client";

import { useSyncExternalStore } from "react";
import { getAccountState, getServerAccountState, subscribeToAccount } from "@/lib/mivo-account";

// Mounted once in the root layout. Subscribing starts the account store on every page, so a
// sign-in redirect (Google, Apple or a password-reset email) that lands anywhere on the site
// is picked up and forwarded to /account.
export function AccountBootstrap() {
  useSyncExternalStore(subscribeToAccount, getAccountState, getServerAccountState);
  return null;
}
