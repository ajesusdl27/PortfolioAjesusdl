import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BentoCard from "../ui/BentoCard";

interface Project {
  slug: string;
  data: {
    title: string;
    description: string;
    tech: string[];
    bentoSize: "large" | "medium" | "small";
    github?: string;
    demo?: string;
  };
}

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="section-divider w-full absolute top-0" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent-purple/[0.03] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-accent/60 tracking-[0.25em] uppercase mb-3">
            / Proyectos
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
            Trabajo <span className="text-shimmer">destacado</span>
          </h2>
          <p className="text-slate-500 max-w-md text-sm">
            Una selección de proyectos que muestra mi experiencia en Flutter
            y desarrollo web.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(220px,auto)]">
          {projects.map((project, i) => (
            <BentoCard
              key={project.slug}
              title={project.data.title}
              description={project.data.description}
              tech={project.data.tech}
              size={project.data.bentoSize}
              github={project.data.github}
              demo={project.data.demo}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
