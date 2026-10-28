// What the Spot page (usemivo.app/s/<ID>) tells people. It follows the Mivo app's own behaviour
// (Mivo/Spots/README.md in the app repo) and the website's Spot copy in data/content.ts. If the
// app changes how a Spot works, change it here.

export const setupSteps = [
  {
    title: "Get the latest Mivo",
    body: "Spots need an iPhone XS or newer and the Mivo app update that adds them. If Mivo on your phone doesn't recognise this Spot yet, update it from the App Store, then tap the Spot again.",
  },
  {
    title: "Tap the Spot with your iPhone",
    body: "Hold the top of your iPhone against the Spot with the screen on. Mivo opens on its own, or shows a banner to tap. Nothing is connected to your account yet.",
  },
  {
    title: "Sign in to Mivo",
    body: "Sign in or create your account. The Spot only connects to your account when you finish the last setup step, never earlier. Leave halfway and it stays unclaimed.",
  },
  {
    title: "Name it and choose what it does",
    body: "Give the place a name, pick the apps it should quiet and choose a mode. Done: from now on one tap starts the Spot and a second tap ends it.",
  },
] as const;

export const modes = [
  {
    name: "Pause Mode",
    body: "Mivo's breathing pause appears before the Spot's apps open, so opening one becomes a choice.",
    fits: "Good for a bedside or the couch.",
  },
  {
    name: "Focus Mode",
    body: "The Spot's apps are shielded for the whole timer. The shield shows how long is left and points back to Mivo, where you can end the Spot.",
    fits: "Good for a desk or a study spot.",
  },
  {
    name: "Intention Check",
    body: "The Spot's apps stay shielded until you answer one question: what did you come here to do? Answering lifts the shield for the rest of the Spot.",
    fits: "Good for places where you reach for your phone on autopilot.",
  },
  {
    name: "Awareness Mode",
    body: "Nothing is blocked. Mivo records the time and shows a plain summary afterwards.",
    fits: "Good when you just want to see what happens.",
  },
] as const;

export const tapOutcomes = [
  {
    when: "A new Spot",
    result: "Mivo walks you through setup. The Spot is yours once you confirm the last step.",
  },
  {
    when: "A Spot already set up on this phone",
    result: "It starts straight away, with no setup and no picker. Tap again, at least 4 seconds later, to end it.",
  },
  {
    when: "A Spot already connected to your account, on a new phone",
    result: "Mivo sets it up again on this phone. You don't claim it twice.",
  },
  {
    when: "A Spot connected to someone else",
    result: "“This Mivo Spot is already connected to another account.” Mivo never shows whose.",
  },
  {
    when: "A Spot Mivo switched off",
    result: "“This Mivo Spot is switched off.” Mivo does this if a Spot is reported lost or there's a problem with it.",
  },
  {
    when: "A link Mivo doesn't know",
    result: "“We couldn't find this Mivo Spot.” Check you tapped the tag itself, and email us if you did.",
  },
] as const;

// The same four steps the Mivo app shows after a Spot's first setup.
export const bannerSteps = [
  "Open Shortcuts, tap Automation, then +, and choose NFC.",
  "Tap Scan and hold your Mivo Spot to the top of your iPhone. Give it a name.",
  "Add the action “Tap a Mivo Spot” and choose your Spot.",
  "Choose Run Immediately (turn off Ask Before Running), then tap Done.",
] as const;

export const goodToKnow = [
  "A Spot adds awareness and a little friction. It never locks you out of your phone.",
  "One Spot runs at a time. Starting another ends the first.",
  "A Spot with no timer ends itself after 12 hours, so a forgotten Spot can't keep your apps shielded.",
  "A tap read twice within 4 seconds counts once, so one tap can't start and then end a Spot.",
  "Everyday taps work offline once a Spot is set up on your phone. First setup, claiming and disconnecting need the internet.",
  "iOS reports app use to Mivo in steps, so Spot times are “close, not exact”, and Mivo says so on screen. When it can't measure something it says “not measured” instead of showing zero.",
  "A comparison with your usual (for example “21 minutes less”) only appears after three earlier measured sessions in the same Spot.",
] as const;

export const troubleshooting = [
  {
    q: "Nothing happens when I tap it",
    a: "Make sure your iPhone is an XS or newer and the screen is on. Hold the top edge of the phone flat against the Spot for a second. A thick or metal case can block the signal, and NFC doesn't work well on bare metal, so stick the Spot on a non-metal surface.",
  },
  {
    q: "Safari opened this page instead of Mivo",
    a: "That means Mivo isn't installed, isn't up to date, or the link was opened somewhere that can't hand it to the app (a Mac, or an Android phone). Install or update Mivo, then tap the Spot again, or use the Open in Mivo button above.",
  },
  {
    q: "It says the Spot is already connected to another account",
    a: "Each Spot belongs to one account. If you bought it from us, email us with the order and we'll look into it. If it was a gift or second-hand, the previous owner can free it by disconnecting it in their Mivo account, after which you can set it up. Mivo never reveals who owns a Spot.",
  },
  {
    q: "It says the Spot is switched off",
    a: "Mivo switched it off, for example because it was reported lost. If you think that's a mistake, email us with the Spot's ID and we'll sort it out.",
  },
  {
    q: "iOS shows a banner every time I tap",
    a: "iOS always shows a banner when a tag is read in the background, and only you can switch it off. A Shortcuts automation makes a tap start your Spot with no banner. The four steps are above.",
  },
  {
    q: "I'm selling, gifting or replacing my phone",
    a: "Selling or gifting: sign in at usemivo.app/account, open My Spots and choose Disconnect. The Spot can then be set up by someone else. A new phone: sign in to Mivo on it and tap the Spot. It's still yours, so Mivo just sets it up again.",
  },
  {
    q: "What if the tag stops scanning or arrives damaged?",
    a: "Email us. We'll send a replacement or refund you. See Shipping & Returns.",
  },
] as const;

export const privacyPoints = [
  "The tag holds one thing: the link to this page. No apps, no name, no settings, no personal data.",
  "Mivo's registry knows only the Spot's ID, which account (if any) has connected it, whether it's switched on, and when it was connected.",
  "What the Spot does (its name, apps, mode and timer) stays on your phone. Changing any of it never touches the tag, so a desk Spot can become a bedside Spot.",
  "Anyone can open this page, but it doesn't say whether a Spot is taken. Only a signed-in person can check a Spot's status, and even then Mivo never says whose it is.",
] as const;
