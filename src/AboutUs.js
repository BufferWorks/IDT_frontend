import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const features = [
    {
      icon: <Target size={32} className="text-[#5865F2]" />,
      title: "Our Mission",
      desc: "To empower creators and performers by providing a transparent, global platform to showcase their talents and earn recognition.",
    },
    {
      icon: <Users size={32} className="text-pink-500" />,
      title: "Community First",
      desc: "We believe in building a supportive community where every participant gets fair exposure and equal opportunities to succeed.",
    },
    {
      icon: <Heart size={32} className="text-red-500" />,
      title: "Passion for Talent",
      desc: "From photography to modeling, we celebrate diverse talents and strive to bring the best out of every individual.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-[#5865F2] hover:text-[#4752c4] font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Home
        </Link>
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-[#5865F2] mb-6"
          >
            About IDT Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Where talent meets opportunity. We are revolutionizing digital
            contests with transparency and excitement.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-[#5865F2] rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Whether you are an organizer or a participant, IDT Events is the
              place to be. Let's create something amazing together.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
