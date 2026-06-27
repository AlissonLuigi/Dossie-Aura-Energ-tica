"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch/mobile — cursor is irrelevant there
    if (window.matchMedia("(hover: none)").matches) return;
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(dot, { x: mouse.x, y: mouse.y, duration: 0 });
    };

    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.1;
      pos.y += (mouse.y - pos.y) * 0.1;
      gsap.set(ring, { x: pos.x, y: pos.y });
      rafId = requestAnimationFrame(loop);
    };

    // Event delegation — attach once to document, no per-element listeners to clean up
    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("a, button, [data-hover]")) return;
      gsap.to(ring, { scale: 2.2, opacity: 0.45, duration: 0.38, ease: "power2.out" });
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("a, button, [data-hover]")) return;
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.38, ease: "power2.out" });
    };

    // Show cursors
    ring.style.opacity = "1";
    dot.style.opacity = "1";

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ willChange: "transform" }}
      >
        <div className="w-10 h-10 rounded-full border border-gold/50 mix-blend-difference" />
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
