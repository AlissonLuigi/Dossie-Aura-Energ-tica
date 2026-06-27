"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
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

    const onEnter = () =>
      gsap.to(ring, { scale: 2.4, opacity: 0.5, duration: 0.4, ease: "power2.out" });
    const onLeave = () =>
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div className="w-10 h-10 rounded-full border border-gold/50 mix-blend-difference" />
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
