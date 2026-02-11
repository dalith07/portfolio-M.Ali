import { AboutMeSection } from "../components/aboutMe-section ";
import HeroSection from "../components/hero-section";
import PortfolioSection from "../components/portfolio-section";

export default function Home() {
  return (
    < >
      <HeroSection />
      <PortfolioSection />
      {/* <Language /> */}
      <AboutMeSection />
    </>
  );
}
