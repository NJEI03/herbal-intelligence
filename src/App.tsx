
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";

// Pages
import Index from "./pages/Index";
import Consult from "./pages/Consult";
import Identify from "./pages/Identify";
import Practitioners from "./pages/Practitioners";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/consult" element={<Consult />} />
            <Route path="/identify" element={<Identify />} />
            <Route path="/practitioners" element={<Practitioners />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* New Pages */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/mission" element={<OurMission />} />
            <Route path="/team" element={<OurTeam />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/store" element={<Store />} />
            <Route path="/disclaimer" element={<MedicalDisclaimer />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
