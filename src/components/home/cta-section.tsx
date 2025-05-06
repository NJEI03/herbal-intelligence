
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function CTASection() {
  return (
    <section className="py-16 bg-herbal-gradient">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Your Natural Healing Journey Today</h2>
          <p className="text-lg text-white/90 mb-8">
            Get personalized herbal recommendations, connect with traditional practitioners, 
            and learn about natural remedies tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-herbal-primary hover:bg-white/90" asChild>
              <Link to="/consult">Start Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
