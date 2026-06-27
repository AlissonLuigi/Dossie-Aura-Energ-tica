export default function Footer() {
  return (
    <footer className="border-t py-12 px-6" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-serif text-base font-light" style={{ color: "rgba(255,255,255,0.2)" }}>
          Aura Energética
        </span>
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.12)" }}>
          © 2026 · Todos os direitos reservados
        </span>
      </div>
    </footer>
  );
}
