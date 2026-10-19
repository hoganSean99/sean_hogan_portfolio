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

export const facts = [
  { label: "Now", value: "Oracle DBA at JRI America, Tralee" },
  { label: "Experience", value: "6 years in production database operations" },
  { label: "Shipped", value: "2 iOS apps, a third in development" },
];

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

export const apps: {
  name: string;
  status: AppStatus;
  description: string;
  stack: string[];
  href?: string;
}[] = [
  {
    name: "Quotely",
    status: "live",
    description:
      "Quotes and invoices for tradespeople and the self-employed. I built it first as a free alternative to a paid invoicing app for my brother, then released it for everyone on a subscription.",
    stack: ["React Native", "Expo", "Subscriptions"],
    // href: "https://apps.apple.com/...",
  },
  {
    name: "Lost Paws",
    status: "live",
    description:
      "Post a lost pet with a photo and a last-seen location, and people nearby get an alert. Found one? Post that too. Free for everyone, because lost pets need a faster way home.",
    stack: ["React Native", "Expo", "Supabase"],
    // href: "https://apps.apple.com/...",
  },
  {
    name: "PawRota",
    status: "building",
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

export const skills = [
  { group: "Databases", items: ["Oracle 11g, 12c, 19c", "SQL", "PostgreSQL", "Supabase"] },
  { group: "Automation and operations", items: ["Python", "Bash", "Ansible", "Linux", "Rubrik backups", "GraphQL APIs"] },
  { group: "App development", items: ["React Native", "Expo", "Swift and SwiftUI", "Next.js", "TypeScript"] },
  { group: "AI tooling", items: ["Claude Code", "OpenAI API", "N8N workflows"] },
];

export const outside =
  "Two All-Ireland medals with IT Tralee GAA in 2017. Away from the keyboard it's GAA, pets, gaming and a good cup of coffee.";
