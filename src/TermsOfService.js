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
            Terms & Conditions
          </h1>

          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Welcome to IDT Event Management
              (https://idteventmanagement.online/). These Terms and Conditions
              outline the rules and regulations for the use of our services and
              website.
              <br />
              This website is managed by Sonu Kumar.
            </p>

            <p className="mb-6">
              By accessing this website or booking our services, we assume you
              accept these terms and conditions. Do not continue to use IDT
              Event Management if you do not agree to all of the terms stated on
              this page.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              1. Services Provided
            </h3>
            <p className="mb-6">
              IDT Event Management provides a platform for skill-based talent
              events and competitions. Participants submit entries which are
              evaluated based on merit, creativity, and public support. The
              specific criteria for each event will be outlined in the event
              details.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              2. Bookings and Payments
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Registration Fee:</strong> A non-refundable registration
                fee is required to participate in specific events. This fee
                covers administrative costs and platform maintenance.
              </li>
              <li>
                <strong>Payment Methods:</strong> We accept payments via Bank
                Transfer/UPI/Credit Card.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              3. Cancellation and Refund Policy
            </h3>
            <p className="mb-4">
              Registration fees are non-refundable as they cover immediate
              administrative and platform costs. We do not provide refunds once
              registration is confirmed.
            </p>
            <p className="mb-6">
              In the event that IDT Event Management must cancel due to
              unforeseen circumstances, a full refund of all payments made will
              be issued.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              4. Client Responsibilities
            </h3>
            <p className="mb-6">
              The client is responsible for providing accurate information
              regarding event requirements, guest counts, and venue access. IDT
              Event Management is not liable for delays or issues caused by
              incomplete or inaccurate information provided by the client.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              5. Intellectual Property
            </h3>
            <p className="mb-6">
              Unless otherwise stated, IDT Event Management owns the
              intellectual property rights for all material on this website,
              including logos, designs, and text. You may view this for personal
              use but may not republish or redistribute our content without
              written consent.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              6. Liability and Indemnity
            </h3>
            <p className="mb-4">
              IDT Event Management will perform services with professional care;
              however, we are not liable for the actions of third-party vendors
              (e.g., catering, photography, venues) unless they are direct
              employees of IDT.
            </p>
            <p className="mb-6">
              The client agrees to indemnify IDT Event Management against any
              claims for loss, damage, or injury occurring during the event,
              except in cases of gross negligence by our staff.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              7. Force Majeure
            </h3>
            <p className="mb-6">
              Neither party shall be liable for failure to perform their
              obligations if such failure is as a result of Acts of God
              (including fire, flood, earthquake, storm, or other natural
              disasters), war, government regulations, or pandemics.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              8. Privacy Policy
            </h3>
            <p className="mb-6">
              Your use of our website is also governed by our Privacy Policy. We
              collect and use your data (such as name and email) solely to
              process your bookings and communicate regarding our services.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              9. Governing Law
            </h3>
            <p className="mb-6">
              These terms are governed by and construed in accordance with the
              laws of India. These events are skill-based competitions and do
              not fall under gambling laws. Any disputes will be subject to the
              exclusive jurisdiction of the courts in India.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              10. Contact Information
            </h3>
            <p className="mb-6">
              If you have any questions about these Terms and Conditions, please
              contact us at:
              <br />
              <strong>Email:</strong> idteventmanagementgwl@gmail.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
