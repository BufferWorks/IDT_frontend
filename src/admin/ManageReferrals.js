import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Users,
  Clock,
  CheckCircle,
  IndianRupee,
  Search,
  Filter,
} from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL;
const ADMIN_KEY =
  process.env.REACT_APP_ADMIN_SECRET_KEY ||
  localStorage.getItem("adminToken") ||
  "";

const ManageReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    totalEarningsOwed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API}/referral/admin/all`, {
        headers: { "x-admin-key": ADMIN_KEY },
      });
      setReferrals(res.data.referrals || []);
      setStats(res.data.stats || {});
    } catch (err) {
      setError(
        "Failed to load referrals. Please check your admin credentials.",
      );
      console.error("ManageReferrals error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const filteredReferrals = referrals.filter((r) => {
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const referrerName = (r.referrerId?.name || "").toLowerCase();
    const refereeName = (r.refereeId?.name || "").toLowerCase();
    const contestName = (r.contestId?.name || "").toLowerCase();
    const matchesSearch =
      !query ||
      referrerName.includes(query) ||
      refereeName.includes(query) ||
      contestName.includes(query) ||
      (r.referralCode || "").toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const statCards = [
    {
      label: "Total Referrals",
      value: stats.total,
      icon: <Users size={22} className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: <Clock size={22} className="text-amber-500" />,
      bg: "bg-amber-50",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: <CheckCircle size={22} className="text-green-500" />,
      bg: "bg-green-50",
    },
    {
      label: "Total Owed",
      value: `₹${(stats.totalEarningsOwed || 0).toFixed(2)}`,
      icon: <IndianRupee size={22} className="text-purple-500" />,
      bg: "bg-purple-50",
    },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Referrals
        </h1>
        <button
          onClick={fetchReferrals}
          className="text-sm text-[#5865F2] font-medium hover:underline"
        >
          Refresh
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl w-fit ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, contest or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700"
          />
        </div>
        {/* Status Filter */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="outline-none text-sm text-gray-700 bg-transparent"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5865F2]" />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500 font-medium">
            {error}
          </div>
        ) : filteredReferrals.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No referrals found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-4 font-semibold text-gray-600">
                    Referrer
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-gray-600">
                    Referee
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-gray-600">
                    Contest
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-gray-600">
                    Code Used
                  </th>
                  <th className="text-right px-5 py-4 font-semibold text-gray-600">
                    Ticket
                  </th>
                  <th className="text-right px-5 py-4 font-semibold text-gray-600">
                    Earned
                  </th>
                  <th className="text-center px-5 py-4 font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-gray-600">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReferrals.map((r, i) => {
                  const isCompleted = r.status === "COMPLETED";
                  return (
                    <tr
                      key={r._id}
                      className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                      }`}
                    >
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {r.referrerId?.name || "—"}
                        <div className="text-xs text-gray-400 font-normal">
                          {r.referrerId?.mobileNumber || ""}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {r.refereeId?.name || "—"}
                        <div className="text-xs text-gray-400">
                          {r.refereeId?.mobileNumber || ""}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-700 max-w-[160px] truncate">
                        {r.contestId?.name || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">
                          {r.referralCode || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right text-gray-700">
                        ₹{(r.entryFee || 0).toFixed(2)}
                      </td>
                      <td className="px-5 py-4 text-right font-bold text-gray-900">
                        ₹{(r.earnedAmount || 0).toFixed(2)}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            isCompleted
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle size={12} />
                          ) : (
                            <Clock size={12} />
                          )}
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">
                        {formatDate(r.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Showing {filteredReferrals.length} of {referrals.length} referrals
      </p>
    </div>
  );
};

export default ManageReferrals;
