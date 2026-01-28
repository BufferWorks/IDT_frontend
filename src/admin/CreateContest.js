import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Calendar,
  DollarSign,
  Trophy,
  Type,
  FileText,
} from "lucide-react";
import axios from "axios";

const CreateContest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bannerPreview, setBannerPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    theme: "",
    description: "",
    entryFee: "",
    prizePool: "",
    celebrityName: "",
    registrationStartAt: "",
    registrationEndAt: "",
    registrationStartAt: "",
    registrationEndAt: "",
    votingEndAt: "",
    resultsAnnounceAt: "",
    bannerImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, bannerImage: file });
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Auto-set votingStartAt to registrationStartAt as per requirement
      data.append("votingStartAt", formData.registrationStartAt);

      // Assuming backend URL
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/contests/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      navigate("/admin/manage-contests");
    } catch (error) {
      console.error("Error creating contest:", error);
      alert("Failed to create contest. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Contest</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8"
      >
        {/* Banner Upload */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700">
            Contest Banner
          </label>
          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${bannerPreview ? "border-[#5865F2] bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required
            />

            {bannerPreview ? (
              <div className="relative h-64 w-full">
                <img
                  src={bannerPreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                  <p className="text-white font-bold">Click to Change</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-8">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <Upload size={24} />
                </div>
                <p className="text-gray-600 font-medium">
                  Click or Drag to Upload Banner
                </p>
                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <Type size={16} className="text-gray-400" /> Contest Name
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
              <FileText size={16} className="text-gray-400" /> Theme
            </label>
            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]/20 outline-none transition-all"
              placeholder="e.g. Traditional Wear"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]/20 outline-none transition-all"
            placeholder="Details about the contest..."
          ></textarea>
        </div>

        {/* Financials */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <DollarSign size={16} className="text-gray-400" /> Entry Fee (₹)
            </label>
            <input
              type="number"
              name="entryFee"
              value={formData.entryFee}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]/20 outline-none transition-all"
              placeholder="0"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <Trophy size={16} className="text-gray-400" /> Prize Pool (₹)
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
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              Celebrity (Optional)
            </label>
            <input
              type="text"
              name="celebrityName"
              value={formData.celebrityName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]/20 outline-none transition-all"
              placeholder="Guest Name"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar size={18} className="text-[#5865F2]" /> Registration
              Period
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  name="registrationStartAt"
                  value={formData.registrationStartAt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#5865F2] outline-none"
                  required
                />
              </div>
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
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar size={18} className="text-purple-500" /> Voting Period
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">
                  Voting End Date
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
            onClick={() => navigate("/admin/dashboard")}
            className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl font-bold text-white bg-[#5865F2] hover:bg-[#4752c4] shadow-lg shadow-[#5865F2]/30 transition-all disabled:opacity-70"
          >
            {loading ? "Creating..." : "Create Contest"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContest;
