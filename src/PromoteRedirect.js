import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const PromoteRedirect = () => {
  const { id, slugId } = useParams();

  const handleManualAction = () => {
    let rawId = id;
    if (slugId) {
      const parts = slugId.split("-");
      rawId = parts[parts.length - 1];
    }
    if (!rawId) return;

    // With Android App Links enabled, any user with the app installed will be intercepted by the OS.
    // If they land on this web page in Chrome/Safari, it strictly means the app is NOT installed.
    // Therefore, we instantly redirect them to the Play Store without delay.
    const isAndroid = /android/i.test(navigator.userAgent);
    const playStoreUrl = "https://play.google.com/store/apps/details?id=com.idt.app";

    window.location.replace(playStoreUrl);
  };

  useEffect(() => {
    handleManualAction();
  }, [id, slugId]);

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col items-center justify-center p-6 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2] mb-6"></div>
      <h2 className="text-2xl font-bold text-gray-900 font-['Play']">
        Opening IDT Contest...
      </h2>
      <p className="mt-4 text-gray-500 max-w-sm mb-8">
        We are securely routing you to the app. Play Store will open
        automatically if it's not installed.
      </p>

      <button
        onClick={handleManualAction}
        className="px-8 py-3 bg-[#5865F2] text-white font-bold rounded-full shadow-lg shadow-indigo-200"
      >
        Open Manually
      </button>
    </div>
  );
};

export default PromoteRedirect;
