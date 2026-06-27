"use client";

import { motion } from "framer-motion";
import { staggerContainer, revealMotionSubtle, revealTransition, fadeIn } from "@/lib/motion";

const signals = [
  { value: "12k+",  label: "assinantes ativos"        },
  { value: "97%",   label: "taxa de retenção mensal"  },
  { value: "8K HDR",label: "resolução máxima"         },
  { value: "24h",   label: "suporte concierge"        },
] as const;

const testimonials = [
  {
    quote: "Finalmente uma TV que respeita o meu tempo. Cada noite é uma escolha, não uma procura.",
    name:  "Ricardo M.",
    role:  "Sócio-diretor, São Paulo",
  },
  {
    quote: "A interface é tão silenciosa que o conteúdo fala sozinho. Nunca mais voltei ao streaming comum.",
    name:  "Beatriz L.",
    role:  "Diretora criativa, Rio de Janeiro",
  },
  {
    quote: "Três anos assinante. A curadoria de cinema me apresentou filmes que mudaram minha visão de mundo.",
    name:  "Henrique A.",
    role:  "Advogado, Brasília",
  },
] as const;

export default function SocialProofSection() {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="relative px-6 py-24 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Stats row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mb-24 grid grid-cols-2 gap-px bg-white/6 md:grid-cols-4"
          role="list"
          aria-label="Estatísticas do serviço"
        >
          {signals.map(({ value, label }) => (
            <motion.div
              key={value}
              variants={revealMotionSubtle}
              transition={revealTransition}
              role="listitem"
              className="bg-base px-8 py-10 text-center"
            >
              <p
                className="font-serif font-light text-gold"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
                aria-label={`${value} ${label}`}
              >
                {value}
              </p>
              <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.32em] text-white/28">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeIn}
          transition={{ ...revealTransition, duration: 0.9 }}
          className="mb-16 flex items-center gap-6"
        >
          <div className="h-px w-16 bg-platinum/25" aria-hidden="true" />
          <p
            id="social-proof-heading"
            className="font-sans text-[10px] uppercase tracking-[0.45em] text-platinum/38"
          >
            O que dizem os membros
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-px bg-white/6 lg:grid-cols-3"
          role="list"
          aria-label="Depoimentos de membros"
        >
          {testimonials.map(({ quote, name, role }) => (
            <motion.figure
              key={name}
              variants={revealMotionSubtle}
              transition={revealTransition}
              role="listitem"
              className="bg-base px-8 py-10"
            >
              <blockquote className="mb-8">
                <p
                  className="font-serif font-light leading-[1.65] text-white/72"
                  style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
              <figcaption>
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-platinum/60">
                  {name}
                </p>
                <p className="mt-1 font-sans text-[10px] tracking-[0.18em] text-white/28">
                  {role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
