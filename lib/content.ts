// All site copy lives here so it can be updated without touching layout code.

export const profile = {
  name: "Seán Hogan",
  role: "Oracle Database Administrator",
  location: "Co. Kerry, Ireland",
  intro:
    "I keep production Oracle databases available, secure and fast, automate the repetitive parts with Python and Bash, and build my own apps in the evenings. Two of them are live on the App Store.",
  email: "contact@seanhogan.me",
  linkedin: "https://www.linkedin.com/in/se%C3%A1n-hogan-378b54127/",
  github: "https://github.com/hoganSean99",
};

export const work = [
  {
    role: "Oracle Database Administrator",
    org: "JRI America",
    place: "Tralee, Co. Kerry",
    period: "2020 – present",
    summary: "Production Oracle DBA with a focus on availability, reliability and automation.",
    points: [
      "Administer Oracle databases (11g, 12c, 19c) on Linux, keeping them highly available, secure and performant.",
      "Automate routine database tasks with Python, Bash, Ansible and GraphQL APIs, replacing manual steps with repeatable scripted checks.",
      "Lead daily troubleshooting and root cause analysis across Oracle, Linux and Rubrik backups.",
      "Write SQL and Python to extract, check and report on database monitoring and audit data.",
      "Co-manage the JRI America Tralee internship programme (2024 – present).",
    ],
  },
];

export const education = {
  degree: "BSc (Honours) in Computing with Software Development",
  org: "Institute of Technology Tralee",
  period: "2016 – 2020",
};

export type AppStatus = "live" | "building";

export type AppShot = { src: string; alt: string; width: number; height: number; kind: "phone" | "art" };

export const apps: {
  name: string;
  slug?: string;
  status: AppStatus;
  tagline: string;
  description: string;
  stack: string[];
  icon?: string;
  appStore?: string;
  website?: string;
  shots?: AppShot[];
}[] = [
  {
    name: "Quotely",
    slug: "quotely",
    status: "live",
    tagline: "Quotes and invoices for trades. Create. Send. Win.",
    description:
      "A quoting and invoicing platform for tradespeople and small businesses, with an iOS app and a web dashboard. I built it first as a free alternative to a paid invoicing app for my brother, then grew it into a subscription product.",
    stack: ["React Native", "Expo", "Next.js", "Supabase", "Stripe", "RevenueCat"],
    icon: "/apps/quotely-icon.webp",
    appStore: "https://apps.apple.com/ie/app/quotely-business-made-simple/id6784734762",
    website: "https://www.quotely.ie",
    shots: [
      { src: "/apps/quotely-welcome.webp", alt: "Quotely welcome screen on iPhone", width: 474, height: 1024, kind: "phone" },
      { src: "/apps/quotely-quote-2.webp", alt: "Sending a quote to a customer", width: 720, height: 850, kind: "art" },
      { src: "/apps/quotely-analytics-3.webp", alt: "Quote performance and win rate analytics", width: 720, height: 910, kind: "art" },
      { src: "/apps/quotely-calendar-4.webp", alt: "Calendar with automatic follow-ups", width: 720, height: 930, kind: "art" },
    ],
  },
  {
    name: "Lost Paws",
    slug: "lost-paws",
    status: "live",
    tagline: "Find. Help. Reunite.",
    description:
      "Post a lost pet with a photo and a last-seen location, and people nearby get an alert. Found one? Post that too. Free for everyone, because lost pets need a faster way home.",
    stack: ["React Native", "Expo", "Supabase", "Edge Functions", "Push notifications"],
    icon: "/apps/lostpaws-icon.webp",
    appStore: "https://apps.apple.com/ie/app/lost-paws-find-my-pet/id6770572341",
    website: "https://www.lostpaws.pet",
    shots: [
      { src: "/apps/lostpaws-main.webp", alt: "Lost Paws home screen: report lost pets, found pets and search nearby", width: 640, height: 1385, kind: "phone" },
      { src: "/apps/lostpaws-explore.webp", alt: "Explore listings near you with filters", width: 640, height: 1385, kind: "phone" },
      { src: "/apps/lostpaws-my-requests.webp", alt: "Manage your own listings", width: 640, height: 1385, kind: "phone" },
    ],
  },
  {
    name: "PawRota",
    status: "building",
    tagline: "Who fed the dog?",
    description:
      "Shared pet care for the whole household: who fed the dog, who walked her and whose turn it is next. Includes an AI vet scan.",
    stack: ["React Native", "Expo", "Supabase", "AI"],
  },
];

export const otherBuilds = [
  {
    name: "BabySteps",
    description:
      "A native iOS baby tracker for growth, milestones and daily routines, with family sharing over CloudKit and lock screen sleep timers.",
    stack: ["Swift", "SwiftUI", "CloudKit", "Core Data"],
    href: "https://github.com/hoganSean99/baby-steps-ios",
  },
  {
    name: "Server assistant on Telegram",
    description:
      "Manage a self-hosted Ubuntu server by chatting to it. An N8N workflow uses OpenAI to work out what you asked, runs the command and replies with the result.",
    stack: ["Ubuntu", "N8N", "OpenAI", "Bash"],
  },
  {
    name: "EduManage",
    description:
      "A school operations platform with an AI assistant for exams, attendance and reporting, plus role-based access for staff.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
  },
];

// Shown as the output of DESCRIBE sean_hogan;
export const skills = [
  { name: "DATABASES", notNull: true, type: "Oracle 11g, 12c, 19c, SQL, PostgreSQL, Supabase" },
  { name: "AUTOMATION", notNull: true, type: "Python, Bash, Ansible, Linux, Rubrik backups, GraphQL APIs" },
  { name: "APP_DEVELOPMENT", notNull: false, type: "React Native, Expo, Swift and SwiftUI, Next.js, TypeScript" },
  { name: "AI_TOOLING", notNull: false, type: "Claude Code, OpenAI API, N8N workflows" },
  { name: "COFFEE", notNull: true, type: "French press, non-negotiable" },
];

// Shown as the result of SELECT * FROM life WHERE keyboard = 'OFF';
export const life = [
  { activity: "GAA", detail: "Two All-Ireland medals with IT Tralee in 2017" },
  { activity: "PETS", detail: "Big fan. Hence Lost Paws and PawRota" },
  { activity: "GAMING", detail: "When production lets me" },
  { activity: "CODING", detail: "Yes, for fun as well. See above" },
];
