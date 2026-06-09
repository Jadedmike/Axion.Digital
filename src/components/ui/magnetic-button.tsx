"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  range?: number;
  actionRadius?: number;
}

export function MagneticButton({
  children,
  className,
  range = 60,
  actionRadius = 18,
  ...props
}: MagneticButtonProps & React.ComponentProps<typeof motion.div>) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physical config
  const springConfig = { damping: 12, stiffness: 120, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      // Linear interpolation factor (closer = stronger pull)
      const ratio = 1 - distance / range;
      const pullX = distanceX * 0.4 * ratio;
      const pullY = distanceY * 0.4 * ratio;

      // Clamp movement within bounds
      const clampedX = Math.max(-actionRadius, Math.min(actionRadius, pullX));
      const clampedY = Math.max(-actionRadius, Math.min(actionRadius, pullY));

      x.set(clampedX);
      y.set(clampedY);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center justify-center"
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={className}
        whileTap={{ scale: 0.95 }} // Satisfying shrink click feedback
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}
