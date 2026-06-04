import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Upload, Type, ArrowLeft } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

const CreatePhysicalEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [bannerPreview, setBannerPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    bannerImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    if (!formData.name || !formData.bannerImage) {
      alert("Please provide a name and a banner image.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("bannerImage", formData.bannerImage);

      await axios.post(`${API}/physical-contests/create`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      navigate("/admin/manage-physical-events");
    } catch (error) {
      console.error("Error creating physical contest:", error);
      alert(error.response?.data?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/admin/manage-physical-events"
        className="inline-flex items-center text-gray-500 hover:text-[#5865F2] mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Physical Events
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Physical Event</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8"
      >
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700">
            Event Banner (Top of Form)
          </label>
          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${bannerPreview ? "border-[#5865F2] bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
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

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/manage-physical-events")}
            className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl font-bold text-white bg-[#5865F2] hover:bg-[#4752c4] shadow-lg shadow-[#5865F2]/30 transition-all disabled:opacity-70 relative overflow-hidden"
          >
            {loading && (
              <div 
                className="absolute left-0 top-0 bottom-0 bg-white/20 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            )}
            <span className="relative z-10">
              {loading ? `Uploading... ${uploadProgress}%` : "Create Event & Generate Link"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePhysicalEvent;
