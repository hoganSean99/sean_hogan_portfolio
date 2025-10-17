"use client";

import { motion } from "framer-motion";

export default function MorphingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
