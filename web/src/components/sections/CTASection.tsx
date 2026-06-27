"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { auraEase, auraEaseCss, revealMotion, revealTransition, staggerContainer } from "@/lib/motion";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.7]);

  return (
    <section id="reserva" ref={ref} className="relative overflow-hidden px-6 py-52">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,199,255,0.07) 0%, transparent 70%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.p
            className="mb-10 font-sans text-[10px] uppercase tracking-[0.5em] text-platinum/35"
            variants={revealMotion}
            transition={revealTransition}
          >
            Acesso por convite
          </motion.p>

          <motion.h2
            className="mb-8 max-w-3xl font-serif font-light leading-[1.0] text-white"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            variants={revealMotion}
            transition={{ ...revealTransition, duration: 1.2 }}
          >
            A TV que você merecia
            <br />
            <em className="text-platinum/60 not-italic">sempre existiu.</em>
          </motion.h2>

          <motion.p
            className="mb-16 max-w-xl font-sans text-sm leading-8 text-white/38"
            variants={revealMotion}
            transition={{ ...revealTransition, delay: 0.1 }}
          >
            Solicite seu convite. Respondemos em até 48 horas com um link de acesso exclusivo para o seu perfil.
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row"
            variants={revealMotion}
            transition={{ ...revealTransition, delay: 0.2 }}
          >
            <a
              href="/dossie.html"
              data-hover
              className="inline-flex items-center justify-center border border-platinum/45 bg-platinum px-10 py-4 font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-base transition-all duration-500 hover:bg-white"
              style={{ transitionTimingFunction: auraEaseCss }}
            >
              Solicitar convite
            </a>
            <a
              href="#colecao"
              data-hover
              className="inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.35em] text-white/38 transition-colors duration-400 hover:text-white/72"
              style={{ transitionTimingFunction: auraEaseCss }}
            >
              Ver curadoria
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: auraEase }}
              >
                →
              </motion.span>
            </a>
          </motion.div>

          <motion.div
            className="mt-24 grid w-full max-w-2xl grid-cols-3 gap-px bg-white/6"
            variants={revealMotion}
            transition={{ ...revealTransition, delay: 0.3 }}
          >
            {[
              ["Sem anúncios", "jamais"],
              ["Sem contrato", "cancele quando quiser"],
              ["Sem algoritmo", "curadoria humana"],
            ].map(([value, label]) => (
              <div key={value} className="bg-base/90 px-6 py-5 text-center">
                <p className="font-serif text-lg font-light text-platinum/80">{value}</p>
                <p className="mt-1 font-sans text-[9px] uppercase tracking-[0.28em] text-white/22">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
