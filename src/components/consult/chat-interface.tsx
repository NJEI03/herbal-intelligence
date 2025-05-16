
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Container } from "../layout/container";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

// Mock responses for demonstration
const mockResponses = [
  "Based on your symptoms, I recommend considering ginger root (Zingiber officinale), which has been traditionally used to address digestive discomfort. You can prepare it as a tea by steeping fresh ginger slices in hot water for 5-10 minutes. Would you like to know more about ginger or explore other options?",
  "For mild insomnia, valerian root (Valeriana officinalis) has been used traditionally across many cultures. It's typically consumed as a tea or tincture about 30 minutes before bedtime. Would you like to learn about proper dosage or alternative herbs for sleep support?",
  "Turmeric (Curcuma longa) contains curcumin, which has been studied for its anti-inflammatory properties. Consider incorporating it into your diet with black pepper to enhance absorption, or as a supplement. Would you like information about other anti-inflammatory herbs?",
  "Lemon balm (Melissa officinalis) has a long history of use for mild anxiety and stress. It can be consumed as a pleasant-tasting tea, 2-3 times daily. Are you currently taking any medications that might interact with herbal supplements?",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI herbal consultant. How can I help you today? Feel free to describe any symptoms or health concerns you'd like to address with natural remedies.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isVoiceDisabled] = useState(true);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Generate a random response for demo purposes
  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    return mockResponses[randomIndex];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceRecord = () => {
    toast({
      title: "Voice Recording Coming Soon",
      description: "This feature will be available in our next update.",
      variant: "default",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* Aurora background with gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-herbal-muted via-herbal-secondary/10 to-herbal-muted/80 z-0 animate-gradient-slow overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-herbal-secondary/20 via-transparent to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-herbal-primary/10 via-transparent to-transparent opacity-70"></div>
      </div>

      <Container className="relative z-10 h-full flex flex-col max-w-5xl">
        <div className="flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-xl border border-herbal-secondary/20 shadow-md overflow-hidden">
          <div className="p-4 bg-herbal-primary text-white flex items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-3 overflow-hidden">
              <img 
                src="/lovable-uploads/c4ca1071-e9fa-4c06-bb0f-02d63de2e974.png" 
                alt="Herbal Intelligence Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h2 className="font-montserrat font-semibold flex items-center gap-2">
                <span>Herbal Intelligence</span>
                <img 
                  src="/lovable-uploads/c4ca1071-e9fa-4c06-bb0f-02d63de2e974.png" 
                  alt="HI Logo" 
                  className="w-5 h-5 object-contain"
                />
              </h2>
              <p className="text-xs text-white/80">Online now</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-herbal-muted/30 to-white/30 backdrop-blur-sm">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "mb-4 max-w-[80%] animate-fade-in",
                  message.sender === "user" ? "ml-auto" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-2xl",
                    message.sender === "user"
                      ? "bg-herbal-primary text-white rounded-tr-none"
                      : "bg-white/90 border border-herbal-secondary/20 rounded-tl-none"
                  )}
                >
                  {message.content}
                </div>
                <div
                  className={cn(
                    "text-xs mt-1",
                    message.sender === "user" ? "text-right" : "text-left"
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex mb-4 max-w-[80%] mr-auto">
                <div className="bg-white/90 p-3 rounded-2xl rounded-tl-none border border-herbal-secondary/20">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-herbal-primary/40 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-herbal-primary/60 animate-pulse delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-herbal-primary/80 animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="flex gap-2">
              <Button
                className={cn(
                  "rounded-full w-12 h-12 flex-shrink-0 transition-all duration-300",
                  isVoiceDisabled 
                    ? "bg-herbal-primary/30 hover:bg-herbal-primary/50 cursor-not-allowed" 
                    : "bg-herbal-primary hover:bg-herbal-primary/90"
                )}
                onClick={handleVoiceRecord}
                disabled={isVoiceDisabled}
                title="Voice recording coming soon"
              >
                {isVoiceDisabled ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <div className="flex items-end gap-2 flex-grow">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your health concern or question..."
                  className="resize-none min-h-[60px] bg-white/90 border-herbal-secondary/30 flex-grow"
                  rows={2}
                />
                <Button 
                  className="bg-herbal-primary hover:bg-herbal-primary/90 h-[60px] px-6"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22 2 11 13"></path>
                    <path d="M22 2 15 22 11 13 2 9 22 2z"></path>
                  </svg>
                </Button>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-herbal-text-secondary">
              <p>Upload an image of a plant:</p>
              <button className="text-herbal-primary hover:underline">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M7 18a4.6 4.4 0 0 1 0-9h2v-1a3 3 0 0 1 3-3 4.5 4.5 0 0 1 8 2.5V8a3 3 0 0 1 2 5.5"></path>
                    <path d="M16 18H8.7a4.7 4.7 0 1 1 .3-9.4"></path>
                    <path d="M12 12v9"></path>
                    <path d="m16 16-4-4-4 4"></path>
                  </svg>
                  Upload Photo
                </div>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
