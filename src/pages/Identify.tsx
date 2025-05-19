
import { SectionHeading } from "@/components/ui/section-heading";
import { UploadSection } from "@/components/plant-identification/upload-section";
import { BackgroundEffect } from "@/components/effects/background-effect";

const Identify = () => {
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
      <div className="relative z-10 py-8">
        <div className="container">
          <SectionHeading 
            title="Plant Identification"
            subtitle="Upload photos to identify medicinal plants and learn about their properties"
            className="mb-10"
          />
          
          <div className="max-w-3xl mx-auto">
            <UploadSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Identify;
