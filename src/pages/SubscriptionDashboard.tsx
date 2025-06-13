import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { getUserSubscription, getSubscriptionPlans } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { Loader2 } from "lucide-react";

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

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        const [subscriptionData, plansData] = await Promise.all([
          getUserSubscription(user.uid),
          getSubscriptionPlans()
        ]);
        
        setSubscription(subscriptionData);
        setPlans(plansData);
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
                onClick={() => handleSubscribe(plan)}
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
        />
      )}
    </div>
  );
} 