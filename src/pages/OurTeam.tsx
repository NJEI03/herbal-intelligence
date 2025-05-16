
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/layout/container";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const OurTeam = () => {
  const leadershipTeam: TeamMember[] = [
    {
      name: "Dr. Amara Okafor",
      role: "Founder & CEO",
      bio: "With a PhD in Ethnobotany and 15 years of field experience documenting traditional herbal practices across Africa, Dr. Okafor founded Herbal Intelligence to preserve and scale access to herbal knowledge.",
      imageUrl: "/placeholder.svg"
    },
    {
      name: "Kwame Mensah",
      role: "Chief Technology Officer",
      bio: "A computer scientist specializing in AI and machine learning, Kwame leads our technical team in developing the algorithms that power our plant identification and consultation systems.",
      imageUrl: "/placeholder.svg"
    },
    {
      name: "Dr. Sofia Chen",
      role: "Chief Scientific Officer",
      bio: "With a background in pharmacognosy and clinical research, Dr. Chen leads our scientific validation efforts, ensuring that traditional knowledge is supported by rigorous research where possible.",
      imageUrl: "/placeholder.svg"
    },
    {
      name: "Gabriel Santos",
      role: "Chief Product Officer",
      bio: "A user experience expert with a passion for healthcare access, Gabriel ensures our platform remains intuitive and accessible for users across different technological literacy levels.",
      imageUrl: "/placeholder.svg"
    }
  ];

  const advisoryTeam: TeamMember[] = [
    {
      name: "Elder Nandi Mokoena",
      role: "Traditional Knowledge Advisor",
      bio: "A respected traditional healer with over 40 years of practice in South Africa, Elder Mokoena guides our approach to respectful documentation and representation of traditional knowledge.",
      imageUrl: "/placeholder.svg"
    },
    {
      name: "Prof. James Williams",
      role: "Medical Ethics Advisor",
      bio: "An expert in bioethics and integrative medicine, Prof. Williams helps us navigate the complex ethical considerations of bridging traditional and modern healthcare practices.",
      imageUrl: "/placeholder.svg"
    },
    {
      name: "Dr. Aisha Mbeki",
      role: "Public Health Advisor",
      bio: "With extensive experience in public health initiatives across Africa, Dr. Mbeki advises on how our platform can best serve communities with limited healthcare access.",
      imageUrl: "/placeholder.svg"
    }
  ];

  return (
    <Container className="py-16">
      <SectionHeading 
        title="Our Team" 
        subtitle="Meet the people bridging tradition and technology"
        centered
      />
      
      <div className="max-w-6xl mx-auto mt-10 space-y-16">
        <div>
          <h3 className="text-2xl font-semibold mb-8 border-b pb-2">Leadership</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square bg-gray-200 relative">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold text-lg">{member.name}</h4>
                  <p className="text-herbal-primary font-medium text-sm">{member.role}</p>
                  <p className="text-herbal-text-secondary text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-8 border-b pb-2">Advisory Board</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisoryTeam.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square bg-gray-200 relative">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold text-lg">{member.name}</h4>
                  <p className="text-herbal-primary font-medium text-sm">{member.role}</p>
                  <p className="text-herbal-text-secondary text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-herbal-muted rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Join Our Team</h3>
          <p className="max-w-2xl mx-auto text-herbal-text-secondary mb-6">
            We're always looking for passionate individuals who share our vision of bridging traditional knowledge with modern technology. Check out our Careers page for current openings.
          </p>
          <button className="bg-herbal-primary hover:bg-herbal-primary/90 text-white px-6 py-3 rounded-full transition-colors duration-200">
            View Open Positions
          </button>
        </div>
      </div>
    </Container>
  );
};

export default OurTeam;
