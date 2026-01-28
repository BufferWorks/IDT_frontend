import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-[#5865F2] hover:text-[#4752c4] font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Home
        </Link>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-extrabold text-[#5865F2] mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Have questions or need support? We are here to help you 24/7.
            </p>

            <div className="space-y-6">
              <ContactItem
                icon={<Mail className="text-[#5865F2]" />}
                title="Email Us"
                text="idteventmanagementgwl@gmail.com"
              />
              <ContactItem
                icon={<Phone className="text-green-500" />}
                title="Call Us"
                text="+91 8602240215"
              />
              <ContactItem
                icon={<MapPin className="text-red-500" />}
                title="Visit Us"
                text="Bable ki payega behind chitra talies  nai sadak , gwalior"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5865F2] focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5865F2] focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5865F2] focus:border-transparent outline-none transition-all"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#5865F2] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#4752c4] transition-colors shadow-lg"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, title, text }) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
    <div>
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

export default ContactUs;
