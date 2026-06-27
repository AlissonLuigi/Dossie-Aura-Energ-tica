"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = ["Manifesto", "Pilares", "Experiência"];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(nav, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power2.out" });

    const trigger = ScrollTrigger.create({
      start: "top+=80 top",
      onEnter: () => {
        nav.style.backdropFilter = "blur(24px)";
        nav.style.background = "rgba(3,3,5,0.7)";
        nav.style.borderBottom = "1px solid rgba(212,175,55,0.08)";
      },
      onLeaveBack: () => {
        nav.style.backdropFilter = "none";
        nav.style.background = "transparent";
        nav.style.borderBottom = "none";
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500"
    >
      <a href="/" data-hover className="font-serif text-xl font-light tracking-[0.15em] text-white/90">
        Aura
      </a>

      <ul className="hidden md:flex items-center gap-10">
        {links.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              data-hover
              className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/35 hover:text-white/75 transition-colors duration-400"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="/dossie.html"
        data-hover
        className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/25 px-5 py-2.5 rounded-sm hover:bg-gold/8 transition-all duration-300"
      >
        Iniciar
      </a>
    </nav>
  );
}
