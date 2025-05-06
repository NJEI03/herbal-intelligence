
import { SectionHeading } from "../ui/section-heading";

export function HowItWorks() {
  const steps = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: "Describe Your Symptoms",
      description: "Share your health concerns with our AI consultant in a natural conversation.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
      title: "Receive Herbal Recommendations",
      description: "Get personalized suggestions for herbal remedies based on traditional knowledge.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: "Connect with Practitioners",
      description: "Find verified traditional healers in your area for in-person consultations.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      title: "Learn About Herbal Medicine",
      description: "Access our educational resources to deepen your understanding of natural remedies.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <SectionHeading
          title="How It Works"
          subtitle="Your journey to natural healing in four simple steps"
          centered
          className="max-w-2xl mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="herbal-card flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-herbal-primary/10 flex items-center justify-center text-herbal-primary mb-4">
                {step.icon}
              </div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-herbal-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
