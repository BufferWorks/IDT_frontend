import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// Configure these
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "http://api.idteventmanagement.online/api"; // Default Backend
const APP_SCHEME = "idtapp://idt.app/payment-callback"; // Deep Link Scheme

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const merchantOrderId = searchParams.get("merchantOrderId");
  const contestId = searchParams.get("contestId");
  const [status, setStatus] = useState("VERIFYING"); // VERIFYING, COMPLETED, FAILED
  const [message, setMessage] = useState("Checking payment status...");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!merchantOrderId) {
      setStatus("FAILED");
      setMessage("Invalid Payment Link. Order ID missing.");
      return;
    }

    const checkStatus = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/payment/status?merchantOrderId=${merchantOrderId}`,
        );

        const { status } = response.data;

        if (status === "SUCCESS" || status === "COMPLETED") {
          setStatus("COMPLETED");
          setMessage("Payment Successful!");
          handleRedirect("success");
        } else if (status === "FAILED") {
          setStatus("FAILED");
          setMessage("Payment Failed.");
          handleRedirect("failed");
        } else {
          // If still PENDING/INITIATED, maybe poll or show pending
          setStatus("PENDING");
          setMessage("Payment is processing. Please wait...");
          // Simple poll logic: check again in 3 seconds
          setTimeout(checkStatus, 3000);
        }
      } catch (error) {
        console.error("Status check error", error);
        setStatus("FAILED");
        setMessage("Could not verify payment status.");
      }
    };

    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantOrderId]);

  const handleRedirect = (result) => {
    setRedirecting(true);
    // Construct Deep Link
    // idtapp://payment-callback?status=success&orderId=...&contestId=...
    const deepLink = `${APP_SCHEME}?status=${result}&merchantOrderId=${merchantOrderId}&contestId=${contestId}`;

    // Redirect after short delay to let user see the message
    setTimeout(() => {
      window.location.href = deepLink;
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ ...styles.title, color: getStatusColor(status) }}>
          {status}
        </h2>
        <p style={styles.message}>{message}</p>

        {redirecting && <p style={styles.hint}>Redirecting back to app...</p>}

        {!redirecting && (
          <button
            onClick={() =>
              handleRedirect(status === "COMPLETED" ? "success" : "failed")
            }
            style={styles.button}
          >
            Return to App
          </button>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (s) => {
  if (s === "COMPLETED" || s === "SUCCESS") return "#4CAF50";
  if (s === "FAILED") return "#F44336";
  return "#2196F3"; // Blue for pending/verifying
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "24px",
    marginBottom: "16px",
  },
  message: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "24px",
  },
  hint: {
    fontSize: "14px",
    color: "#999",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default PaymentStatus;
