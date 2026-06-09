"use client";

import React, { useRef, useState } from "react";
import clsx from "clsx";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(59, 130, 246, 0.15)", // Subtle brand-500 blue
  glowSize = 300,
  ...props
}: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={clsx(
        "group relative p-[1px] overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800/80 transition-all shadow-sm hover:shadow-md dark:hover:shadow-brand-500/5",
        className
      )}
      {...props}
    >
      {/* Glowing border layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(${glowSize}px circle at ${coords.x}px ${coords.y}px, ${glowColor.replace("0.15", "0.4")}, transparent 80%)`,
        }}
      />

      {/* Glowing inner background layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(${glowSize * 1.2}px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Card Content container - rounded-[15px] to sit perfectly inside rounded-2xl with 1px padding */}
      <div className="relative z-10 bg-white dark:bg-slate-900 rounded-[15px] h-full w-full transition-all">
        {children}
      </div>
    </div>
  );
}
