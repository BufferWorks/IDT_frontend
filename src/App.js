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

// Admin Imports
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import CreateContest from "./admin/CreateContest";
import ManageContests from "./admin/ManageContests";
import ContestDetails from "./admin/ContestDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/payment/status" element={<PaymentStatus />} />
        <Route path="/checkout" element={<PaymentCheckout />} />

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
          <Route path="contest/:id" element={<ContestDetails />} />
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
