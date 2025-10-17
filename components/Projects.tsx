"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CleanProjectCard from "./CleanProjectCard";
import MagneticButton from "./MagneticButton";

const projects = [
  {
    title: "BabySteps - iOS Baby Tracking App",
    description:
      "A fully native SwiftUI experience for tracking growth, milestones, and daily activities. Features CloudKit family sharing, Apple Sign In, and a zero-dependency architecture built for maintainability.",
    technologies: ["Swift", "SwiftUI", "CloudKit", "Core Data", "iOS"],
    highlights: [
      "15,000+ lines of handcrafted Swift",
      "Family sharing with real-time sync",
      "Lock screen sleep timer widgets",
      "Offline-first persistence with Core Data",
    ],
    link: "https://github.com/hoganSean99/baby-steps-ios",
  },
  {
    title: "AI-Powered Server Monitoring via Telegram",
    description:
      "Self-hosted Ubuntu infrastructure managed through natural language conversations. An N8N orchestrated workflow uses OpenAI tooling to interpret intents, execute shell commands, and stream results back through Telegram.",
    technologies: ["Ubuntu Server", "N8N", "OpenAI", "Telegram Bot", "Bash"],
    highlights: [
      "Conversational server queries and actions",
      "Real-time telemetry surfaced in chat",
      "Secure command execution with audit trail",
      "Composable automation using N8N workflows",
    ],
  },
  {
    title: "EduManage - Intelligent School Platform",
    description:
      "Next.js 15 platform for school operations with Skye, an AI assistant that supports exam creation, attendance, analytics, and role-based workflows. Built with PostgreSQL, Prisma, and hardened authentication.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth"],
    highlights: [
      "AI-powered operational assistant (Skye)",
      "Exam lifecycle automation end to end",
      "Granular role-based access control",
      "Security posture with encryption and audit logging",
    ],
  },
];

export default function Projects() {
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

    const element = document.getElementById("projects");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 px-6 py-20 dark:from-black dark:via-slate-950 dark:to-slate-900"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-96 -translate-y-1/2 bg-gradient-to-r from-indigo-500/10 via-transparent to-fuchsia-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center text-center">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400 sm:text-xs">
              Personal Builds
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:mt-4 sm:text-5xl md:text-6xl">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              A selection of systems and products where Oracle discipline meets thoughtful engineering.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <CleanProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-col items-center gap-4 text-center"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Want to dive deeper into code, architecture decisions, or operations stories?
            </p>
            <MagneticButton
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:text-base"
            >
              Get In Touch
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
