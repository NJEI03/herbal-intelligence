
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/layout/container";

const TermsOfService = () => {
  return (
    <Container className="py-16">
      <SectionHeading 
        title="Terms of Service" 
        subtitle="Please read these terms carefully before using our platform"
        centered
      />
      
      <div className="max-w-3xl mx-auto mt-10 space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">1. Agreement to Terms</h3>
          <p className="text-herbal-text-secondary">
            By accessing or using the Herbal Intelligence platform, website, mobile application, or any services 
            provided by Herbal Intelligence (collectively, the "Services"), you agree to be bound by these Terms of 
            Service and all applicable laws and regulations. If you do not agree with any of these terms, you are 
            prohibited from using the Services.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">2. Service Description</h3>
          <p className="text-herbal-text-secondary">
            Herbal Intelligence provides a platform that connects users with traditional herbal medicine knowledge 
            through AI consultation, plant identification, practitioner connections, and educational resources. Our 
            Services are designed to provide information and facilitate connections, not to replace professional 
            medical advice or treatment.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">3. User Accounts</h3>
          <p className="text-herbal-text-secondary">
            To access certain features of our Services, you may need to create an account. You are responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>Providing accurate and complete account information</li>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use of your account</li>
          </ul>
          <p className="text-herbal-text-secondary">
            We reserve the right to terminate or suspend accounts that violate these Terms, provide false information, 
            or engage in unauthorized use of the Services.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">4. Medical Disclaimer</h3>
          <p className="text-herbal-text-secondary">
            The information provided through our Services is for educational and informational purposes only and is not 
            intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice 
            of a qualified healthcare provider with any questions regarding your health. Never disregard professional 
            medical advice or delay seeking it because of information provided through our Services.
          </p>
          <p className="text-herbal-text-secondary">
            Please refer to our full <a href="/disclaimer" className="text-herbal-primary hover:underline">Medical Disclaimer</a> for more information.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">5. User Content</h3>
          <p className="text-herbal-text-secondary">
            Our Services may allow you to post, upload, or submit content, including text, images, and information 
            ("User Content"). By submitting User Content, you:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>Grant us a non-exclusive, worldwide, royalty-free license to use, store, display, reproduce, modify, and distribute your User Content for the purposes of operating and improving our Services</li>
            <li>Represent that you own or have the necessary permissions to use and authorize us to use your User Content</li>
            <li>Agree not to post content that is illegal, harmful, threatening, abusive, defamatory, or otherwise objectionable</li>
          </ul>
          <p className="text-herbal-text-secondary">
            We reserve the right to remove any User Content that violates these Terms or that we find objectionable for any reason.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">6. Intellectual Property</h3>
          <p className="text-herbal-text-secondary">
            The Herbal Intelligence platform, including its content, features, and functionality, is owned by Herbal 
            Intelligence and protected by copyright, trademark, and other intellectual property laws. You may not copy, 
            modify, reproduce, distribute, or create derivative works based on our Services without our express written permission.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">7. Third-Party Services and Links</h3>
          <p className="text-herbal-text-secondary">
            Our Services may contain links to third-party websites or services that are not owned or controlled by 
            Herbal Intelligence. We have no control over and assume no responsibility for the content, privacy policies, 
            or practices of any third-party websites or services. We do not warrant or endorse any third-party website, 
            service, product, or information.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">8. Practitioner Connections</h3>
          <p className="text-herbal-text-secondary">
            Herbal Intelligence may facilitate connections between users and traditional practitioners. We do not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>Employ these practitioners or control their services</li>
            <li>Guarantee their expertise, credentials, or the safety or efficacy of their treatments</li>
            <li>Accept responsibility for any interactions between users and practitioners</li>
          </ul>
          <p className="text-herbal-text-secondary">
            Users connect with practitioners at their own risk and are solely responsible for evaluating the qualifications 
            and suitability of any practitioner they choose to engage with.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">9. Plant Identification</h3>
          <p className="text-herbal-text-secondary">
            Our plant identification feature uses image recognition technology to help identify plants. This feature:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>Is provided on an "as is" basis without guarantees of accuracy</li>
            <li>Should not be the sole basis for identifying plants for consumption or medicinal use</li>
            <li>Requires users to independently verify any plant identification before use</li>
          </ul>
          <p className="text-herbal-text-secondary">
            Users assume all risk associated with the use of information provided by the plant identification feature.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">10. Limitation of Liability</h3>
          <p className="text-herbal-text-secondary">
            To the fullest extent permitted by law, Herbal Intelligence shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or 
            goodwill, arising out of or in connection with your use of our Services.
          </p>
          <p className="text-herbal-text-secondary">
            In no event shall our total liability for all claims related to the Services exceed the greater of $100 or 
            the amount you paid us in the past 12 months.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">11. Indemnification</h3>
          <p className="text-herbal-text-secondary">
            You agree to indemnify, defend, and hold harmless Herbal Intelligence and its officers, directors, employees, 
            agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, 
            or fees (including reasonable attorneys' fees) arising from:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>Your use of our Services</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another person or entity</li>
            <li>Your User Content</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">12. Modifications to the Services and Terms</h3>
          <p className="text-herbal-text-secondary">
            We reserve the right to modify or discontinue the Services at any time without notice. We may also revise 
            these Terms from time to time. The updated Terms will be posted on this page with a revised "Last updated" date. 
            By continuing to access or use our Services after revisions become effective, you agree to be bound by the 
            revised Terms.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">13. Governing Law</h3>
          <p className="text-herbal-text-secondary">
            These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its 
            conflict of law provisions. Any legal action or proceeding arising out of or related to these Terms or the 
            Services shall be brought exclusively in the courts of Kenya.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">14. Contact Information</h3>
          <p className="text-herbal-text-secondary">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="bg-herbal-muted p-4 rounded-lg">
            <p className="text-herbal-text-secondary">
              <strong>Herbal Intelligence</strong><br />
              Email: terms@herbalintelligence.com<br />
              Address: 123 Botanical Lane, Suite 456, Nairobi, Kenya
            </p>
          </div>
        </div>
        
        <p className="text-sm text-herbal-text-secondary italic">
          Last updated: May 16, 2025
        </p>
      </div>
    </Container>
  );
};

export default TermsOfService;
