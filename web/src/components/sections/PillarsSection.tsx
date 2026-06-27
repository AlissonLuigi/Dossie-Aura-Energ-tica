"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: "01",
    title: "Campo Áurico",
    description:
      "O campo energético invisível que envolve cada ser vivo, carregando informações sobre o estado físico, emocional e espiritual — uma impressão digital da alma.",
    glyph: "◈",
  },
  {
    number: "02",
    title: "Sincronia Vibracional",
    description:
      "O alinhamento dos campos energéticos entre dois ou mais seres, criando uma ressonância que transcende o espaço e o tempo — a linguagem silenciosa do universo.",
    glyph: "◎",
  },
  {
    number: "03",
    title: "Transmutação",
    description:
      "A capacidade de transformar padrões energéticos densos em frequências mais elevadas, acelerando a evolução da consciência além dos limites conhecidos.",
    glyph: "◉",
  },
];

export default function PillarsSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="pilares" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-24 opacity-0">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-gold/35 mb-5">
            Os Três Pilares
          </p>
          <h2 className="font-serif font-light leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
            A Estrutura da
            <br />
            <em className="text-gold/75 not-italic">Consciência Energética</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              className="bg-base p-10 flex flex-col group cursor-default"
              style={{ background: "#030305" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.18, ease: [0.21, 1.02, 0.73, 1] }}
              data-hover
            >
              <div className="text-4xl text-gold/20 group-hover:text-gold/50 transition-colors duration-600 mb-10 select-none">
                {p.glyph}
              </div>

              <span className="font-sans text-[9px] tracking-[0.45em] text-white/18 uppercase mb-4 block">
                {p.number}
              </span>

              <h3 className="font-serif text-2xl font-light text-white/85 group-hover:text-white mb-6 transition-colors duration-500 leading-tight">
                {p.title}
              </h3>

              <p className="font-sans text-[13px] leading-[1.75] text-white/35 group-hover:text-white/55 transition-colors duration-500 flex-1">
                {p.description}
              </p>

              <div className="mt-10 h-px bg-gold/15 group-hover:bg-gold/45 transition-all duration-500 origin-left"
                style={{ transition: "background 0.5s, width 0.5s" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
