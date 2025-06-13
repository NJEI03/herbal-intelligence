import { db } from "../src/lib/firebase.js";
import { collection, doc, setDoc } from "firebase/firestore";

const subscriptionPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    duration: "lifetime",
    features: [
      "Basic access to herbal remedies",
      "Limited consultation hours",
      "Community forum access"
    ],
    description: "Perfect for those just starting their herbal journey"
  },
  {
    id: "monthly",
    name: "Monthly",
    price: 500,
    duration: "month",
    features: [
      "Full access to herbal remedies",
      "Priority consultation hours",
      "Community forum access",
      "Monthly herbal newsletter",
      "Discount on herbal products"
    ],
    description: "Ideal for regular users seeking comprehensive herbal support"
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 5000,
    duration: "year",
    features: [
      "Full access to herbal remedies",
      "24/7 priority consultation",
      "Community forum access",
      "Monthly herbal newsletter",
      "20% discount on herbal products",
      "Free annual health check-up",
      "Exclusive workshops access"
    ],
    description: "Best value for dedicated herbal wellness enthusiasts"
  }
];

async function initializeSubscriptionPlans() {
  try {
    const plansRef = collection(db, "subscriptionPlans");
    
    for (const plan of subscriptionPlans) {
      await setDoc(doc(plansRef, plan.id), plan);
      console.log(`Added subscription plan: ${plan.name}`);
    }
    
    console.log("Successfully initialized subscription plans");
  } catch (error) {
    console.error("Error initializing subscription plans:", error);
    throw error;
  }
}

async function initializeDatabase() {
  try {
    await initializeSubscriptionPlans();
    console.log("Database initialization completed successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

initializeDatabase(); 