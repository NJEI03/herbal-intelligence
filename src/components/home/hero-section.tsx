import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              {/* <img 
                src="/lovable-uploads/cab56773-7d06-44ec-9010-f4806f6577cd.png" 
                alt="Herbal Intelligence Logo" 
                className="w-16 h-16"
              /> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-herbal-primary leading-tight animate-fade-in">
                Natural Healing<br />Powered by AI
              </h1>
            </div>
            <p className="text-xl text-herbal-text-primary opacity-90 animate-slide-up">
              Connect with traditional herbal medicine knowledge through AI consultation and find natural alternatives to conventional treatments.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="bg-herbal-primary hover:bg-herbal-primary/90" asChild>
                <Link to="/consult">Test the AI</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-herbal-primary text-herbal-primary hover:bg-herbal-primary/10" asChild>
                <Link to="/learn">Learn More</Link>
              </Button>
            </div>
            {!user && (
              <Button 
                className="space-y-3"
                variant="outline"
                onClick={() => navigate("/vendor-signup")}
              >
                Become a Vendor
              </Button>
            )}
          </div>
          
          {!isMobile && (
            <div className="flex items-center justify-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/achupride-260e7.firebasestorage.app/o/image-removebg-preview.png?alt=media&token=1ff2b665-f707-4551-87e0-37ed66467c27" 
                alt="Herbal Intelligence App Screenshot"
                className=" max-w-sm md:max-w-md lg:max-w-lg object-contain transform -rotate-"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
