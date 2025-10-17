"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CosmicGradients() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Deep space nebula gradient - top right */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 dark:opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.3) 30%, transparent 70%)",
        }}
        animate={isMobile ? {} : {
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple nebula - middle left - Skip on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute top-1/3 -left-64 w-[700px] h-[700px] rounded-full opacity-15 dark:opacity-25 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(219, 39, 119, 0.3) 30%, transparent 70%)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Blue cosmic dust - bottom center */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[900px] h-[900px] rounded-full opacity-10 dark:opacity-20 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(96, 165, 250, 0.2) 30%, transparent 70%)",
        }}
        animate={isMobile ? {} : {
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pink nebula and distant galaxy - Skip on mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-10 dark:opacity-15 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(251, 113, 133, 0.2) 30%, transparent 70%)",
            }}
            animate={{
              x: [0, -25, 0],
              y: [0, 35, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-5 dark:opacity-10 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(147, 197, 253, 0.5) 0%, rgba(191, 219, 254, 0.3) 30%, transparent 70%)",
            }}
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  );
}
