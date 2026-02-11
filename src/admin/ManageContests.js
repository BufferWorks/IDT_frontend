import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Eye, Plus, Calendar, Users } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

const ManageContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const res = await axios.get(`${API}/contests/all`);
      setContests(res.data.contests || []);
    } catch (error) {
      console.error("Error fetching contests:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
        <Link
          to="/admin/create-contest"
          className="bg-[#5865F2] hover:bg-[#4752c4] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#5865F2]/30 flex items-center gap-2 transition-all"
        >
          <Plus size={20} /> Create New
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 font-bold text-right text-gray-500 text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contests.length > 0 ? (
                contests.map((contest) => (
                  <tr
                    key={contest._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={contest.bannerImage}
                          alt={contest.name}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                        />
                        <div>
                          <p className="font-bold text-gray-900">
                            {contest.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {contest.theme}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {(() => {
                        const isActive =
                          new Date() < new Date(contest.registrationEndAt);
                        return (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {isActive ? "Active" : "Inactive"}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        {contest.totalParticipants || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <div>
                          <p>
                            Reg:{" "}
                            {new Date(
                              contest.registrationEndAt,
                            ).toLocaleDateString("en-GB")}
                          </p>
                          <p>
                            Support:{" "}
                            {new Date(contest.votingEndAt).toLocaleDateString(
                              "en-GB",
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/contest/${contest._id}`}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                        {/* <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit2 size={18} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No events found. Click "Create New" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageContests;
