import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Pages
import Index from "./pages/Index";
import Consult from "./pages/Consult";
import Identify from "./pages/Identify";
import Practitioners from "./pages/Practitioners";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";

// New Pages
import AboutUs from "./pages/AboutUs";
import OurMission from "./pages/OurMission";
import OurTeam from "./pages/OurTeam";
import Careers from "./pages/Careers";
import Store from "./pages/Store";
import MedicalDisclaimer from "./pages/MedicalDisclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Health & Wellness Platform Pages
import Subscription from "./pages/Subscription";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Fitness from "./pages/Fitness";
import VendorDashboard from "./pages/VendorDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VendorSignUp from "./pages/VendorSignUp";
import AddProduct from "./pages/AddProduct";
import SubscriptionDashboard from "@/components/subscription/SubscriptionDashboard";
import Cart from "./pages/Cart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
          <CartProvider>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/consult" element={<Consult />} />
                <Route path="/identify" element={<Identify />} />
                <Route path="/practitioners" element={<Practitioners />} />
                <Route path="/learn" element={<Learn />} />
                
                {/* New Pages */}
                <Route path="/about" element={<AboutUs />} />
                <Route path="/mission" element={<OurMission />} />
                <Route path="/team" element={<OurTeam />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/store" element={<Store />} />
                <Route path="/disclaimer" element={<MedicalDisclaimer />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                
                  {/* Health & Wellness Platform Routes */}
                  <Route path="/subscription" element={<SubscriptionDashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/fitness" element={<Fitness />} />
                  <Route path="/vendor" element={<VendorDashboard />} />
                  <Route path="/doctor" element={<DoctorDashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/vendor-signup" element={<VendorSignUp />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/cart" element={<Cart />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            </Router>
          </CartProvider>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
