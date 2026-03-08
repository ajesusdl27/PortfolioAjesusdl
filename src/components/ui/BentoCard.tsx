import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import TechBadge from "./TechBadge";

interface Props {
  title: string;
  description: string;
  tech: string[];
  size: "large" | "medium" | "small";
  github?: string;
  demo?: string;
  index?: number;
}

export default function BentoCard({ title, description, tech, size, github, demo, index = 0 }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 25 });

  // Glow follows mouse
  const glowX = useTransform(mouseX, [0, 1], [0, 100]);
  const glowY = useTransform(mouseY, [0, 1], [0, 100]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small: "md:col-span-1 md:row-span-1",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-2xl
                  bg-gradient-to-br from-white/[0.04] to-white/[0.01]
                  backdrop-blur-2xl border border-white/[0.06]
                  p-6 md:p-8 flex flex-col justify-between gap-5
                  transition-all duration-500
                  hover:border-white/[0.12]
                  hover:shadow-[0_0_60px_rgba(110,231,183,0.06)]
                  ${sizeClasses[size]}`}
    >
      {/* Dynamic glow that follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x}% ${y}%, rgba(110,231,183,0.08), transparent 60%)`
          ),
        }}
      />

      {/* Holographic border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-500"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(110,231,183,0.2), rgba(34,211,238,0.2), rgba(167,139,250,0.2), rgba(110,231,183,0.2))",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
          borderRadius: "inherit",
        }}
      />

      {/* Content */}
      <div className="relative z-10 space-y-3" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            {/* Index label */}
            <span className="font-mono text-[10px] text-accent/40 tracking-[0.3em] uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-heading font-bold text-lg md:text-xl text-white
                          group-hover:text-shimmer transition-all duration-500">
              {title}
            </h3>
          </div>
          <div className="flex gap-2 shrink-0 mt-1">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg
                          border border-white/[0.06] bg-white/[0.02]
                          text-slate-500 hover:text-white hover:border-accent/30
                          hover:bg-accent/5 transition-all duration-300"
                aria-label={`Código fuente de ${title}`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg
                          border border-white/[0.06] bg-white/[0.02]
                          text-slate-500 hover:text-white hover:border-accent/30
                          hover:bg-accent/5 transition-all duration-300"
                aria-label={`Demo en vivo de ${title}`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Tech tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5" style={{ transform: "translateZ(10px)" }}>
        {tech.map((t) => (
          <TechBadge key={t} label={t} />
        ))}
      </div>
    </motion.div>
  );
}
