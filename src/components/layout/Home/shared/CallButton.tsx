// components/CallButton.tsx

'use client';

import { Phone } from 'lucide-react';

const CallButton = () => {
  return (
    <a
      href="tel:+8801342106348" // তোমার সাপোর্ট নম্বর এখানে বসাও
      className="fixed bottom-44 sm:bottom-5 left-auto right-7 sm:right-24 z-50 bg-green-600 hover:bg-green-700 text-white p-4.5 rounded-full shadow-lg transition-colors duration-300"
      aria-label="Call Support"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}; 

export default CallButton;
