// components/FacebookMessengerButton.tsx

"use client";

import React from "react";
import { FaFacebookMessenger } from "react-icons/fa6";

const FacebookMessengerButton = () => {
  const pageId = "borkotmoyponno"; // Replace with your actual Page ID

  const openMessenger = () => {
    window.open(
      `https://m.me/${pageId}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      onClick={openMessenger} 
      className="fixed bottom-24 sm:bottom-5 left-auto right-7 sm:right-[170px] z-50 bg-green-600 hover:bg-green-700 text-white p-4.5 rounded-full shadow-lg transition-colors duration-300"
    >
       <FaFacebookMessenger className="h-6 w-6" />
    </button>
  );
};

export default FacebookMessengerButton;
