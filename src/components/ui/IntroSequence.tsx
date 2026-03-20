import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

export default function IntroSequence() {
  const [phase, setPhase] = useState<"logo" | "aurora" | "done">("logo");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setPhase("done");
      return;
    }

    // Phase 1: Logo reveal — 1.2s
    const t1 = setTimeout(() => setPhase("aurora"), 1200);
    // Phase 2: Aurora + fade out — 0.8s after
    const t2 = setTimeout(() => setPhase("done"), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: "#060B18" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Logo "AJ" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
            animate={{
              opacity: phase === "logo" ? 1 : 0.6,
              scale: phase === "logo" ? 1 : 0.8,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="relative"
          >
            <span className="text-shimmer font-heading font-bold text-7xl md:text-9xl tracking-tighter select-none">
              AJ
            </span>
            {/* Glow behind logo */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1.5 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-48 h-48 rounded-full bg-accent/20 blur-[80px]"
              />
            </div>
          </motion.div>

          {/* Aurora peek in phase 2 */}
          {phase === "aurora" && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-30 bg-accent/30"
                style={{ top: "-20%", left: "-10%" }}
              />
              <div
                className="absolute w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 bg-accent-secondary/30"
                style={{ bottom: "-20%", right: "-10%" }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
