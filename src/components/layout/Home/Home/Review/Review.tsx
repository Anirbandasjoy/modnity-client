/* eslint-disable @next/next/no-img-element */
"use client";

import {
  User,
  Star,
  Quote,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useHandleGetAllReviewQuery } from "@/redux/features/review/reviewApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextReview,
  CarouselPreviousReview,
} from "@/components/ui/carousel";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5 justify-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={14}
          className={`${
            index < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
          } transition-all duration-300 sm:w-4 sm:h-4`}
        />
      ))}
    </div>
  );
};

export default function Review() {
  const { data, isLoading, error } = useHandleGetAllReviewQuery({ search: "" });
  const reviews = data?.payload?.reviews || [];

  // Loading state - More compact for mobile
  if (isLoading) {
    return (
      <div className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="">
          {/* Loading Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 sm:w-12 h-1 bg-gray-200 rounded-full animate-pulse"></div>
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-gray-300" />
              <div className="w-8 sm:w-12 h-1 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded-lg mx-auto max-w-xs sm:max-w-md animate-pulse mb-3 sm:mb-4"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded-lg mx-auto max-w-sm sm:max-w-lg animate-pulse"></div>
          </div>

          {/* Loading Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-100 animate-pulse"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full mx-auto mb-3 sm:mb-4"></div>
                <div className="h-4 sm:h-6 bg-gray-200 rounded mx-auto mb-2 w-24 sm:w-32"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded mx-auto mb-4 w-20 sm:w-24"></div>
                <div className="space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error or empty state
  if (error || reviews.length === 0) {
    return (
      <div className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-amber-500" />
            <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Customer Reviews
          </h2>
          <p className="text-gray-500 font-tiro_bangla text-base sm:text-lg">
            Review Not Found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-12 sm:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6 xl:px-8 overflow-hidden">
      {/* Background decorations - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-amber-100/30 to-orange-100/20 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-orange-100/30 to-amber-100/20 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Responsive Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          {/* Decorative line */}
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 md:w-16 lg:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber-500" />
            <div className="w-8 sm:w-12 md:w-16 lg:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
          </div>

          {/* Title - Fully responsive */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold  mb-3 sm:mb-4 lg:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-amber-800 to-gray-900 leading-tight">
            What our customer said
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-sm sm:max-w-xl lg:max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
            Don not just take our word for it. Here&#39;s what our valued
            customers have to say about their experience.
          </p>

          {/* Statistics - Mobile optimized */}
        </div>

        {/* Enhanced Responsive Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {reviews.map((review: any) => (
              <CarouselItem
                key={review._id}
                className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 min-w-0 "
              >
                <div className="group h-full">
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-amber-100/60 hover:border-amber-200/80 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 h-full flex flex-col hover:bg-white/95">
                    {/* Quote decoration - Responsive */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber-400" />
                    </div>

                    {/* Profile Section - Mobile optimized */}
                    <div className="flex flex-col items-center mb-4 sm:mb-6">
                      <div className="relative mb-3 sm:mb-4">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                          {review.image ? (
                            <img
                              src={review.image}
                              alt={review.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <User className="text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                          )}
                        </div>

                        {/* Verified badge - Responsive */}
                        <div className="absolute -bottom-0.5 sm:-bottom-1 -right-0.5 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" />
                        </div>
                      </div>

                      <h4 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg text-center group-hover:text-amber-700 transition-colors duration-300 line-clamp-2">
                        {review.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-amber-600 font-medium text-center mt-1 line-clamp-1">
                        {review.designation}
                      </p>
                    </div>

                    {/* Rating - Mobile friendly */}
                    <div className="mb-3 sm:mb-4">
                      <StarRating rating={review.rating || 5} />
                    </div>

                    {/* Review Content - Responsive text */}
                    <div className="flex-1 flex items-center">
                      <blockquote className="text-gray-700 text-center leading-relaxed relative text-sm sm:text-base">
                        <span className="text-2xl sm:text-3xl text-amber-400/30 absolute -top-1 sm:-top-2 -left-1 sm:-left-2">
                          &quot;
                        </span>
                        <span className="line-clamp-4 sm:line-clamp-none">
                          {review.content}
                        </span>
                        <span className="text-2xl sm:text-3xl text-amber-400/30 absolute -bottom-2 sm:-bottom-4 -right-1 sm:-right-2">
                          &quot;
                        </span>
                      </blockquote>
                    </div>

                    {/* Bottom section - Compact for mobile */}
                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-amber-100/60">
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows - Bottom center */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <CarouselPreviousReview className="group w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 border border-amber-200 hover:border-transparent rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/20">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white transition-colors" />
            </CarouselPreviousReview>
            <CarouselNextReview className="group w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 border border-amber-200 hover:border-transparent rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/20">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white transition-colors" />
            </CarouselNextReview>
          </div>
        </Carousel>
      </div>

      {/* Enhanced Responsive Styles */}
      <style jsx global>{`
        /* Line clamp utilities */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:block {
            display: block;
          }
        }

        /* Smooth animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        /* Enhanced focus styles */
        .focus\\:ring-4:focus {
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);
        }

        /* Backdrop blur with fallbacks */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        @supports not (backdrop-filter: blur(8px)) {
          .backdrop-blur-sm {
            background-color: rgba(255, 255, 255, 0.95);
          }
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }

          /* Reduce motion on mobile for better performance */
          .transition-all {
            transition-duration: 0.2s;
          }

          /* Better touch targets */
          .group:active {
            transform: scale(0.98);
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .transition-transform,
          .transition-colors,
          .animate-fadeInUp,
          .hover\\:scale-105:hover {
            transition: none;
            animation: none;
            transform: none;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .border-amber-100\\/60 {
            border-color: #92400e;
          }
          .text-gray-600 {
            color: #1f2937;
          }
          .bg-white\\/80,
          .bg-white\\/90 {
            background-color: #ffffff;
          }
        }

        /* Loading animation optimization */
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Better text rendering */
        .font-bold,
        h1,
        h2,
        h3,
        h4 {
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-105:hover {
            transform: none;
          }

          .group:active .w-16,
          .group:active .w-18,
          .group:active .w-20 {
            transform: scale(0.95);
          }
        }

        /* Better arrow positioning and visibility */
        [data-carousel-previous],
        [data-carousel-next] {
          color: #6b7280;
          transition: all 0.3s ease;
        }

        [data-carousel-previous]:hover,
        [data-carousel-next]:hover {
          color: white;
        }

        /* Better spacing for very small screens */
        @media (max-width: 375px) {
          .px-3 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
