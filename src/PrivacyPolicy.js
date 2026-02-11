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
              At IDT Event Management, accessible from
              https://idteventmanagement.online/, one of our main priorities is
              the privacy of our visitors. This Privacy Policy document contains
              types of information that is collected and recorded by our website
              and how we use it.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h3>
            <p className="mb-4">
              If you contact us directly or use a booking form, we may collect
              the following information:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Personal Identifiers:</strong> Name, email address,
                phone number, and mailing address.
              </li>
              <li>
                <strong>Event Details:</strong> Date of event, venue location,
                guest count, and specific service requirements.
              </li>
              <li>
                <strong>Communication Data:</strong> Records of your
                correspondence with us via idteventmanagementgwl@gmail.com.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Your Information
            </h3>
            <p className="mb-4">
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide, operate, and maintain our website.</li>
              <li>Process your event bookings and manage payments.</li>
              <li>
                Communicate with you regarding event updates and customer
                service.
              </li>
              <li>Send you invoices and booking confirmations.</li>
              <li>Comply with legal obligations and prevent fraud.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              3. Log Files
            </h3>
            <p className="mb-6">
              IDT Event Management follows a standard procedure of using log
              files. These files log visitors when they visit websites. The
              information collected includes internet protocol (IP) addresses,
              browser type, Internet Service Provider (ISP), date and time
              stamp, and referring/exit pages. This information is used for
              analyzing trends and administering the site.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              4. Third-Party Service Providers
            </h3>
            <p className="mb-4">
              We do not sell or trade your personal information. However, we may
              share necessary data with trusted third parties to execute your
              event, such as:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Catering or Decor Vendors:</strong> Sharing only
                relevant event details to fulfill orders.
              </li>
              <li>
                <strong>Payment Processors:</strong> To securely handle
                transactions.
              </li>
              <li>
                <strong>Legal Authorities:</strong> If required by law to
                protect our rights or comply with a judicial proceeding.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              5. Data Security
            </h3>
            <p className="mb-6">
              We prioritize the security of your data. While we strive to use
              commercially acceptable means to protect your personal
              information, please remember that no method of transmission over
              the internet or electronic storage is 100% secure.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              6. Your Data Protection Rights
            </h3>
            <p className="mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>The right to access:</strong> You can request copies of
                your personal data.
              </li>
              <li>
                <strong>The right to rectification:</strong> You can request
                that we correct any information you believe is inaccurate.
              </li>
              <li>
                <strong>The right to erasure:</strong> You can request that we
                delete your personal data under certain conditions.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              7. Children's Information
            </h3>
            <p className="mb-6">
              IDT Event Management does not knowingly collect any Personal
              Identifiable Information from children under the age of 13. If you
              think that your child provided this kind of information on our
              website, we strongly encourage you to contact us immediately, and
              we will do our best to promptly remove such information.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              8. Changes to This Privacy Policy
            </h3>
            <p className="mb-6">
              We may update our Privacy Policy from time to time. We advise you
              to review this page periodically for any changes. Changes are
              effective immediately after they are posted on this page.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              9. Contact Us
            </h3>
            <p className="mb-6">
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact us:
              <br />
              <strong>Email:</strong> idteventmanagementgwl@gmail.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
