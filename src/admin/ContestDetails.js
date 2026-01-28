import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Image,
  Calendar,
  Trophy,
  DollarSign,
} from "lucide-react";
import axios from "axios";

const ContestDetails = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contestRes, participantsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/contest/${id}`),
          axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/contest/${id}/participants`,
          ),
        ]);
        setContest(contestRes.data);
        setParticipants(participantsRes.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2]"></div>
      </div>
    );
  }

  if (!contest)
    return <div className="text-center py-12">Contest not found</div>;

  return (
    <div>
      <Link
        to="/admin/manage-contests"
        className="inline-flex items-center text-gray-500 hover:text-[#5865F2] mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to List
      </Link>

      {/* Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <img
            src={contest.bannerImage}
            alt={contest.name}
            className="w-full md:w-64 h-40 object-cover rounded-2xl shadow-md"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${contest.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {contest.isActive ? "Active" : "Inactive"}
              </span>
              <span className="text-sm text-gray-500">{contest.theme}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {contest.name}
            </h1>
            <p className="text-gray-600 max-w-2xl">{contest.description}</p>

            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Trophy size={18} className="text-amber-500" />
                <span>₹{contest.prizePool} Prize Pool</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <DollarSign size={18} className="text-green-500" />
                <span>₹{contest.entryFee} Entry</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-4 font-bold text-sm transition-colors relative ${
            activeTab === "overview"
              ? "text-[#5865F2]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Overview
          {activeTab === "overview" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5865F2]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("participants")}
          className={`pb-4 font-bold text-sm transition-colors relative ${
            activeTab === "participants"
              ? "text-[#5865F2]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Participants ({participants.length})
          {activeTab === "participants" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5865F2]"></div>
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-500 text-sm">Created At</span>
                <span className="font-medium">
                  {new Date(contest.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-500 text-sm">
                  Registration Start
                </span>
                <span className="font-medium">
                  {new Date(contest.registrationStartAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-500 text-sm">Registration End</span>
                <span className="font-medium">
                  {new Date(contest.registrationEndAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-500 text-sm">Voting Start</span>
                <span className="font-medium">
                  {new Date(contest.votingStartAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-500 text-sm">Voting End</span>
                <span className="font-medium">
                  {new Date(contest.votingEndAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "participants" && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase">
                  User
                </th>
                <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase">
                  Email
                </th>
                <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase">
                  Joined At
                </th>
                <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase">
                  Payment Ref
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {participants.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {p.userId?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {p.userId?.email || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm font-mono">
                    {p.paymentReference || "N/A"}
                  </td>
                </tr>
              ))}
              {participants.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No participants yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
