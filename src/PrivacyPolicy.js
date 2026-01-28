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
            Privacy Policy
          </h1>

          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              1. Introduction
            </h3>
            <p className="mb-6">
              Welcome to IDT Events. We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform
              you as to how we look after your personal data when you visit our
              website or use our application and tell you about your privacy
              rights and how the law protects you.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              2. Data We Collect
            </h3>
            <p className="mb-6">
              We may collect, use, store and transfer different kinds of
              personal data about you including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Identity Data (name, username, date of birth)</li>
              <li>Contact Data (email address, telephone number)</li>
              <li>Technical Data (IP address, browser type and version)</li>
              <li>Usage Data (how you use our website and services)</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              3. How We Use Your Data
            </h3>
            <p className="mb-6">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>To register you as a new customer.</li>
              <li>To process and deliver your contest entries.</li>
              <li>
                To manage our relationship with you including notifying you
                about changes to our terms or privacy policy.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              4. Contact Us
            </h3>
            <p className="mb-6">
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at: idteventmanagementgwl@gmail.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
