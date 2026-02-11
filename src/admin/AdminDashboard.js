import { useState, useEffect } from "react";
import axios from "axios";
import { Users, Trophy, Image, Activity } from "lucide-react";
import { motion } from "framer-motion";

const API = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEvents: 0,
    activeParticipants: 0,
    totalEntries: 0,
    totalSupport: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API}/contests/all`);
        const contests = response.data.contests;

        // Calculate stats
        const totalEvents = contests.length;
        const activeParticipants = contests.reduce(
          (acc, curr) => acc + (curr.totalParticipants || 0),
          0
        );

        // Since we don't have total entries or support API yet, we'll keep them 0 or placeholder
        // Or estimate total entries = active participants for now if suitable
        const totalEntries = activeParticipants;

        setDashboardData({
          totalEvents,
          activeParticipants,
          totalEntries,
          totalSupport: 0,
        });

        // Set recent events (top 5)
        setRecentEvents(contests.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      label: "Total Events",
      value: dashboardData.totalEvents,
      icon: <Trophy size={24} className="text-amber-500" />,
      bg: "bg-amber-50",
    },
    {
      label: "Total Entries",
      value: dashboardData.totalEntries,
      icon: <Image size={24} className="text-purple-500" />,
      bg: "bg-purple-50",
    },
    {
      label: "Active Participants",
      value: dashboardData.activeParticipants,
      icon: <Users size={24} className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Total Support",
      value: dashboardData.totalSupport,
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

      {/* Recent Activity Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Recent Events
          </h2>
          {recentEvents.length > 0 ? (
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div
                  key={event._id}
                  className="flex items-center justify-between p-4 border-b last:border-0 border-gray-50"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {event.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {new Date(event.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${event.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {event.isActive ? "Active" : "Closed"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              No recent activity loaded.
            </div>
          )}
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
