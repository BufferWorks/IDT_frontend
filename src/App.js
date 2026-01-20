import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PaymentStatus from "./PaymentStatus";

import LandingPage from "./LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/payment/status" element={<PaymentStatus />} />
        {/* Redirect unknown routes to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
