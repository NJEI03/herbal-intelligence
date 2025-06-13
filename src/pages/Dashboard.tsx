import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { 
  Activity, 
  Brain, 
  Users, 
  ShoppingBag, 
  Crown,
  Lock
} from "lucide-react";

const features = [
  {
    title: "AI Tool",
    description: "Access our advanced AI wellness assistant",
    icon: Brain,
    premium: true
  },
  {
    title: "Fitness & Diet",
    description: "Personalized workout and nutrition plans",
    icon: Activity,
    premium: true
  },
  {
    title: "Community",
    description: "Connect with like-minded individuals",
    icon: Users,
    premium: true
  },
  {
    title: "Store",
    description: "Browse wellness products",
    icon: ShoppingBag,
    premium: true
  }
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isPremium = false; // This would come from your subscription data

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (!user) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to access your dashboard</h1>
        <Button onClick={() => navigate('/login')}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-herbal-text-primary">Welcome Back, {user.displayName}</h1>
          <p className="text-herbal-text-secondary">Manage your wellness journey</p>
        </div>
        <div className="flex gap-4">
          <Button className="bg-herbal-primary hover:bg-herbal-primary/90" asChild>
            <Link to="/subscription">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Link>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
          <CardDescription>Your current plan and benefits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                {isPremium ? "Premium Plan" : "Free Plan"}
              </h3>
              <p className="text-muted-foreground">
                {isPremium ? "Full access to all features" : "Limited access to features"}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/subscription">
                {isPremium ? "Manage Subscription" : "Upgrade Now"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fitness">Fitness & Diet</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-herbal-primary" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {feature.premium && !isPremium ? (
                    <div className="flex items-center text-muted-foreground">
                      <Lock className="mr-2 h-4 w-4" />
                      Premium Feature
                    </div>
                  ) : (
                    <Button className="w-full" asChild>
                      <Link to="/subscription">Access</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fitness">
          <Card>
            <CardHeader>
              <CardTitle>Fitness & Diet Plans</CardTitle>
              <CardDescription>
                {isPremium 
                  ? "Access your personalized fitness and diet plans"
                  : "Upgrade to access personalized fitness and diet plans"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isPremium && (
                <div className="text-center py-8">
                  <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
                  <p className="text-muted-foreground mb-4">
                    Upgrade your plan to access personalized fitness and diet plans
                  </p>
                  <Button asChild>
                    <Link to="/subscription">Upgrade Now</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
              <CardDescription>
                {isPremium 
                  ? "Connect with our wellness community"
                  : "Upgrade to join our wellness community"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isPremium && (
                <div className="text-center py-8">
                  <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
                  <p className="text-muted-foreground mb-4">
                    Upgrade your plan to join our community
                  </p>
                  <Button asChild>
                    <Link to="/subscription">Upgrade Now</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store</CardTitle>
              <CardDescription>
                {isPremium 
                  ? "Browse wellness products"
                  : "Upgrade to access our store"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isPremium && (
                <div className="text-center py-8">
                  <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
                  <p className="text-muted-foreground mb-4">
                    Upgrade your plan to access our store
                  </p>
                  <Button asChild>
                    <Link to="/subscription">Upgrade Now</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 