"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b  flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-[#00590F] drop-shadow-lg">404</h1>
        <p className="text-xl text-gray-700 max-w-lg mx-auto">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          Please check the URL or return to the homepage.
        </p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#008B18] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#00590F] transition-transform transform hover:scale-105 duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-500">
        If you believe this is an error, please contact our support team.
      </div>
    </div>
  );
}
