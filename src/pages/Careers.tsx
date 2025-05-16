
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  department_category: 'technical' | 'research' | 'operations';
}

const Careers = () => {
  const positions: JobPosition[] = [
    {
      title: "AI Research Scientist",
      department: "Research & Development",
      location: "Nairobi, Kenya (Remote)",
      type: "Full-time",
      description: "Help us develop advanced AI models for plant identification and traditional knowledge interpretation.",
      requirements: [
        "PhD or MSc in Machine Learning, Computer Science, or related field",
        "Experience with computer vision and natural language processing",
        "Publication record in top AI conferences",
        "Interest in ethnobotany and traditional medicine (preferred)"
      ],
      department_category: 'technical'
    },
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build beautiful, responsive interfaces for our web and mobile applications using React.",
      requirements: [
        "3+ years of experience with React and modern JavaScript",
        "Experience with responsive design and mobile-first approaches",
        "Knowledge of UI/UX principles",
        "Experience with TypeScript and testing frameworks"
      ],
      department_category: 'technical'
    },
    {
      title: "Ethnobotanist",
      department: "Research",
      location: "Multiple Locations",
      type: "Full-time",
      description: "Document and validate traditional herbal practices across different communities and regions.",
      requirements: [
        "Advanced degree in Ethnobotany, Botany, or related field",
        "Field research experience with traditional communities",
        "Understanding of medicinal plants and their properties",
        "Cultural sensitivity and strong ethical standards"
      ],
      department_category: 'research'
    },
    {
      title: "Community Manager",
      department: "Operations",
      location: "Remote (Africa preferred)",
      type: "Full-time",
      description: "Build and nurture our community of users, traditional healers, and herbal medicine enthusiasts.",
      requirements: [
        "Experience in community management or customer success",
        "Strong communication skills and cultural sensitivity",
        "Background in health, herbalism, or traditional medicine (preferred)",
        "Fluency in English and at least one African language"
      ],
      department_category: 'operations'
    },
    {
      title: "Clinical Research Coordinator",
      department: "Research",
      location: "Cape Town, South Africa",
      type: "Full-time",
      description: "Coordinate clinical studies validating traditional herbal remedies according to scientific protocols.",
      requirements: [
        "Degree in Clinical Research, Nursing, or related field",
        "Experience with clinical trial coordination",
        "Understanding of regulatory requirements for herbal medicine research",
        "Strong organizational and project management skills"
      ],
      department_category: 'research'
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description: "Lead the development of our digital products, ensuring they meet user needs and business goals.",
      requirements: [
        "3+ years of product management experience",
        "Experience with healthcare or knowledge management products",
        "Strong analytical and problem-solving skills",
        "User-focused approach to product development"
      ],
      department_category: 'operations'
    }
  ];

  return (
    <Container className="py-16">
      <SectionHeading 
        title="Join Our Team" 
        subtitle="Help us bridge traditional knowledge and modern technology"
        centered
      />
      
      <div className="max-w-4xl mx-auto mt-10 space-y-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Why Work With Us</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-herbal-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-herbal-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">Meaningful Impact</h4>
              <p className="text-herbal-text-secondary text-sm">
                Work on technology that preserves endangered knowledge and improves healthcare access for underserved communities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-herbal-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-herbal-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">Remote-First Culture</h4>
              <p className="text-herbal-text-secondary text-sm">
                Enjoy the flexibility of working remotely while collaborating with a diverse, global team united by a shared mission.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-herbal-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-herbal-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">Continuous Learning</h4>
              <p className="text-herbal-text-secondary text-sm">
                Access learning stipends, mentorship opportunities, and exposure to diverse fields from AI to traditional medicine.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Open Positions</h3>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">All Positions</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {positions.map((job) => (
                <JobCard key={job.title} job={job} />
              ))}
            </TabsContent>
            
            <TabsContent value="technical" className="space-y-4">
              {positions.filter(job => job.department_category === 'technical').map((job) => (
                <JobCard key={job.title} job={job} />
              ))}
            </TabsContent>
            
            <TabsContent value="research" className="space-y-4">
              {positions.filter(job => job.department_category === 'research').map((job) => (
                <JobCard key={job.title} job={job} />
              ))}
            </TabsContent>
            
            <TabsContent value="operations" className="space-y-4">
              {positions.filter(job => job.department_category === 'operations').map((job) => (
                <JobCard key={job.title} job={job} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-herbal-muted p-8 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-3">Don't see a position that fits your skills?</h3>
          <p className="text-herbal-text-secondary mb-6">
            We're always interested in connecting with talented individuals who are passionate about our mission. 
            Send us your resume and tell us how you can contribute to our team.
          </p>
          <Button>Submit Open Application</Button>
        </div>
      </div>
    </Container>
  );
};

interface JobCardProps {
  job: JobPosition;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="text-xs bg-herbal-muted px-2 py-1 rounded-full">{job.department}</span>
            <span className="text-xs bg-herbal-muted px-2 py-1 rounded-full">{job.location}</span>
            <span className="text-xs bg-herbal-muted px-2 py-1 rounded-full">{job.type}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-herbal-text-secondary mb-4">{job.description}</p>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Requirements:</h4>
          <ul className="list-disc list-inside text-sm text-herbal-text-secondary space-y-1">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default Careers;
