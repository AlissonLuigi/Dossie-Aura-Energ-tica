"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParticleScene = dynamic(() => import("@/components/three/ParticleScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-base" />,
});

const headline = ["Além", "do", "Visível"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-word",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.12 }
      )
        .fromTo(".hero-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")
        .fromTo(".hero-sub", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(".hero-cta", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");

      gsap.to(".hero-content", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleScene />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-transparent to-base pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-base/40 via-transparent to-base/40 pointer-events-none" />

      <div className="hero-content relative z-[2] h-full flex flex-col items-center justify-center px-6 text-center">
        <p className="hero-eyebrow font-sans text-[10px] tracking-[0.5em] text-gold/60 uppercase mb-10 opacity-0">
          Aura Energética
        </p>

        <div className="overflow-hidden mb-8">
          <h1 className="font-serif font-light leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)" }}>
            {headline.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.18em] last:mr-0">
                <span className="hero-word inline-block opacity-0">{word}</span>
              </span>
            ))}
          </h1>
        </div>

        <p className="hero-sub font-sans font-light tracking-[0.3em] text-white/35 uppercase mb-14 opacity-0"
          style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)" }}>
          Sincronia Bio-Energética
        </p>

        <div className="hero-cta opacity-0">
          <a
            href="#manifesto"
            data-hover
            className="group flex items-center gap-4 font-sans text-[10px] tracking-[0.35em] uppercase text-gold border border-gold/25 px-10 py-4 rounded-sm hover:bg-gold/5 hover:border-gold/50 transition-all duration-500"
          >
            Explorar
            <span className="inline-block transition-transform duration-400 group-hover:translate-x-1.5">→</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-4 opacity-0">
        <span className="font-sans text-[9px] tracking-[0.45em] text-white/25 uppercase">Scroll</span>
        <div className="w-px h-14 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-gold/60 to-transparent animate-[slideDown_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
