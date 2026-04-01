import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const PromoteRedirect = () => {
  const { id } = useParams();

  const handleManualAction = () => {
     // A completely native Android intent URI. 
     // If the app is missing, Chrome parses S.browser_fallback_url and seamlessly redirects to the Play Store.
     const fallbackUrl = encodeURIComponent("https://play.google.com/store/apps/details?id=com.idt.app");
     const intentUrl = `intent://vote-demo?entryId=${id}#Intent;scheme=idtapp;package=com.idt.app;S.browser_fallback_url=${fallbackUrl};end`;
     
     // For non-Android devices (e.g., iOS or Desktop Desktop Browser), immediately fallback to Play Store/Website.
     const isAndroid = /android/i.test(navigator.userAgent);
     
     if (isAndroid) {
         window.location.replace(intentUrl);
     } else {
         window.location.replace("https://play.google.com/store/apps/details?id=com.idt.app");
     }
  };

  useEffect(() => {
     handleManualAction();
     // We don't need JS setTimeouts anymore for Android because the intent handles fallback natively.
  }, [id]);

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col items-center justify-center p-6 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2] mb-6"></div>
      <h2 className="text-2xl font-bold text-gray-900 font-['Play']">Opening IDT Contest...</h2>
      <p className="mt-4 text-gray-500 max-w-sm mb-8">
        We are securely routing you to the app. Play Store will open automatically if it's not installed.
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
