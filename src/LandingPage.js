import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Trophy,
  Users,
  Clock,
  Calendar,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

const ContestCard = ({ contest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-xl"
    >
      <img
        src={contest.bannerImage}
        alt={contest.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full p-8 text-white">
        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold mb-4 border border-white/20">
          {contest.theme || "General"}
        </div>
        <h3 className="text-3xl font-bold mb-2 leading-tight">
          {contest.name}
        </h3>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-300 mb-6">
          <span className="flex items-center gap-1">
            <Trophy size={16} className="text-yellow-400" />₹{contest.prizePool}{" "}
            Pool
          </span>
          <span className="flex items-center gap-1">
            <Users size={16} className="text-blue-400" />
            {contest.totalParticipants || 0} Joined
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Asset Paths (Assumed moved to public/assets/images/)
const ASSETS = {
  home: "/assets/images/app_home.jpeg",
  details: "/assets/images/contest_details.jpeg",
  vote: "/assets/images/entry_vote.jpeg",
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log(BACKEND_URL);

const LandingPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/contests/all`);
        // Filter active contests and take top 2

        const active = (res.data.contests || [])
          .filter((c) => c.isPublished)
          .slice(0, 2);
        setContests(active);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Navbar />
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-[#5865F2] text-white pt-24">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent)]pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.3),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left z-10"
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Unleash Your <span className="text-yellow-300">Talent</span>
            </h1>
            <p className="mt-6 text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto lg:mx-0">
              The ultimate platform to participate in model contests, showcase
              your skills, and win exciting cash prizes.
            </p>
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              {/* Download button removed */}
              <Link
                to="/about"
                className="border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex justify-center items-center"
          >
            {/* Phone Mockup Wrapper - Tilted */}
            <div className="relative w-72 lg:w-80 h-auto transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-20">
              <div className="absolute inset-0 bg-black rounded-[3rem] blur-xl opacity-30 transform translate-y-4 translate-x-4"></div>
              <img
                src={ASSETS.home}
                alt="IDT App Home"
                className="relative rounded-[2.5rem] border-8 border-gray-900 shadow-2xl z-20 bg-gray-800"
              />
            </div>
            {/* Behind Phone - Accent */}
            <div className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animation-delay-2000 animate-pulse"></div>
          </motion.div>
        </div>
      </section>

      {/* --- DISCOVER CONTESTS SECTION --- */}
      {contests.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-extrabold text-[#5865F2] mb-4">
                  Discover Contests
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Explore trending challenges and showcase your talent to the
                  world.
                </p>
              </div>
              <Link
                to="/login"
                className="flex items-center gap-2 font-bold text-gray-900 hover:text-[#5865F2] transition-colors"
              >
                View All <ArrowRight size={20} />
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2]"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {contests.map((contest) => (
                  <ContestCard key={contest._id} contest={contest} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose IDT?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We provide a seamless and transparent ecosystem for organizers and
              pariticipants alike.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck size={40} className="text-[#5865F2]" />}
              title="Secure Payments"
              desc="Integrated with PhonePe for 100% safe and instant transactions."
            />
            <FeatureCard
              icon={<Trophy size={40} className="text-amber-500" />}
              title="Exciting Prizes"
              desc="Compete in premium contests and win verified cash rewards."
            />
            <FeatureCard
              icon={<Users size={40} className="text-pink-500" />}
              title="Fair Voting"
              desc="Real-time voting system ensuring transparency and fairness."
            />
          </div>
        </div>
      </section>

      {/* --- APP SHOWCASE SECTION --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-[#5865F2] mb-6">
              Experience the App
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              From discovering events to uploading your best shots, everything
              is designed for a premium user experience.
            </p>
          </div>

          <div className="space-y-32">
            {/* Showcase 1: Contest Details */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:w-1/2 flex justify-center"
              >
                <img
                  src={ASSETS.details}
                  alt="Contest Details"
                  className="w-72 lg:w-80 rounded-[2.5rem] border-[6px] border-gray-100 shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <div className="lg:w-1/2 text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-4 text-gray-900">
                  Detailed Insights
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Get comprehensive information about every contest, including
                  prize pools, timelines, rules, and more—all in one elegant
                  view.
                </p>
                <ul className="space-y-4 text-left inline-block">
                  <ListItem text="Real-time timeline tracking" />
                  <ListItem text="Transparent prize breakdown" />
                  <ListItem text="Instant registration & payment" />
                </ul>
              </div>
            </div>

            {/* Showcase 2: Voting & Entry */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:w-1/2 flex justify-center"
              >
                <img
                  src={ASSETS.vote}
                  alt="Voting Screen"
                  className="w-72 lg:w-80 rounded-[2.5rem] border-[6px] border-gray-100 shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <div className="lg:w-1/2 text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-4 text-gray-900">
                  Engage & Win
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Your entry page is your stage. Share it with friends, track
                  your votes live, and climb the leaderboard to victory.
                </p>
                <ul className="space-y-4 text-left inline-block">
                  <ListItem text="Beautiful entry presentation" />
                  <ListItem text="One-tap sharing" />
                  <ListItem text="Video & Image support" />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-[#f8f9fe]">
        <div className="max-w-5xl mx-auto px-6 bg-[#5865F2] rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Ready to start your journey?
            </h2>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of participants and showcase your talent on IDT
              Events today.
            </p>
            {/* Download button removed */}
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h4 className="text-2xl font-bold mb-4">IDT Events</h4>
            <p className="text-gray-400 max-w-sm">
              The premier platform for organizing and participating in digital
              talent contests. Empowering creators since 2024.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-gray-300">Quick Links</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-gray-300">Legal</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-12 border-t border-gray-800 text-center text-gray-500">
          &copy; {new Date().getFullYear()} IDT Event Management. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

// --- Helper Components ---

const Navbar = () => (
  <nav className="absolute top-0 left-0 w-full z-50 py-6 px-6">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="p-2 backdrop-blur-sm">
          <img
            src="/assets/images/idt_logo_white.png"
            alt="IDT Logo"
            className="h-8 w-auto"
          />
        </div>
        <span className="text-2xl font-bold text-white tracking-wide font-['Play']">
          IDT Events
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Download button removed */}
      </div>
    </div>
  </nav>
);

// --- Helper Components ---

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
  >
    <div className="mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
);

const ListItem = ({ text }) => (
  <li className="flex items-center gap-3 text-gray-700 font-medium">
    <span className="bg-green-100 text-green-600 p-1 rounded-full">
      <ChevronRight size={16} />
    </span>
    {text}
  </li>
);

export default LandingPage;
