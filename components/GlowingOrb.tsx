"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlowingOrb() {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Skip on mobile
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ x, y }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Main orb */}
        <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-fuchsia-500/20 blur-3xl" />

        {/* Orbital rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 border border-indigo-500/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 border border-purple-500/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 border border-fuchsia-500/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
}
