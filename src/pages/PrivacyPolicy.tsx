
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/layout/container";

const PrivacyPolicy = () => {
  return (
    <Container className="py-16">
      <SectionHeading 
        title="Privacy Policy" 
        subtitle="How we collect, use, and protect your information"
        centered
      />
      
      <div className="max-w-3xl mx-auto mt-10 space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Introduction</h3>
          <p className="text-herbal-text-secondary">
            At Herbal Intelligence ("we", "our", or "us"), we are committed to protecting your privacy and ensuring 
            the security of your personal information. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you use our website, mobile application, and services 
            (collectively, the "Platform").
          </p>
          <p className="text-herbal-text-secondary">
            By accessing or using our Platform, you agree to the terms of this Privacy Policy. If you do not agree 
            with the practices described in this policy, please do not use our Platform.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Information We Collect</h3>
          <p className="text-herbal-text-secondary">We collect several types of information from and about users of our Platform:</p>
          
          <div className="space-y-3">
            <h4 className="font-medium">Personal Information:</h4>
            <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
              <li>Contact information (name, email address, phone number)</li>
              <li>Account credentials (username and password)</li>
              <li>Profile information (age, gender, location, photo)</li>
              <li>Health information you choose to share during consultations</li>
              <li>Payment information when purchasing products or services</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Non-Personal Information:</h4>
            <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
              <li>Device information (device type, operating system, browser type)</li>
              <li>Usage data (pages visited, time spent on pages, links clicked)</li>
              <li>Location data (with your permission)</li>
              <li>Images you upload for plant identification</li>
              <li>Consultation history and health queries</li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">How We Collect Information</h3>
          <p className="text-herbal-text-secondary">We collect information through:</p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>Direct interactions (when you create an account, use our consultation services, or contact us)</li>
            <li>Automated technologies (cookies, server logs, and other tracking technologies)</li>
            <li>Third-party sources (when you sign in using third-party authentication services)</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">How We Use Your Information</h3>
          <p className="text-herbal-text-secondary">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>Provide, maintain, and improve our Platform and services</li>
            <li>Process and fulfill your requests, transactions, and consultations</li>
            <li>Personalize your experience and deliver tailored content</li>
            <li>Communicate with you about our services, updates, and promotions</li>
            <li>Analyze usage patterns and improve our Platform's functionality</li>
            <li>Protect against fraudulent, unauthorized, or illegal activity</li>
            <li>Comply with legal obligations and enforce our terms of service</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Health Information and Special Categories of Data</h3>
          <p className="text-herbal-text-secondary">
            We understand that health information is particularly sensitive. When you use our AI consultation service 
            or interact with practitioners through our Platform, you may share information about your health, symptoms, 
            and conditions. We process this information only:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>With your explicit consent</li>
            <li>To provide the services you request</li>
            <li>In an anonymized or pseudonymized form for research and improvement of our services</li>
          </ul>
          <p className="text-herbal-text-secondary">
            We implement enhanced security measures to protect health-related information in accordance with applicable laws.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Sharing Your Information</h3>
          <p className="text-herbal-text-secondary">We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>Service providers who perform services on our behalf (payment processors, hosting providers, etc.)</li>
            <li>Traditional practitioners you choose to connect with through our Platform</li>
            <li>Partners for research purposes (in anonymized or aggregated form)</li>
            <li>Legal authorities when required by law or to protect our rights</li>
            <li>Business partners in the event of a corporate transaction (merger, acquisition, etc.)</li>
          </ul>
          <p className="text-herbal-text-secondary">
            We do not sell your personal information to third parties for their marketing purposes.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Data Security</h3>
          <p className="text-herbal-text-secondary">
            We implement appropriate technical and organizational measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
            Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Your Rights and Choices</h3>
          <p className="text-herbal-text-secondary">Depending on your location, you may have rights to:</p>
          <ul className="list-disc pl-6 space-y-2 text-herbal-text-secondary">
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Delete your personal information</li>
            <li>Restrict or object to certain processing activities</li>
            <li>Receive your personal information in a portable format</li>
            <li>Withdraw consent for processing based on consent</li>
          </ul>
          <p className="text-herbal-text-secondary">
            To exercise these rights, please contact us using the information provided at the end of this policy.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Children's Privacy</h3>
          <p className="text-herbal-text-secondary">
            Our Platform is not intended for children under 18 years of age. We do not knowingly collect personal 
            information from children. If you believe we might have information from or about a child, please contact us.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">International Data Transfers</h3>
          <p className="text-herbal-text-secondary">
            Your information may be transferred to, stored, and processed in countries other than your country of 
            residence. We ensure appropriate safeguards are in place to protect your information when transferred 
            internationally, in compliance with applicable data protection laws.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Changes to This Privacy Policy</h3>
          <p className="text-herbal-text-secondary">
            We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, 
            or regulatory reasons. The updated policy will be posted on this page with a revised "Last updated" date. 
            We encourage you to review the Privacy Policy whenever you access the Platform.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p className="text-herbal-text-secondary">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, 
            please contact us at:
          </p>
          <div className="bg-herbal-muted p-4 rounded-lg">
            <p className="text-herbal-text-secondary">
              <strong>Herbal Intelligence</strong><br />
              Email: privacy@herbalintelligence.com<br />
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

export default PrivacyPolicy;
