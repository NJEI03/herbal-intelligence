
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/layout/container";

const AboutUs = () => {
  return (
    <Container className="py-16">
      <SectionHeading 
        title="About Herbal Intelligence" 
        subtitle="Bridging Traditional Knowledge with Modern Technology"
        centered
      />
      
      <div className="max-w-3xl mx-auto space-y-8 mt-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Our Story</h3>
          <p className="text-herbal-text-secondary">
            Herbal Intelligence was founded in 2023 with a vision to preserve and promote traditional herbal medicine 
            knowledge while making it accessible through modern technology. Our journey began when our founders, 
            a team of herbalists, data scientists, and healthcare professionals, recognized the growing disconnect
            between traditional healing practices and contemporary healthcare solutions.
          </p>
          <p className="text-herbal-text-secondary">
            Drawing from rich traditions across African communities and global indigenous knowledge, we set out to 
            create a platform that honors ancestral wisdom while leveraging artificial intelligence to make this 
            knowledge accessible to everyone, everywhere.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">What We Do</h3>
          <p className="text-herbal-text-secondary">
            At Herbal Intelligence, we're developing cutting-edge AI technology that can understand, interpret, 
            and provide guidance on traditional herbal remedies. Our platform offers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>AI-powered consultation to help identify potential herbal solutions for common ailments</li>
            <li>Plant identification technology to help you recognize medicinal plants in your environment</li>
            <li>A global network of verified traditional healers and herbalists</li>
            <li>Educational resources about herbal medicine practices and benefits</li>
            <li>A curated store offering ethically sourced herbal products</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Our Approach</h3>
          <p className="text-herbal-text-secondary">
            We believe in an integrative approach to health and wellness that respects both traditional wisdom 
            and modern science. Our work is guided by:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li><strong>Respect for traditional knowledge:</strong> We honor the cultural contexts and heritage from which herbal traditions emerge</li>
            <li><strong>Scientific validation:</strong> We complement traditional knowledge with scientific research where available</li>
            <li><strong>Accessibility:</strong> We're committed to making herbal knowledge available to everyone, particularly in underserved communities</li>
            <li><strong>Community engagement:</strong> We work directly with healers and communities to preserve and document traditional practices</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Our Impact</h3>
          <p className="text-herbal-text-secondary">
            By bridging the gap between traditional herbal knowledge and modern technology, we aim to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>Preserve endangered traditional medical knowledge for future generations</li>
            <li>Provide accessible healthcare alternatives to communities with limited access to conventional medicine</li>
            <li>Empower individuals to make informed choices about natural health solutions</li>
            <li>Support traditional healers and herbalists by expanding their reach and recognition</li>
            <li>Contribute to a more holistic understanding of health and wellness globally</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
