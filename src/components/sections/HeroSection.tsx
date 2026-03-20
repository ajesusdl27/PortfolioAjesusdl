import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useMagneticHover } from "../../hooks/useMagneticHover";

/* ── Interactive Particle Canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function handleMouse(e: globalThis.MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", handleMouse);

    const colors = ["110,231,183", "34,211,238", "167,139,250"];
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId: number;
    function animate() {
      ctx!.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const force = (160 - dist) / 160;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx!.fill();
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(110,231,183,${0.055 * (1 - dist / 130)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
      aria-hidden="true"
    />
  );
}

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
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagneticHover(0.25);

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
function OrbitRing({ size, duration, delay, dotCount, reverse = false, color = "bg-accent/40" }: {
  size: number; duration: number; delay: number; dotCount: number; reverse?: boolean; color?: string;
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
          className="absolute w-1 h-1 rounded-full"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            rotate: reverse ? -360 : 360,
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
            delay: (duration / dotCount) * i,
          }}
        >
          <div
            className={`absolute w-1.5 h-1.5 rounded-full ${color} shadow-[0_0_6px_rgba(110,231,183,0.4)]`}
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
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const ringsScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const ringsOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Interactive particles (desktop only) */}
      <ParticleCanvas />

      {/* Orbit rings — alternating directions, different speeds & colors */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={reducedMotion ? {} : { scale: ringsScale, opacity: ringsOpacity }}
      >
        <OrbitRing size={450} duration={25} delay={0.5} dotCount={3} reverse={false} color="bg-accent/50" />
        <OrbitRing size={650} duration={40} delay={0.8} dotCount={4} reverse={true} color="bg-accent-secondary/50" />
        <OrbitRing size={850} duration={55} delay={1.1} dotCount={5} reverse={false} color="bg-accent-purple/40" />
        <OrbitRing size={1050} duration={70} delay={1.4} dotCount={3} reverse={true} color="bg-accent/30" />
      </motion.div>

      {/* Radial glows with scroll parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={reducedMotion ? {} : { y: bgGlowY }}
      >
        <div className="w-[600px] h-[600px] rounded-full bg-accent/[0.08] blur-[180px]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4"
      >
        <div className="w-[350px] h-[350px] rounded-full bg-accent-secondary/[0.06] blur-[140px]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute top-1/2 left-1/4"
      >
        <div className="w-[250px] h-[250px] rounded-full bg-accent-purple/[0.05] blur-[120px]" />
      </motion.div>

      {/* Mouse glow */}
      <MouseGlow />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="mb-8">
          <StatusBadge />
        </div>

        {/* Name — character reveal with dramatic gradient + scroll parallax */}
        <motion.div
          className="mb-4 overflow-hidden"
          style={reducedMotion ? {} : { y: titleY }}
        >
          <h1 className="font-heading font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white leading-[0.9]">
            <AnimatedLetters text="Antonio" delay={0.3} className="text-shimmer" />
            <br className="sm:hidden" />
            <span className="inline-block w-4 sm:w-6" />
            <AnimatedLetters text="Jesús" delay={0.5} className="text-shimmer" />
          </h1>
        </motion.div>

        {/* Role with typing cursor — parallax */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-6"
          style={reducedMotion ? {} : { y: subtitleY }}
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
          combinando ejecución independiente, atención al detalle y un flujo de trabajo
          apoyado en IA para entregar más rápido y con mejor criterio técnico.
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
          <MagneticButton href="https://github.com/ajesusdl27" variant="secondary">
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
            animate={reducedMotion ? {} : { y: [0, 10, 0] }}
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
