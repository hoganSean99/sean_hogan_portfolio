"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";

interface ProjectCard3DProps {
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

export default function ProjectCard3D({ project, index }: ProjectCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-[450px] cursor-pointer"
    >
      {/* Holographic glow effect */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-1000"
        animate={isHovered ? { opacity: 0.75 } : { opacity: 0 }}
      />

      {/* Front of card */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="absolute inset-0 backface-hidden"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="relative h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-3xl p-8 shadow-2xl border border-white/20 backdrop-blur-xl overflow-hidden">
          {/* Animated mesh gradient background */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: `radial-gradient(circle at ${mouseXSpring}% ${mouseYSpring}%, rgba(59, 130, 246, 0.3), transparent 50%)`,
              }}
            />
          </div>

          {/* Category badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
              project.category === "Professional"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
            }`}
          >
            {project.category}
          </motion.div>

          {/* Title with shimmer effect */}
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white relative">
            <span className="relative z-10">{project.title}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={isHovered ? { x: ["-100%", "200%"] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </h3>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed relative z-10">
            {project.description}
          </p>

          {/* Tech stack with floating animation */}
          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <motion.span
                key={tech}
                whileHover={{ y: -5 }}
                className="px-3 py-1 bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium rounded-full">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Flip indicator */}
          <motion.div
            className="absolute bottom-8 right-8 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold"
            animate={{ opacity: isHovered ? 1 : 0.5 }}
          >
            <span className="text-sm">Click to flip</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </motion.svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Back of card */}
      <motion.div
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="absolute inset-0 backface-hidden"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        <div className="h-full bg-gradient-to-br from-purple-900 to-blue-900 dark:from-purple-950 dark:to-blue-950 rounded-3xl p-8 shadow-2xl border border-white/20 backdrop-blur-xl overflow-hidden">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <h4 className="text-2xl font-bold text-white mb-6 relative z-10">Key Highlights</h4>

          <div className="space-y-3 mb-6 relative z-10">
            {project.highlights.map((highlight, i) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                <span className="text-white/90">{highlight}</span>
              </motion.div>
            ))}
          </div>

          {/* All technologies */}
          <div className="mb-6 relative z-10">
            <h5 className="text-sm font-semibold text-white/70 mb-3">TECHNOLOGIES</h5>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:scale-105 transition-transform relative z-10"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          )}

          {/* Flip back indicator */}
          <motion.div
            className="absolute bottom-8 right-8 flex items-center gap-2 text-white/70 font-semibold"
            animate={{ opacity: isHovered ? 1 : 0.5 }}
          >
            <span className="text-sm">Click to flip back</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
