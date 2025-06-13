import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-herbal-text-primary">
          Welcome to Herbal Intelligence
        </h1>
        <p className="text-xl text-herbal-text-secondary max-w-2xl mx-auto">
          Your comprehensive platform for natural wellness, community support, and expert guidance.
        </p>
      </div>

      {/* Login Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Login Card */}
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-herbal-text-primary">For Users</h3>
            <p className="text-herbal-text-secondary mb-4">
              Access personalized wellness plans, track your progress, and connect with experts.
            </p>
            {!user ? (
              <div className="space-y-3">
                <Button 
                  className="w-full bg-herbal-primary hover:bg-herbal-primary/90"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-herbal-primary text-herbal-primary hover:bg-herbal-primary/10"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              </div>
            ) : (
              <Button 
                className="w-full bg-herbal-primary hover:bg-herbal-primary/90"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
            )}
          </div>

          {/* Doctor Login Card */}
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-herbal-text-primary">For Doctors</h3>
            <p className="text-herbal-text-secondary mb-4">
              Manage patient care, prescribe treatments, and access medical resources.
            </p>
            {user && user.role === "doctor" ? (
              <Button 
                className="w-full bg-herbal-primary hover:bg-herbal-primary/90"
                onClick={() => navigate("/doctor")}
              >
                Go to Dashboard
              </Button>
            ) : (
              <Button 
                variant="outline"
                className="w-full border-herbal-primary text-herbal-primary hover:bg-herbal-primary/10"
                onClick={() => navigate("/doctor")}
              >
                Doctor Login
              </Button>
            )}
          </div>

          {/* Vendor Login Card */}
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-herbal-text-primary">For Vendors</h3>
            <p className="text-herbal-text-secondary mb-4">
              Manage your products, track orders, and connect with customers.
            </p>
            {user && user.role === "vendor" ? (
              <Button 
                className="w-full bg-herbal-primary hover:bg-herbal-primary/90"
                onClick={() => navigate("/vendor")}
              >
                Go to Dashboard
              </Button>
            ) : (
              <div className="space-y-3">
                <Button 
                  variant="outline"
                  className="w-full border-herbal-primary text-herbal-primary hover:bg-herbal-primary/10"
                  onClick={() => navigate("/vendor")}
                >
                  Vendor Login
                </Button>
                <Button 
                  className="w-full bg-herbal-primary hover:bg-herbal-primary/90"
                  onClick={() => navigate("/vendor-signup")}
                >
                  Become a Vendor
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Natural Wellness</h3>
          <p className="text-herbal-text-secondary">
            Discover natural remedies and holistic approaches to health.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
          <p className="text-herbal-text-secondary">
            Connect with healthcare professionals and wellness experts.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Community Support</h3>
          <p className="text-herbal-text-secondary">
            Join a community of like-minded individuals on their wellness journey.
          </p>
        </div>
      </div>
    </div>
  );
} 