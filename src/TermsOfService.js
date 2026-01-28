import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
            Terms of Service
          </h1>

          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              1. Agreement to Terms
            </h3>
            <p className="mb-6">
              By accessing our website or using our mobile application, you
              agree to be bound by these Terms of Service and to the collection
              and use of your information as set forth in the Privacy Policy. If
              you do not wish to be bound by these Terms of Service, you may not
              access or use the Services.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              2. Intellectual Property Rights
            </h3>
            <p className="mb-6">
              Other than the content you own, under these Terms, IDT Events
              and/or its licensors own all the intellectual property rights and
              materials contained in this Website. You are granted limited
              license only for purposes of viewing the material contained on
              this Website.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              3. Contest Rules
            </h3>
            <p className="mb-6">
              Participation in any contest hosted on IDT Events is subject to
              specific rules and regulations outlined on the respective contest
              page. By entering a contest, you agree to abide by those specific
              rules.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              4. Termination
            </h3>
            <p className="mb-6">
              We may terminate or suspend your access immediately, without prior
              notice or liability, for any reason whatsoever, including without
              limitation if you breach the Terms.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
