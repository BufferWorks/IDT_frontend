import React, { useState } from "react";
import {
  Bell,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
  Image,
} from "lucide-react";

const API_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://api.idteventmanagement.online/api";

const ADMIN_SECRET_KEY =
  process.env.REACT_APP_ADMIN_SECRET_KEY || "idt-admin-secret";

const SendNotification = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageValid, setImageValid] = useState(true);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  const MAX_BODY = 200;

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) {
      setStatus("error");
      setErrorMsg("Both title and message body are required.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const payload = {
        title: title.trim(),
        body: body.trim(),
        ...(imageUrl.trim() ? { imageUrl: imageUrl.trim() } : {}),
      };

      const res = await fetch(`${API_URL}/notifications/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": ADMIN_SECRET_KEY,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send");

      setStatus("success");
      setTitle("");
      setBody("");
      setImageUrl("");
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <Bell size={22} className="text-gray-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-['Play']">
            Push Notifications
          </h1>
        </div>
        <p className="text-gray-500 text-sm ml-13">
          Broadcast a message instantly to all app users.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gray-900 px-6 py-5">
          <h2 className="text-white font-semibold text-lg font-['Play']">
            Compose Notification
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            This will be delivered to all installed app users.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notification Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 🏆 New Contest is Live!"
              maxLength={65}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 transition-all"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">
              {title.length}/65
            </p>
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="e.g. Register now before spots run out. Tap to view the contest."
              maxLength={MAX_BODY}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 transition-all resize-none"
            />
            <p
              className={`text-xs mt-1 text-right ${body.length >= MAX_BODY ? "text-red-400" : "text-gray-400"}`}
            >
              {body.length}/{MAX_BODY}
            </p>
          </div>

          {/* Banner Image URL (optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Image size={15} className="text-gray-400" />
              Banner Image URL
              <span className="text-xs font-normal text-gray-400">
                (optional)
              </span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setImageValid(true);
              }}
              placeholder="https://res.cloudinary.com/... or any public image URL"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 transition-all"
            />
            {imageUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                <img
                  src={imageUrl}
                  alt="Banner preview"
                  className="w-full h-36 object-cover"
                  onError={() => setImageValid(false)}
                  onLoad={() => setImageValid(true)}
                />
                {!imageValid && (
                  <p className="text-xs text-red-500 px-3 py-2">
                    ⚠️ Image could not be loaded — check the URL.
                  </p>
                )}
              </div>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Appears as an expandable big-picture banner below the notification
              text.
            </p>
          </div>

          {/* Preview */}
          {(title || body) && (
            <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 pt-4 pb-2">
                Preview
              </p>
              <div className="flex gap-3 items-start px-4 pb-4">
                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <Bell size={14} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">
                    {title || "Notification Title"}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {body || "Your message body will appear here."}
                  </p>
                </div>
              </div>
              {imageUrl && imageValid && (
                <img
                  src={imageUrl}
                  alt="Notification banner"
                  className="w-full h-28 object-cover"
                />
              )}
            </div>
          )}

          {/* Status Messages */}
          {status === "success" && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
              <CheckCircle size={18} />
              <span className="font-medium">
                Notification sent successfully to all users!
              </span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              <AlertCircle size={18} />
              <span>
                {errorMsg || "Something went wrong. Please try again."}
              </span>
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-gray-200"
          >
            {status === "loading" ? (
              <>
                <Loader size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send to All Users
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info box */}
      <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600">
        <strong>Note:</strong> Notifications are delivered to all users who have
        installed the IDT app and granted notification permissions. Banner
        images must be publicly accessible URLs (Cloudinary links work
        perfectly).
      </div>
    </div>
  );
};

export default SendNotification;
