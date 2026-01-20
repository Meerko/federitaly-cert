import FAQSection from '@/components/sections/faq-section';
import FeaturesCarousel from '@/components/sections/features-carousel';
import FeaturesGrid from '@/components/sections/features-grid';
import FeaturesShowcase from '@/components/sections/features-showcase';
import Hero from '@/components/sections/hero';
import CompetitiveAdvantage from '@/components/sections/competitive-advantage';
import BenefitsShowcase from '@/components/sections/benefits-showcase';
import { Technology } from '@/components/sections/technology';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesCarousel />
      <BenefitsShowcase />
      <FeaturesGrid />
      <CompetitiveAdvantage />
      <FeaturesShowcase />
      <Technology />
      <FAQSection />
      <Contact />
    </>
  );
}
