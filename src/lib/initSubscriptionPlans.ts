import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const subscriptionPlans = [
  {
    id: "free",
    name: "Free Plan",
    price: 0,
    duration: 1, // months
    features: [
      "Limited AI tool access",
      "Basic community features",
      "View-only fitness content",
      "Basic diet information"
    ],
    description: "Basic access to essential features"
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: 500,
    duration: 1,
    features: [
      "Full AI tool access",
      "Complete fitness & diet plans",
      "Full community access",
      "Store access",
      "Priority support"
    ],
    description: "Full access to all features"
  },
  {
    id: "yearly",
    name: "Yearly Plan",
    price: 5000,
    duration: 12,
    features: [
      "Full AI tool access",
      "Complete fitness & diet plans",
      "Full community access",
      "Store access",
      "Priority support",
      "2 months free"
    ],
    description: "Best value with full access"
  }
];

export const initializeSubscriptionPlans = async () => {
  try {
    const plansRef = collection(db, "subscription_plans");
    
    for (const plan of subscriptionPlans) {
      await setDoc(doc(plansRef, plan.id), {
        ...plan,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    console.log("Subscription plans initialized successfully");
  } catch (error) {
    console.error("Error initializing subscription plans:", error);
    throw error;
  }
}; 