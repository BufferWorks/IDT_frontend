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

    // Because App Links require strict cryptographic verification (which fails on local 'flutter run' builds),
    // we must fall back to the Javascript intent invocation for local development testing.
    const isAndroid = /android/i.test(navigator.userAgent);

    if (isAndroid) {
      // 1. Instantly trigger the OS prompt
      window.location.replace(`idtapp://vote-demo?entryId=${rawId}`);

      // 2. We wait 8 seconds so you have plenty of time to click "Continue" on the system prompt.
      // If the app is missing, Chrome does nothing, and the 8 seconds will painlessly route them to the Play Store.
      setTimeout(() => {
        if (!document.hidden) {
          window.location.replace(
            "https://play.google.com/store/apps/details?id=com.idt.app",
          );
        }
      }, 8000);
    } else {
      window.location.replace(
        "https://play.google.com/store/apps/details?id=com.idt.app",
      );
    }
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
