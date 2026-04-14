import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, DollarSign, Type } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

const UpdateContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    prizePool: "",
    registrationEndAt: "",
    votingEndAt: "",
    resultsAnnounceAt: "",
  });

  const formatDateForInput = (isoString) => {
    if (!isoString) return "";
    // Extract the exact YYYY-MM-DDTHH:mm representation matching the DB directly
    return isoString.slice(0, 16);
  };

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await axios.get(`${API}/contests/${id}`);
        const contest = res.data.contest;
        setFormData({
          name: contest.name || "",
          prizePool: contest.prizePool || "",
          registrationEndAt: formatDateForInput(contest.registrationEndAt),
          votingEndAt: formatDateForInput(contest.votingEndAt),
          resultsAnnounceAt: formatDateForInput(contest.resultsAnnounceAt),
        });
      } catch (error) {
        console.error("Error fetching contest:", error);
        alert("Event not found");
        navigate("/admin/manage-contests");
      } finally {
        setFetching(false);
      }
    };
    fetchContest();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${API}/contests/${id}/update`, formData);
      alert("Contest updated successfully!");
      navigate("/admin/manage-contests");
    } catch (error) {
      console.error("Error updating contest:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update contest. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Update Event Details</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8"
      >
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <Type size={16} className="text-gray-400" /> Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]/20 outline-none transition-all"
              placeholder="e.g. Summer Fashion 2026"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <DollarSign size={16} className="text-gray-400" /> Prize Pool (₹)
            </label>
            <input
              type="number"
              name="prizePool"
              value={formData.prizePool}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]/20 outline-none transition-all"
              placeholder="50000"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar size={18} className="text-[#5865F2]" /> Registration
              End
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">
                End Date
              </label>
              <input
                type="datetime-local"
                name="registrationEndAt"
                value={formData.registrationEndAt}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#5865F2] outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar size={18} className="text-purple-500" /> Support Period & Results
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">
                  Support End Date
                </label>
                <input
                  type="datetime-local"
                  name="votingEndAt"
                  value={formData.votingEndAt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#5865F2] outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">
                  Results Announcement
                </label>
                <input
                  type="datetime-local"
                  name="resultsAnnounceAt"
                  value={formData.resultsAnnounceAt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#5865F2] outline-none"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/manage-contests")}
            className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl font-bold text-white bg-[#5865F2] hover:bg-[#4752c4] shadow-lg shadow-[#5865F2]/30 transition-all disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContest;
