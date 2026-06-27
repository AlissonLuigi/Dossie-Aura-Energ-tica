"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = [
  "Cada", "ser", "humano", "carrega", "dentro", "de", "si",
  "um", "campo", "energético", "único", "—", "uma", "assinatura",
  "vibracional", "que", "influencia", "tudo", "ao", "seu", "redor.",
  "Quando", "essa", "energia", "está", "em", "sincronia,",
  "o", "impossível", "torna-se", "inevitável.",
];

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".manifesto-word",
        { opacity: 0.08, color: "rgba(255,255,255,0.08)" },
        {
          opacity: 1,
          color: "rgba(255,255,255,0.92)",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={sectionRef} className="relative py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-6 mb-20">
          <div ref={lineRef} className="h-px bg-gold/40 flex-1 max-w-16" />
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-gold/40">
            Manifesto
          </p>
        </div>

        <p style={{ fontSize: "clamp(1.6rem, 4vw, 3.4rem)" }}
          className="font-serif font-light leading-[1.4] text-white/90">
          {words.map((word, i) => (
            <span
              key={i}
              className="manifesto-word inline-block mr-[0.28em] mb-[0.1em]"
              style={{ opacity: 0.08, color: "rgba(255,255,255,0.08)" }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
