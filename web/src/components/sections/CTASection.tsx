"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.4, 0.8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section id="experiência" ref={ref} className="relative py-52 px-6 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(124,58,237,0.12)" }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/40 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Comece sua jornada
        </motion.p>

        <motion.h2
          className="font-serif font-light leading-[1.02] mb-16"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.21, 1.02, 0.73, 1] }}
        >
          Desperte sua
          <br />
          <em className="text-gold not-italic">Aura Energética</em>
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <a
            href="/dossie.html"
            data-hover
            className="font-sans text-[10px] tracking-[0.35em] uppercase bg-gold text-base px-12 py-4 rounded-sm hover:bg-gold-light transition-colors duration-300 font-medium"
          >
            Descobrir Agora
          </a>
          <a
            href="#manifesto"
            data-hover
            className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/50 border border-white/10 px-12 py-4 rounded-sm hover:border-white/25 hover:text-white/80 transition-all duration-400"
          >
            Saber Mais
          </a>
        </motion.div>
      </div>
    </section>
  );
}
