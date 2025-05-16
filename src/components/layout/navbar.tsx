
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-herbal-gradient flex items-center justify-center">
            <span className="font-bold text-white">HI</span>
          </div>
          <span className="font-montserrat text-xl font-semibold">
            Herbal<span className="text-herbal-primary">Intelligence</span>
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            Home
          </Link>
          <Link to="/consult" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            AI Consultation
          </Link>
          <Link to="/identify" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            Plant ID
          </Link>
          <Link to="/practitioners" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            Practitioners
          </Link>
          <Link to="/store" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            Store
          </Link>
          <Link to="/learn" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            Learn
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="sm" className="bg-herbal-primary hover:bg-herbal-primary/90" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4 transition-all duration-200 ease-in-out",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-4">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/consult" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            AI Consultation
          </Link>
          <Link 
            to="/identify" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            Plant ID
          </Link>
          <Link 
            to="/practitioners" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            Practitioners
          </Link>
          <Link 
            to="/store" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            Store
          </Link>
          <Link 
            to="/learn" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            Learn
          </Link>
          <div className="flex flex-col gap-2 mt-2">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
            </Button>
            <Button className="w-full bg-herbal-primary hover:bg-herbal-primary/90" asChild>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
