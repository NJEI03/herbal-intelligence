
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/layout/container";

const MedicalDisclaimer = () => {
  return (
    <Container className="py-16">
      <SectionHeading 
        title="Medical Disclaimer" 
        subtitle="Important information about our platform and services"
        centered
      />
      
      <div className="max-w-3xl mx-auto mt-10 space-y-8 prose prose-lg">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6">
          <h3 className="text-amber-800 font-semibold mb-2">Not a Substitute for Professional Medical Advice</h3>
          <p className="text-amber-700">
            The information provided by Herbal Intelligence, including content, consultations, plant identifications, 
            and practitioner connections, is for educational and informational purposes only and is not intended to be 
            a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
        
        <h3>General Disclaimer</h3>
        <p>
          Herbal Intelligence offers a platform that combines traditional herbal medicine knowledge with modern technology. 
          While we strive to provide accurate and up-to-date information about herbal remedies and traditional practices, 
          we do not guarantee the efficacy or safety of any treatment suggestion, plant identification, or recommendation 
          provided through our platform.
        </p>
        
        <h3>AI Consultation Limitations</h3>
        <p>
          Our AI consultation service uses algorithms to process information about symptoms and conditions and to suggest potential 
          herbal remedies based on traditional knowledge and available research. However:
        </p>
        <ul>
          <li>The AI does not have the ability to perform physical examinations</li>
          <li>It cannot access your complete medical history</li>
          <li>It cannot consider all potential drug interactions or individual health circumstances</li>
          <li>Its suggestions are based on pattern matching and available data, not clinical judgment</li>
        </ul>
        
        <h3>Plant Identification Caution</h3>
        <p>
          Our plant identification feature uses image recognition technology to help identify plants. Please be aware that:
        </p>
        <ul>
          <li>No image recognition system is 100% accurate</li>
          <li>Visual similarity between harmless and toxic plants can lead to misidentification</li>
          <li>Never consume or use a plant based solely on our identification</li>
          <li>Always verify plant identification with multiple reliable sources before any use</li>
        </ul>
        
        <h3>Practitioner Verification</h3>
        <p>
          While we make efforts to verify the credentials and experience of traditional practitioners listed on our platform, 
          we cannot guarantee their expertise, the safety of their practices, or the efficacy of their treatments. Users connect 
          with practitioners at their own risk.
        </p>
        
        <h3>Always Consult Healthcare Professionals</h3>
        <p>
          We strongly recommend that you:
        </p>
        <ul>
          <li>Consult with qualified healthcare professionals before beginning any herbal treatment</li>
          <li>Inform your doctor about any herbs or supplements you are taking or considering</li>
          <li>Never delay seeking professional medical advice because of something you have read or learned through our platform</li>
          <li>Never disregard professional medical advice or delay seeking it because of content provided on our platform</li>
          <li>Seek emergency medical help if you believe you may have a medical emergency</li>
        </ul>
        
        <h3>Special Populations</h3>
        <p>
          Herbal remedies may pose special risks for certain populations. Consult a healthcare professional before using any 
          herbal remedy if you are:
        </p>
        <ul>
          <li>Pregnant or nursing</li>
          <li>Taking prescription medications</li>
          <li>Planning to undergo surgery</li>
          <li>Under 18 years of age</li>
          <li>Managing a chronic health condition</li>
          <li>Allergic to certain plants or plant families</li>
        </ul>
        
        <h3>Regional and Legal Considerations</h3>
        <p>
          Herbal products, practices, and regulations vary widely across different countries and regions. Users are responsible 
          for ensuring their compliance with local laws and regulations regarding the purchase, possession, and use of herbal 
          products.
        </p>
        
        <div className="bg-herbal-muted p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-2">By Using Herbal Intelligence, You Acknowledge That:</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-herbal-primary mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>You have read and understand this disclaimer</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-herbal-primary mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>You will consult with appropriate healthcare professionals before acting on any information provided by our platform</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-herbal-primary mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>You understand that herbal remedies can cause side effects and may interact with medications</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-herbal-primary mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>You assume all responsibility for your use of the information provided</span>
            </li>
          </ul>
        </div>
        
        <p className="text-sm text-herbal-text-secondary italic">
          Last updated: May 16, 2025
        </p>
      </div>
    </Container>
  );
};

export default MedicalDisclaimer;
