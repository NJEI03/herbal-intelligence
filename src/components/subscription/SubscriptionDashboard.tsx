import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { getUserSubscription, getSubscriptionPlans, updateSubscription } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
}

interface Subscription {
  id: string;
  planId: string;
  status: "active" | "expired" | "cancelled";
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
}

export default function SubscriptionDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payerPhoneNumber, setPayerPhoneNumber] = useState("");
  const [paymentService, setPaymentService] = useState<"MTN" | "ORANGE">("MTN");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        const [subscriptionData, plansData] = await Promise.all([
          getUserSubscription(user.uid),
          getSubscriptionPlans()
        ]);
        
        setSubscription(subscriptionData as Subscription | null);
        setPlans(plansData as SubscriptionPlan[]);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
        toast({
          title: "Error",
          description: "Failed to load subscription data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, toast]);

  const handleSubscribe = (plan: SubscriptionPlan) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe.",
        variant: "destructive",
      });
      return;
    }

    // If it's the free plan, redirect to MeSomb payment link
    if (plan.id === "free") {
      window.location.href = "https://pay.mesomb.com/l/MD5jojF0PyL5F46Piomz";
      return;
    }

    // Clean and validate phone number
    let cleanNumber = payerPhoneNumber.replace(/\D/g, "");
    if (cleanNumber.startsWith("237")) {
      cleanNumber = cleanNumber.substring(3);
    }
    cleanNumber = cleanNumber.slice(0, 9);

    if (cleanNumber.length !== 9) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 9-digit phone number",
        variant: "destructive",
      });
      return;
    }

    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      // Refresh subscription data after successful payment
      if (user) {
        const updatedSubscription = await getUserSubscription(user.uid);
        setSubscription(updatedSubscription);
      }
      
      toast({
        title: "Success",
        description: "Subscription activated successfully",
      });
      setShowPaymentModal(false);
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast({
        title: "Error",
        description: "Failed to update subscription status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Subscription Dashboard</h1>
      
      <div className="mb-8">
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-sm font-medium">Payer Phone Number</label>
          <Input
            id="phoneNumber"
            type="tel"
            value={payerPhoneNumber}
            onChange={(e) => setPayerPhoneNumber(e.target.value)}
            placeholder="e.g., 670000000"
            required
          />
          <p className="text-sm text-herbal-text-secondary">
            Enter your 9-digit phone number (e.g., 670000000)
          </p>
        </div>
      </div>

      {subscription && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              {subscription.status === "active" 
                ? `Active until ${new Date(subscription.endDate).toLocaleDateString()}`
                : "No active subscription"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Status:</strong> {subscription.status}</p>
              <p><strong>Start Date:</strong> {new Date(subscription.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(subscription.endDate).toLocaleDateString()}</p>
              <p><strong>Auto Renew:</strong> {subscription.autoRenew ? "Yes" : "No"}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                {plan.duration} {plan.duration === 1 ? "month" : "months"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-3xl font-bold mb-4">
                {plan.price.toLocaleString()} XAF
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => {
                  if (plan.id === "free") {
                    window.location.href = "https://pay.mesomb.com/l/MD5jojF0PyL5F46Piomz";
                  } else {
                    handleSubscribe(plan);
                  }
                }}
                className="w-full"
                disabled={subscription?.status === "active"}
              >
                {subscription?.status === "active" ? "Current Plan" : "Subscribe"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={selectedPlan.price}
          description={`Subscription to ${selectedPlan.name} plan`}
          type="SUBSCRIPTION"
          reference={`SUB_${selectedPlan.id}_${Date.now()}`}
          onSuccess={handlePaymentSuccess}
          payerPhoneNumber={payerPhoneNumber}
          paymentService={paymentService}
          payerEmail={user?.email || ''}
          payerFirstName={user?.displayName || ''}
        />
      )}
    </div>
  );
} 