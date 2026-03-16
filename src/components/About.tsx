"use client";

import { motion, Variants } from "framer-motion";
import { 
  Code2, MonitorSmartphone, LayoutTemplate, Database, 
  Terminal, Sparkles, Server, Figma, Cpu, Layers 
} from "lucide-react";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="relative w-full bg-[#111116] text-neutral-300 py-32 px-6 md:px-24 xl:px-48 overflow-hidden z-20">
      {/* Background Decor */}
      <div className="absolute top-40 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-3">
            Hey, I&apos;m Arnav Garhwal
          </h2>
          <h3 className="text-xl md:text-2xl font-medium text-orange-400 mb-8">
            B.Tech Computer Science & Design Student.
          </h3>
          
          <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p>
              I am a specialized <span className="text-orange-300 font-medium">Computer Science and Design</span> student at New Horizon Institute of Technology and Management, with a focus on practical problem-solving and strategic thinking.
            </p>
            <p>
              I am highly proficient in <span className="text-orange-300 font-medium">Node.js and React</span>, bringing strong skills in time management and user interface design to develop engaging, accessible software solutions.
            </p>
            <p>
              With hands-on experience as a Project Intern, I excel in code optimization and debugging, and I&apos;m deeply committed to collaborating within dynamic teams to push the boundaries of application performance.
            </p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <h4 className="flex items-center text-3xl font-bold text-white mb-8">
            <span className="text-orange-500 mr-3">/</span> Skills
          </h4>

          <div className="space-y-8">
            <SkillCategory 
              title="Frontend & UI" 
              skills={[
                { name: "React / Next.js", icon: <LayoutTemplate size={16} /> },
                { name: "React Native", icon: <MonitorSmartphone size={16} /> },
                { name: "UI Design", icon: <Figma size={16} /> },
                { name: "Tailwind CSS", icon: <Sparkles size={16} /> },
              ]}
            />
            <SkillCategory 
              title="Backend & Languages" 
              skills={[
                { name: "Node.js", icon: <Server size={16} /> },
                { name: "Python", icon: <Terminal size={16} /> },
                { name: "C / C++", icon: <Code2 size={16} /> },
                { name: "MySQL", icon: <Database size={16} /> },
              ]}
            />
            <SkillCategory 
              title="Tools & Extra" 
              skills={[
                { name: "Vite", icon: <Layers size={16} /> },
                { name: "Cursor / VS Code", icon: <Cpu size={16} /> },
                { name: "AutoCAD", icon: <LayoutTemplate size={16} /> },
              ]}
            />
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div variants={itemVariants}>
          <h4 className="flex items-center text-3xl font-bold text-white mb-8">
            <span className="text-orange-500 mr-3">/</span> Experience
          </h4>

          <div className="relative border-l border-neutral-800 ml-3 space-y-12 pb-10">
            
            <TimelineItem 
              role="Project Intern"
              company="Consisty System"
              date="Jun 2025 — Jul 2025"
              isLatest={true}
              bullets={[
                "Collaborated with developers to design and implement software applications using Java, Python, Node.js, and React.",
                "Enhanced application performance through code optimization and debugging efforts.",
                "Developed user-friendly interfaces to improve user experience and accessibility.",
                "Developed project plans and timelines to ensure completion of tasks on time."
              ]}
            />

            <TimelineItem 
              role="Volunteer (HR Team)"
              company="Job Fair"
              date="2024"
              bullets={[
                "Volunteered at the Job Fair in HR Team, gaining experience in event management and professional interaction."
              ]}
            />

            <TimelineItem 
              role="Volunteer"
              company="National Service Scheme (NSS)"
              date="2024 — Present"
              bullets={[
                "Assisted with special events and programs, maintaining clean and operational facilities.",
                "Supported engaging, fun, and smooth-running events by helping with organization and planning.",
                "Used strong interpersonal communication skills to convey information to others."
              ]}
            />

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}

function SkillCategory({ title, skills }: { title: string, skills: { name: string, icon: React.ReactNode }[] }) {
  return (
    <div>
      <h5 className="text-white font-semibold mb-4">{title}</h5>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-300 hover:border-neutral-600 transition-colors"
          >
            <span className="text-neutral-500">{skill.icon}</span>
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ 
  role, company, date, bullets, isLatest = false 
}: { 
  role: string, company: string, date: string, bullets: string[], isLatest?: boolean 
}) {
  return (
    <div className="relative pl-8 md:pl-10">
      {/* Timeline Dot */}
      <div className={`absolute left-0 top-2 -translate-x-[5px] w-[9px] h-[9px] rounded-full ${isLatest ? 'bg-orange-500' : 'bg-neutral-600'}`}>
        {isLatest && (
          <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-40" />
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
        <div>
          <h5 className="text-lg font-bold text-white">{role}</h5>
          <span className="text-orange-400 font-medium">{company}</span>
        </div>
        <span className="text-sm text-neutral-500 font-mono bg-neutral-900/50 px-3 py-1 rounded-full border border-neutral-800/50 block w-fit">
          {date}
        </span>
      </div>

      <ul className="mt-4 space-y-3">
        {bullets.map((bullet, i) => (
          <li key={i} className="text-neutral-400 text-sm md:text-base leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-neutral-700 before:rounded-full">
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
