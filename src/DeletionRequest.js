import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  Smartphone,
  FileText,
  CheckCircle,
  AlertTriangle,
  Shield,
  Loader2,
  ArrowRight,
} from "lucide-react";

const DeletionRequest = () => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    reason: "",
    deletionType: "Full Account",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://api.idteventmanagement.online/api";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // API_URL includes /api as per .env check, so we append /deletion-requests
      const response = await fetch(`${API_URL}/deletion-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "We've received your request. Using the number provided, we will process the deletion within 30 days.",
        );
        setFormData({
          mobileNumber: "",
          reason: "",
          deletionType: "Full Account",
        });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(
        "Failed to connect to the server. Please check your internet connection.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[100px] opacity-50"></div>
      </div>

      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Account Deletion
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-xs mx-auto">
            We're sorry to see you go. Please fill out the form below to request
            permanent deletion of your data.
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100">
          {message ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg bg-green-50 p-6 flex flex-col items-center text-center"
            >
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-green-900">
                Request Submitted
              </h3>
              <p className="mt-2 text-sm text-green-700">{message}</p>
              <button
                onClick={() => setMessage("")}
                className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Submit another request
              </button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    className="block w-full pl-10 pr-3 py-3 border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 sm:text-sm border transition-shadow"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="deletionType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Data to Delete
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Trash2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="deletionType"
                    name="deletionType"
                    required
                    className="block w-full pl-10 pr-10 py-3 border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 sm:text-sm border bg-white appearance-none transition-shadow"
                    value={formData.deletionType}
                    onChange={handleChange}
                  >
                    <option value="Full Account">
                      Full Account (Profile + Data)
                    </option>
                    <option value="Media Data">Media Data Only</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason for Deletion
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="4"
                    required
                    className="block w-full pl-10 pr-3 py-3 border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 sm:text-sm border transition-shadow"
                    placeholder="We'd love to know why you're leaving..."
                    value={formData.reason}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="rounded-md bg-red-50 p-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Submission Error
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all ${
                    loading
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Deletion Request
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By submitting this form, you acknowledge that this action is
                  irreversible once processed.
                  <br />
                  <a
                    href="/privacy"
                    className="text-red-600 hover:text-red-500 font-medium"
                  >
                    Read our Privacy Policy
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DeletionRequest;
