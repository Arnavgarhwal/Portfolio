"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminDashboard, { ProjectData } from "./AdminDashboard";
import { Edit3 } from "lucide-react";

// Default fallback data if localstorage is empty
const DEFAULT_PROJECTS: ProjectData[] = [
  { id: 1, title: "dwdn", language: "Python", updated: "15/03/2026", hasVisit: false, desc: "" },
  { id: 2, title: "rbdg", language: "C++", updated: "13/03/2026", hasVisit: false, desc: "" },
  { id: 3, title: "robot_dog_ai", language: "Python", updated: "12/03/2026", hasVisit: false, desc: "" },
  { id: 4, title: "yrevash-site", language: "TypeScript", updated: "09/03/2026", hasVisit: true, desc: "" },
  { id: 5, title: "haocr", language: "Python", updated: "01/02/2026", hasVisit: true, desc: "" },
  { id: 6, title: "hyprnote", language: "Python", updated: "30/01/2026", hasVisit: true, desc: "Local-first AI Notepad for Private Meetings" },
  { id: 7, title: "AI_Agent_Verification", language: "Python", updated: "30/01/2026", hasVisit: false, desc: "" },
  { id: 8, title: "qoneqt_agent", language: "Python", updated: "12/01/2026", hasVisit: false, desc: "" },
];

const FILTERS = ["All Projects", "Python", "C++", "TypeScript"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    // We only access localStorage in useEffect so it runs only on the client
    const adminFlag = localStorage.getItem("is_admin") === "true";
    setIsAdmin(adminFlag);

    const savedData = localStorage.getItem("portfolio_projects");
    if (savedData) {
      try {
        setProjects(JSON.parse(savedData));
      } catch {
        setProjects(DEFAULT_PROJECTS);
      }
    } else {
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem("portfolio_projects", JSON.stringify(DEFAULT_PROJECTS));
    }
  }, []);

  const handleSaveProjects = (newProjects: ProjectData[]) => {
    setProjects(newProjects);
    localStorage.setItem("portfolio_projects", JSON.stringify(newProjects));
    setIsEditing(false); // Close dashboard
  };

  const filteredProjects = projects.filter(project => 
    activeFilter === "All Projects" || project.language === activeFilter
  );

  return (
    <section id="projects" className="relative w-full min-h-screen bg-[#111116] text-white px-6 md:px-24 py-32 z-20 overflow-hidden">
      
      {/* Background wireframe decor (similar to image) */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: "radial-gradient(ellipse at top, rgba(255, 153, 51, 0.4), transparent 50%), radial-gradient(ellipse at bottom right, rgba(255, 153, 51, 0.2), transparent 50%)"
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Filters and Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          
          <div className="flex flex-wrap items-center gap-4">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter 
                    ? "bg-[#FF9541] text-black shadow-[0_0_15px_rgba(255,149,65,0.4)]" 
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-orange-500/30 self-start md:self-auto">
             <div className="w-2 h-2 bg-[#FF9541] rounded-full" />
          </div>

        </div>

        <div className="flex items-center justify-between mb-12 border-b-4 border-white pb-2 flex-wrap gap-4">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            All Projects
          </h2>
          {isAdmin && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium text-sm"
            >
              <Edit3 size={16} /> Edit Projects
            </button>
          )}
        </div>

        {/* Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      <AnimatePresence>
        {isEditing && (
          <AdminDashboard 
            projects={projects} 
            onSave={handleSaveProjects} 
            onClose={() => setIsEditing(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectData, index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      // Outer black border and orange inner background
      className="group relative p-1 bg-black rounded-lg overflow-hidden shadow-2xl hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Inner orange container */}
      <div className="bg-[#FF9541] h-full rounded-md p-6 flex flex-col justify-between min-h-[220px]">
        
        <div>
          <h4 className="text-2xl font-black text-black mb-4">
            {project.title}
          </h4>
          
          <div className="inline-block px-3 py-1 bg-[#1A1A24] text-white text-xs font-semibold rounded-full mb-6">
            {project.language}
          </div>

          {project.desc && (
            <p className="text-black/80 font-medium text-sm mb-4">
              {project.desc}
            </p>
          )}

          <p className="text-black/60 text-xs font-medium mb-6">
            Last updated: {project.updated}
          </p>
        </div>

        <div className="flex gap-3 mt-auto">
          {project.hasVisit && (
            <button className="flex-1 py-2 bg-[#1A1A24] hover:bg-black text-white text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-2 border border-black/20 hover:shadow-lg">
              Visit
            </button>
          )}
          <button className="flex-1 py-2 bg-[#1A1A24] hover:bg-black text-white text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-2 border border-black/20 hover:shadow-lg">
            Github
          </button>
        </div>

      </div>
    </motion.div>
  );
}
