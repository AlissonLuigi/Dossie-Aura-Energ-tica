"use client";

import { motion } from "framer-motion";
import { ease, staggerContainer, revealMotion, revealTransition, staggerContainerSlow } from "@/lib/motion";
import { easeCss } from "@/lib/motion";

const experiences = [
  {
    label: "Cinema Atelier",
    title: "Filmes tratados como obras, não como miniaturas.",
    description:
      "Restauros 4K, estreias de festivais, trilhas sem compressão agressiva e sessões programadas por curadores convidados.",
    accent: "Premieres privadas / acervo restaurado",
  },
  {
    label: "Arena Prime",
    title: "Esporte ao vivo com latência baixa e direção premium.",
    description:
      "Canais internacionais, múltiplas câmeras, replay inteligente e uma camada silenciosa de estatísticas para quem quer precisão sem poluição visual.",
    accent: "Futebol, tênis, F1, lutas e eventos fechados",
  },
  {
    label: "Global Rooms",
    title: "Canais raros, organizados por atmosfera.",
    description:
      "Notícias, cultura, música, gastronomia e documentários de vários países reunidos em salas editoriais que parecem uma revista viva.",
    accent: "Europa / Ásia / Américas / canais boutique",
  },
] as const;

export default function PillarsSection() {
  return (
    <section id="colecao" aria-labelledby="colecao-heading" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.p
            className="font-sans text-[10px] uppercase tracking-[0.45em] text-signal/50"
            variants={revealMotion}
            transition={revealTransition}
          >
            A coleção
          </motion.p>
          <motion.h2
            id="colecao-heading"
            className="font-serif font-light leading-[1.02] text-white"
            style={{ fontSize: "clamp(2.7rem, 6vw, 6rem)" }}
            variants={revealMotion}
            transition={{ ...revealTransition, duration: 1.1 }}
          >
            Não vendemos canais.
            <br />
            Desenhamos noites.
          </motion.h2>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 gap-px bg-white/10 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerSlow}
          role="list"
          aria-label="Experiências da coleção"
        >
          {experiences.map((item) => (
            <motion.li
              key={item.label}
              className="group min-h-[420px] bg-base/95 p-8 backdrop-blur-xl sm:p-10 list-none"
              variants={revealMotion}
              transition={revealTransition}
              whileHover={{ y: -8, transition: { duration: 0.45, ease: ease.materialize } }}
              data-hover
            >
              <div className="mb-12 flex items-center justify-between gap-6">
                <span className="font-sans text-[9px] uppercase tracking-[0.38em] text-platinum/42">
                  {item.label}
                </span>
                <span
                  className="h-2 w-10 bg-signal/35 transition-all duration-500 group-hover:w-16 group-hover:bg-platinum"
                  style={{ transitionTimingFunction: easeCss.materialize }}
                  aria-hidden="true"
                />
              </div>

              <h3
                className="mb-8 font-serif text-3xl font-light leading-tight text-white/88 transition-colors duration-500 group-hover:text-white"
                style={{ transitionTimingFunction: easeCss.materialize }}
              >
                {item.title}
              </h3>
              <p
                className="font-sans text-sm leading-7 text-white/45 transition-colors duration-500 group-hover:text-white/62"
                style={{ transitionTimingFunction: easeCss.materialize }}
              >
                {item.description}
              </p>

              <div className="mt-14 border-t border-white/8 pt-6">
                <p className="font-sans text-[10px] uppercase leading-5 tracking-[0.28em] text-platinum/42">
                  {item.accent}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
