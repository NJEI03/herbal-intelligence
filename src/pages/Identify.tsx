
import { SectionHeading } from "@/components/ui/section-heading";
import { UploadSection } from "@/components/plant-identification/upload-section";

const Identify = () => {
  return (
    <div className="py-8">
      <div className="container">
        <SectionHeading 
          title="Plant Identification"
          subtitle="Upload a photo to identify medicinal plants and learn about their properties"
          className="mb-10"
        />
        
        <div className="max-w-2xl mx-auto">
          <UploadSection />
        </div>
      </div>
    </div>
  );
};

export default Identify;
