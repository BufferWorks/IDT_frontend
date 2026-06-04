import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Eye, X, Download } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

const PhysicalSubmissions = () => {
  const { id } = useParams();
  const [entries, setEntries] = useState([]);
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [contestRes, entriesRes] = await Promise.all([
          axios.get(`${API}/physical-contests/${id}`),
          axios.get(`${API}/physical-contests/${id}/entries`),
        ]);
        setContest(contestRes.data.contest);
        setEntries(entriesRes.data.entries || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const exportToExcel = () => {
    if (!entries || entries.length === 0) {
      alert("No submissions to export");
      return;
    }

    const headers = [
      "Registration No",
      "Participant Name",
      "Father's Name",
      "Date of Birth",
      "Age",
      "Gender",
      "Qualification",
      "Contact Number",
      "WhatsApp Number",
      "Email ID",
      "Address",
      "Categories",
      "Submitted At"
    ];

    const csvRows = [];
    csvRows.push(headers.join(","));

    entries.forEach((entry) => {
      const row = [
        entry.registrationNo || "",
        entry.participantName || "",
        entry.fatherName || "",
        entry.dob || "",
        entry.age || "",
        entry.gender || "",
        entry.qualification || "",
        entry.contactNumber || "",
        entry.whatsappNumber || "",
        entry.email || "",
        `"${(entry.address || "").replace(/"/g, '""')}"`,
        `"${(entry.categories || []).join(", ")}"`,
        new Date(entry.createdAt).toLocaleDateString(),
      ];
      csvRows.push(row.join(","));
    });

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${contest.name.replace(/ /g, "_")}_Submissions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2]"></div>
      </div>
    );
  }

  if (!contest) return <div className="text-center py-12">Event not found</div>;

  return (
    <div>
      <Link
        to="/admin/manage-physical-events"
        className="inline-flex items-center text-gray-500 hover:text-[#5865F2] mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to List
      </Link>

      <div className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4 md:gap-6">
          <img
            src={contest.bannerImage}
            alt={contest.name}
            className="hidden md:block w-40 h-24 object-cover rounded-xl"
          />
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2">
              {contest.name}
            </h1>
            <p className="text-gray-500 flex items-center gap-2 font-medium text-sm md:text-base">
              <Users size={16} /> Total: {entries.length}
            </p>
          </div>
        </div>
        
        <button
          onClick={exportToExcel}
          className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold shadow-lg shadow-green-600/30 flex justify-center items-center gap-2 transition-all shrink-0 text-sm md:text-base"
        >
          <Download size={18} /> Export Excel
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-2 py-2 md:px-4 md:py-3 font-bold text-gray-500 text-[10px] md:text-sm uppercase whitespace-nowrap">
                  Participant
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-bold text-gray-500 text-[10px] md:text-sm uppercase whitespace-nowrap">
                  Contact
                </th>
                <th className="hidden md:table-cell px-2 py-2 md:px-4 md:py-3 font-bold text-gray-500 text-[10px] md:text-sm uppercase whitespace-nowrap">
                  Categories
                </th>
                <th className="hidden md:table-cell px-2 py-2 md:px-4 md:py-3 font-bold text-gray-500 text-[10px] md:text-sm uppercase whitespace-nowrap">
                  Date
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-bold text-right text-gray-500 text-[10px] md:text-sm uppercase whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <tr key={entry._id} className="hover:bg-gray-50">
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <p className="font-bold text-gray-900 text-xs md:text-sm">{entry.participantName}</p>
                      <p className="text-[10px] md:text-xs text-gray-500">{entry.registrationNo}</p>
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <p className="text-[10px] md:text-sm font-medium text-gray-800">{entry.contactNumber}</p>
                    </td>
                    <td className="hidden md:table-cell px-2 py-2 md:px-4 md:py-3">
                      <div className="flex flex-wrap gap-1">
                        {entry.categories.map((cat, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 text-[10px] md:text-xs px-2 py-1 rounded-full font-bold">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-2 py-2 md:px-4 md:py-3 text-gray-500 text-[10px] md:text-sm">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-right">
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        className="inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-4 md:py-2 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-lg text-[10px] md:text-sm font-medium transition-colors"
                      >
                        <Eye size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                    No submissions found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">
                Submission Details
              </h3>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-8">
              {/* Left Col: Info */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Participant Info</h4>
                  <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-100">
                    <p><strong>Name:</strong> {selectedEntry.participantName}</p>
                    <p><strong>Father's Name:</strong> {selectedEntry.fatherName}</p>
                    <p><strong>DOB:</strong> {selectedEntry.dob}</p>
                    <p><strong>Age:</strong> {selectedEntry.age}</p>
                    <p><strong>Gender:</strong> {selectedEntry.gender}</p>
                    <p><strong>Qualification:</strong> {selectedEntry.qualification}</p>
                    <p><strong>Reg No:</strong> {selectedEntry.registrationNo}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Contact</h4>
                  <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-100">
                    <p><strong>Email:</strong> {selectedEntry.email}</p>
                    <p><strong>Phone:</strong> {selectedEntry.contactNumber}</p>
                    <p><strong>WhatsApp:</strong> {selectedEntry.whatsappNumber}</p>
                    <p><strong>Address:</strong> {selectedEntry.address}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Categories Selected</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.categories.map((cat, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg font-bold text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Media */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Passport Photo</h4>
                  <a href={selectedEntry.passportPhoto} target="_blank" rel="noreferrer" className="block border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#5865F2] transition-colors">
                    <img src={selectedEntry.passportPhoto} alt="Passport" className="w-full h-64 object-contain bg-gray-50" />
                  </a>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Payment Screenshot</h4>
                  <a href={selectedEntry.paymentScreenshot} target="_blank" rel="noreferrer" className="block border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#5865F2] transition-colors">
                    <img src={selectedEntry.paymentScreenshot} alt="Payment" className="w-full h-64 object-contain bg-gray-50" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysicalSubmissions;
