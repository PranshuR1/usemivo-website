// What ships in Mivo 3.1. Keep this to features that are built in the app. The App Store version is
// still 3.0, so the page labels everything "Coming in 3.1"; change comingInNote when 3.1 is live.
export const mivoVersion = "3.1";
export const comingInNote = `Coming in Mivo ${mivoVersion}`;

export const whatsNew = [
  {
    id: "study",
    title: "Study sessions that earn scroll time",
    tag: "Study",
    body: "Name the one thing you are doing, put your phone across the room, and let Mivo film your hands and desk. Finish with a receipt and a streak. Every 3 minutes of verified video earns 1 minute of scroll time, up to 60 earned minutes a day.",
    points: [
      "Video stays on your phone and is deleted after 7 days",
      "Scroll time is earned free for your first 7 days, then with Mivo Plus",
      "Sessions still log and keep your streak without Plus",
    ],
    href: "/study",
    cta: "Try a session in your browser",
  },
  {
    id: "instagram",
    title: "Instagram inside Mivo, made dull",
    tag: "Free",
    body: "Choose 10 Reels or 10 minutes before you start. Inside Mivo, Instagram runs in grayscale with the sound off, no looping and a short pause between Reels, and shows how much of today's time is left.",
    points: ["Free for everyone", "Replay mode (Mivo Plus) swaps unseen Reels for ones you already watched once your pick is used"],
    href: "/pricing",
    cta: "See what Plus adds",
  },
  {
    id: "journey",
    title: "A starting point, a commitment, a weekly experiment",
    tag: "Follow through",
    body: "Pick the problem you want to change, get one starting action, make a small commitment and check in when you finish. Try one change for a week, then keep, adjust or stop it. Self-reported check-ins and evidence Mivo reviewed are labelled separately.",
    points: ["Starting point and commitments are free", "Weekly experiments, Clear and Still come with Mivo Plus"],
    href: "/#experiments",
    cta: "How experiments work",
  },
  {
    id: "sync",
    title: "Study sync and study rooms",
    tag: "Account",
    body: "Sessions you finish on your phone, your Mac or on usemivo.app show up in the same history and streak. Open a room and share one link: a friend sees your first name, what you are working on if you allow it, and a timer, and can sit with you. No video, no photos, no account for them.",
    points: ["Turn a room off any time", "Friends sit by giving a first name only", "Mivo for Mac 1.1 already syncs study sessions: download it from the home page"],
    href: "/account",
    cta: "Open your account",
  },
] as const;
