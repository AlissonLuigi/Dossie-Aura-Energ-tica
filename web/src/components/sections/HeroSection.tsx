"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easeCss } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ParticleScene = dynamic(() => import("@/components/three/ParticleScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" style={{ background: "#05070B" }} />,
});

const headline = ["Televisão", "com", "cerimônia"];
const specs = [
  { value: "8K HDR",        label: "canais masterizados e cinema sob demanda" },
  { value: "0 anúncios",    label: "experiência contínua para salas privadas" },
  { value: "24h concierge", label: "troca de plano, eventos e estreias ao vivo" },
] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".hero-word, .hero-kicker, .hero-copy, .hero-action, .hero-spec", {
        opacity: 1,
        y: 0,
        yPercent: 0,
        filter: "blur(0px)",
      });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          ".hero-word",
          { yPercent: 116, opacity: 0, filter: "blur(12px)" },
          { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.35, stagger: 0.09 }
        )
          .fromTo(".hero-kicker", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.88")
          .fromTo(".hero-copy",   { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.95 }, "-=0.45")
          .fromTo(".hero-action", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.85 }, "-=0.55")
          .fromTo(".hero-spec",   { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 }, "-=0.35");

        gsap.to(".hero-content", {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero — LUXE SIGNAL"
      className="relative min-h-[106vh] w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <ParticleScene />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 72% 38%, rgba(124,199,255,0.12), transparent 34%), linear-gradient(90deg, rgba(5,7,11,0.98) 0%, rgba(5,7,11,0.62) 44%, rgba(5,7,11,0.2) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[1] h-64 pointer-events-none"
        style={{ background: "linear-gradient(to top, #030305, rgba(3,3,5,0.7), transparent)" }}
      />

      <div className="hero-content relative z-[2] flex min-h-screen flex-col justify-center px-6 pb-20 pt-28 sm:px-10 lg:px-16">
        <div className="max-w-4xl">
          <p
            className="hero-kicker mb-8 font-sans text-[10px] uppercase tracking-[0.5em] text-platinum/55 opacity-0"
            aria-hidden="true"
          >
            LUXE SIGNAL / assinatura televisiva privada
          </p>

          <h1
            className="mb-9 max-w-5xl font-serif font-light leading-[0.9] text-white"
            style={{ fontSize: "clamp(4.1rem, 11vw, 10.6rem)" }}
          >
            {headline.map((word) => (
              <span
                key={word}
                className="mr-[0.16em] inline-block overflow-hidden align-bottom last:mr-0"
              >
                <span className="hero-word inline-block opacity-0">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-copy max-w-2xl font-sans text-base leading-8 text-white/56 opacity-0 sm:text-lg">
            Uma assinatura de TV concebida como coleção: canais internacionais, cinema restaurado,
            esportes ao vivo e premieres privadas, organizados por curadores humanos e entregues em
            uma interface silenciosa, precisa e sem ruído.
          </p>

          <div className="hero-action mt-12 flex flex-col gap-4 opacity-0 sm:flex-row">
            <a
              href="#reserva"
              data-hover
              className="inline-flex items-center justify-center border border-platinum/45 bg-platinum px-8 py-4 font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-base transition-all duration-500 hover:bg-white hover:text-base"
              style={{ transitionTimingFunction: easeCss.materialize }}
            >
              Solicitar convite
            </a>
            <a
              href="#colecao"
              data-hover
              className="inline-flex items-center justify-center border border-white/12 px-8 py-4 font-sans text-[10px] uppercase tracking-[0.32em] text-white/62 transition-all duration-500 hover:border-signal/45 hover:text-white"
              style={{ transitionTimingFunction: easeCss.materialize }}
            >
              Ver curadoria
            </a>
          </div>
        </div>

        <dl
          className="mt-20 grid max-w-5xl grid-cols-1 gap-px bg-white/8 md:grid-cols-3"
          aria-label="Especificações do serviço"
        >
          {specs.map(({ value, label }) => (
            <div key={value} className="hero-spec bg-base-100/70 p-5 opacity-0 backdrop-blur-md">
              <dt className="font-serif text-3xl font-light text-platinum">{value}</dt>
              <dd className="mt-2 font-sans text-[10px] uppercase leading-5 tracking-[0.28em] text-white/35">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
