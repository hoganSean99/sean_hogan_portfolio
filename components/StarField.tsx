"use client";

import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduce stars on mobile for better performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Disable stars on mobile completely for performance

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }> = [];

    // Create fewer stars
    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
        const opacity = star.opacity * twinkle * 0.5;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Add subtle glow for larger stars
        if (star.size > 1) {
          const gradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.size * 2
          );
          gradient.addColorStop(0, `rgba(147, 197, 253, ${opacity * 0.3})`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60 dark:opacity-40"
    />
  );
}
