import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useMagneticHover } from "../../hooks/useMagneticHover";

/* ── Character-by-character reveal ── */
function AnimatedLetters({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Magnetic CTA Button ── */
function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagneticHover(0.4);

  const primary =
    "bg-gradient-to-r from-accent to-accent-secondary text-base font-semibold shadow-[0_0_30px_rgba(110,231,183,0.3)] hover:shadow-[0_0_50px_rgba(110,231,183,0.5)]";
  const secondary =
    "border border-white/10 text-white hover:border-accent/40 hover:bg-accent/5";

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm transition-all duration-500 ${
        variant === "primary" ? primary : secondary
      }`}
    >
      {children}
    </motion.a>
  );
}

/* ── Orbit Ring ── */
function OrbitRing({ size, duration, delay, dotCount }: {
  size: number; duration: number; delay: number; dotCount: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay }}
      className="absolute top-1/2 left-1/2 rounded-full border border-white/[0.03]"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
    >
      {Array.from({ length: dotCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/40"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
            delay: (duration / dotCount) * i,
          }}
        >
          <div
            className="absolute w-1 h-1 rounded-full bg-accent/40"
            style={{ transform: `translateX(${size / 2}px) translateY(-50%)` }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Status badge ── */
function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                 border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
      <span className="font-mono text-xs text-slate-400 tracking-wider uppercase">
        Disponible para trabajar
      </span>
    </motion.div>
  );
}

/* ── Mouse Glow Follow ── */
function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    function handleMove(e: globalThis.MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[2] hidden md:block"
      style={{
        background: useTransform(
          [smoothX, smoothY],
          ([x, y]) =>
            `radial-gradient(600px circle at ${x}px ${y}px, rgba(110,231,183,0.04), transparent 60%)`
        ),
      }}
    />
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Orbit rings */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <OrbitRing size={500} duration={30} delay={0.5} dotCount={3} />
        <OrbitRing size={700} duration={45} delay={0.8} dotCount={4} />
        <OrbitRing size={900} duration={60} delay={1.1} dotCount={5} />
      </div>

      {/* Radial glows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[150px]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4"
      >
        <div className="w-[300px] h-[300px] rounded-full bg-accent-secondary/[0.05] blur-[120px]" />
      </motion.div>

      {/* Mouse glow */}
      <MouseGlow />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="mb-8">
          <StatusBadge />
        </div>

        {/* Name — character reveal */}
        <div className="mb-4 overflow-hidden">
          <h1 className="font-heading font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white leading-[0.9]">
            <AnimatedLetters text="Antonio" delay={0.3} className="text-shimmer" />
            <br className="sm:hidden" />
            <span className="inline-block w-4 sm:w-6" />
            <AnimatedLetters text="Jesús" delay={0.5} className="text-shimmer" />
          </h1>
        </div>

        {/* Role with typing cursor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-6"
        >
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto mb-12 leading-relaxed">
            {"< Desarrollador Flutter y Astro Freelance />"}
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Desarrollando{" "}
          <span className="text-slate-300">apps móviles</span> y{" "}
          <span className="text-slate-300">experiencias web</span> para clientes,
          trabajando cada proyecto de forma independiente y con atención obsesiva al detalle.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            Ver proyectos
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </MagneticButton>
          <MagneticButton href="https://github.com/yourhandle" variant="secondary">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] text-slate-600 tracking-[0.3em] uppercase">
              Desplázate
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
