"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Send,
  CheckCircle,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

interface ContactFormData {
  fullName: string;
  email: string;
  contact: string;
  reason: string;
  message: string;
}

const reasonOptions = [
  { value: "", label: "Select reason for contact" },
  { value: "product_inquiry", label: "Product Inquiry" },
  { value: "custom_order", label: "Custom Order" },
  { value: "wholesale", label: "Wholesale Partnership" },
  { value: "support", label: "Customer Support" },
  { value: "collaboration", label: "Business Collaboration" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>();

  const watchedFields = watch();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);

    // Console log the data
    console.log("=== CONTACT FORM SUBMISSION ===");
    console.log("Full Name:", data.fullName);
    console.log("Email:", data.email);
    console.log("Contact:", data.contact);
    console.log("Reason:", data.reason);
    console.log("Message:", data.message);
    console.log("Submitted at:", new Date().toISOString());
    console.log("================================");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      reset();
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}

      {/* Main Content */}
      <div className="px-4 sm:px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Address Card */}
                <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/60 hover:border-amber-200 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Visit Our Studio
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        123 Ornament Lane
                        <br />
                        Sylhet,Moulvibazar-3200,Borhat
                        <br />
                        Bangladesh
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/60 hover:border-amber-200 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Call Us
                      </h3>
                      <p className="text-gray-600 text-sm">
                        +880 133-8782711
                        <br />
                        +880 1338-435701
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/60 hover:border-amber-200 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Email Us
                      </h3>
                      <p className="text-gray-600 text-sm">
                        info@modnity.com
                        <br />
                        orders@modnity.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/60 hover:border-amber-200 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Business Hours
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Mon - Fri: 9:00 AM - 6:00 PM
                        <br />
                        Sat - Sun: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-amber-100/60">
                {/* Form Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Send us a message
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    Fill out the form below and we&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-green-800 font-semibold">
                        Message sent successfully!
                      </p>
                      <p className="text-green-600 text-sm">
                        We&apos;ll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register("fullName", {
                          required: "Full name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                        className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border transition-all duration-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
                          errors.fullName
                            ? "border-red-300 bg-red-50"
                            : watchedFields.fullName
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 bg-gray-50 hover:bg-white hover:border-amber-200"
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid email address",
                          },
                        })}
                        className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border transition-all duration-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
                          errors.email
                            ? "border-red-300 bg-red-50"
                            : watchedFields.email &&
                              /^\S+@\S+$/i.test(watchedFields.email)
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 bg-gray-50 hover:bg-white hover:border-amber-200"
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        {...register("contact", {
                          required: "Contact number is required",
                          pattern: {
                            value: /^[0-9+\-\s()]+$/,
                            message: "Please enter a valid phone number",
                          },
                        })}
                        className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border transition-all duration-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
                          errors.contact
                            ? "border-red-300 bg-red-50"
                            : watchedFields.contact
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 bg-gray-50 hover:bg-white hover:border-amber-200"
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.contact && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.contact.message}
                      </p>
                    )}
                  </div>

                  {/* Reason Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reason for Contact *
                    </label>
                    <div className="relative">
                      <select
                        {...register("reason", {
                          required: "Please select a reason",
                        })}
                        className={`w-full px-4 py-3 sm:py-4 rounded-xl border transition-all duration-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 appearance-none cursor-pointer ${
                          errors.reason
                            ? "border-red-300 bg-red-50"
                            : watchedFields.reason
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 bg-gray-50 hover:bg-white hover:border-amber-200"
                        }`}
                      >
                        {reasonOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            disabled={!option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.reason && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.reason.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                      </div>
                      <textarea
                        rows={6}
                        {...register("message", {
                          required: "Please enter your message",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                          },
                        })}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none ${
                          errors.message
                            ? "border-red-300 bg-red-50"
                            : watchedFields.message &&
                              watchedFields.message.length >= 10
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 bg-gray-50 hover:bg-white hover:border-amber-200"
                        }`}
                        placeholder="Tell us about your project, inquiry, or how we can help you..."
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                    {watchedFields.message && (
                      <p className="mt-2 text-xs text-gray-500">
                        {watchedFields.message.length} characters
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading || isSubmitted}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-200 touch-manipulation min-w-[180px]"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Sent!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }

        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        /* Focus styles */
        .focus\\:ring-2:focus {
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Loading animation */
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .backdrop-blur-sm {
            backdrop-filter: blur(8px);
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .animate-spin {
            transition: none;
            animation: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .border-gray-200 {
            border-color: #374151;
          }
          .text-gray-600 {
            color: #1f2937;
          }
        }
      `}</style>
    </div>
  );
}
