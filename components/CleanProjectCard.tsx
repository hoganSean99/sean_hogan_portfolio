"use client";

import { motion } from "framer-motion";

interface CleanProjectCardProps {
  project: {
    title: string;
    category: string;
    description: string;
    technologies: string[];
    highlights: string[];
    link?: string;
  };
  index: number;
}

export default function CleanProjectCard({ project, index }: CleanProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-lg shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-400/70 hover:shadow-2xl dark:border-white/10 dark:bg-slate-950/70">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 via-transparent to-fuchsia-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] transition-colors ${
              project.category === "Professional"
                ? "border-blue-200/60 bg-blue-50 text-blue-600 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200"
                : "border-purple-200/60 bg-purple-50 text-purple-600 dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-200"
            }`}
          >
            {project.category}
          </span>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 transition-all duration-300 hover:border-indigo-400/70 hover:text-indigo-500 dark:border-white/10 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
            >
              View
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        <div className="relative mt-4 space-y-4">
          <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300/80">
            {project.description}
          </p>

          <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-4 text-left shadow-sm dark:border-white/10 dark:bg-white/5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Highlights
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition-colors duration-300 group-hover:border-indigo-400/50 group-hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
