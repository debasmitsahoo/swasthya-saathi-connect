import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AppointmentPage from "./pages/AppointmentPage";
import AppointmentConfirmation from "./pages/AppointmentConfirmation";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import PatientRegistrationPage from "./pages/Admin/PatientRegistrationPage";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/ServicesPage";
import ServicePage from "./components/Services/ServicePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

// For animations
import { MotionConfig } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MotionConfig reducedMotion="user">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceId" element={<ServicePage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/appointment/confirmation" element={<AppointmentConfirmation />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/patient/register" element={<PatientRegistrationPage />} />
            <Route path="/admin/appointments" element={<AdminDashboardPage />} />
            <Route path="/admin/patients" element={<AdminDashboardPage />} />
            <Route path="/admin/doctors" element={<AdminDashboardPage />} />
            <Route path="/admin/departments" element={<AdminDashboardPage />} />
            <Route path="/admin/inventory" element={<AdminDashboardPage />} />
            <Route path="/admin/billing" element={<AdminDashboardPage />} />
            <Route path="/admin/reports" element={<AdminDashboardPage />} />
            <Route path="/admin/settings" element={<AdminDashboardPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
