import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free Plan",
    price: "0 XAF",
    description: "Basic access to essential features",
    features: [
      "Limited AI tool access",
      "Basic community features",
      "View-only fitness content",
      "Basic diet information"
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    name: "Monthly Plan",
    price: "500 XAF",
    description: "Full access to all features",
    features: [
      "Full AI tool access",
      "Complete fitness & diet plans",
      "Full community access",
      "Store access",
      "Priority support"
    ],
    buttonText: "Subscribe Monthly",
    popular: true
  },
  {
    name: "Yearly Plan",
    price: "5000 XAF",
    description: "Best value with full access",
    features: [
      "Full AI tool access",
      "Complete fitness & diet plans",
      "Full community access",
      "Store access",
      "Priority support",
      "2 months free"
    ],
    buttonText: "Subscribe Yearly",
    popular: false
  }
];

export default function Subscription() {
  return (
    <div className="container py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-herbal-text-primary">Choose Your Plan</h1>
        <p className="text-xl text-herbal-text-secondary">Select the perfect plan for your wellness journey</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative ${plan.popular ? 'border-herbal-primary' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-herbal-primary text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "0 XAF" && <span className="text-muted-foreground">/month</span>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-herbal-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-herbal-primary hover:bg-herbal-primary/90"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 