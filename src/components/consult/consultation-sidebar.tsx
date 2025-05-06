
import { Card } from "@/components/ui/card";

export function ConsultationSidebar() {
  const commonSymptoms = [
    "Headache",
    "Digestive Issues",
    "Stress & Anxiety",
    "Sleep Problems",
    "Common Cold",
    "Joint Pain",
    "Skin Conditions",
    "Fatigue",
  ];

  const recentConsultations = [
    {
      date: "May 3, 2025",
      topic: "Sleep Improvement",
    },
    {
      date: "April 28, 2025",
      topic: "Digestive Health",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <h3 className="font-montserrat font-semibold mb-3">Common Symptoms</h3>
        <div className="flex flex-wrap gap-2">
          {commonSymptoms.map((symptom, index) => (
            <button
              key={index}
              className="px-3 py-1 text-sm bg-herbal-muted hover:bg-herbal-secondary/20 rounded-full transition-colors"
            >
              {symptom}
            </button>
          ))}
        </div>
      </Card>
      
      <Card className="p-5">
        <h3 className="font-montserrat font-semibold mb-3">Recent Consultations</h3>
        {recentConsultations.length > 0 ? (
          <ul className="space-y-3">
            {recentConsultations.map((consultation, index) => (
              <li key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <button className="w-full text-left hover:text-herbal-primary transition-colors">
                  <div className="text-sm font-medium">{consultation.topic}</div>
                  <div className="text-xs text-herbal-text-secondary">{consultation.date}</div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-herbal-text-secondary">No recent consultations</p>
        )}
      </Card>
      
      <Card className="p-5">
        <h3 className="font-montserrat font-semibold mb-3">Need More Help?</h3>
        <p className="text-sm text-herbal-text-secondary mb-4">
          For complex conditions or in-person consultations, connect with a verified traditional practitioner.
        </p>
        <button className="w-full py-2 bg-herbal-primary/10 hover:bg-herbal-primary/20 text-herbal-primary rounded-lg transition-colors font-medium text-sm">
          Find Practitioners Near You
        </button>
      </Card>
    </div>
  );
}
