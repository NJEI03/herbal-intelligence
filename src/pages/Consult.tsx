
import { ChatInterface } from "@/components/consult/chat-interface";

const Consult = () => {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 pt-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-herbal-primary mb-2">AI Herbal Consultation</h1>
            <p className="text-herbal-text-secondary">
              Ask our AI herbalist about natural remedies using traditional Cameroonian knowledge. 
              Describe your symptoms and health concerns for personalized herbal advice.
            </p>
          </div>
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Consult;
