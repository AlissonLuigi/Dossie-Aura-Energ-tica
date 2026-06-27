"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = [
  "A", "televisão", "não", "precisa", "ser", "um", "corredor", "infinito",
  "de", "opções.", "Ela", "pode", "voltar", "a", "ser", "um", "ritual:",
  "a", "estreia", "certa", "na", "hora", "certa,", "o", "jogo", "em",
  "qualidade", "absoluta,", "o", "filme", "que", "merece", "silêncio.",
];

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".manifesto-word", { opacity: 1, color: "rgba(255,255,255,0.9)" });
      gsap.set(lineRef.current, { scaleX: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".manifesto-word",
          { opacity: 0.1, color: "rgba(255,255,255,0.1)" },
          {
            opacity: 1,
            color: "rgba(255,255,255,0.9)",
            stagger: 0.045,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              end: "bottom 32%",
              scrub: 1.25,
            },
          }
        );

        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-labelledby="manifesto-heading"
      className="relative px-6 py-36 sm:py-44"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-6">
          <div ref={lineRef} className="h-px max-w-24 flex-1 bg-platinum/45" aria-hidden="true" />
          <p
            id="manifesto-heading"
            className="font-sans text-[10px] uppercase tracking-[0.45em] text-platinum/46"
          >
            O gesto
          </p>
        </div>

        <p
          className="max-w-5xl font-serif font-light leading-[1.28] text-white/90"
          style={{ fontSize: "clamp(2rem, 5vw, 5.1rem)" }}
          aria-label={words.join(" ")}
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="manifesto-word mr-[0.22em] inline-block opacity-10"
              style={{ color: "rgba(255,255,255,0.1)" }}
              aria-hidden="true"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
