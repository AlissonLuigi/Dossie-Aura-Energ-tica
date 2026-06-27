import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luxesignal.com.br"),
  title: {
    default: "LUXE SIGNAL — Televisão com cerimônia",
    template: "%s — LUXE SIGNAL",
  },
  description:
    "Uma assinatura de TV concebida como coleção: canais internacionais, cinema restaurado, esportes ao vivo e premieres privadas, organizados por curadores humanos.",
  keywords: ["TV por assinatura premium", "televisão de luxo", "curadoria de conteúdo", "LUXE SIGNAL"],
  authors: [{ name: "LUXE SIGNAL" }],
  creator: "LUXE SIGNAL",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://luxesignal.com.br",
    siteName: "LUXE SIGNAL",
    title: "LUXE SIGNAL — Televisão com cerimônia",
    description:
      "Uma assinatura de TV concebida como coleção: canais internacionais, cinema restaurado, esportes ao vivo e premieres privadas.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LUXE SIGNAL — Televisão com cerimônia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE SIGNAL — Televisão com cerimônia",
    description:
      "Uma assinatura de TV concebida como coleção. Curadoria humana. Sem algoritmo.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
