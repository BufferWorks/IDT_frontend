import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Trophy,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Video,
  X,
  Calendar,
} from "lucide-react";
import axios from "axios";

const ContestDetails = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  // Winner Announcement State
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [potentialWinners, setPotentialWinners] = useState([]);
  const [loadingWinners, setLoadingWinners] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Modal State
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [entryDetails, setEntryDetails] = useState(null);
  const [loadingEntry, setLoadingEntry] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contestRes, participantsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/contests/${id}`),
          axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/contests/${id}/participants`,
          ),
        ]);
        setContest(contestRes.data.contest);
        setParticipants(participantsRes.data.participants || []);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchEntryDetails = async (entryId) => {
    try {
      setLoadingEntry(true);
      setSelectedEntryId(entryId);
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contests/entries/${entryId}`,
      );
      setEntryDetails(res.data.entry);
    } catch (error) {
      console.error("Error fetching entry:", error);
    } finally {
      setLoadingEntry(false);
    }
  };

  const closeEntryModal = () => {
    setSelectedEntryId(null);
    setEntryDetails(null);
  };

  const handleAnnounceClick = async () => {
    try {
      setLoadingWinners(true);
      setShowWinnerModal(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contests/${id}/potential-winners`,
      );
      setPotentialWinners(res.data.winners);
    } catch (error) {
      console.error("Error fetching potential winners:", error);
      alert(
        "Failed to fetch winners. " + (error.response?.data?.message || ""),
      );
      setShowWinnerModal(false);
    } finally {
      setLoadingWinners(false);
    }
  };

  const handlePublishWinners = async () => {
    if (
      !window.confirm(
        "Are you sure you want to OFFICIALY publish these results? This cannot be undone.",
      )
    )
      return;

    try {
      setPublishing(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/contests/${id}/publish-winners`,
      );

      alert("Winners published successfully!");
      setShowWinnerModal(false);
      // specific reload or state update
      window.location.reload();
    } catch (error) {
      console.error("Error publishing winners:", error);
      alert(
        "Failed to publish winners: " +
          (error.response?.data?.message || "Server Error"),
      );
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2]"></div>
      </div>
    );
  }

  if (!contest)
    return <div className="text-center py-12">Contest not found</div>;

  const entries = participants.filter((p) => p.entryId);

  // Filter Logic
  const filteredParticipants = participants.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.userId?.name?.toLowerCase().includes(query) ||
      p.userId?.email?.toLowerCase().includes(query) ||
      p.paymentId?.toLowerCase().includes(query) ||
      p.paymentReference?.toLowerCase().includes(query)
    );
  });

  const filteredEntries = entries.filter((e) => {
    const query = searchQuery.toLowerCase();
    return (
      e.userId?.name?.toLowerCase().includes(query) ||
      e.userId?.email?.toLowerCase().includes(query) ||
      e.entryId?.toLowerCase().includes(query)
    );
  });

  // Check if we can announce winners
  const canAnnounce =
    !contest.winnersAnnounced &&
    contest.resultsAnnounceAt &&
    new Date() >= new Date(contest.resultsAnnounceAt);

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
              {(() => {
                const isActive =
                  new Date() < new Date(contest.registrationEndAt);
                return (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                );
              })()}
              <span className="text-sm text-gray-500">{contest.theme}</span>

              {contest.winnersAnnounced && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 flex items-center gap-1">
                  <Trophy size={12} /> Winners Announced
                </span>
              )}
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

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex items-center gap-3">
        <div className="bg-gray-50 p-2 rounded-lg text-gray-400">
          <Eye size={20} />
        </div>
        <input
          type="text"
          placeholder="Search participants by name, email, or payment ID..."
          className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
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
          Total Participants ({filteredParticipants.length})
          {activeTab === "participants" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5865F2]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("entries")}
          className={`pb-4 font-bold text-sm transition-colors relative ${
            activeTab === "entries"
              ? "text-[#5865F2]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Total Entries ({filteredEntries.length})
          {activeTab === "entries" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5865F2]"></div>
          )}
        </button>
      </div>

      {/* Overview Tab (with Timeline) */}
      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">
                Event Timeline
              </h3>
              {canAnnounce && (
                <button
                  onClick={handleAnnounceClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-indigo-200 transition-all flex items-center gap-2"
                >
                  <Trophy size={16} /> Announce Winners
                </button>
              )}
            </div>

            <div className="relative pl-4 space-y-8">
              {/* Vertical Line */}
              <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

              {[
                {
                  label: "Contest Created",
                  date: contest.createdAt,
                  passed: true,
                },
                {
                  label: "Registration Starts",
                  date: contest.registrationStartAt,
                  passed: new Date() >= new Date(contest.registrationStartAt),
                },
                {
                  label: "Registration Ends",
                  date: contest.registrationEndAt,
                  passed: new Date() >= new Date(contest.registrationEndAt),
                },
                {
                  label: "Voting Starts",
                  date: contest.votingStartAt,
                  passed: new Date() >= new Date(contest.votingStartAt),
                },
                {
                  label: "Voting Ends",
                  date: contest.votingEndAt,
                  passed: new Date() >= new Date(contest.votingEndAt),
                },
                {
                  label: "Results Announcement",
                  date: contest.resultsAnnounceAt || contest.votingEndAt, // Fallback if not set
                  passed:
                    new Date() >=
                    new Date(contest.resultsAnnounceAt || contest.votingEndAt),
                },
              ].map((step, index) => (
                <div key={index} className="relative flex items-center gap-4">
                  {/* Circle Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 z-10 flex-shrink-0 ${step.passed ? "bg-green-500 border-green-500" : "bg-white border-gray-300"}`}
                  >
                    {step.passed && (
                      <div className="w-full h-full flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${step.passed ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-400">
                      {step.date
                        ? new Date(step.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "TBA"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Participants Tab (with Status) */}
      {activeTab === "participants" && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase">
                    User Info
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase">
                    Joined At
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase">
                    Payment ID
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredParticipants.map((p) => {
                  const hasEntry = !!p.entryId;
                  return (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-gray-900">
                            {p.userId?.name || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {p.userId?.email || "-"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {p.userId?.mobileNumber || ""}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(p.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm font-mono">
                        {p.paymentId || (
                          <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                            FREE
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {hasEntry ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle size={12} /> Exists
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                            <Clock size={12} /> Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredParticipants.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      No participants found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Entries Tab (List View) */}
      {activeTab === "entries" && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase">
                    Candidate
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase">
                    Submission Date
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-500 text-sm uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEntries.map((entry) => (
                  <tr key={entry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                          {entry.entryThumbnail ? (
                            <img
                              src={entry.entryThumbnail}
                              alt="Thumbnail"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Users
                              className="w-full h-full p-2 text-gray-400"
                              size={20}
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {entry.userId?.name || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {entry.userId?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => fetchEntryDetails(entry.entryId)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-200"
                      >
                        <Eye size={16} /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredEntries.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      No entries found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Entry Detail Modal */}
      {selectedEntryId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {loadingEntry ? (
              <div className="p-12 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5865F2] mb-4"></div>
                <p className="text-gray-500">Loading entry details...</p>
              </div>
            ) : entryDetails ? (
              <div>
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">
                    Entry Details
                  </h3>
                  <button
                    onClick={closeEntryModal}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Candidate Info */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                      {entryDetails.userId?.profileImage ? (
                        <img
                          src={entryDetails.userId.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users
                          className="w-full h-full p-4 text-gray-400"
                          size={32}
                        />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {entryDetails.userId?.name}
                      </h2>
                      <div className="flex gap-4 mt-1 text-sm text-gray-500">
                        <span>
                          Total Votes:{" "}
                          <strong className="text-gray-900">
                            {entryDetails.totalVotes || 0}
                          </strong>
                        </span>
                        <span>
                          Views:{" "}
                          <strong className="text-gray-900">
                            {entryDetails.views || 0}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  {entryDetails.bio && (
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">
                        Bio / Description
                      </h4>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        {entryDetails.bio}
                      </p>
                    </div>
                  )}

                  {/* Media Grid */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">
                      Submitted Media
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* Images */}
                      {entryDetails.images?.map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group relative"
                        >
                          <img
                            src={img}
                            alt={`Upload ${idx}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <a
                            href={img}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Eye className="text-white" />
                          </a>
                        </div>
                      ))}

                      {/* Video */}
                      {entryDetails.videoUrl && (
                        <div className="aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-900 relative group">
                          <video
                            src={entryDetails.videoUrl}
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Video size={32} className="text-white" />
                          </div>
                          <a
                            href={entryDetails.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <span className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                              Watch Video
                            </span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-red-500">
                Failed to load entry details.
              </div>
            )}
          </div>
        </div>
      )}
      {/* Winner Preview Modal */}
      {showWinnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Official Results Preview
                </h3>
                <p className="text-sm text-gray-500">
                  Based on calculated votes from backend
                </p>
              </div>
              <button
                onClick={() => setShowWinnerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              {loadingWinners ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Calculating votes...</p>
                </div>
              ) : potentialWinners.length > 0 ? (
                <div className="space-y-6">
                  {potentialWinners.map((winner, index) => (
                    <div
                      key={winner._id}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${index === 0 ? "bg-amber-50 border-amber-200" : index === 1 ? "bg-gray-50 border-gray-200" : "bg-orange-50 border-orange-200"}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${index === 0 ? "bg-amber-500" : index === 1 ? "bg-gray-400" : "bg-orange-400"}`}
                      >
                        #{index + 1}
                      </div>
                      <img
                        src={
                          winner.entryThumbnail ||
                          winner.images?.[0] ||
                          "https://via.placeholder.com/150"
                        }
                        alt="Thumb"
                        className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">
                          {winner.userId?.name || "Unknown User"}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {winner.userId?.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-900">
                          {winner.totalVotes}
                        </p>
                        <p className="text-xs text-gray-500 uppercase font-bold">
                          Votes
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-6 flex gap-3 items-start">
                      <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p>
                        By clicking "Publish Results", these winners will be
                        saved permanently, and the contest status will be
                        updated to <strong>Winners Announced</strong>. This
                        action will be visible to all app users immediately.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowWinnerModal(false)}
                        className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handlePublishWinners}
                        disabled={publishing}
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex justify-center items-center gap-2"
                      >
                        {publishing ? "Publishing..." : "Publish Results"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No entries found to calculate winners.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
