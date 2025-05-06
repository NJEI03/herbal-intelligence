
import { useState } from "react";
import { SectionHeading } from "../ui/section-heading";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const faqs = [
    {
      question: "Is herbal medicine safe?",
      answer: "Herbal medicines can be safe when used appropriately, but they are not without risks. Some herbs can interact with medications or may not be suitable for certain conditions. Our AI consultation helps identify potential risks based on your health information, and we always recommend consulting with healthcare providers before starting any new treatment.",
    },
    {
      question: "How does the AI consultation work?",
      answer: "Our AI consultation uses natural language processing to understand your symptoms and health concerns. It then references a comprehensive database of traditional herbal medicines and scientific research to provide personalized recommendations based on your specific situation. The entire process is conversational and user-friendly.",
    },
    {
      question: "Can I use herbal medicine alongside conventional treatments?",
      answer: "Many herbal medicines can complement conventional treatments, but some may interact with medications. Always inform your healthcare provider about any herbs or supplements you're taking. Our platform can help identify potential interactions and guide you on safe complementary approaches.",
    },
    {
      question: "How accurate is the plant identification feature?",
      answer: "Our plant identification system uses advanced image recognition technology and can accurately identify thousands of medicinal plants. However, for safety reasons, we always recommend confirming identifications with a knowledgeable practitioner before using any wild-harvested plants for medicinal purposes.",
    },
    {
      question: "How are practitioners verified on the platform?",
      answer: "Practitioners must undergo a thorough verification process that includes credential checks, background verification, and peer reviews. We verify their training, experience, and standing in their respective communities. Each verified practitioner displays a verification badge on their profile.",
    },
    {
      question: "Is my health information kept private?",
      answer: "Yes, we take privacy very seriously. All personal health information is encrypted and stored securely. We do not share your information with third parties without your explicit consent. You can review our privacy policy for more details on how we handle and protect your data.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about herbal medicine and our platform"
          centered
          className="max-w-2xl mx-auto"
        />

        <div className="mt-12 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQ
              key={index}
              question={faq.question}
              answer={faq.answer}
              isLast={index === faqs.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ question, answer, isLast }: { question: string; answer: string; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("py-4", !isLast && "border-b border-gray-200")}>
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-montserrat font-semibold text-lg">{question}</h3>
        <div className={cn("transition-transform", isOpen ? "rotate-180" : "")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 pt-4" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-herbal-text-secondary">{answer}</p>
        </div>
      </div>
    </div>
  );
}
