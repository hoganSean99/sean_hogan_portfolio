// Long-form write-ups for /apps/[slug]. Every technical claim here is taken
// from the app's own repository, so keep it in sync if the apps change.

export type CaseSection = {
  title: string;
  query: string;
  intro?: string;
  points?: string[];
  table?: { columns: string[]; rows: string[][] };
};

export type CaseStudy = {
  slug: string;
  summary: string;
  facts: { label: string; value: string }[];
  sections: CaseSection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "quotely",
    summary:
      "My brother is a tradesman who was paying for an invoicing app. I built him a free alternative, then kept going until it was a product other trades could use too: quotes, follow-ups, invoices and analytics, on iOS and the web.",
    facts: [
      { label: "Platforms", value: "iOS app and web dashboard" },
      { label: "Market", value: "Ireland and the EU, priced in euro" },
      { label: "Pricing", value: "Free plan, paid plans from €17.99 a month" },
      { label: "Built", value: "Solo, design to App Store" },
    ],
    sections: [
      {
        title: "What it does",
        query: "SELECT feature FROM quotely WHERE plan IN ('FREE', 'PRO', 'BUSINESS');",
        points: [
          "Build a quote with line items, VAT, discounts and a valid-until date, then send it by email with a PDF link.",
          "Customers accept or decline from a link, with no account needed.",
          "Follow-up emails go out automatically, spaced from the valid-until date rather than nagging every day.",
          "Accepted quotes turn into invoices, with payment reminders and reviews.",
          "Analytics for win rate and pipeline value, plus a calendar and team accounts on the Business plan.",
        ],
      },
      {
        title: "How it's built",
        query: "DESCRIBE quotely.architecture;",
        table: {
          columns: ["Layer", "What I used"],
          rows: [
            ["Mobile app", "Expo and React Native, with offline quote drafts"],
            ["Web", "Next.js dashboard, marketing site and API"],
            ["Shared code", "One TypeScript package for money maths, plan rules and email templates"],
            ["Database", "Supabase Postgres with row-level security and around 100 migrations"],
            ["Billing", "Stripe on the web, App Store subscriptions through RevenueCat on iOS"],
          ],
        },
        intro:
          "Both billing systems feed the same entitlement model through signed webhooks, so subscribing on the web unlocks the phone app and the other way round. Clients can never change their own plan; only the server can.",
      },
      {
        title: "How I test it",
        query: "SELECT check_name, runs_when FROM quality_gates ORDER BY risk DESC;",
        intro:
          "The riskiest code in Quotely is the money maths: if VAT or a deposit is wrong, a tradesperson sends a wrong invoice. So that's where the testing effort goes.",
        table: {
          columns: ["Check", "Runs when"],
          rows: [
            ["Over 100 unit tests on VAT, RCT, discounts, deposits, due dates and the follow-up scheduler", "Every push"],
            ["Tests for parsing App Store subscription webhooks", "Every push"],
            ["Full web build with type checking", "Every push"],
            ["Mobile lint and type check as blocking gates", "Every push"],
            ["Secret scanning across the whole repo history, plus a security audit", "Every push"],
            ["Destructive database migrations rehearsed on a local Supabase stack", "Before every schema change"],
            ["Billing regression: free to paid, plan swaps, cancelling, entitlements on mobile", "Before every billing release"],
          ],
        },
      },
      {
        title: "Privacy and security",
        query: "SELECT safeguard FROM quotely WHERE gdpr = 'Y';",
        points: [
          "Row-level security on customer data, so one business can never read another's quotes.",
          "Only the customer details a quote needs are stored: a name and an email address.",
          "Consent is recorded with an audit trail, and server-only work like email, PDFs and billing never runs on the device.",
        ],
      },
    ],
  },
  {
    slug: "lost-paws",
    summary:
      "I love animals, and I wanted to do something useful for the community when pets go missing. Lost Paws puts a lost or found pet in front of the people close enough to actually help.",
    facts: [
      { label: "Platforms", value: "iOS app and lostpaws.pet" },
      { label: "Price", value: "Free" },
      { label: "Core idea", value: "Alert the neighbours, not the whole internet" },
      { label: "Built", value: "Solo, design to App Store" },
    ],
    sections: [
      {
        title: "What it does",
        query: "SELECT feature FROM lost_paws;",
        points: [
          "Report a lost pet with a photo, details and a pin where it was last seen.",
          "Report a pet you've found, or log a sighting so the owner gets told straight away.",
          "Explore listings near you: search by name, breed, type or location, and filter by lost or found.",
          "Manage your own listings: edit them, mark a pet as reunited, or delete them.",
        ],
      },
      {
        title: "How nearby alerts work",
        query: "SELECT user_id FROM profiles WHERE distance_km <= alert_radius AND alerts = 'ON';",
        intro: "This is the part I'm proudest of. When someone posts a pet with a map pin:",
        points: [
          "A database trigger calls a Supabase Edge Function, which only accepts requests carrying a secret webhook key.",
          "It finds people who turned alerts on, skipping the person who posted.",
          "It only uses a location if it was updated in the last 14 days, so nobody gets alerts for a town they left weeks ago.",
          "It works out the real distance to each person and checks it against the alert radius they chose.",
          "Everyone inside the radius gets a push notification.",
        ],
      },
      {
        title: "Privacy and safety",
        query: "SELECT safeguard FROM lost_paws WHERE protects = 'OWNERS';",
        points: [
          "Contact details aren't public. They come from a server function with a limit of 30 lookups an hour, to stop scrapers harvesting owners' details.",
          "Locations are only kept for alert matching, and only while alerts are switched on.",
          "Sign-up and password emails are branded and sent from lostpaws.pet.",
          "Users can delete their account from inside the app, handled on the server.",
        ],
      },
      {
        title: "How I'd test it",
        query: "SELECT test_case FROM test_plan WHERE status = 'TODO';",
        intro:
          "Lost Paws doesn't have an automated test suite yet. If I were writing its test plan today, these are the cases I'd start with, because they're where a bug would hurt someone:",
        table: {
          columns: ["Test case", "Expected result"],
          rows: [
            ["Pet posted exactly on the edge of someone's alert radius", "Alert sent"],
            ["Pet posted just outside the radius", "No alert"],
            ["Recipient's location is 15 days old", "No alert"],
            ["Recipient has alerts switched off", "No alert"],
            ["The person who posted the pet", "Never alerted about their own pet"],
            ["Trigger call without the webhook secret", "Rejected with 401"],
            ["31st contact lookup within an hour", "Rejected with 429"],
          ],
        },
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
