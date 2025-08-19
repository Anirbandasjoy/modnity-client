"use client";

import Image from "next/image";
import React from "react";
import {
  Award,
  DollarSign,
  Palette,
  Sparkles,
  Star,
  Shield,
  Heart,
  Crown,
} from "lucide-react";

export default function Stats() {
  const statsData = [
    {
      icon: <Award className="w-8 h-8 sm:w-12 sm:h-12 text-amber-500" />,
      image: "/QualityProducts.svg",
      title: "Premium Quality",
      subtitle: "Handcrafted Excellence",
      description: "Every piece is meticulously crafted with finest materials",
    },
    {
      icon: <DollarSign className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-500" />,
      image: "/Affordable Price.svg",
      title: "Fair Pricing",
      subtitle: "Best Value Guarantee",
      description: "Luxury jewelry at prices that make sense",
    },
    {
      icon: <Palette className="w-8 h-8 sm:w-12 sm:h-12 text-purple-500" />,
      image: "/Amazing Designs.svg",
      title: "Unique Designs",
      subtitle: "Artistic Masterpieces",
      description: "Exclusive patterns that reflect your personality",
    },
  ];

  return (
    <div className="relative ">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b " />
      <div className="absolute top-10 left-1/4 w-32 h-32  rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-40 h-40  rounded-full blur-3xl" />

      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4">
              <Crown className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {" "}
                Special
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three pillars that define our commitment to excellence in every
              ornament we create
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {statsData.map((stat, index) => (
              <div key={index} className="group relative">
                {/* Card Container */}
                <div
                  className="relative bg-white rounded-3xl p-6 sm:p-8  hover:shadow-sm 
                              transition-all duration-500 hover:-translate-y-2 border border-gray-100
                              group-hover:border-amber-200"
                >
                  {/* Top Decoration */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div
                      className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full 
                                  flex items-center justify-center shadow-lg"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Icon/Image Section */}
                  <div className="text-center mb-6">
                    {/* Fallback to Lucide icon if image fails */}
                    <div className="relative inline-block">
                      <div
                        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-4 
                                    bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl 
                                    flex items-center justify-center group-hover:scale-110 
                                    transition-transform duration-300 shadow-md"
                      >
                        <Image
                          src={stat.image}
                          alt={stat.title}
                          width={120}
                          height={120}
                          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
                          onError={(e) => {
                            // Hide image and show icon on error
                            e.currentTarget.style.display = "none";
                            if (e.currentTarget.nextElementSibling) {
                              (
                                e.currentTarget
                                  .nextElementSibling as HTMLElement
                              ).style.display = "block";
                            }
                          }}
                        />
                        <div className="hidden">{stat.icon}</div>
                      </div>

                      {/* Floating Badge */}
                      <div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-500 
                                    rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 
                                 transition-colors duration-300"
                    >
                      {stat.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-amber-600 mb-3">
                      {stat.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <div
                      className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full 
                                  group-hover:w-16 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Connector Line for Desktop */}
                {index < statsData.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-6 lg:-right-10 w-12 lg:w-20 h-0.5 
                                bg-gradient-to-r from-amber-200 to-orange-200 transform -translate-y-1/2 z-10"
                  >
                    <div
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 
                                  bg-amber-400 rounded-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <div
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 
                          text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
                          hover:scale-105 cursor-pointer group/cta"
            >
              <Heart className="w-4 h-4 group-hover/cta:animate-pulse" />
              <span className="font-semibold">
                Crafted with Love & Precision
              </span>
              <Shield className="w-4 h-4" />
            </div>
            <p className="mt-4 text-gray-600 max-w-md mx-auto">
              Every ornament tells a story of dedication, skill, and artistic
              vision
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
