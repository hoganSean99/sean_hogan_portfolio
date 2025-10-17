"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollToSection("home")}
          className="text-2xl font-bold text-left text-slate-900 transition-colors hover:text-indigo-500 dark:text-white cursor-none md:cursor-default"
        >
          <span className="gradient-text">SH</span>
        </button>

        <div className="hidden items-center space-x-8 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium transition-colors ${
                link.id === "contact"
                  ? "rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-white shadow-md shadow-indigo-500/20 hover:scale-105 hover:shadow-lg"
                  : "text-slate-600 hover:text-indigo-500 dark:text-slate-300 dark:hover:text-indigo-300"
              } cursor-none md:cursor-default`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden rounded-xl border border-slate-200/60 bg-white/80 p-2 text-slate-700 shadow-sm transition-all dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col space-y-1">
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                isMenuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="mx-6 mb-4 rounded-3xl border border-slate-200/60 bg-white/90 p-4 shadow-lg shadow-indigo-500/10 backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
              <div className="flex flex-col space-y-2 text-center">
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-transform duration-300 ${
                      link.id === "contact"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                        : "bg-white text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-200"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
