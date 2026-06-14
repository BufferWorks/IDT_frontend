import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PaymentStatus from "./PaymentStatus";
import PaymentCheckout from "./components/PaymentCheckout";

import LandingPage from "./LandingPage";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import DeletionRequest from "./DeletionRequest";
import PromoteRedirect from "./PromoteRedirect";
import PhysicalForm from "./PhysicalForm";

// Admin Imports
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import CreateContest from "./admin/CreateContest";
import ManageContests from "./admin/ManageContests";
import ContestDetails from "./admin/ContestDetails";
import UpdateContest from "./admin/UpdateContest";
import ManageGallery from "./admin/ManageGallery";
import SendNotification from "./admin/SendNotification";
import ContestRedirect from "./ContestRedirect";

// Physical Events
import ManagePhysicalEvents from "./admin/ManagePhysicalEvents";
import CreatePhysicalEvent from "./admin/CreatePhysicalEvent";
import PhysicalSubmissions from "./admin/PhysicalSubmissions";
import ManageReferrals from "./admin/ManageReferrals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/payment/status" element={<PaymentStatus />} />
        <Route path="/checkout" element={<PaymentCheckout />} />
        <Route path="/promote/:id" element={<PromoteRedirect />} />
        <Route path="/vote/:slugId" element={<PromoteRedirect />} />
        <Route path="/contest/:id" element={<ContestRedirect />} />
        <Route path="/form/:id" element={<PhysicalForm />} />

        {/* Static Pages */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/delete-account" element={<DeletionRequest />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create-contest" element={<CreateContest />} />
          <Route path="manage-contests" element={<ManageContests />} />
          <Route path="manage-gallery" element={<ManageGallery />} />
          <Route path="send-notification" element={<SendNotification />} />
          <Route path="contest/:id" element={<ContestDetails />} />
          <Route path="update-contest/:id" element={<UpdateContest />} />

          {/* Physical Events */}
          <Route
            path="manage-physical-events"
            element={<ManagePhysicalEvents />}
          />
          <Route
            path="create-physical-event"
            element={<CreatePhysicalEvent />}
          />
          <Route
            path="physical-submissions/:id"
            element={<PhysicalSubmissions />}
          />

          {/* Referrals */}
          <Route path="referrals" element={<ManageReferrals />} />

          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Redirect unknown routes to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
