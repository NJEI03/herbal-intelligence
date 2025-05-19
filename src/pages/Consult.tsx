
import { ChatInterface } from "@/components/consult/chat-interface";
import { BackgroundEffect } from "@/components/effects/background-effect";

const Consult = () => {
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
      <div className="relative z-10 h-[calc(100vh-4rem)] py-8">
        <div className="container h-full">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Consult;
