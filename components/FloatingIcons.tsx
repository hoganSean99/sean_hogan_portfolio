"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingIcons() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Disable on mobile for performance
  if (isMobile) return null;

  const icons = [
    // Database icons
    { icon: "🗄️", x: "10%", y: "20%", delay: 0, duration: 20 },
    { icon: "⚡", x: "85%", y: "15%", delay: 2, duration: 18 },
    { icon: "🔒", x: "15%", y: "70%", delay: 1, duration: 22 },
    { icon: "📊", x: "90%", y: "65%", delay: 3, duration: 19 },
    { icon: "🚀", x: "80%", y: "40%", delay: 1.5, duration: 21 },
    { icon: "⚙️", x: "20%", y: "45%", delay: 2.5, duration: 23 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20 dark:opacity-10"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.2, 0.2, 0],
            scale: [0, 1, 1, 0],
            y: [0, -100],
            rotate: [0, 360],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
}
