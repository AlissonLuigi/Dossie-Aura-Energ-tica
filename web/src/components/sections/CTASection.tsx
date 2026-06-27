"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease, easeCss, staggerContainer, revealMotion, revealTransition } from "@/lib/motion";

const guarantees = [
  { value: "Sem anúncios",  label: "jamais"                },
  { value: "Sem contrato",  label: "cancele quando quiser" },
  { value: "Sem algoritmo", label: "curadoria humana"      },
] as const;

type FormState = "idle" | "submitting" | "success" | "error";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 0]);
  const glowScale   = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.7]);

  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || formState === "submitting") return;
    setFormState("submitting");
    setTimeout(() => {
      window.location.href = `/dossie.html?email=${encodeURIComponent(email)}`;
    }, 600);
  };

  return (
    <section
      id="reserva"
      ref={ref}
      aria-labelledby="reserva-heading"
      className="relative overflow-hidden px-6 py-52"
    >
      <motion.div
        aria-hidden="true"
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
            id="reserva-heading"
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
            className="mb-14 max-w-xl font-sans text-sm leading-8 text-white/38"
            variants={revealMotion}
            transition={{ ...revealTransition, delay: 0.1 }}
          >
            Deixe seu e-mail. Respondemos em até 48 horas com um link de acesso exclusivo.
          </motion.p>

          <motion.div
            variants={revealMotion}
            transition={{ ...revealTransition, delay: 0.18 }}
            className="w-full max-w-md"
          >
            {formState === "success" ? (
              <p
                role="status"
                aria-live="polite"
                className="py-5 font-sans text-[11px] uppercase tracking-[0.35em] text-gold"
              >
                Convite registrado. Em breve entramos em contato.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-label="Formulário de solicitação de convite"
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="invite-email" className="sr-only">
                  Seu e-mail
                </label>
                <input
                  id="invite-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  autoComplete="email"
                  disabled={formState === "submitting"}
                  className="flex-1 border border-white/12 bg-transparent px-5 py-4 font-sans text-[11px] tracking-[0.2em] text-white/70 placeholder:text-white/22 focus:outline-none focus:border-gold/45 transition-colors duration-300 disabled:opacity-50"
                  style={{ transitionTimingFunction: easeCss.micro }}
                />
                <button
                  type="submit"
                  data-hover
                  disabled={formState === "submitting"}
                  className="shrink-0 border border-platinum/45 bg-platinum px-8 py-4 font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-base transition-all duration-500 hover:bg-white disabled:opacity-60"
                  style={{ transitionTimingFunction: easeCss.materialize }}
                >
                  {formState === "submitting" ? "Enviando..." : "Solicitar"}
                </button>
              </form>
            )}
          </motion.div>

          <motion.p
            className="mt-5 font-sans text-[9px] tracking-[0.2em] text-white/20"
            variants={revealMotion}
            transition={{ ...revealTransition, delay: 0.24 }}
          >
            Ou acesse{" "}
            <a
              href="/dossie.html"
              className="text-white/35 underline underline-offset-4 hover:text-white/60 transition-colors duration-300"
            >
              o dossie completo
            </a>{" "}
            diretamente.
          </motion.p>

          <motion.dl
            className="mt-24 grid w-full max-w-2xl grid-cols-3 gap-px bg-white/6"
            variants={revealMotion}
            transition={{ ...revealTransition, delay: 0.3 }}
            aria-label="Garantias do servico"
          >
            {guarantees.map(({ value, label }) => (
              <div key={value} className="bg-base/90 px-6 py-5 text-center">
                <dt className="font-serif text-lg font-light text-platinum/80">{value}</dt>
                <dd className="mt-1 font-sans text-[9px] uppercase tracking-[0.28em] text-white/22">
                  {label}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            className="mt-10"
            variants={revealMotion}
            transition={{ ...revealTransition, delay: 0.36 }}
          >
            <a
              href="#colecao"
              data-hover
              className="inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.35em] text-white/28 transition-colors hover:text-white/55"
              style={{ transitionTimingFunction: easeCss.micro }}
            >
              Ver curadoria
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: ease.materialize }}
                aria-hidden="true"
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
