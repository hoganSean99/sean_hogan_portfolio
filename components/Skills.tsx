"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Capability = {
  title: string;
  summary: string;
  callouts: string[];
  icon: JSX.Element;
};

type Toolbelt = {
  label: string;
  items: string[];
};

type Metric = {
  label: string;
  value: string;
  note: string;
  colors: string;
};

const capabilities: Capability[] = [
  {
    title: "Oracle Operations",
    summary: "Daily stewardship of 19c/23ai estates with automation-first checklists.",
    callouts: [
      "Provisioning, patching, and ASM storage management",
      "Runbooks for incident handling and post-incident reviews",
      "Security baselines aligned with CIS controls",
    ],
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 9h18" />
        <path d="M7 13h6" />
        <path d="M7 17h10" />
      </svg>
    ),
  },
  {
    title: "Performance & Reliability",
    summary: "Evidence-led tuning backed by observability and HA design.",
    callouts: [
      "AWR/ASH deep dives and execution plan coaching",
      "Data Guard and backup strategies tested with drills",
      "OEM Performance Hub insights and tuned alert rules",
    ],
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M12 3v4" />
        <path d="M12 17v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M3 12h4" />
        <path d="M17 12h4" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Automation & Collaboration",
    summary: "Glue work that keeps environments reproducible and teams aligned.",
    callouts: [
      "Linux/Bash/Python tooling for drift detection and audits",
      "Documentation and status updates baked into delivery",
      "Mentoring and pairing to uplevel DBA best practices",
    ],
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M5 3h14l2 4H3l2-4z" />
        <path d="M3 7h18v13H3z" />
        <path d="M9 11h6" />
        <path d="M9 15h4" />
      </svg>
    ),
  },
];

const toolbelts: Toolbelt[] = [
  {
    label: "Core Stack",
    items: ["Oracle 19c/23ai", "ASM", "OEM", "RMAN", "Data Guard"],
  },
  {
    label: "Performance Toolkit",
    items: ["AWR & ASH", "SQL Trace", "OEM Performance Hub", "Baseline alerts"],
  },
  {
    label: "Automation",
    items: ["Linux", "Bash", "Python", "Ansible", "n8n"],
  },
];

const metrics: Metric[] = [
  {
    label: "Change success",
    value: "99%",
    note: "Deployments aligned with SLOs through pre-flight checks",
    colors: "from-indigo-600 to-blue-600",
  },
  {
    label: "On-call",
    value: "24/7",
    note: "Calm, transparent communication when incidents strike",
    colors: "from-purple-600 to-fuchsia-600",
  },
  {
    label: "Automation coverage",
    value: "80%",
    note: "Repeatable tasks scripted and version-controlled",
    colors: "from-emerald-600 to-teal-600",
  },
];

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("skills");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-6 py-20 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-full -translate-x-1/2 bg-gradient-to-t from-white/70 to-transparent dark:from-slate-950/70" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400 sm:text-xs">
              Day-To-Day Toolkit
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              The capabilities I lean on most to keep Oracle workloads stable, observable, and ready to grow.
              Clear, repeatable patterns over sprawling bullet lists.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((capability, index) => (
              <motion.article
                key={capability.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 * index }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-lg shadow-indigo-500/10 backdrop-blur dark:border-white/10 dark:bg-slate-950/60"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 text-indigo-600 shadow-md shadow-indigo-500/20 dark:border-white/10 dark:bg-white/10 dark:text-indigo-200">
                      {capability.icon}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">{capability.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300/80">{capability.summary}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    {capability.callouts.map((callout) => (
                      <li key={callout} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
                        <span>{callout}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {toolbelts.map((group) => (
              <div
                key={group.label}
                className="rounded-2xl border border-slate-200/60 bg-white/80 px-5 py-4 text-center shadow-md shadow-indigo-500/10 backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid gap-4 md:grid-cols-3"
          >
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className={`rounded-2xl bg-gradient-to-br ${metric.colors} p-6 text-center text-white shadow-lg shadow-indigo-500/20`}
              >
                <p className="text-3xl font-semibold">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em]">{metric.label}</p>
                <p className="mt-3 text-xs text-white/80">{metric.note}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
