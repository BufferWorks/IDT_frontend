import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PaymentStatus from "./PaymentStatus";

import LandingPage from "./LandingPage";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/payment/status" element={<PaymentStatus />} />

        {/* Static Pages */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Redirect unknown routes to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
