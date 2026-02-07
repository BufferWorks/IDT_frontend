import React from "react";
import { Users, Trophy, Image, Activity } from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  // Placeholder stats
  const stats = [
    {
      label: "Total Events",
      value: "12",
      icon: <Trophy size={24} className="text-amber-500" />,
      bg: "bg-amber-50",
    },
    {
      label: "Total Entries",
      value: "1,248",
      icon: <Image size={24} className="text-purple-500" />,
      bg: "bg-purple-50",
    },
    {
      label: "Active Participants",
      value: "856",
      icon: <Users size={24} className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Total Support",
      value: "45.2k",
      icon: <Activity size={24} className="text-green-500" />,
      bg: "bg-green-50",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`p-4 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section (Placeholder) */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Recent Events
          </h2>
          <div className="text-center py-10 text-gray-400">
            No recent activity loaded.
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Recent Entries
          </h2>
          <div className="text-center py-10 text-gray-400">
            No recent entries loaded.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
