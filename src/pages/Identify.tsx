
import { SectionHeading } from "@/components/ui/section-heading";
import { UploadSection } from "@/components/plant-identification/upload-section";
import { PageBackground } from "@/components/layout/page-background";

const Identify = () => {
  return (
    <PageBackground>
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
    </PageBackground>
  );
};

export default Identify;
