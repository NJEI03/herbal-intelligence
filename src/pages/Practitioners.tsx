import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

const Practitioners = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [practitioners, setPractitioners] = useState([
    {
      id: 1,
      name: "Dr. Amara Okafor",
      image: "gs://achupride-260e7.firebasestorage.app/doctor 1.jfif",
      specialty: "Traditional African Medicine",
      location: "Douala, Cameroon",
      languages: ["English", "French", "Duala"],
      experience: "15+ years",
      bio: "Specializing in herbal remedies for digestive and respiratory conditions. Dr. Okafor combines traditional African knowledge with modern scientific understanding.",
      verified: true,
    },
    {
      id: 2,
      name: "Marie Nguema",
      image: "gs://achupride-260e7.firebasestorage.app/female doc.jfif",
      specialty: "Central African Herbalism",
      location: "Yaoundé, Cameroon",
      languages: ["French", "English", "Ewondo"],
      experience: "12 years",
      bio: "Expert in Central African plants for immune support and women's health issues. Marie comes from a long lineage of traditional healers.",
      verified: true,
    },
    {
      id: 3,
      name: "Dr. Emmanuel Fongod",
      image: "gs://achupride-260e7.firebasestorage.app/doctor 2.jfif",
      specialty: "Rainforest Medicinal Plants",
      location: "Buea, Cameroon",
      languages: ["English", "French", "Pidgin"],
      experience: "20+ years",
      bio: "Specializing in native plants from Cameroon's rainforests for chronic conditions. Dr. Fongod practices a holistic approach to balance mind, body, and spirit.",
      verified: true,
    },
    {
      id: 4,
      name: "Josephine Mbarga",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200",
      specialty: "Traditional Midwifery & Women's Health",
      location: "Limbe, Cameroon",
      languages: ["English", "French"],
      experience: "10 years",
      bio: "Specializing in women's reproductive health using traditional plant-based remedies. Josephine combines ancestral knowledge with contemporary healthcare practices.",
      verified: true,
    }
  ]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const updatedPractitioners = await Promise.all(
        practitioners.map(async (p) => {
          if (p.image.startsWith("gs://")) {
            try {
              const imageRef = ref(storage, p.image);
              const url = await getDownloadURL(imageRef);
              return { ...p, image: url };
            } catch (error) {
              console.error(`Error fetching image for ${p.name}:`, error);
              return p; // Return original practitioner if image fetch fails
            }
          } else {
            return p;
          }
        })
      );
      setPractitioners(updatedPractitioners);
    };

    fetchImageUrls();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="py-8">
      <div className="container">
        <SectionHeading 
          title="Find Traditional Practitioners"
          subtitle="Connect with verified herbal medicine experts from Cameroon and beyond"
          className="mb-10"
        />
        
        <Card className="mb-10">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, Country or 'Remote'"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="african">Traditional African Medicine</SelectItem>
                    <SelectItem value="rainforest">Rainforest Medicinal Plants</SelectItem>
                    <SelectItem value="women">Women's Health</SelectItem>
                    <SelectItem value="central-african">Central African Herbalism</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Any Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Language</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="duala">Duala</SelectItem>
                    <SelectItem value="ewondo">Ewondo</SelectItem>
                    <SelectItem value="pidgin">Pidgin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3 flex justify-end mt-2">
                <Button className="bg-herbal-primary hover:bg-herbal-primary/90">
                  Search Practitioners
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {practitioners.map((practitioner) => (
            <Card key={practitioner.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      <img
                        src={practitioner.image}
                        alt={practitioner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {practitioner.verified && (
                      <div className="absolute -right-2 bottom-0 bg-herbal-primary text-white p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <path d="M22 4 12 14.01l-3-3"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-montserrat font-semibold text-lg">{practitioner.name}</h3>
                      <span className="bg-herbal-primary/10 text-herbal-primary text-xs px-2 py-1 rounded-full">
                        {practitioner.experience}
                      </span>
                    </div>
                    <p className="text-herbal-text-secondary text-sm">{practitioner.specialty}</p>
                    <div className="flex items-center text-sm text-herbal-text-secondary mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {practitioner.location}
                    </div>
                    <div className="mt-3">
                      <p className="text-sm">{practitioner.bio}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium">Languages:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {practitioner.languages.map((language, idx) => (
                          <span 
                            key={idx} 
                            className="bg-herbal-secondary/20 text-herbal-text-primary text-xs px-2 py-1 rounded-full"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" className="mr-2">View Profile</Button>
                      <Button className="bg-herbal-primary hover:bg-herbal-primary/90">Book Consultation</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            Load More Practitioners
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Practitioners;
