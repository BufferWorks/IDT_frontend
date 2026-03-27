import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-[#5865F2] hover:text-[#4752c4] font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <h1 className="text-4xl font-extrabold text-[#5865F2] mb-8">
            Privacy Policy for IDT – India’s Talent Platform
          </h1>

          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              This Privacy Policy applies to the mobile application "IDT –
              India’s Talent Platform", developed and operated by Bufferworks.
              <br />
              <br />
              At IDT – India’s Talent Platform, we value your privacy and are
              committed to protecting your personal data.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h3>
            <p className="mb-4">
              We may collect the following information when you use our app:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Name</li>
              <li>Mobile number</li>
              <li>Email address</li>
              <li>Profile details (if provided)</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Your Information
            </h3>
            <p className="mb-4">We use your data to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Create and manage your account</li>
              <li>Authenticate users (via OTP or email login)</li>
              <li>Provide app features and services</li>
              <li>Communicate important updates</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              3. Third-Party Services
            </h3>
            <p className="mb-4">
              We may use trusted third-party services such as:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Firebase Authentication (for login and user management)</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              4. Data Sharing
            </h3>
            <p className="mb-6">
              We do not sell or rent your personal data. Your information is
              only used for app functionality.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              5. Data Security
            </h3>
            <p className="mb-6">
              We take reasonable steps to protect your data, but no system is
              completely secure.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              6. Account Deletion
            </h3>
            <p className="mb-4">
              You can request deletion of your account and data by visiting:
              <br />
              <a
                href="https://idteventmanagement.online/delete-account"
                className="text-[#5865F2] hover:underline break-all"
              >
                https://idteventmanagement.online/delete-account
              </a>
            </p>
            <p className="mb-6">
              Upon request, your data will be permanently deleted within 48
              hours.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              7. Your Rights
            </h3>
            <p className="mb-6">
              You can request access, correction, or deletion of your personal
              data.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              8. Contact Us
            </h3>
            <p className="mb-6">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:idteventmanagementgwl@gmail.com"
                className="text-[#5865F2] hover:underline"
              >
                idteventmanagementgwl@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
