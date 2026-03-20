import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "link" | "cta" | "card">("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  // Tighter spring so the ring tracks closely — less lag when clicking
  const springX = useSpring(cursorX, { stiffness: 600, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 40 });

  useEffect(() => {
    // Only on desktop with fine pointer
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");
    setIsVisible(true);

    function handleMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    function handleEnter() {
      setIsVisible(true);
    }

    function handleLeave() {
      setIsVisible(false);
    }

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    // Observe hover targets
    const selectors = {
      cta: 'a[href="#projects"], a[href*="mailto"], button, [data-cursor="cta"]',
      card: ".group.relative, [data-cursor='card']",
      link: "a, button, [data-cursor='link']",
    };

    function addListeners(el: Element, type: "link" | "cta" | "card") {
      el.addEventListener("mouseenter", () => setHoverType(type));
      el.addEventListener("mouseleave", () => setHoverType("default"));
    }

    // Priority: cta > card > link
    document.querySelectorAll(selectors.cta).forEach((el) => addListeners(el, "cta"));
    document.querySelectorAll(selectors.card).forEach((el) => addListeners(el, "card"));
    document.querySelectorAll(selectors.link).forEach((el) => {
      if (!el.matches(selectors.cta) && !el.matches(selectors.card)) {
        addListeners(el, "link");
      }
    });

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [reducedMotion, cursorX, cursorY]);

  if (reducedMotion || !isVisible) return null;

  const sizeMap = { default: 12, link: 24, cta: 40, card: 48 };
  const size = sizeMap[hoverType];
  const isExpanded = hoverType !== "default";

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full
                   border border-accent/40 hidden md:block"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: size,
          height: size,
          borderColor: isExpanded ? "rgba(110,231,183,0.5)" : "rgba(110,231,183,0.3)",
          backgroundColor: isExpanded ? "rgba(110,231,183,0.06)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full
                   bg-accent hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isExpanded ? 4 : 5,
          height: isExpanded ? 4 : 5,
          opacity: isExpanded ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </>
  );
}
