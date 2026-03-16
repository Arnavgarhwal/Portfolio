"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Save, Trash2 } from "lucide-react";

export type ProjectData = {
  id: number;
  title: string;
  language: string;
  updated: string;
  hasVisit: boolean;
  desc?: string;
  githubUrl?: string;
  visitUrl?: string;
};

export default function AdminDashboard({ 
  projects, 
  onSave, 
  onClose 
}: { 
  projects: ProjectData[]; 
  onSave: (newProjects: ProjectData[]) => void;
  onClose: () => void;
}) {
  // Local state copy of projects for editing
  const [editingProjects, setEditingProjects] = useState<ProjectData[]>([...projects]);

  const handleUpdateField = (index: number, field: keyof ProjectData, value: string | boolean) => {
    const updated = [...editingProjects];
    updated[index] = { ...updated[index], [field]: value };
    setEditingProjects(updated);
  };

  const handleAddProject = () => {
    const newProject: ProjectData = {
      id: Date.now(), // Unique ID
      title: "New Project",
      language: "React",
      updated: new Date().toLocaleDateString("en-GB"),
      hasVisit: false,
      desc: "Describe your project here..."
    };
    setEditingProjects([newProject, ...editingProjects]);
  };

  const handleDeleteProject = (id: number) => {
    setEditingProjects(editingProjects.filter(p => p.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-[150] bg-[#111116]/95 backdrop-blur-md overflow-y-auto pt-24 pb-12 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white">Project Dashboard</h2>
            <p className="text-neutral-500 mt-1 text-sm">Organize & update your portfolio items</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleAddProject}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium text-sm"
            >
              <Plus size={16} /> Add Project
            </button>
            <button 
              onClick={() => onSave(editingProjects)}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF9541] hover:bg-[#ffb070] text-black rounded-lg transition-colors font-bold text-sm shadow-[0_0_15px_rgba(255,149,65,0.3)]"
            >
              <Save size={16} /> Save Changes
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {editingProjects.map((proj, index) => (
            <div key={proj.id} className="bg-black border border-white/10 rounded-xl p-6 relative group transition-colors focus-within:border-[#FF9541]/50 focus-within:shadow-[0_0_20px_rgba(255,149,65,0.1)]">
              
              <button 
                onClick={() => handleDeleteProject(proj.id)}
                className="absolute top-4 right-4 text-red-500/50 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10"
              >
                <Trash2 size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 pl-1">Project Title</label>
                  <input
                    value={proj.title}
                    onChange={(e) => handleUpdateField(index, "title", e.target.value)}
                    className="w-full bg-[#1A1A24] border border-white/5 rounded-lg px-4 py-2.5 text-white font-bold focus:outline-none focus:border-[#FF9541]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 pl-1">Primary Language</label>
                  <input
                    value={proj.language}
                    onChange={(e) => handleUpdateField(index, "language", e.target.value)}
                    className="w-full bg-[#1A1A24] border border-white/5 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FF9541]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 pl-1">Description</label>
                  <textarea
                    value={proj.desc || ""}
                    onChange={(e) => handleUpdateField(index, "desc", e.target.value)}
                    rows={2}
                    className="w-full bg-[#1A1A24] border border-white/5 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FF9541] resize-none"
                  />
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-3 bg-[#1A1A24] p-3 rounded-lg border border-white/5 w-max">
                  <input 
                    type="checkbox" 
                    checked={proj.hasVisit}
                    onChange={(e) => handleUpdateField(index, "hasVisit", e.target.checked)}
                    className="w-4 h-4 accent-[#FF9541]"
                    id={`visit-${proj.id}`}
                  />
                  <label htmlFor={`visit-${proj.id}`} className="text-sm font-medium text-neutral-300 select-none cursor-pointer">
                    Enable &quot;Visit&quot; Button
                  </label>
                </div>
                
              </div>
            </div>
          ))}

          {editingProjects.length === 0 && (
            <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl text-neutral-500">
              No projects found. Click Add Project to start.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
