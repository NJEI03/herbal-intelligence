
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-herbal-gradient py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern id="leaf-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40,0 Q60,20 40,40 Q20,60 0,40 Q20,20 40,0" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
              Natural Healing<br />Powered by AI
            </h1>
            <p className="text-xl opacity-90 animate-slide-up">
              Connect with traditional herbal medicine knowledge through AI consultation and find natural alternatives to conventional treatments.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="bg-white text-herbal-primary hover:bg-white/90" asChild>
                <Link to="/consult">Start Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/learn">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-white rounded-full overflow-hidden shadow-2xl border-8 border-white/30">
              <img 
                src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843" 
                alt="Herbal medicine" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-lg shadow-xl p-4 max-w-[60%] animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-herbal-secondary/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-herbal-primary">
                    <path d="M12 2a10 10 0 0 0-7 17l-3 3a1 1 0 0 0 1 1h9a10 10 0 0 0 0-20zm0 18h-2.4"></path>
                    <path d="M7 6a5 5 0 0 1 7 0"></path>
                    <path d="M7 9a3 3 0 0 1 5 0"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-herbal-primary">Connect with AI</p>
                  <p className="text-sm text-herbal-text-secondary">Get personalized herbal recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
