"use client";

import { motion } from "framer-motion";
import TypewriterEffect from "./TypewriterEffect";
import MagneticButton from "./MagneticButton";

const heroHighlight = "Oracle DBA Specialist | Automation Mindset";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 px-6 dark:from-slate-950 dark:via-indigo-950/50 dark:to-purple-950/50"
    >
      {/* Animated cosmic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 animate-float rounded-full bg-indigo-400 opacity-20 blur-xl mix-blend-multiply"></div>
        <div
          className="absolute -bottom-40 -left-40 h-80 w-80 animate-float rounded-full bg-violet-400 opacity-20 blur-xl mix-blend-multiply"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-fuchsia-400 opacity-20 blur-xl mix-blend-multiply"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex w-full max-w-3xl flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mb-6 flex w-full justify-center lg:justify-start"
          >
            <span className="inline-flex max-w-full items-center justify-center rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-indigo-600 shadow-sm shadow-indigo-500/10 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-indigo-200 sm:px-5 sm:text-[0.68rem] sm:tracking-[0.4em]">
              {heroHighlight}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-500 dark:text-slate-400"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-2 text-5xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-7xl"
          >
            <span className="gradient-text">Seán Hogan</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 min-h-[2.5rem] text-xl font-medium text-slate-700 dark:text-slate-200 md:min-h-[3.5rem] md:text-3xl"
          >
            <TypewriterEffect
              words={[
                "Performance Tuning Expert",
                "Oracle Database Administrator",
                "High Availability Specialist",
                "Backup & Recovery Pro",
              ]}
              className="gradient-text"
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base"
          >
            Managing and optimizing enterprise Oracle databases with 5 years of hands-on experience.
            I focus on dependable administration, evidence-led performance tuning, and high availability setups that keep businesses moving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-300 sm:text-sm lg:justify-start"
          >
            <span className="inline-flex items-center rounded-full border border-indigo-200/70 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-500/20 dark:text-indigo-200">
              5+ Years In Ops
            </span>
            <span className="max-w-xl text-center leading-relaxed lg:text-left">
              Evidence-led Oracle administration with an automation-first mindset and steady on-call reliability.
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <MagneticButton
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-7 py-3 text-base font-semibold text-white shadow-md shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full border border-slate-200 px-7 py-3 text-base font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-slate-900 dark:border-slate-700 dark:text-white"
            >
              Get In Touch
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-10"
          >
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/se%C3%A1n-hogan-378b54127/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/90 text-blue-600 shadow-sm shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/90 text-slate-900 shadow-sm shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="mailto:sean@example.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/90 text-red-600 shadow-sm shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-gray-400 dark:border-gray-600">
          <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-gray-600 dark:bg-gray-400"></div>
        </div>
      </motion.div>
    </section>
  );
}


