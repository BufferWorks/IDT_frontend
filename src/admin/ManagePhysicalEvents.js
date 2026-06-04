import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Link as LinkIcon, Users, ExternalLink } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

const ManagePhysicalEvents = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const res = await axios.get(`${API}/physical-contests/all`);
      setContests(res.data.contests || []);
    } catch (error) {
      console.error("Error fetching physical contests:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = (contest) => {
    const link = `${window.location.origin}/form/${contest.slug || contest._id}`;
    navigator.clipboard.writeText(link);
    alert("Form link copied to clipboard!");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Physical Events</h1>
        <Link
          to="/admin/create-physical-event"
          className="bg-[#5865F2] hover:bg-[#4752c4] text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-bold shadow-lg shadow-[#5865F2]/30 flex items-center justify-center gap-2 transition-all w-full sm:w-auto text-sm md:text-base"
        >
          <Plus size={18} className="md:w-5 md:h-5" /> Create New
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 md:px-6 md:py-4 font-bold text-gray-500 text-xs md:text-sm uppercase tracking-wider">
                  Event Details
                </th>
                <th className="hidden md:table-cell px-4 py-3 md:px-6 md:py-4 font-bold text-gray-500 text-xs md:text-sm uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 font-bold text-right text-gray-500 text-xs md:text-sm uppercase tracking-wider">
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
                    <td className="px-4 py-3 md:px-6 md:py-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <img
                          src={contest.bannerImage}
                          alt={contest.name}
                          className="w-12 h-8 md:w-16 md:h-10 rounded-lg object-cover bg-gray-100"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-sm md:text-base line-clamp-2">
                            {contest.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 md:px-6 md:py-4 text-gray-500 text-sm">
                      {new Date(contest.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-right">
                      <div className="flex items-center justify-end gap-1 md:gap-2">
                        <button
                          onClick={() => copyLink(contest)}
                          className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1 font-semibold text-xs md:text-sm"
                          title="Copy Link"
                        >
                          <LinkIcon size={16} /> <span className="hidden lg:inline">Copy Link</span>
                        </button>
                        <Link
                          to={`/form/${contest.slug || contest._id}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1 font-semibold text-xs md:text-sm"
                          title="View Form"
                        >
                          <ExternalLink size={16} /> <span className="hidden lg:inline">Form</span>
                        </Link>
                        <Link
                          to={`/admin/physical-submissions/${contest.slug || contest._id}`}
                          className="p-2 text-[#5865F2] hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 font-semibold text-xs md:text-sm ml-0 md:ml-2"
                        >
                          <Users size={16} /> <span className="hidden lg:inline">Submissions</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No physical events found. Click "Create New" to get started.
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

export default ManagePhysicalEvents;
