import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useRef, type RefObject, type MouseEvent } from "react";

interface MagneticHover {
  ref: RefObject<HTMLElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseLeave: () => void;
}

export function useMagneticHover(strength: number = 0.3): MagneticHover {
  const ref = useRef<HTMLElement | null>(null);
  // Cache the rect on mouseenter to avoid feedback loop while element moves
  const cachedRect = useRef<DOMRect | null>(null);

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);

  // Higher damping prevents oscillation
  const x = useSpring(xRaw, { stiffness: 200, damping: 35 });
  const y = useSpring(yRaw, { stiffness: 200, damping: 35 });

  function handleMouseMove(e: MouseEvent) {
    if (!ref.current) return;
    // Use cached rect so the center doesn't shift as the button moves
    if (!cachedRect.current) {
      cachedRect.current = ref.current.getBoundingClientRect();
    }
    const rect = cachedRect.current;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    xRaw.set((e.clientX - centerX) * strength);
    yRaw.set((e.clientY - centerY) * strength);
  }

  function handleMouseLeave() {
    cachedRect.current = null;
    xRaw.set(0);
    yRaw.set(0);
  }

  return { ref, x, y, handleMouseMove, handleMouseLeave };
}
