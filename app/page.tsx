"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import ParticlesBackground from "@/components/ParticlesBackground";
import ScrollProgress from "@/components/ScrollProgress";
import StarField from "@/components/StarField";
import CosmicGradients from "@/components/CosmicGradients";
import OrbitalElements from "@/components/OrbitalElements";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <ScrollProgress />
      <CustomCursor />
      <CosmicGradients />
      <OrbitalElements />
      <StarField />
      <ParticlesBackground />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
