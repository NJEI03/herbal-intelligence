import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-herbal-primary text-white py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/cab56773-7d06-44ec-9010-f4806f6577cd.png" 
                  alt="Herbal Intelligence" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-montserrat text-xl font-semibold">
                Herbal<span className="text-white">Intelligence</span>
              </span>
            </div>
            <p className="text-sm text-white/80">
              Connecting traditional herbal knowledge with modern technology to provide accessible, natural healthcare alternatives.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-herbal-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-herbal-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-herbal-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/consult" className="text-white/80 hover:text-white transition-colors">AI Consultation</Link></li>
              <li><Link to="/identify" className="text-white/80 hover:text-white transition-colors">Plant Identification</Link></li>
              <li><Link to="/practitioners" className="text-white/80 hover:text-white transition-colors">Find Practitioners</Link></li>
              <li><Link to="/library" className="text-white/80 hover:text-white transition-colors">Herbal Library</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/mission" className="text-white/80 hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/team" className="text-white/80 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/careers" className="text-white/80 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-white/80 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-white/80 hover:text-white transition-colors">Medical Disclaimer</Link></li>
              <li><Link to="/cookies" className="text-white/80 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} Herbal Intelligence. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            <span className="md:mr-4">Made with 🌿 for natural healing</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
