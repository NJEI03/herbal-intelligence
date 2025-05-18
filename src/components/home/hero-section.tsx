
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/lovable-uploads/cab56773-7d06-44ec-9010-f4806f6577cd.png" 
                alt="Herbal Intelligence Logo" 
                className="w-16 h-16"
              />
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
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/cab56773-7d06-44ec-9010-f4806f6577cd.png" 
                    alt="Herbal Intelligence" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold">Join Herbal Intelligence</h2>
              </div>
              <p className="text-herbal-text-secondary mb-6">Access personalized herbal recommendations and connect with traditional practitioners.</p>
              
              <div className="space-y-3">
                <Button className="w-full flex justify-center items-center gap-2 bg-[#4285F4] hover:bg-[#4285F4]/90">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z" />
                  </svg>
                  Continue with Google
                </Button>
                <Button className="w-full flex justify-center items-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                  </svg>
                  Continue with Facebook
                </Button>
                <div className="relative flex py-3 items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-3 text-gray-500 text-sm">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/signup">Sign up with Email</Link>
                </Button>
                <div className="text-center text-sm text-herbal-text-secondary mt-3">
                  Already have an account? <Link to="/login" className="text-herbal-primary hover:underline">Log in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
