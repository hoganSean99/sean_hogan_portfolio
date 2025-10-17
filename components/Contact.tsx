"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const contactChannels = [
  {
    label: "Email",
    value: "contact@seanhogan.me",
    href: "mailto:contact@seanhogan.me",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "/in/seán-hogan-378b54127/",
    href: "https://www.linkedin.com/in/seán-hogan-378b54127/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V9h3v10zM6.5 7.75A1.75 1.75 0 116.5 4a1.75 1.75 0 010 3.75zM20 19h-3v-5.4c0-3.2-3-2.97-3 0V19h-3V9h3v1.7c1.4-2.58 6-2.77 6 2.47V19z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Ireland \u2022 Remote-friendly",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-4.5-6-10a6 6 0 1112 0c0 5.5-6 10-6 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  },
];

const contactNotes = [
  {
    value: "24h",
    label: "Typical response time",
    colors: "from-indigo-500 to-indigo-600",
  },
  {
    value: "Partnership",
    label: "Happy to pair or lead projects",
    colors: "from-blue-500 to-sky-600",
  },
];

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-6 py-20 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-20 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-[110%] -translate-x-1/2 bg-gradient-to-t from-white/70 to-transparent dark:from-slate-950/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400 sm:text-xs">
              Let&apos;s Collaborate
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Ready to talk Oracle databases, automation, or resilient systems? Reach out through the channel that works best and I&apos;ll typically reply within a day.
            </p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-lg shadow-indigo-500/10 backdrop-blur dark:border-white/10 dark:bg-white/5 md:p-7">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white md:text-3xl">
                  Contact Information
                </h3>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                  Prefer async communication? Email works best, with follow-up calls arranged once we align on scope.
                </p>
                <div className="mt-6 space-y-4">
                  {contactChannels.map((channel) => (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.href?.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 rounded-2xl border border-slate-200/60 bg-white px-4 py-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/70 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-md shadow-indigo-500/30">
                        {channel.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                          {channel.label}
                        </p>
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-white sm:text-base">
                          {channel.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {contactNotes.map((note) => (
                  <div
                    key={note.label}
                    className={`rounded-2xl bg-gradient-to-br ${note.colors} p-5 text-center text-white shadow-md shadow-indigo-500/20`}
                  >
                    <p className="text-2xl font-semibold">{note.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em]">{note.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 text-left shadow-lg shadow-indigo-500/10 backdrop-blur dark:border-white/10 dark:bg-slate-950/50"
            >
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                How I Can Help
              </h3>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                Whether you need someone to steady an existing Oracle estate, design a resilience plan, or collaborate on automation initiatives, I bring a calm, evidence-led approach.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
                  Reliability reviews, runbooks, and on-call handoffs you can trust.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
                  Performance tuning observability briefs that bring teams along for the ride.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
                  Lightweight automation and documentation to keep operations predictable.
                </li>
              </ul>
              <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
                Send an email with a brief outline and we can schedule a call to dive deeper.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 border-t border-slate-200/70 pt-6 text-center dark:border-white/10"
          >
            <p className="text-xs tracking-[0.3em] text-slate-500 dark:text-slate-400">
              © 2025 Sean Hogan - Crafted with Next.js, TypeScript, Tailwind CSS
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
