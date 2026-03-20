import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactElement } from "react";
import { skillCategories, type SkillCategory } from "../../data/skills";
import TechBadge from "../ui/TechBadge";

const revealEase = [0.215, 0.61, 0.355, 1] as const;

/* ── SVG Icons by category ── */
const icons: Record<string, ReactElement> = {
  mobile: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  server: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="6" rx="2" />
      <rect x="2" y="15" width="20" height="6" rx="2" />
      <line x1="2" y1="12" x2="22" y2="12" strokeDasharray="3 3" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  terminal: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="6 9 10 12 6 15" />
      <line x1="13" y1="15" x2="18" y2="15" />
    </svg>
  ),
};

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: revealEase },
  },
};

/* ── Marquee row for skills ── */
function SkillMarquee({ skills, reverse, speed = 25 }: { skills: string[]; reverse?: boolean; speed?: number }) {
  // Duplicate for seamless loop
  const doubled = [...skills, ...skills];
  const duration = skills.length * speed / 8;

  return (
    <div className="marquee-container">
      <div
        className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((skill, i) => (
          <TechBadge key={`${skill}-${i}`} label={skill} />
        ))}
      </div>
    </div>
  );
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const isReverse = index % 2 !== 0;

  return (
    <motion.div
      variants={cardVariant}
      className="group relative glass-card holo-border p-6 space-y-5 overflow-hidden"
    >
      {/* Glow bg on hover */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${category.color}
                    opacity-0 group-hover:opacity-[0.08] blur-[60px] transition-opacity duration-700`}
      />

      {/* Header */}
      <div className="relative flex items-center gap-3">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl
                        bg-gradient-to-br ${category.color} bg-opacity-10
                        border border-white/[0.06] text-white`}>
          {icons[category.icon]}
        </div>
        <div>
          <h3 className="font-heading font-semibold text-white text-sm tracking-tight">
            {category.name}
          </h3>
          <p className="font-mono text-[11px] text-slate-400">
            {category.skills.length} habilidades
          </p>
        </div>
      </div>

      {/* Skills — infinite marquee ticker */}
      <div className="relative">
        <SkillMarquee skills={category.skills} reverse={isReverse} />
      </div>

      {/* Bottom line accent */}
      <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full
                       bg-gradient-to-r ${category.color} transition-all duration-700 ease-out`} />
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="section-divider w-full absolute top-0" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: revealEase }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-accent/60 tracking-[0.25em] uppercase mb-3">
            / Habilidades
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
            Stack <span className="text-shimmer">tecnológico</span>
          </h2>
          <p className="text-slate-500 max-w-md text-sm">
            Tecnologías y herramientas que uso para convertir ideas en productos pulidos y de alto rendimiento.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {skillCategories.map((category, i) => (
            <SkillCard key={category.name} category={category} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
