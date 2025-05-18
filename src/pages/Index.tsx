
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { BenefitsSection } from "@/components/home/benefits-section";
import { FeaturedPractitioners } from "@/components/home/featured-practitioners";
import { CTASection } from "@/components/home/cta-section";
import { FAQSection } from "@/components/home/faq-section";
import { BackgroundEffect } from "@/components/effects/background-effect";

const Index = () => {
  return (
    <div className="min-h-screen bg-herbal-background relative">
      <BackgroundEffect />
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <img 
          src="/lovable-uploads/cab56773-7d06-44ec-9010-f4806f6577cd.png" 
          alt="Herbal Intelligence Logo Background" 
          className="w-full h-full object-contain opacity-30"
        />
      </div>
      <div className="relative z-10">
        <HeroSection />
        <HowItWorks />
        <BenefitsSection />
        <FeaturedPractitioners />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;
