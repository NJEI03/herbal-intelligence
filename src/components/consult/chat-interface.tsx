
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { Mic, MicOff } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

// Mock responses for demonstration when API fails
const mockResponses = [
  "Based on your symptoms, I recommend considering ginger root (Zingiber officinale), which has been traditionally used to address digestive discomfort. You can prepare it as a tea by steeping fresh ginger slices in hot water for 5-10 minutes. Would you like to know more about ginger or explore other options?",
  "For mild insomnia, valerian root (Valeriana officinalis) has been used traditionally across many cultures. It's typically consumed as a tea or tincture about 30 minutes before bedtime. Would you like to learn about proper dosage or alternative herbs for sleep support?",
  "Turmeric (Curcuma longa) contains curcumin, which has been studied for its anti-inflammatory properties. Consider incorporating it into your diet with black pepper to enhance absorption, or as a supplement. Would you like information about other anti-inflammatory herbs?",
  "Lemon balm (Melissa officinalis) has a long history of use for mild anxiety and stress. It can be consumed as a pleasant-tasting tea, 2-3 times daily. Are you currently taking any medications that might interact with herbal supplements?",
];

// API endpoint for herbal consultation
const API_URL = "https://api.herbalwisdom.com/consult"; // Replace with your actual API endpoint

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
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Generate a random response for demo purposes when API fails
  const getRandomMockResponse = () => {
    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    return mockResponses[randomIndex];
  };

  // Call the actual API
  const callHerbalAPI = async (userMessage: string) => {
    try {
      const response = await axios.post(API_URL, {
        message: userMessage,
        userId: "user-" + Date.now(), // Generate a temporary user ID
        timestamp: new Date().toISOString()
      });
      
      // Return the AI response from the API
      return response.data.reply || "I'm sorry, I couldn't generate a response at this time.";
    } catch (error) {
      console.error("API call failed:", error);
      toast.error("Couldn't reach our herbal wisdom server. Using backup knowledge instead.");
      
      // Return a mock response as fallback
      return getRandomMockResponse();
    }
  };

  const handleSendMessage = async () => {
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

    try {
      // Call the API to get a response
      const aiResponse = await callHerbalAPI(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error processing message:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceModal = () => {
    setIsVoiceModalOpen(!isVoiceModalOpen);
    if (!isVoiceModalOpen) {
      toast.info("Voice chat feature coming soon!", {
        description: "We're working hard to bring you voice capabilities.",
        duration: 3000,
      });
    }
  };

  const toggleVoiceNote = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Show toast when user tries to start recording
      toast.info("Voice note feature coming soon!", {
        description: "We're working on adding voice note capabilities.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white rounded-xl border border-herbal-secondary/20 shadow-md overflow-hidden">
      <div className="p-4 bg-herbal-primary text-white flex items-center">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M12 8c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5Z"></path>
            <path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7-.7.7m0 11.4.7.7m-12.1-.7-.7.7"></path>
          </svg>
        </div>
        <div>
          <h2 className="font-montserrat font-semibold">Herbal AI Consultant</h2>
          <p className="text-xs text-white/80">Online now</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-green-50 via-herbal-background to-herbal-secondary/5 transition-all duration-500 animate-fade-in">
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
                  : "bg-white border border-herbal-secondary/20 rounded-tl-none"
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
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-herbal-secondary/20">
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
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your health concern or question..."
            className="resize-none min-h-[60px]"
            rows={2}
          />
          <div className="flex flex-col gap-2">
            <Button
              className={cn(
                "h-[28px] px-3 transition-colors",
                isRecording 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-herbal-primary hover:bg-herbal-primary/90"
              )}
              onClick={toggleVoiceNote}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            
            <Button 
              className="bg-herbal-primary hover:bg-herbal-primary/90 h-[28px] px-3"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
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

      {/* Voice Chat Modal - Coming Soon */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-2xl font-bold font-montserrat text-herbal-primary mb-4">Voice Chat</h2>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-24 h-24 rounded-full bg-herbal-secondary/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-herbal-primary">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
                <p className="text-gray-600 mb-4">We're working on adding voice chat capabilities to enhance your herbal consultation experience.</p>
                <div className="flex justify-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-herbal-primary/40 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-herbal-primary/60 animate-pulse delay-150"></span>
                  <span className="w-2 h-2 rounded-full bg-herbal-primary/80 animate-pulse delay-300"></span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={toggleVoiceModal} 
                variant="outline"
                className="border-herbal-primary hover:bg-herbal-primary/10 text-herbal-primary"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
