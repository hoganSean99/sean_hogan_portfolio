"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const highlightCards = [
  {
    title: "Strengths",
    points: [
      "Performance tuning & execution plans",
      "Backup, recovery & standby design",
      "Proactive observability practices",
    ],
  },
  {
    title: "Working Style",
    points: [
      "Calm during incidents",
      "Transparent status updates",
      "Automation before repetition",
    ],
  },
  {
    title: "Collaboration",
    points: [
      "Partnering with dev teams early",
      "Sharing postmortems & learnings",
      "Mentoring junior DBAs",
    ],
  },
];

const statCards = [
  {
    label: "Experience",
    value: "5+ years",
    note: "Enterprise Oracle environments",
  },
  {
    label: "Focus Areas",
    value: "Performance & Resilience",
    note: "Tuning, HA, and recovery strategy",
  },
  {
    label: "Tooling",
    value: "Oracle, ASM, Linux, Bash, Python",
    note: "Automation-first approach",
  },
  {
    label: "Availability",
    value: "Open to collaborations",
    note: "Remote-friendly & US/EU overlap",
  },
];

const metrics = [
  {
    value: "99%",
    label: "Change success aligned to SLA",
    colors: "from-indigo-600 to-blue-600",
  },
  {
    value: "24/7",
    label: "On-call support with calm comms",
    colors: "from-purple-600 to-fuchsia-600",
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center bg-white px-6 py-16 sm:py-20 lg:py-24 dark:bg-black"
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400 sm:text-xs">
              Behind The Databases
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              DBA by trade, collaborator by nature. I keep Oracle workloads healthy while building the
              relationships that make shipping software feel effortless.
            </p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-7 text-left"
            >
              <div className="space-y-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                <p>
                  I&apos;m Sean, an Oracle Database Administrator who has spent the last{" "}
                  <span className="font-semibold text-indigo-500 dark:text-indigo-300">5+ years</span> shepherding
                  mission-critical data platforms. My comfort zone sits where solid processes meet human-first
                  collaboration, pairing clear runbooks with open communication so teams always know what is happening
                  and why.
                </p>
                <p>
                  Day to day you'll find me orchestrating backup and recovery strategies, tuning SQL with AWR and ASH
                  insights, and hardening environments using Linux, Bash, and Python automation. I love closing feedback
                  loops quickly: observe, tune, document, and share.
                </p>
                <p>
                  Outside the pager, I invest in continuous learning, experimenting with AI copilots, refining
                  playbooks, and mentoring newer DBAs. The goal stays the same: stable systems, confident teams, and data
                  that delivers measurable business value.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlightCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-slate-200/70 bg-white px-4 py-4 text-left shadow-sm shadow-indigo-500/10 dark:border-white/10 dark:bg-white/5 sm:px-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-300">
                      {card.title}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {card.points.map((point) => (
                        <li key={point}>- {point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-lg shadow-indigo-500/10 backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-7 lg:p-8">
                <div className="grid gap-5">
                  {statCards.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-1 rounded-2xl border border-slate-200/60 bg-white/70 px-4 py-3 text-left shadow-sm dark:border-white/10 dark:bg-white/5"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                        {item.label}
                      </span>
                      <span className="text-lg font-semibold text-slate-900 dark:text-white">{item.value}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-300">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className={`rounded-2xl bg-gradient-to-br ${metric.colors} p-5 text-center text-white shadow-lg shadow-indigo-500/20 transition-transform hover:-translate-y-1 sm:p-6`}
                  >
                    <div className="text-2xl font-semibold sm:text-3xl">{metric.value}</div>
                    <div className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] opacity-80 sm:text-xs">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
