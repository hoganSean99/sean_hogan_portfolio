"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function OrbitalElements() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Disable orbital elements on mobile for performance
  if (isMobile) return null;

  // Create subtle orbital ring decorations
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Orbital ring 1 - Large, slow rotation */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 dark:bg-blue-400/30 blur-sm" />
        <div className="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-400/20 dark:bg-purple-400/30 blur-sm" />
      </motion.div>

      {/* Orbital ring 2 - Medium, moderate rotation */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute top-1/2 right-0 w-1.5 h-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/20 dark:bg-pink-400/30 blur-sm" />
        <div className="absolute top-1/2 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/20 dark:bg-indigo-400/30 blur-sm" />
      </motion.div>

      {/* Orbital ring 3 - Small, faster rotation */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-cyan-400/20 dark:bg-cyan-400/30 blur-sm" />
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full bg-violet-400/20 dark:bg-violet-400/30 blur-sm" />
      </motion.div>

      {/* Floating cosmic dust particles */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full bg-blue-300/10 dark:bg-blue-300/20 blur-md"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-purple-300/10 dark:bg-purple-300/20 blur-md"
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-2/3 right-1/4 w-2.5 h-2.5 rounded-full bg-pink-300/10 dark:bg-pink-300/20 blur-md"
        animate={{
          y: [0, -35, 0],
          x: [0, 30, 0],
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
