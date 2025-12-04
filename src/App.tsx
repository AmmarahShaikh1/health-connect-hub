import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";

// Layouts
import PublicLayout from "@/components/layouts/PublicLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";

// Public Pages
import Landing from "@/pages/Landing";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import About from "@/pages/About";

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Patient Dashboard
import PatientDashboard from "@/pages/dashboard/patient/PatientDashboard";
import BookAppointment from "@/pages/dashboard/patient/BookAppointment";
import MyAppointments from "@/pages/dashboard/patient/MyAppointments";
import Telemedicine from "@/pages/dashboard/patient/Telemedicine";
import MedicalRecords from "@/pages/dashboard/patient/MedicalRecords";
import Payments from "@/pages/dashboard/patient/Payments";
import PatientSettings from "@/pages/dashboard/patient/Settings";

// Doctor Dashboard
import DoctorDashboard from "@/pages/dashboard/doctor/DoctorDashboard";
import DoctorAppointments from "@/pages/dashboard/doctor/DoctorAppointments";
import PatientRequests from "@/pages/dashboard/doctor/PatientRequests";
import Prescriptions from "@/pages/dashboard/doctor/Prescriptions";
import PatientHistory from "@/pages/dashboard/doctor/PatientHistory";
import Availability from "@/pages/dashboard/doctor/Availability";

// Admin Dashboard
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import Analytics from "@/pages/dashboard/admin/Analytics";
import ManageDoctors from "@/pages/dashboard/admin/ManageDoctors";
import ManagePatients from "@/pages/dashboard/admin/ManagePatients";
import Approvals from "@/pages/dashboard/admin/Approvals";
import AppointmentsAdmin from "@/pages/dashboard/admin/AppointmentsAdmin";
import AdminSettings from "@/pages/dashboard/admin/AdminSettings";

// Shared
import Messages from "@/pages/dashboard/shared/Messages";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Patient */}
              <Route path="patient" element={<PatientDashboard />} />
              <Route path="patient/book" element={<BookAppointment />} />
              <Route path="patient/appointments" element={<MyAppointments />} />
              <Route path="patient/telemedicine" element={<Telemedicine />} />
              <Route path="patient/records" element={<MedicalRecords />} />
              <Route path="patient/payments" element={<Payments />} />
              <Route path="patient/settings" element={<PatientSettings />} />

              {/* Doctor */}
              <Route path="doctor" element={<DoctorDashboard />} />
              <Route path="doctor/appointments" element={<DoctorAppointments />} />
              <Route path="doctor/requests" element={<PatientRequests />} />
              <Route path="doctor/prescriptions" element={<Prescriptions />} />
              <Route path="doctor/patients" element={<PatientHistory />} />
              <Route path="doctor/messages" element={<Messages />} />
              <Route path="doctor/availability" element={<Availability />} />
              <Route path="doctor/telemedicine" element={<Telemedicine />} />

              {/* Admin */}
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/analytics" element={<Analytics />} />
              <Route path="admin/doctors" element={<ManageDoctors />} />
              <Route path="admin/patients" element={<ManagePatients />} />
              <Route path="admin/approvals" element={<Approvals />} />
              <Route path="admin/appointments" element={<AppointmentsAdmin />} />
              <Route path="admin/settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
