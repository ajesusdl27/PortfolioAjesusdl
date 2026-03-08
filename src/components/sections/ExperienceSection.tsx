import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "../../data/experience";
import TechBadge from "../ui/TechBadge";

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      <div className="section-divider w-full absolute top-0" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-accent/60 tracking-[0.25em] uppercase mb-3">
            / Experiencia
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
            Experiencia <span className="text-shimmer">actual</span>
          </h2>
          <p className="text-slate-500 max-w-md text-sm">
            Mi experiencia actual desarrollando proyectos freelance para clientes con Flutter y Astro.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated beam line */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px overflow-hidden">
            <div className="w-full h-full bg-white/[0.04]" />
            <div className="absolute top-0 left-0 w-full h-32 beam-line" />
          </div>

          <div className="space-y-16">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  initial={{
                    opacity: 0,
                    x: isLeft ? -50 : 50,
                    filter: "blur(6px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.12,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className={`relative pl-12 md:pl-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                  }`}
                >
                  {/* Timeline dot with pulse */}
                  <div
                    className={`absolute top-3
                                left-[12px] md:left-auto
                                ${isLeft ? "md:right-[-calc(50%+6px)]" : "md:left-[-calc(50%+6px)]"}
                                md:right-auto`}
                    style={{
                      ...(isLeft
                        ? { right: undefined, left: "12px" }
                        : {}),
                    }}
                  >
                    {/* Outer pulse ring */}
                    <div className="absolute inset-[-4px] rounded-full bg-accent/20 animate-ping" style={{ animationDuration: "3s" }} />
                    {/* Inner dot */}
                    <div className="relative w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(110,231,183,0.5)]" />
                  </div>

                  {/* Desktop: reposition dot to center line */}
                  <div className={`hidden md:block absolute top-3 ${
                    isLeft ? "right-[-2.9rem]" : "left-[-2.9rem]"
                  }`}>
                    <div className="relative w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(110,231,183,0.5)]" />
                  </div>

                  {/* Card */}
                  <div className="glass-card holo-border p-6 space-y-3 group">
                    {/* Period + role */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] text-accent/50 tracking-[0.2em] uppercase">
                        {exp.period}
                      </span>
                      <h3 className="font-heading font-bold text-white text-lg group-hover:text-shimmer transition-all duration-500">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs text-slate-500">
                        {exp.company}
                      </p>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.tech.map((t) => (
                        <TechBadge key={t} label={t} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
