import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const PromoteRedirect = () => {
  const { id } = useParams();

  useEffect(() => {
    // 1. Define the Android Deep Link Intent URL
    // This tells Android: "Hey, open idtapp://vote-demo?entryId=XYZ using com.idt.app"
    const intentUrl = `intent://vote-demo?entryId=${id}#Intent;scheme=idtapp;package=com.idt.app;end`;
    
    // 2. Set Fallback Timer (1.5 seconds)
    // If the window is still active after 1.5s, the app wasn't opened, so they don't have it installed.
    const fallbackTimer = setTimeout(() => {
        // Redirect to Google Play Store
        window.location.href = "https://play.google.com/store/apps/details?id=com.idt.app"; 
    }, 1500);

    // 3. Try firing the intent immediately
    window.location.href = intentUrl;

    // Cleanup
    return () => clearTimeout(fallbackTimer);
  }, [id]);

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col items-center justify-center p-6 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2] mb-6"></div>
      <h2 className="text-2xl font-bold text-gray-900">Opening IDT Contest App...</h2>
      <p className="mt-4 text-gray-500 max-w-sm">
        If you have the app installed, it will launch automatically. Otherwise, you will be quickly safely redirected to the Google Play Store.
      </p>
    </div>
  );
};

export default PromoteRedirect;
