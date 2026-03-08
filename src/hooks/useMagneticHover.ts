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

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);

  const x = useSpring(xRaw, { stiffness: 300, damping: 20 });
  const y = useSpring(yRaw, { stiffness: 300, damping: 20 });

  function handleMouseMove(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    xRaw.set((e.clientX - centerX) * strength);
    yRaw.set((e.clientY - centerY) * strength);
  }

  function handleMouseLeave() {
    xRaw.set(0);
    yRaw.set(0);
  }

  return { ref, x, y, handleMouseMove, handleMouseLeave };
}
