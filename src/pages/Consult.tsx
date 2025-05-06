
import { SectionHeading } from "@/components/ui/section-heading";
import { ChatInterface } from "@/components/consult/chat-interface";
import { ConsultationSidebar } from "@/components/consult/consultation-sidebar";

const Consult = () => {
  return (
    <div className="py-8">
      <div className="container">
        <SectionHeading 
          title="AI Herbal Consultation"
          subtitle="Describe your symptoms and get personalized herbal recommendations"
          className="mb-10"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
          <div>
            <ConsultationSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consult;
