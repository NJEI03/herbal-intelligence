
import { 
  SidebarProvider,
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset
} from "@/components/ui/sidebar";
import { ChatInterface } from "@/components/consult/chat-interface";
import { ConsultationSidebar } from "@/components/consult/consultation-sidebar";
import { PlusCircle, MessageCircle, List } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Consult = () => {
  const [conversations, setConversations] = useState([
    { id: "1", title: "Current Consultation", isActive: true },
    { id: "2", title: "Sleep Improvement", isActive: false },
    { id: "3", title: "Digestive Health", isActive: false },
  ]);
  
  const startNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Consultation",
      isActive: true,
    };
    
    setConversations(prev => 
      prev.map(conv => ({ ...conv, isActive: false }))
        .concat([newChat])
    );
  };

  const selectConversation = (id: string) => {
    setConversations(prev => 
      prev.map(conv => ({
        ...conv,
        isActive: conv.id === id
      }))
    );
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full h-[calc(100vh-4rem)]">
        <Sidebar>
          <SidebarHeader>
            <Button 
              className="w-full bg-herbal-primary hover:bg-herbal-primary/90 gap-2" 
              onClick={startNewChat}
            >
              <PlusCircle size={16} />
              New consultation
            </Button>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Recent Consultations</SidebarGroupLabel>
              <SidebarMenu>
                {conversations.map((conv) => (
                  <SidebarMenuItem key={conv.id}>
                    <SidebarMenuButton 
                      onClick={() => selectConversation(conv.id)}
                      isActive={conv.isActive}
                    >
                      <MessageCircle size={16} />
                      <span>{conv.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2 text-herbal-text-secondary"
              >
                <List size={16} />
                View all consultations
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex">
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1">
              <ChatInterface />
            </div>
            <div className="w-80 p-4 border-l border-gray-200 hidden lg:block">
              <ConsultationSidebar />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Consult;
