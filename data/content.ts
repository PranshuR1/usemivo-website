export const appStoreUrl = "https://apps.apple.com/us/app/mivo-scrolling/id6762094544";
export const macDownloadUrl = "/downloads/Mivo.dmg";
export const windowsDownloadUrl = "/downloads/Mivo-Setup.exe";

export const nav = {
  links: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Experiments", href: "#experiments" },
    { label: "Reviews", href: "#reviews" },
  ],
};

export const hero = {
  badge: "Now on iOS and macOS",
  headline: ["Understand your scrolling.", "Change it without guilt."],
  sub: "Mivo helps you notice missing screen time, recognize your patterns, and make more intentional choices.",
  ctaPrimary: "Download Mivo",
  ctaSecondary: "See How It Works",
};

export const heroPhone = {
  greeting: "Good evening,",
  name: "Jordan",
  liveLabel: "Live screen time",
  time: "4h 22m",
  timeSub: "today so far",
  unlocks: "14 unlocks",
  unlocksTrend: "+18% this week",
  stats: [
    { value: "3", label: "Sessions", trend: "↑18%", trendSub: "vs last wk" },
    { value: "2", label: "Truth checks" },
  ],
  insightLabel: "Today's insight",
  insight: "You scroll most 8–10 PM — 34% of daily use in just 2 hours.",
};

export const demoTabs = [
  { id: "home", label: "Home" },
  { id: "patterns", label: "Patterns" },
  { id: "interventions", label: "Interventions" },
  { id: "settings", label: "Settings" },
] as const;

export const demoPatterns = {
  noticedLabel: "What Mivo noticed",
  insights: [
    { label: "Late-night scrolling", detail: "Most sessions start after 9 PM" },
    { label: "Stress-triggered opens", detail: "More opens on weekday afternoons" },
    { label: "Boredom loops", detail: "Short repeat opens, no clear reason" },
  ],
  weekLabel: "Scrolling by day",
  week: [
    { day: "M", minutes: 62 },
    { day: "T", minutes: 40 },
    { day: "W", minutes: 78 },
    { day: "T", minutes: 55 },
    { day: "F", minutes: 90 },
    { day: "S", minutes: 35 },
    { day: "S", minutes: 48 },
  ],
  windowsKeptLabel: "Windows kept",
  windowsKept: "5 of 7",
  windowsKeptSub: "this week",
};

export const demoInterventions = {
  sub: "Add a little friction before the scroll takes over.",
  apps: [
    { name: "Instagram", initial: "I", color: "#C77B4B" },
    { name: "TikTok", initial: "T", color: "#4A4A4A" },
    { name: "YouTube", initial: "Y", color: "#B0413E" },
  ],
  pauseLabel: "One moment.",
  pauseSub: "Not a block — a choice.",
  adaptiveBadge: "Extra friction — 3rd open this hour",
  triggerPrompt: "Why are you opening it?",
  triggers: [
    { label: "Kill time", icon: "clock" },
    { label: "Relax", icon: "leaf" },
    { label: "Bored", icon: "sparkles" },
    { label: "Looking for something specific", icon: "search" },
  ] as const,
  durationPrompt: "How long?",
  durations: ["5 min", "10 min", "15 min", "20 min", "30 min"],
  confirmMessage: "Got it. Enjoy, intentionally.",
};

export const demoSwap = {
  label: "Your Swap",
  activity: "Read two pages of the book on your nightstand",
  primaryCta: "Do this instead",
  secondaryCta: "Open Instagram anyway",
};

export const demoUnlock = {
  label: "Need 5 more minutes?",
  sub: "Tell Mivo why. Vague reasons don't get through.",
  placeholder: "Texting my landlord back about the lease",
  submitCta: "Ask Mivo",
  approved: "That's specific enough. 5 more minutes.",
};

export const demoRescue = {
  sessionLabel: "42 minutes in Instagram",
  prompt: "Still going. Want a quiet way out?",
  primaryCta: "Step back",
  secondaryCta: "Keep scrolling",
};

export const demoMivoClear = {
  heading: "Mivo Clear",
  sub: "Useful tools. Less automatic scrolling.",
  apps: [
    { name: "Instagram", color: "#C77B4B", blocked: "Reels", tools: ["Messages", "Search", "Profile"] },
    { name: "TikTok", color: "#4A4A4A", blocked: "For You Feed", tools: ["Create", "Profile"] },
    { name: "YouTube", color: "#B0413E", blocked: "Shorts", tools: ["Subscriptions", "Search", "Playlists"] },
  ],
  note: "The endless feed is filtered out — everything else still works.",
};

export const demoMivoStill = {
  heading: "Mivo Still",
  prompt: "Place your phone face-down",
  note: "Somewhere you can't easily reach it. The timer starts once it's still.",
  cancel: "Cancel",
};

export const homeSpotlight = {
  estimate: {
    label: "Today's Estimate",
    guess: "1h 30m",
    actual: "4h 22m",
    note: "Off by 2.9× — pretty typical.",
  },
  breakdown: {
    label: "Where It Went",
    apps: [
      { name: "Instagram", time: "1h 24m" },
      { name: "TikTok", time: "58m" },
      { name: "YouTube", time: "1h 12m" },
      { name: "Other", time: "48m" },
    ],
  },
  forgotten: {
    label: "Forgotten Time",
    value: "23m",
    note: "Opens under 30 seconds you didn't notice adding up.",
  },
};

export const demoSettings = {
  sections: [
    { title: "Privacy Center", body: "Review what Mivo stores and how it's used." },
    { title: "Data Export", body: "Download a complete copy of your data anytime." },
    { title: "Late-Night Protection", body: "A quiet wind-down window after 10 PM.", toggle: true },
    { title: "Daily Screen Time Protection", body: "Optional Apple Screen Time limits you control." },
    { title: "Mivo for Mac", body: "Live stats from your Mac: time observed, focus vs. drift, and top apps." },
    { title: "App-Specific Friction", body: "Set a different pause length per app." },
    { title: "Account", body: "Manage or permanently delete your account." },
  ],
};

export const downloadPrompt = {
  heading: "Like what you see?",
  body: "This is a live preview of Mivo. Get the real thing — with your actual screen time — on the App Store.",
  cta: "Download on the App Store",
  dismiss: "Keep exploring",
};

export const appStoreReviews = {
  eyebrow: "App Store",
  heading: "What people are actually saying.",
  rating: 4.2,
  count: 10,
  url: appStoreUrl,
  reviews: [
    {
      title: "Great for students like me",
      date: "Jun 5",
      author: "Tarak V",
      body: "I didn't expect to care that much about my screen time until I started using Mivo. It doesn't try to shame you — it just makes you more aware of your habits.",
    },
    {
      title: "Super Effective",
      date: "Jun 2",
      author: "Hameez_0921",
      body: "The app works brilliantly. My screen time lowered 2 hours on average and I finally enjoy more time with my friends.",
    },
    {
      title: "Perfect… just perfect",
      date: "Jul 23",
      author: "i love mivo",
      body: "This app is genuinely a life saver. It helped me reflect on my habits and improve my time usage.",
    },
    {
      title: "Best Scrolling App Ever",
      date: "Jun 5",
      author: "Harsh_Mehta123",
      body: "Keeps me away from scrolling four hours a day. Made me more productive and it's great for tracking screen time.",
    },
  ],
};

export const reality = {
  eyebrow: "Honest Screen Time",
  heading: "You are probably on your phone more than you think.",
  sub: "Mivo shows you the truth — without shame, restrictions, or fake productivity hacks.",
};

export const steps = [
  {
    n: "01",
    label: "Daily Truth Check",
    heading: "Start with a guess.",
    body: "Before Mivo shows the data, it asks you to estimate. Most people are off by 2–3×.",
  },
  {
    n: "02",
    label: "The Reveal",
    heading: "The truth hits different.",
    body: "4 hours. You thought it was 1.",
  },
  {
    n: "03",
    label: "Pattern Awareness",
    heading: "Your habits have a shape.",
    body: "Late-night scrolling. Stress-triggered opens. Boredom loops. Mivo surfaces the patterns behind your behavior.",
  },
  {
    n: "04",
    label: "Before You Open",
    heading: "One small pause.",
    body: "Before opening an app, Mivo asks why. That five-second pause creates space for a real choice.",
  },
];

export const midCta = {
  heading: "Know yourself. Start now.",
};

export const problem = {
  eyebrow: "The Problem",
  heading: "Most screen-time apps make things worse, not better.",
  sub: "They shame, gamify, and nag — instead of simply showing you the truth.",
  cards: [
    {
      title: "They shame you",
      body: "Red warning screens and “you've reached your limit” treat you like a child who can't be trusted.",
    },
    {
      title: "They gamify discipline",
      body: "Streaks, badges, and daily goals turn your mental health into a performance metric.",
    },
    {
      title: "They drown you in data",
      body: "Fourteen charts, hourly breakdowns. More data doesn't create awareness — it creates anxiety.",
    },
    {
      title: "They nag",
      body: "Guilt notifications every hour. Passive-aggressive reminders that you're failing. Again.",
    },
    {
      title: "They block and restrict",
      body: "Forced timers create friction without creating understanding. You just get angry.",
    },
    {
      title: "They miss the point",
      body: "Screen time is not the enemy. Unconscious use is. No app can fix what it refuses to understand.",
    },
  ],
};

export const featureCategories = [
  {
    category: "Awareness & Truth",
    features: [
      {
        title: "Daily Truth Estimates",
        body: "Start each day by estimating your screen time. Mivo reveals the real number — and the gap between your guess and reality.",
        detail:
          "Most people guess low by 2–3×. Mivo tracks your estimate against the actual number every day, so the gap itself becomes something you can watch shrink.",
      },
      {
        title: "Actual Screen Time Reveals",
        body: "See exactly where your time went, broken down by app and session. No spin, no framing.",
        detail:
          "Every session is logged with the app, the time of day, and how long it ran — laid out plainly, with no charts designed to make you feel better or worse about it.",
      },
      {
        title: "Accuracy Scores",
        body: "Track how close your estimates are. Patterns in your guesses reveal patterns in your awareness.",
        detail:
          "A running score shows whether your gut sense of your own usage is improving over time — often the first real signal that awareness is sinking in.",
      },
      {
        title: "Forgotten-Time Analysis",
        body: "Mivo shows the time you don't remember spending — the invisible scrolling that accumulates without notice.",
        detail:
          "Short, half-conscious opens rarely register as “using your phone.” Mivo adds them up separately so that invisible time stops staying invisible.",
      },
      {
        title: "Personalized Pattern Insights",
        body: "Late-night scrolling. Stress-triggered opens. Boredom loops. Mivo surfaces what drives your behavior.",
        detail:
          "Instead of generic tips, Mivo looks at when and how you actually open apps and names the specific pattern behind it — yours, not a stock one.",
      },
    ],
  },
  {
    category: "Intervention & Protection",
    features: [
      {
        title: "Five-Second Opening Pause",
        body: "Before opening a tracked app, Mivo creates a five-second intentional moment. Not a block — a choice.",
        detail:
          "You can act the moment it starts — there's no hard wall. It just interrupts the reflex long enough for a real decision to catch up.",
      },
      {
        title: "Adaptive Intervention Friction",
        body: "The pause adapts based on your patterns. More friction when you're on autopilot.",
        detail:
          "Open an app for the fifth time in an hour and the pause holds a little longer. Open it once with intention and it barely gets in your way.",
      },
      {
        title: "Trigger & Intention Selection",
        body: "Tell Mivo why you're opening the app. Over time, you'll recognize your own patterns clearly.",
        detail:
          "Kill time, relax, bored, or looking for something specific — naming it takes two seconds, and after enough repeats the pattern becomes obvious on its own.",
      },
      {
        title: "Late-Night Protection",
        body: "Protect your sleep with a user-controlled late-night window — without punitive restrictions.",
        detail:
          "You set the hours, not Mivo. Inside that window, friction goes up automatically — outside it, nothing changes.",
      },
      {
        title: "Rescue Mode",
        body: "During long sessions, Mivo offers a quiet, judgment-free way to step back.",
        detail:
          "No red banners or guilt messages — just a low-key option to close out gracefully when a session has clearly run long.",
      },
      {
        title: "Daily Screen Time Protection",
        body: "Optional user-approved Screen Time protections you choose, adjust, and manage yourself.",
        detail:
          "Built on Apple's own Screen Time framework, but every rule is one you turned on — nothing gets locked down without your say-so.",
      },
      {
        title: "Your Swap",
        body: "Pick one real thing you'd rather do. At the moment you'd normally open the app, Mivo offers that instead.",
        detail:
          "Decided in advance, not in the moment — so when the urge hits, the alternative is already sitting there instead of something you have to invent on the spot.",
      },
      {
        title: "AI-Reviewed Emergency Unlock",
        body: "Need five more minutes? Tell Mivo why. A specific, honest reason gets you back in — a vague one doesn't.",
        detail:
          "It's checking for specificity and urgency, not judging the reason itself — “texting my landlord back” passes, “idk” doesn't.",
      },
    ],
  },
  {
    category: "Mivo Clear & Still",
    features: [
      {
        title: "Mivo Clear (Beta)",
        body: "Opens Instagram, TikTok, YouTube, or Snapchat with the endless feed blocked. DMs, profiles, and the video you meant to watch still work.",
        detail:
          "Messages, search, and profiles stay fully usable — it's specifically the infinite Reels/Explore/For You feed that's filtered out, so you can still use the app, just not disappear into it.",
      },
      {
        title: "Mivo Still (Beta)",
        body: "A put-the-phone-down timer. It only counts while your phone is face-down and untouched — pick it up, and it pauses.",
        detail:
          "There's no way to fake it — the timer is tied to the phone actually being still, so it rewards putting it down, not just starting a countdown.",
      },
    ],
  },
  {
    category: "Mivo for Mac",
    features: [
      {
        title: "Real Cross-Device Sync",
        body: "Your Mac's activity now actually syncs to your account. iPhone Settings → Mivo for Mac shows live stats from your Mac session.",
        detail:
          "Time observed, focused vs. drift minutes, session count, and your top apps for the day — pulled live from your Mac, not just a “connected” badge.",
      },
      {
        title: "See Your iPhone's Week, From Your Mac",
        body: "Settings → Mivo for iPhone is now clickable — real weekly screen time, recovered time, and session counts pulled straight from your phone.",
        detail:
          "No more guessing what your phone's been up to while you're heads-down on the Mac — the actual weekly numbers are right there.",
      },
      {
        title: "Click Into Any App to See What You Were Doing",
        body: "Under Patterns → Where the day went, click any app's time total to see the individual pages that made it up, each with its own duration.",
        detail:
          "Flag a single page as Focus, Neutral, Drift, or Away — so one tutorial tab doesn't get lumped in with an hour of unrelated browsing under one “Chrome” number.",
      },
      {
        title: "“Block My iPhone Too”",
        body: "Lock a Focus session on your Mac and optionally lock your iPhone at the same time, with a full app shield.",
        detail:
          "Same strength as Mivo Still — so switching devices isn't a loophole out of a focus session you started.",
      },
      {
        title: "Redesigned Interface",
        body: "Redesigned cards with real depth, consistent color-coded status badges, and a tighter, less cluttered Today dashboard.",
        detail: "Same information, considerably less visual noise — built for a glance, not a squint.",
      },
      {
        title: "Smarter Drift Handling",
        body: "YouTube Shorts are now caught as drift like other short-form apps — and getting pulled back closes just the offending tab, not the whole browser.",
        detail:
          "A quick “Focus!” notification nudges you back, instead of losing every other tab you had open for actual work.",
      },
    ],
  },
  {
    category: "Focus Sessions",
    features: [
      {
        title: "Focus Timer Modes",
        body: "Classic, Adaptive, Open, Micro, or Academic Reset — pick a work-and-rest rhythm that fits how you actually focus, or leave it open-ended.",
        detail:
          "Classic locks a fixed duration, Adaptive extends itself when you're staying on task, Open has no preset end, and Academic Reset runs the 25/5 sprint cycle built for distracted brains.",
      },
      {
        title: "AI Focus Coach",
        body: "Tell Mivo how focused you're feeling and it recommends a work/rest plan based on that and your recent sessions.",
        detail:
          "It's not a fixed formula — the recommendation shifts based on how your recent sessions actually went, not just a generic productivity template.",
      },
    ],
  },
  {
    category: "Live Activity",
    features: [
      {
        title: "Active Session Timers",
        body: "See how long you've been in a session in real time. Awareness during use, not just after.",
        detail:
          "The number keeps counting while you scroll, not just in a report afterward — so the awareness happens while it can still change what you do next.",
      },
      {
        title: "Lock Screen Live Activities",
        body: "Current session time visible on your Lock Screen — no need to open Mivo.",
        detail:
          "Glance at your Lock Screen and the running session time is already there — checking in doesn't require opening yet another app.",
      },
      {
        title: "Dynamic Island Integration",
        body: "Session information surfaced quietly in the Dynamic Island on supported devices.",
        detail:
          "A small, persistent reminder that a session is running, without a notification demanding your attention.",
      },
      {
        title: "Recovery Mode",
        body: "After a difficult scrolling day, Mivo enters a gentle recovery mode to help you reset without shame.",
        detail:
          "One bad day doesn't reset your progress or pile on guilt notifications — Recovery Mode just softens the next day's friction so you can start over cleanly.",
      },
      {
        title: "Home Screen & Lock Screen Widgets",
        body: "Today's scrolled minutes, your next scroll window, and your streak — glanceable without opening Mivo.",
        detail: "Everything you'd otherwise have to open the app to check, sitting on your Home Screen instead.",
      },
    ],
  },
  {
    category: "Experiments",
    features: [
      {
        title: "Seven-Day Behavior Experiments",
        body: "Run a focused, measurable behavior change experiment for one week.",
        detail:
          "One rule, one week — short enough to actually finish, long enough to tell if it's making a real difference.",
      },
      {
        title: "Experiment Tracking & Results",
        body: "Mivo records your behavior throughout so you can see real progress.",
        detail:
          "Nothing to log by hand — Mivo already has the usage data, so the results are just true, not self-reported.",
      },
      {
        title: "Before & After Comparisons",
        body: "At the end of each experiment, see clearly what changed and what didn't.",
        detail:
          "Your baseline week is set automatically before the experiment starts, so the comparison is against your own real pattern, not a guess.",
      },
      {
        title: "Adaptive Daily Scroll Windows",
        body: "Personalized daily windows based on your goals and actual usage patterns.",
        detail:
          "The window narrows gradually as you hit it, instead of jumping straight to a number that doesn't match how you actually use your phone.",
      },
      {
        title: "Personalized Scrolling Schedules",
        body: "Build a scrolling schedule that fits your real life.",
        detail:
          "Built around your actual free time and habits, not a one-size-fits-all schedule copied from someone else's routine.",
      },
      {
        title: "30-Day Plan Forecast",
        body: "See your daily target ramp down toward your goal over the next month, with an estimate of how many days until you get there.",
        detail:
          "Instead of one big jump, the target eases down day by day — you can see exactly where it's headed and when you'll get there.",
      },
    ],
  },
  {
    category: "Reports & Reflections",
    features: [
      {
        title: "Session Reflections",
        body: "After a scrolling session, Mivo asks gently: how do you feel? No shame. Just noticing.",
        detail:
          "A single, quick check-in — not a survey. The point is noticing how a session actually felt, not filling out a form about it.",
      },
      {
        title: "“Worth It?” Session Checks",
        body: "A quiet prompt after longer sessions: was this worth your time?",
        detail:
          "Just a yes, mixed, or no. Answered honestly enough times, it becomes a pretty clear signal about what's actually worth opening.",
      },
      {
        title: "Weekly Truth Reports",
        body: "A weekly summary of screen time, estimates, accuracy, and patterns — in plain language.",
        detail:
          "Delivered once a week, in sentences you'd actually read — not another dashboard of charts to interpret yourself.",
      },
      {
        title: "Monthly Mivo Effect Reports",
        body: "See how your relationship with your phone has changed month over month.",
        detail:
          "Zoomed further out than the weekly report — built for noticing the slower shift that's easy to miss week to week.",
      },
      {
        title: "App-Specific Friction Preferences",
        body: "Set different friction levels for different apps based on your own goals.",
        detail:
          "Instagram and your banking app don't need the same pause — you decide which apps deserve more friction and which don't.",
      },
    ],
  },
  {
    category: "Privacy & Control",
    features: [
      {
        title: "Privacy Center",
        body: "A dedicated space to review what Mivo stores, how it's used, and how to manage it.",
        detail: "Everything Mivo has on you, laid out plainly in one place — not buried three menus deep.",
      },
      {
        title: "Data Export",
        body: "Download a complete copy of your Mivo data at any time.",
        detail: "Your data, portable whenever you want it — no request form, no waiting period.",
      },
      {
        title: "Account Deletion Controls",
        body: "Delete your account and all data, permanently, without contacting support.",
        detail: "A real delete button that actually deletes — you shouldn't have to email someone to leave.",
      },
      {
        title: "Accountability Summaries",
        body: "Optional summaries you control and share on your own terms — never pushed without permission.",
        detail:
          "Nothing gets sent to anyone automatically — you choose what a summary includes and who, if anyone, ever sees it.",
      },
    ],
  },
];

export const experiments = {
  eyebrow: "Experiments",
  heading: "Small, measurable changes.",
  sub: "Run a focused, seven-day behavior experiment. Track it. Compare before and after. See what actually works for you — not for someone else's idea of productivity.",
  items: [
    {
      title: "Seven-day experiments",
      body: "Pick one behavior to change and run a focused, time-bound experiment without disrupting your whole routine.",
    },
    {
      title: "Track in real time",
      body: "Mivo records your behavior throughout the experiment so you can see progress as it happens.",
    },
    {
      title: "Before & after results",
      body: "At the end, Mivo shows you a clear comparison — what changed, what didn't, and how it felt.",
    },
    {
      title: "Personalized schedules",
      body: "Build a scrolling schedule that fits your real life, not one designed for someone else's ideal of discipline.",
    },
  ],
};

export const philosophy = {
  quote: "Scrolling is always allowed. Lying to yourself is what costs you.",
  attribution: "The philosophy behind Mivo",
};

export const finalCta = {
  eyebrow: "Ready?",
  heading: "Awareness changes behavior.",
  body: "Mivo helps you see your habits clearly enough to choose differently. No shame. No rules. Just honesty.",
  availability: "Available now · Free to download · iOS",
  closingLine: "Not wellness. Not discipline.\nJust knowing what you are actually doing with your time.",
};

export const footer = {
  product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Experiments", href: "#experiments" },
    { label: "Reviews", href: "#reviews" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Support", href: "/support" },
  ],
  contact: {
    email: "info.mivoapp@gmail.com",
    instagram: "https://instagram.com/usemivo",
    linkedin: "https://linkedin.com/company/usemivo",
  },
  team: [
    { initial: "P", name: "Pranshu Raithatha", role: "Chief Executive Officer" },
    { initial: "H", name: "Harsh Mehta", role: "Chief Operations Officer" },
    { initial: "H", name: "Harshit Shukla", role: "Chief Marketing Officer" },
    { initial: "L", name: "Logan Bishop", role: "Chief Marketing Officer" },
  ],
  copyright: "© 2026 Mivo. All rights reserved.",
};
