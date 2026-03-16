"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, Github, Linkedin, FileText, ExternalLink, Settings } from "lucide-react";
import Link from "next/link";
import AdminLogin from "./AdminLogin";

export default function Contact() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="contact" className="relative w-full bg-[#111116] text-neutral-300 py-32 px-6 md:px-24 xl:px-48 overflow-hidden z-20 border-t border-white/5">
      
      {/* Background glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9541]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-[#FF9541]/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#FF9541]/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <ContactCard 
            icon={<Mail className="text-white w-6 h-6" />}
            title="Email"
            subtitle="Best way to reach me"
            linkText="arnavgarhwal247"
            href="mailto:arnavgarhwal247@nhitm.ac.in"
          />
          <ContactCard 
            icon={<Github className="text-white w-6 h-6" />}
            title="GitHub"
            subtitle="Check out my code"
            linkText="github.com/Arnavgarhwal"
            href="https://github.com/Arnavgarhwal"
          />
          <ContactCard 
            icon={<Linkedin className="text-white w-6 h-6" />}
            title="LinkedIn"
            subtitle="Let's connect professionally"
            linkText="in/arnavgarhwal"
            href="https://linkedin.com/in/arnavgarhwal/"
          />
        </div>

        {/* Resume Card */}
        <motion.div 
          variants={itemVariants}
          className="relative bg-transparent border border-white/5 rounded-xl p-10 overflow-hidden group flex flex-col items-center justify-center text-center shadow-lg transition-colors hover:bg-white/[0.02]"
        >
          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6">
            <FileText className="text-[#FF9541] w-6 h-6" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">Resume</h3>
          <p className="text-neutral-500 text-sm mb-8">
            View or download my resume for a full overview of my experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/sequence/resume.pdf"
              target="_blank"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#FF9541] hover:bg-[#ffb070] text-black font-semibold rounded-full transition-colors shadow-[0_0_15px_rgba(255,149,65,0.3)]"
            >
              View Resume <ExternalLink size={16} />
            </Link>
            <a 
              href="/sequence/resume.pdf"
              download="Arnav_Garhwal_Resume.pdf"
              className="px-6 py-2.5 bg-transparent border border-white/10 hover:bg-white/5 text-white font-medium rounded-full transition-colors"
            >
              Download
            </a>
          </div>
        </motion.div>

        {/* Footer Text & Admin Trigger */}
        <motion.div variants={itemVariants} className="mt-24 flex flex-col md:flex-row items-center justify-between text-neutral-600 text-sm">
          <p>
            © {new Date().getFullYear()} Arnav. All rights reserved.
          </p>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="p-2 mt-4 md:mt-0 opacity-20 hover:opacity-100 transition-opacity"
            title="Admin Login"
          >
            <Settings size={18} />
          </button>
        </motion.div>

      </motion.div>

      {/* Admin Overlay Module */}
      <AdminLogin 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onSuccess={() => {
          setIsAdminOpen(false);
          // Force a soft reload to let other components pick up the new localStorage state
          window.location.reload();
        }}
      />
    </section>
  );
}

function ContactCard({ 
  icon, title, subtitle, linkText, href 
}: { 
  icon: React.ReactNode, title: string, subtitle: string, linkText: string, href: string 
}) {
  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      } as Variants}
      className="group relative bg-[#13131A] border border-white/5 rounded-xl p-6 overflow-hidden transition-all duration-300 hover:border-white/10 hover:-translate-y-1 block"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <ExternalLink className="text-neutral-600 w-4 h-4 group-hover:text-white transition-colors" />
      </div>
      
      <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
      <p className="text-neutral-500 text-xs font-medium mb-4">{subtitle}</p>
      
      <span className="text-[#FF9541] text-sm font-medium group-hover:underline decoration-[#FF9541]/50 underline-offset-4">
        {linkText}
      </span>
    </motion.a>
  );
}
