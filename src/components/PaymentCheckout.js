import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://idteventmanagement.online/api";

const PaymentCheckout = () => {
  const [searchParams] = useSearchParams();

  const referenceId = searchParams.get("referenceId"); // Internal Payment ID

  // 1. Helper to Load Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (!referenceId) {
      alert("Invalid Payment Link");
      return;
    }

    const startCheckout = async () => {
      try {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          alert(
            "Failed to load payment gateway. Please check internet connection.",
          );
          return;
        }

        // 2. Create Razorpay Order
        const { data } = await axios.post(
          `${BACKEND_URL}/payment/create-order`,
          {
            referenceId: referenceId,
          },
        );

        if (!data.success) {
          throw new Error(data.message || "Failed to create order");
        }

        const options = {
          key: data.key,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "IDT Events",
          description: "Contest Entry Fee",
          order_id: data.order.id, // Razorpay Order ID
          handler: async function (response) {
            // 3. Success Handler - Check Status via Backend
            console.log("Payment Success:", response);
            await checkPaymentStatus(response.razorpay_payment_id);
          },
          prefill: {
            name: data.user.name,
            email: data.user.email,
            contact: data.user.contact,
          },
          theme: {
            color: "#5865F2",
          },
          retry: {
            enabled: false,
          },
        };

        const rzp = new window.Razorpay(options);

        // 4. Failure Handler
        rzp.on("payment.failed", async function (response) {
          console.error("Payment Failed:", response.error);
          // Even on failure, we check status/log it using the Payment ID
          if (response.error.metadata && response.error.metadata.payment_id) {
            await checkPaymentStatus(response.error.metadata.payment_id);
          } else {
            alert("Payment Failed: " + response.error.description);
            window.location.href = `idtapp://idt.app/payment-callback?status=failed`;
          }
        });

        rzp.open();
      } catch (error) {
        console.error("Checkout Error:", error);
        alert("Something went wrong. Please try again.");
      }
    };

    startCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referenceId]);

  const checkPaymentStatus = async (paymentId) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/payment/check-payment`,
        {
          paymentId: paymentId,
        },
      );

      console.log("Check Payment Response:", data);

      const status = data.success ? "success" : "failed";
      const contestId = data.contestId || searchParams.get("contestId"); // Fallback to URL param
      const merchantOrderId = data.merchantOrderId;

      // Deep Link back to App
      window.location.href = `idtapp://idt.app/payment-callback?status=${status}&contestId=${contestId}&merchantOrderId=${merchantOrderId}`;
    } catch (error) {
      console.error("Verification Error:", error);
      alert("Payment Verification API Failed. Please contact support.");
      // Fallback redirect
      window.location.href = `idtapp://idt.app/payment-callback?status=failed`;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h2>Processing Payment...</h2>
      <p>Please wait while we load the payment gateway.</p>
    </div>
  );
};

export default PaymentCheckout;
