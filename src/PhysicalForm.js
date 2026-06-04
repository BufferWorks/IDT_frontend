import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Upload,
  Phone,
  User,
  Users,
  CheckCircle,
  FileText,
  Calendar,
  CreditCard,
} from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

const CATEGORIES = [
  { id: "solo_dance", label: "Solo Dance", price: 800 },
  { id: "duet_dance", label: "Duet Dance", price: 1200 },
  { id: "group_dance", label: "Group Dance", price: 1500 },
  { id: "singing", label: "Singing", price: 800 },
  { id: "kids_modelling", label: "Kids Modelling", price: 800 },
  { id: "mr_miss_modelling", label: "Mr and Miss Modelling", price: 1500 },
  { id: "bridal_makeup", label: "Bridal Makeup", price: 1500 },
  { id: "drawing", label: "Drawing", price: 800 },
];

const ORGANIZERS = [
  { name: "Sonu Dholkar", phone: "8602240215" },
  { name: "Lokesh Dholkar", phone: "9131569676" },
  { name: "Soniya Kadam", phone: null },
  { name: "Seema Singh", phone: null },
];

const PhysicalForm = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEntry, setSubmittedEntry] = useState(null);

  const [formData, setFormData] = useState({
    participantName: "",
    fatherName: "",
    dob: "",
    age: "",
    gender: "",
    qualification: "",
    email: "",
    address: "",
    registrationNo: "",
    contactNumber: "",
    whatsappNumber: "",
    categories: [],
    passportPhoto: null,
    paymentScreenshot: null,
  });

  const [previews, setPreviews] = useState({
    passportPhoto: null,
    paymentScreenshot: null,
  });

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const { data } = await axios.get(`${API}/physical-contests/${id}`);
        setContest(data.contest);
        setFormData((prev) => ({
          ...prev,
          registrationNo:
            data.nextRegistrationNumber ||
            `IDT-${new Date().getFullYear()}-10001`,
        }));
      } catch (err) {
        console.error("Failed to fetch contest", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContest();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDobChange = (e) => {
    let val = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (val.length >= 3 && val.length <= 4) {
      val = val.slice(0, 2) + "/" + val.slice(2);
    } else if (val.length > 4) {
      val = val.slice(0, 2) + "/" + val.slice(2, 4) + "/" + val.slice(4, 8);
    }
    setFormData((prev) => ({ ...prev, dob: val }));
  };

  const handleCategoryToggle = (catLabel) => {
    setFormData((prev) => {
      const isSelected = prev.categories.includes(catLabel);
      if (isSelected) {
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== catLabel),
        };
      } else {
        return { ...prev, categories: [...prev.categories, catLabel] };
      }
    });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      setPreviews((prev) => ({
        ...prev,
        [fieldName]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.categories.length === 0) {
      alert("Please select at least one category.");
      return;
    }
    if (!formData.passportPhoto || !formData.paymentScreenshot) {
      alert("Please upload both Passport Photo and Payment Screenshot.");
      return;
    }

    setSubmitting(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "categories") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        `${API}/physical-contests/${id}/submit`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percentCompleted);
          },
        },
      );

      setSubmittedEntry(response.data.entry);
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed", err);
      alert(
        err.response?.data?.message ||
          "Failed to submit form. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2]"></div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Event Not Found</h1>
          <p className="text-gray-500 mt-2">
            The link you followed may be broken or the event no longer exists.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for registering for <strong>{contest.name}</strong>. We
            have received your details and payment screenshot.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-left">
            <p className="text-xs text-blue-800 font-bold uppercase mb-1 tracking-wider">
              Your Registration Number
            </p>
            <p className="text-2xl font-black text-blue-600 tracking-wider">
              {submittedEntry?.registrationNo}
            </p>
            <p className="text-xs text-blue-700 mt-2">
              Please note down this registration number for future reference.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold py-3 rounded-xl transition-colors"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = formData.categories.reduce((acc, catLabel) => {
    const cat = CATEGORIES.find((c) => c.label === catLabel);
    return acc + (cat ? cat.price : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#f0ebf8] font-sans text-gray-900 pb-20">
      <Helmet>
        <title>{contest.name} - Registration</title>
      </Helmet>

      <div className="w-full bg-gray-900 flex justify-center">
        <img
          src={contest.bannerImage}
          alt={contest.name}
          className="w-full max-w-6xl h-48 md:h-72 object-contain"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-6">
        {/* Form Container */}
        <div className="flex-1">
          {/* Contest Title Card */}
          <div className="bg-white rounded-2xl shadow-sm border-t-8 border-t-[#5865F2] p-6 md:p-8 mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
              {contest.name}
            </h1>
            <p className="text-gray-500 font-medium flex items-center gap-2 text-sm md:text-base">
              <FileText size={16} className="text-[#5865F2]" /> Official
              Registration Form
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Personal Details */}
            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                Personal Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Participant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="participantName"
                    required
                    value={formData.participantName}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5865F2]/20 focus:border-[#5865F2] outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5865F2]/20 focus:border-[#5865F2] outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="dob"
                    required
                    placeholder="DD/MM/YYYY"
                    maxLength="10"
                    value={formData.dob}
                    onChange={handleDobChange}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5865F2]/20 focus:border-[#5865F2] outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5865F2]/20 focus:border-[#5865F2] outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5865F2]/20 focus:border-[#5865F2] outline-none transition-all text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Qualification <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    required
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5865F2]/20 focus:border-[#5865F2] outline-none transition-all text-sm"
                    placeholder="e.g. 10th, 12th, Graduate"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contact Details */}
            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5865F2]/20 focus:border-[#5865F2] outline-none transition-all text-sm"
                  ></textarea>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5865F2]/20 focus:border-[#5865F2] outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Registration No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="registrationNo"
                    required
                    readOnly
                    value={formData.registrationNo}
                    className="w-full py-2 px-3 bg-gray-100 text-gray-600 font-bold border border-gray-200 rounded-lg cursor-not-allowed outline-none text-sm"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    Auto-generated sequence
                  </p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    required
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5865F2]/20 focus:border-[#5865F2] outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    required
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5865F2]/20 focus:border-[#5865F2] outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Categories */}
            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                Select Categories <span className="text-red-500">*</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${formData.categories.includes(cat.label) ? "border-[#5865F2] bg-blue-50/50" : "border-gray-200 hover:border-gray-300 bg-gray-50/50"}`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border ${formData.categories.includes(cat.label) ? "bg-[#5865F2] border-[#5865F2]" : "bg-white border-gray-300"}`}
                      >
                        {formData.categories.includes(cat.label) && (
                          <CheckCircle size={14} className="text-white" />
                        )}
                      </div>
                      <span className="font-semibold text-sm text-gray-800">
                        {cat.label}
                      </span>
                    </div>
                    <span className="font-bold text-green-700 bg-green-100/50 border border-green-200 px-2.5 py-0.5 rounded-full text-xs">
                      ₹{cat.price}
                    </span>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.categories.includes(cat.label)}
                      onChange={() => handleCategoryToggle(cat.label)}
                    />
                  </label>
                ))}
              </div>

              {formData.categories.length > 0 && (
                <div className="mt-5 p-4 bg-gray-900 text-white rounded-xl flex justify-between items-center">
                  <span className="font-semibold text-sm">
                    Total Payable Amount:
                  </span>
                  <span className="text-xl font-bold text-green-400">
                    ₹{totalAmount}
                  </span>
                </div>
              )}
            </div>

            {/* Section 4: File Uploads */}
            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                Attachments <span className="text-red-500">*</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Passport Photo */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Passport Size Photo <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-xl overflow-hidden group h-36 ${previews.passportPhoto ? "border-green-500" : "border-gray-300"}`}
                  >
                    <input
                      type="file"
                      required
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "passportPhoto")}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {previews.passportPhoto ? (
                      <img
                        src={previews.passportPhoto}
                        alt="Passport"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-gray-100 transition-colors">
                        <Upload size={24} className="mb-2" />
                        <span className="text-xs font-medium">
                          Upload Photo
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Screenshot */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Payment Screenshot <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-xl overflow-hidden group h-36 ${previews.paymentScreenshot ? "border-green-500" : "border-gray-300"}`}
                  >
                    <input
                      type="file"
                      required
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "paymentScreenshot")}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {previews.paymentScreenshot ? (
                      <img
                        src={previews.paymentScreenshot}
                        alt="Payment"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-gray-100 transition-colors">
                        <CreditCard size={24} className="mb-2" />
                        <span className="text-xs font-medium">
                          Upload Screenshot
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#5865F2]/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {submitting && (
                <div
                  className="absolute left-0 top-0 bottom-0 bg-white/20 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              )}
              <span className="relative z-10 flex items-center gap-2">
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Uploading... {uploadProgress}%
                  </>
                ) : (
                  "Submit Registration"
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Sidebar / Organizers Info */}
        <div className="w-full lg:w-[300px] space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-3">
              <Users size={18} className="text-[#5865F2]" /> Organizers
            </h3>
            <div className="space-y-4">
              {ORGANIZERS.map((org, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-[#5865F2]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      {org.name}
                    </p>
                    {org.phone && (
                      <a
                        href={`tel:${org.phone}`}
                        className="text-xs text-gray-500 flex items-center gap-1 hover:text-[#5865F2] transition-colors mt-0.5"
                      >
                        <Phone size={10} /> {org.phone}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl shadow-sm p-5 border border-amber-100">
            <h3 className="font-bold text-sm text-amber-900 mb-2">
              Important Instructions
            </h3>
            <ul className="text-xs text-amber-800 space-y-1.5 list-disc pl-4">
              <li>
                Ensure your payment screenshot clearly shows the transaction ID
                and amount.
              </li>
              <li>Passport photo must be clear and recent.</li>
              <li>
                Verify all details before submitting. Forms cannot be edited
                later.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalForm;
