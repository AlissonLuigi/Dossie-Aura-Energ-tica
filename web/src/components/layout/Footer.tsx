const footerLinks = [
  { label: "Manifesto",  href: "#manifesto" },
  { label: "Coleção",   href: "#colecao"   },
  { label: "Acesso",    href: "#reserva"   },
  { label: "Dossiê",    href: "/dossie.html" },
] as const;

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t px-6 py-16"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <p
              className="font-serif text-2xl font-light tracking-[0.15em] text-white/20"
              aria-label="LUXE SIGNAL"
            >
              Aura
            </p>
            <p className="mt-3 max-w-xs font-sans text-[10px] leading-6 tracking-[0.18em] uppercase text-white/12">
              Televisão com cerimônia.<br />
              Curadoria humana. Sem algoritmo.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap gap-x-8 gap-y-3" role="list">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/20 transition-colors duration-300 hover:text-white/45"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1.0)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col gap-3 border-t pt-8 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/10">
            © 2026 LUXE SIGNAL · Todos os direitos reservados
          </p>
          <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-white/8">
            Acesso por convite · São Paulo, Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
