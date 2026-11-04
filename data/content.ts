export const appStoreUrl = "https://apps.apple.com/us/app/mivo-scrolling/id6762094544";
export const macDownloadUrl = "https://github.com/PranshuR1/usemivo-website/releases/download/mac-v1.1/Mivo.dmg";
// Keep in step with public/mac/latest.json, which installed Mac apps read to offer the update.
export const macRelease = { version: "1.1", size: "3 MB", requires: "macOS 13 or later" };
export const windowsDownloadUrl = "https://github.com/PranshuR1/usemivo-website/releases/download/v1.0.0/Mivo-Setup.exe";

// Milo is built but not in the iPhone App Store version yet (3.0, Aug 26).
// Remove the notes that use this once the update that includes them is live.
export const comingSoonNote = "Coming in Mivo 3.1";

export const nav = {
  links: [
    { label: "Features", href: "/features" },
    { label: "Study", href: "/#study" },
    { label: "Pricing", href: "/pricing" },
  ],
};

export const hero = {
  badge: "Now on Mac, too",
  headline: ["Less scrolling.", "More time for you."],
  sub: "Catch the scroll before it takes your evening. Mivo helps you notice your habits and pause before opening distracting apps.",
  ctaPrimary: "Download for iPhone",
  ctaSecondary: "Download for Mac",
};

// The reasons to pick Mivo, shown straight under the hero. Only things people can use today.
export const sellingPoints = {
  eyebrow: "Why Mivo",
  heading: "Small pauses. Better choices.",
  items: [
    {
      icon: "truth",
      title: "The real number, not a guess",
      body: "Guess your screen time, then compare it with your actual use. See the little opens that add up and the patterns you might have missed.",
    },
    {
      icon: "clear",
      title: "Feeds off. Useful parts on.",
      body: "Mivo Clear opens Instagram, TikTok and YouTube for messages, search and the video you meant to watch. The endless feed stays out.",
    },
    {
      icon: "study",
      title: "Study time that actually counts",
      body: "Track focused time on your Mac, or start a simple timer in your browser. Sign in to keep your sessions and streak together.",
    },
    {
      icon: "pause",
      title: "A moment to mean it",
      body: "Before a tracked app opens, Mivo asks why you're there. A short pause gives you room to choose instead of opening on autopilot.",
    },
  ],
} as const;

// Studying across devices. The Mac app and the web page work today; the iPhone part ships in 3.1.
export const studyEverywhere = {
  eyebrow: "Study, synced",
  heading: "Study on any screen. Keep one streak.",
  sub: "Pick one task and make a little room for it. Use the Mac app for focus tracking or the free web timer to get started. Sign in to save your sessions across devices.",
  mac: {
    kicker: "Mivo for Mac · Available now",
    title: "Your Mac knows when you're really studying.",
    body: "Start a session and watch focused time count live. Docs, PDFs, Quizlet and Canvas count. A feed, a long break or a locked screen doesn't.",
    points: [
      "Only totals sync. Window titles and websites stay on your Mac",
      "Join a session your iPhone started, or start one right there",
      "Start and finish from the menu bar",
    ],
    cta: "Download for Mac",
  },
  web: {
    kicker: "In your browser",
    title: "No app? Open the study page.",
    body: "Name a task, start the timer and save a receipt when you're done. No camera or account needed. Sign in when you want to sync.",
    cta: "Start a session",
    href: "/study",
  },
  room: {
    kicker: "Study rooms",
    title: "Friends can sit with you.",
    body: "Share one link. Friends see your first name, your task if you allow it, and a timer. No video, and no account for them.",
    cta: "Open your room",
    href: "/account#room",
  },
  iphone: {
    kicker: "iPhone",
    title: "Film your desk. Earn your scroll.",
    body: "Prop your iPhone across the room while you work. Every 3 minutes of verified study earns 1 minute of scroll time, up to 60 a day.",
    cta: "What's new in 3.1",
    href: "/whats-new",
  },
} as const;

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
  { id: "interventions", label: "Protect" },
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

export const demoProtectSetup = {
  label: "Protection setup",
  rows: [
    { title: "Late-Night Protection", body: "A quiet wind-down window after 10 PM.", toggle: true },
    { title: "Daily Screen Time Protection", body: "Optional Apple Screen Time limits you control." },
    { title: "App-Specific Friction", body: "Set a different pause length per app." },
  ],
};

export const demoInterventions = {
  heading: "Protect",
  sub: "Pause before you scroll, and set up what protects you.",
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

export const homeCards = {
  milo: {
    label: "Your Companion",
    name: "Milo",
    line: "Almost at today's line. No pressure.",
    note: "A few quiet words, only when something stands out.",
  },
  receipt: {
    label: "Attention Receipt",
    tracked: "4h 22m",
    note: "Real time from Screen Time, next to what you remembered.",
  },
  forecast: {
    label: "30-Day Forecast",
    goal: "1h 30m goal",
    note: "Your target eases down day by day. You can see exactly when you get there.",
  },
};

export const demoSettings = {
  sections: [
    { title: "Companion", body: "Milo's pace, personality, and whether he walks around the app." },
    { title: "Privacy Center", body: "Review what Mivo stores and how it's used." },
    { title: "Data Export", body: "Download a complete copy of your data anytime." },
    { title: "Mivo for Mac", body: "Live stats from your Mac: time observed, focus vs. drift, and top apps." },
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
  eyebrow: "Where good intentions get stuck",
  heading: "You had something else in mind for this time.",
  sub: "A limit can help. A useful next step helps you put that attention toward something you chose.",
  cards: [
    {
      title: "A message becomes a long scroll",
      body: "You came to reply to someone. The feed pulled you somewhere else.",
    },
    {
      title: "The task feels too big to start",
      body: "One small commitment can make it easier to begin studying, writing, or finishing a chore.",
    },
    {
      title: "The chart leaves you wondering what to do",
      body: "A weekly experiment gives you one change to try, with a review of what happened.",
    },
    {
      title: "A difficult day derails the plan",
      body: "Returning can start with a smaller task or a short quiet break. You don't have to catch up.",
    },
    {
      title: "You still need the useful tools",
      body: "Messages, search, and specific videos have a place in your day. Clear filters social websites inside Mivo.",
    },
    {
      title: "Less screen time needs a purpose",
      body: "The next update brings commitments and completion check-ins alongside your usage, with self-reports and reviewed evidence labeled separately.",
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
      {
        title: "Honest About Missing Data",
        body: "If Screen Time can't report yet, Mivo says so. It never shows “0m” or quietly swaps in a different number.",
        detail:
          "A made-up zero would tell you something false about your day. When Mivo can't see a number, it holds the question back and tells you why, instead of grading you against data it doesn't have.",
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
    category: "Milo, Your Companion",
    note: comingSoonNote,
    features: [
      {
        title: "Meet Milo",
        body: "A small meerkat who keeps you company through your pauses. A few quiet words when something stands out — never a nag.",
        detail:
          "Milo only reads what Mivo already knows — your pauses, today's target, the time of day — and speaks up at a pace you choose: Rarely, Balanced, or Often. He starts after a short privacy introduction, and one switch turns him off entirely.",
      },
      {
        title: "Milo Walks Around Mivo",
        body: "While Mivo is open, Milo wanders across your tabs and hops when you tap him. When he's tired or you're focusing, he naps in the corner.",
        detail:
          "iOS doesn't let any app draw over other apps, so Milo stays inside Mivo. He's off automatically with Reduce Motion, and there's a toggle in Companion settings if you'd rather he stay put.",
      },
      {
        title: "Milo on Your Lock Screen",
        body: "During a session or a Mivo Still run, Milo's face appears in your Lock Screen Live Activity and the Dynamic Island.",
        detail:
          "Only during a real timed session — Mivo deliberately doesn't keep a Live Activity running just to show him. Switch Companion off and he drops out of any running activity too.",
      },
      {
        title: "Milo Is Honest About What He Can't See",
        body: "He never claims to know how many times you opened an app or what's on your screen. iOS doesn't share that, so he doesn't pretend.",
        detail:
          "The Companion screen lists which signals Milo has and which he's missing, so a comment about your day is always based on something Mivo actually measured.",
      },
    ],
  },
  {
    category: "Mivo for Mac",
    features: [
      {
        title: "Study on Your Mac",
        body: "Start a study session on your Mac, or join one your iPhone started. Focused time counts live, and distraction, breaks or a locked screen don't.",
        detail:
          "Mivo knows common study apps and sites (Preview, Word, Google Docs, Quizlet, Canvas and more), and one click counts anything else for the session. Only the totals leave your Mac, never window titles or websites.",
      },
      {
        title: "One Study Streak, Every Device",
        body: "Sessions from your Mac, usemivo.app and (from 3.1) your iPhone land in one history, with one streak and one week chart.",
        detail:
          "A day counts at 10 minutes of study, the same rule everywhere. A computer session counts its focused minutes, not just how long the timer ran.",
      },
      {
        title: "Study Rooms From Your Mac",
        body: "Open your study room and copy the link. Friends sit with you from any browser and see your timer live.",
        detail: "Close the room or make a new link at any time. Everyone sitting is sent away when you do.",
      },
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
        body: "Current session time visible on your Lock Screen — no need to open Mivo. Mivo Still runs get their own focus session activity.",
        detail:
          "Glance at your Lock Screen and the running session time is already there — checking in doesn't require opening yet another app. If you have Milo on, his face sits beside the timer.",
      },
      {
        title: "Dynamic Island Integration",
        body: "Session information surfaced quietly in the Dynamic Island on supported devices.",
        detail:
          "A small, persistent reminder that a session is running, without a notification demanding your attention. Milo's face shows in the compact, minimal, and expanded views when Companion is on.",
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
        body: "Review saved Mivo sessions alongside your own check-ins.",
        detail:
          "Results use saved Mivo sessions and check-ins. Mivo distinguishes observed usage from what you report; a before-and-after comparison cannot establish what caused a change.",
      },
      {
        title: "Before & After Comparisons",
        body: "At the end of each experiment, see clearly what changed and what didn't.",
        detail:
          "Your baseline week is set automatically before the experiment starts, so the comparison is against your own real pattern, not a guess.",
      },
      {
        title: "Adaptive Daily Scroll Windows",
        body: "Mivo watches for three days, starts your plan at your real average, then eases down toward the daily goal you pick.",
        detail:
          "The plan starts from what you actually do, never a number that doesn't match how you use your phone, and it holds steady once you reach your goal instead of dropping further.",
      },
      {
        title: "Personalized Scrolling Schedules",
        body: "Pick your daily scroll times with one tap — hour chips instead of a long list, plus “Same as yesterday.”",
        detail:
          "Hours that overlap another session or run past midnight are disabled, so you can't build a schedule that doesn't work. The same one-tap strip appears in Settings, the daily prompt, and onboarding.",
      },
      {
        title: "30-Day Plan Forecast",
        body: "See your daily target ramp down toward your goal over the next month, with an estimate of how many days until you get there.",
        detail:
          "Right after observation ends, Mivo tells you how many days the plan will take and shows your day 1, day 8, day 15, and goal-day targets. Instead of one big jump, the target eases down day by day.",
      },
      {
        title: "Comeback Fresh Start",
        body: "Been away? Mivo offers a fresh start from where you are today — not from the plan you left behind.",
        detail:
          "Tell Mivo why you stopped, or skip it, then choose Ease back in, Steady, or Stretch me. Day one is always at or below what you're doing now, and the reply is never about willpower.",
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
          "A single, quick check-in — not a survey. If you drift away from it, a countdown ends the screen after 60 seconds and saves whatever you'd filled in; touching anything restarts the clock.",
      },
      {
        title: "Attention Receipt",
        body: "A receipt for your day: tracked time from Screen Time, next to what you could actually remember.",
        detail:
          "Real time, straight from Screen Time. Recall, straight from you — including how often Mivo asked what you saw mid-scroll and how many things you could name.",
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

// Milo on the home page. He is on the Mac app today; the iPhone version ships in 3.1.
export const milo = {
  eyebrow: "Your companion",
  heading: "A little company, never a nag.",
  sub: "Milo is a small meerkat who keeps you company through your pauses and your study sessions.",
  note: comingSoonNote,
  kicker: "Companion",
  title: "Meet Milo.",
  body: "A few quiet words when something stands out, and nothing when it doesn't. Milo notices a good stretch of focus, a late night or a long drift, and says so kindly.",
  points: [
    "Speaks at a pace you choose: Rarely, Balanced, or Often",
    "Walks across your tabs while Mivo is open",
    "Shows up in your Lock Screen and Dynamic Island during a session",
    "On your Mac today: wanders the Mivo window and cheers a finished focus session",
  ],
  footnote: "iOS won't let any app draw over other apps, so on iPhone Milo only appears in Mivo and its Live Activities.",
};

export const experiments = {
  eyebrow: "Experiments",
  heading: "Small, measurable changes.",
  sub: "Try one change for seven days. Review the observations and how it felt. Keep, adjust, or stop the rule you chose.",
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
  heading: "Make your next open a choice.",
  body: "Start noticing where your time goes. A small pause today can make room for something you meant to do.",
  availability: "Available now · Free to download · iPhone and Mac",
  closingLine: "Not wellness. Not discipline.\nJust knowing what you are actually doing with your time.",
};

export const footer = {
  product: [
    { label: "All features", href: "/features" },
    { label: "How it works", href: "/features#how-it-works" },
    { label: "Study", href: "/#study" },
    { label: "Mivo for Mac", href: "/#mac" },
    { label: "What's new in 3.1", href: "/whats-new" },
    { label: "Pricing", href: "/pricing" },
    { label: "My account", href: "/account" },
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
