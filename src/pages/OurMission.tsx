
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/layout/container";

const OurMission = () => {
  return (
    <Container className="py-16">
      <SectionHeading 
        title="Our Mission" 
        subtitle="Preserving tradition, embracing innovation"
        centered
      />
      
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-herbal-primary/10 p-8">
            <h3 className="text-2xl font-bold text-herbal-primary text-center">Our Vision Statement</h3>
            <p className="text-center mt-4 italic text-lg">
              "To create a world where traditional herbal wisdom is preserved, validated, and accessible to all, empowering communities with natural healthcare alternatives."
            </p>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Core Mission</h3>
              <p className="text-herbal-text-secondary">
                Herbal Intelligence exists to bridge the gap between ancient herbal wisdom and modern technology, making traditional 
                medicine knowledge accessible, affordable, and applicable in today's world. We're committed to preserving endangered 
                knowledge while creating platforms that allow this wisdom to be shared with those who need it most.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Our Commitments</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-herbal-secondary/20 rounded-xl p-6 bg-herbal-muted/30">
                  <h4 className="font-semibold text-lg mb-3">Preservation</h4>
                  <p className="text-herbal-text-secondary">
                    Documenting and digitizing traditional medical practices that are at risk of being lost, particularly 
                    from indigenous and African communities with rich herbal traditions.
                  </p>
                </div>
                
                <div className="border border-herbal-secondary/20 rounded-xl p-6 bg-herbal-muted/30">
                  <h4 className="font-semibold text-lg mb-3">Validation</h4>
                  <p className="text-herbal-text-secondary">
                    Supporting scientific research that evaluates traditional remedies, creating a bridge between ancestral 
                    wisdom and evidence-based practice.
                  </p>
                </div>
                
                <div className="border border-herbal-secondary/20 rounded-xl p-6 bg-herbal-muted/30">
                  <h4 className="font-semibold text-lg mb-3">Accessibility</h4>
                  <p className="text-herbal-text-secondary">
                    Developing technologies that make herbal knowledge available to everyone, regardless of location, 
                    language, or socioeconomic status.
                  </p>
                </div>
                
                <div className="border border-herbal-secondary/20 rounded-xl p-6 bg-herbal-muted/30">
                  <h4 className="font-semibold text-lg mb-3">Empowerment</h4>
                  <p className="text-herbal-text-secondary">
                    Supporting traditional healers and practitioners while empowering individuals to take control of their 
                    health through natural alternatives.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Strategic Goals</h3>
              <ul className="list-disc pl-6 space-y-3 text-herbal-text-secondary">
                <li>
                  <strong>Knowledge Database:</strong> Create the world's most comprehensive, validated database of traditional herbal remedies and practices.
                </li>
                <li>
                  <strong>AI Development:</strong> Refine our artificial intelligence to accurately interpret and advise on traditional herbal treatments.
                </li>
                <li>
                  <strong>Community Building:</strong> Connect a global network of traditional healers, modern practitioners, and individuals seeking natural health solutions.
                </li>
                <li>
                  <strong>Research Support:</strong> Fund and facilitate research that examines the efficacy and applications of traditional herbal treatments.
                </li>
                <li>
                  <strong>Education:</strong> Develop accessible educational resources that help people understand and apply herbal knowledge safely and effectively.
                </li>
              </ul>
            </div>
            
            <div className="bg-herbal-primary/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Join Our Mission</h3>
              <p className="text-herbal-text-secondary">
                Whether you're a traditional healer looking to share your knowledge, a scientist interested in researching herbal remedies, 
                or an individual seeking natural healthcare alternatives, there's a place for you in our community. Together, we can 
                preserve traditional wisdom and create healthier futures through the power of plants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OurMission;
