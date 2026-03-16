"use client";

import { useState, useEffect } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Loader from "@/components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <main className="relative bg-black min-h-screen selection:bg-orange-500/30 selection:text-white">
      {/* Scroll-linked animation section (Home) */}
      <section id="home" className="relative">
        <ScrollyCanvas />
        <Overlay />
      </section>

      {/* About Section */}
      <About />

      {/* Projects Grid below the scroll section */}
      <div id="projects">
        <Projects />
      </div>
      
      {/* Contact & Footer Section */}
      <Contact />
    </main>
    </>
  );
}
