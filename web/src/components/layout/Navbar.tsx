"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easeCss } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Coleção",   href: "#colecao"   },
  { label: "Acesso",    href: "#reserva"   },
] as const;

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(nav, { y: 0, opacity: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        nav,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.35, ease: "power3.out" }
      );
    });

    const trigger = ScrollTrigger.create({
      start: "top+=80 top",
      onEnter: () => {
        nav.style.backdropFilter = "blur(24px)";
        nav.style.background = "rgba(3,3,5,0.78)";
        nav.style.borderBottom = "1px solid rgba(212,175,55,0.08)";
      },
      onLeaveBack: () => {
        nav.style.backdropFilter = "none";
        nav.style.background = "transparent";
        nav.style.borderBottom = "none";
      },
    });

    return () => {
      trigger.kill();
      mm.revert();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Navegação principal"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500"
      style={{ transitionTimingFunction: easeCss.materialize }}
    >
      <Link
        href="/"
        data-hover
        aria-label="LUXE SIGNAL — página inicial"
        className="font-serif text-xl font-light tracking-[0.15em] text-white/90"
      >
        Aura
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-10" role="list">
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              data-hover
              className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/35 hover:text-white/75 transition-colors duration-300"
              style={{ transitionTimingFunction: easeCss.micro }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <a
          href="/dossie.html"
          data-hover
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/25 px-5 py-2.5 rounded-sm hover:bg-gold/8 transition-all duration-300"
          style={{ transitionTimingFunction: easeCss.micro }}
        >
          Iniciar
        </a>

        {/* Mobile menu button */}
        <button
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span
            className="block h-px w-5 bg-white/60 transition-all duration-300 origin-center"
            style={{
              transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none",
              transitionTimingFunction: easeCss.micro,
            }}
          />
          <span
            className="block h-px w-5 bg-white/60 transition-all duration-300"
            style={{
              opacity: menuOpen ? 0 : 1,
              transitionTimingFunction: easeCss.micro,
            }}
          />
          <span
            className="block h-px w-5 bg-white/60 transition-all duration-300 origin-center"
            style={{
              transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
              transitionTimingFunction: easeCss.micro,
            }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 bg-base/96 backdrop-blur-2xl border-b border-white/6 py-8 px-8 md:hidden"
          role="dialog"
          aria-label="Menu de navegação"
        >
          <ul className="flex flex-col gap-6" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-sm tracking-[0.35em] uppercase text-white/55 hover:text-white/90 transition-colors duration-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
