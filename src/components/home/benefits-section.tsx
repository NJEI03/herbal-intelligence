
import { SectionHeading } from "../ui/section-heading";

export function BenefitsSection() {
  const benefits = [
    {
      title: "Natural Alternatives",
      description: "Discover plant-based remedies with fewer side effects than conventional medications.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2a5 5 0 1 1-5 5 10 10 0 0 0 5 10"></path>
          <circle cx="12" cy="17" r="1"></circle>
        </svg>
      ),
    },
    {
      title: "Accessible Healthcare",
      description: "Get health guidance from anywhere, anytime, reducing barriers to medical advice.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
      ),
    },
    {
      title: "Traditional Knowledge",
      description: "Tap into centuries of herbal medicine wisdom from diverse cultural traditions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
    },
    {
      title: "Cost-Effective",
      description: "Save on healthcare costs with affordable consultations and natural treatments.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
    {
      title: "Environmental Impact",
      description: "Support sustainable healthcare practices that minimize environmental harm.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M2 12h20"></path>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
    },
    {
      title: "Holistic Approach",
      description: "Address the root causes of health issues, not just symptoms, for complete wellness.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"></path>
          <path d="M9 8c-2 3-4 3.5-7 4l8 10c3-2 3.5-4 4-7"></path>
          <path d="M14.5 17.5 4.5 15"></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-herbal-primary/5">
      <div className="container">
        <SectionHeading
          title="Benefits of Herbal Medicine"
          subtitle="Why choose natural alternatives for your health needs"
          centered
          className="max-w-2xl mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-sm border border-herbal-secondary/20 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-full bg-herbal-primary/10 flex items-center justify-center text-herbal-primary mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-herbal-text-secondary">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
