
import { ChatInterface } from "@/components/consult/chat-interface";
import { PageBackground } from "@/components/layout/page-background";

const Consult = () => {
  return (
    <div className="min-h-screen bg-herbal-background">
      <PageBackground>
        <div className="h-[calc(100vh-4rem)]">
          <div className="container h-full py-8">
            <ChatInterface />
          </div>
        </div>
      </PageBackground>
    </div>
  );
};

export default Consult;
