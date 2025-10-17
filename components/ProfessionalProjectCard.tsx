"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ProfessionalProjectCardProps {
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

export default function ProfessionalProjectCard({ project, index }: ProfessionalProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-500 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Spotlight effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
          }}
        />

        {/* Animated gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

        <div className="p-8">
          {/* Category badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-md ${
              project.category === "Professional"
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                : "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
            }`}>
              {project.category}
            </span>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>

          {/* Title with gradient on hover */}
          <h3 className="text-xl font-bold mb-3 transition-all duration-300">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-900 dark:from-white dark:to-white group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
              {project.title}
            </span>
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Technologies with stagger animation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 rounded-md hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Expand/Collapse for highlights */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Highlights</h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Expand button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            {isExpanded ? "Show less" : "Show highlights"}
            <motion.svg
              className="w-4 h-4"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
        </div>

        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={false}
          animate={{
            background: [
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            ],
            backgroundPosition: ["-200% 0", "200% 0"],
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Subtle corner glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/10 group-hover:to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
      </div>
    </motion.div>
  );
}
