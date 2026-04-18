import React, { useState, useEffect } from "react";
import axios from "axios";
import { UploadCloud, Trash2, Image as ImageIcon } from "lucide-react";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://api.idteventmanagement.online/api";

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/gallery`);
      setImages(res.data.images || []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
    // eslint-disable-next-line
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setIsLoading(true);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${API_URL}/gallery/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Images uploaded successfully!");
      setSelectedFiles([]);
      fetchGallery();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload images.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchGallery();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete image.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold font-['Play'] text-gray-900">
            Manage Gallery
          </h2>
          <p className="text-gray-500 mt-1">
            Upload and manage application gallery images.
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Upload New Images
        </label>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2.5 file:px-4
              file:rounded-xl file:border-0
              file:text-sm file:font-semibold
              file:bg-[#5865F2]/10 file:text-[#5865F2]
              hover:file:bg-[#5865F2]/20 transition-all cursor-pointer"
          />
          <button
            onClick={handleUpload}
            disabled={isLoading || selectedFiles.length === 0}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg ${
              isLoading || selectedFiles.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-[#5865F2] text-white hover:bg-[#4752C4] shadow-indigo-200"
            }`}
          >
            <UploadCloud size={20} />
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {selectedFiles.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            {selectedFiles.length} file(s) selected
          </p>
        )}
      </div>

      {/* Grid Display */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-400">
            <ImageIcon size={48} className="mb-4 opacity-50" />
            <p>No images in the gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img._id}
                className="relative group rounded-xl overflow-hidden shadow-sm border border-gray-100"
              >
                <img
                  src={img.imageUrl}
                  alt="Gallery"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay Delete Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-xl transform scale-90 group-hover:scale-100 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageGallery;
