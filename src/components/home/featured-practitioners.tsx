
import { SectionHeading } from "../ui/section-heading";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export function FeaturedPractitioners() {
  const practitioners = [
    {
      name: "Dr. Amara Okafor",
      specialty: "Traditional African Medicine",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
      location: "Nairobi, Kenya",
      verified: true,
    },
    {
      name: "Maria Garcia",
      specialty: "South American Herbalism",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
      location: "Lima, Peru",
      verified: true,
    },
    {
      name: "Li Wei",
      specialty: "Traditional Chinese Medicine",
      image: "https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?auto=format&fit=crop&q=80&w=200&h=200",
      location: "Remote Only",
      verified: true,
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <SectionHeading
          title="Featured Practitioners"
          subtitle="Connect with verified traditional healers from around the world"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {practitioners.map((practitioner, index) => (
            <div key={index} className="herbal-card hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                    <img
                      src={practitioner.image}
                      alt={practitioner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {practitioner.verified && (
                    <div className="absolute -right-2 -bottom-1 bg-herbal-primary text-white p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <path d="M22 4 12 14.01l-3-3"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-montserrat font-semibold text-lg">{practitioner.name}</h3>
                <p className="text-herbal-text-secondary text-sm mb-2">{practitioner.specialty}</p>
                <div className="flex items-center text-sm text-herbal-text-secondary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {practitioner.location}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/practitioners">View Profile</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" className="bg-herbal-primary hover:bg-herbal-primary/90" asChild>
            <Link to="/practitioners">Find More Practitioners</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
