import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import PillarsSection from "@/components/sections/PillarsSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <HeroSection />
        <ManifestoSection />
        <SocialProofSection />
        <PillarsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
