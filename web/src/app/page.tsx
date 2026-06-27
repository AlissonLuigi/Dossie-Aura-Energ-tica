import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import PillarsSection from "@/components/sections/PillarsSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ManifestoSection />
        <PillarsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
