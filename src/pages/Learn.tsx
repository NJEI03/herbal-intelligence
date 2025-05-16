
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Learn = () => {
  return (
    <div className="py-12 bg-herbal-background">
      <div className="container">
        <SectionHeading 
          title="Learn About Herbal Medicine"
          subtitle="Discover the power of natural healing and traditional herbal remedies"
          className="mb-10"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Introduction to Herbal Medicine */}
          <div className="herbal-card">
            <div className="w-12 h-12 rounded-full bg-herbal-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-herbal-primary">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">What is Herbal Medicine?</h3>
            <p className="text-herbal-text-secondary mb-4">
              Herbal medicine is the use of plants and plant extracts for therapeutic purposes. 
              It represents one of the oldest forms of healing, practiced across cultures for thousands of years.
            </p>
            <ul className="space-y-2 mb-4 leaf-bullet">
              <li>Uses natural plant materials</li>
              <li>Focuses on whole-body wellness</li>
              <li>Based on traditional knowledge</li>
              <li>Often complementary to modern medicine</li>
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/learn/intro">Learn More</Link>
            </Button>
          </div>
          
          {/* Common Medicinal Plants */}
          <div className="herbal-card">
            <div className="w-12 h-12 rounded-full bg-herbal-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-herbal-primary">
                <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z"></path>
                <path d="M12 6v12"></path>
                <path d="M8 10h8"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Common Medicinal Plants</h3>
            <p className="text-herbal-text-secondary mb-4">
              Many plants have powerful medicinal properties. Here are some of the most commonly used medicinal plants around the world:
            </p>
            <ul className="space-y-2 mb-4 leaf-bullet">
              <li>Aloe Vera - Skin healing properties</li>
              <li>Turmeric - Anti-inflammatory effects</li>
              <li>Ginger - Digestive aid and immune booster</li>
              <li>Moringa - Nutritional powerhouse</li>
              <li>Echinacea - Immune system support</li>
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/learn/plants">Explore Plants</Link>
            </Button>
          </div>
          
          {/* Preparing Herbal Remedies */}
          <div className="herbal-card">
            <div className="w-12 h-12 rounded-full bg-herbal-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-herbal-primary">
                <path d="M2.31 12.42a9.7 9.7 0 0 0 2.19 10.16 9.7 9.7 0 0 0 10.15 2.2 9.7 9.7 0 0 1-2.19-10.16 9.7 9.7 0 0 1-10.15-2.2z"></path>
                <path d="M19.13 21.64a9.7 9.7 0 0 0 2.19-10.16 9.7 9.7 0 0 0-10.15-2.19 9.7 9.7 0 0 1 2.19 10.16 9.7 9.7 0 0 1 10.15 2.19"></path>
                <path d="M12 6a2 2 0 0 0 2-2c0-1.11-.89-2-2-2a2 2 0 1 0 0 4z"></path>
                <path d="M12 8v6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Preparing Herbal Remedies</h3>
            <p className="text-herbal-text-secondary mb-4">
              Learn how to prepare effective herbal remedies safely at home using simple techniques:
            </p>
            <ul className="space-y-2 mb-4 leaf-bullet">
              <li>Teas and infusions</li>
              <li>Decoctions for roots and barks</li>
              <li>Tinctures and extracts</li>
              <li>Poultices and compresses</li>
              <li>Salves and balms</li>
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/learn/preparation">Preparation Methods</Link>
            </Button>
          </div>
        </div>
        
        {/* Safety Information */}
        <div className="bg-white border border-herbal-secondary/30 rounded-xl p-6 mb-16">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-herbal-accent/20 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-herbal-accent">
                <path d="M12 10v2"></path>
                <path d="M12 16h.01"></path>
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-herbal-accent">Important Safety Information</h3>
              <p className="text-herbal-text-secondary mb-4">
                While herbal medicine can be effective and safe, it's important to approach it with proper knowledge and caution:
              </p>
              <ul className="space-y-1 leaf-bullet">
                <li>Consult with healthcare providers before starting any herbal regimen</li>
                <li>Be aware of potential interactions with medications</li>
                <li>Pregnant women, nursing mothers, and children should use extra caution</li>
                <li>Always verify plant identification before use</li>
                <li>Start with low doses to test for allergic reactions</li>
                <li>Source herbs from reputable suppliers</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Learn More?</h2>
          <p className="text-herbal-text-secondary max-w-2xl mx-auto mb-6">
            Connect with our AI consultant to get personalized herbal recommendations 
            or identify medicinal plants from your surroundings.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-herbal-primary hover:bg-herbal-primary/90" asChild>
              <Link to="/consult">AI Consultation</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/identify">Identify Plants</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
