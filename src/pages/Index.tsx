
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { BenefitsSection } from "@/components/home/benefits-section";
import { FeaturedPractitioners } from "@/components/home/featured-practitioners";
import { CTASection } from "@/components/home/cta-section";
import { FAQSection } from "@/components/home/faq-section";
import { PageBackground } from "@/components/layout/page-background";

const Index = () => {
  return (
    <PageBackground>
      <HeroSection />
      <HowItWorks />
      <BenefitsSection />
      <FeaturedPractitioners />
      <FAQSection />
      <CTASection />
    </PageBackground>
  );
};

export default Index;
