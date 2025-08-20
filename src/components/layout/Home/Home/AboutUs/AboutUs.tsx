"use client";

import Image from "next/image";
import React from "react";
import {
  Users,
  Crown,
  Sparkles,
  Star,
  Heart,
  Award,
  Target,
  ChevronRight,
  Quote,
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="relative ">
      {/* Background Decorations - Hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl" />

      <div className="relative px-4 sm:px-6 lg:px-[5%]">
        <div className="">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4 sm:mb-6">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
              <span className="text-xs sm:text-sm font-semibold text-amber-700 uppercase tracking-wide">
                Our Story
              </span>
            </div>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Discover the passion and craftsmanship behind every piece we
              create
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Images Section - Optimized for mobile */}
            <div className="w-full lg:flex-1 relative">
              {/* Mobile Layout - Stack vertically */}
              <div className="block sm:hidden space-y-4">
                {/* Main Image on Mobile */}
                <div className="relative group">
                  <div className="bg-white p-2 rounded-2xl shadow-lg">
                    <Image
                      src="https://i.ibb.co.com/0Vr4fNz5/main-Image-1.webp"
                      alt="Our Craftsmanship"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-2 rounded-full shadow-lg">
                      <Crown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Secondary Content Row on Mobile */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1669257966198-5243002b0ca8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Our Heritage"
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center">
                    <Star className="w-6 h-6 mb-2 fill-current" />
                    <div className="text-xl font-bold mb-1">15+</div>
                    <div className="text-amber-100 text-xs text-center">
                      Years of Excellence
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout - Grid */}
              <div className="hidden sm:grid grid-cols-2 gap-4 relative">
                {/* Main Large Image */}
                <div className="col-span-2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl transform rotate-1 group-hover:rotate-3 transition-transform duration-500" />
                  <div className="relative bg-white p-2 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src="https://i.ibb.co.com/0Vr4fNz5/main-Image-1.webp"
                      alt="Our Craftsmanship"
                      width={600}
                      height={400}
                      className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-xl"
                    />
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-full shadow-lg">
                      <Crown className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Secondary Image */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500" />
                  <div className="relative bg-white p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-500">
                    <Image
                      src="https://images.unsplash.com/photo-1669257966198-5243002b0ca8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Our Heritage"
                      width={300}
                      height={300}
                      className="w-full h-32 sm:h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-center">
                    <Star className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 fill-current" />
                    <div className="text-xl sm:text-2xl font-bold mb-1">
                      15+
                    </div>
                    <div className="text-amber-100 text-xs sm:text-sm">
                      Years of Excellence
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Hidden on mobile for cleaner look */}
              <div className="hidden sm:block absolute -top-4 left-1/4 bg-white px-4 py-2 rounded-full shadow-lg border border-amber-100">
                <div className="flex items-center gap-2 text-amber-700">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Handcrafted</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-3/5 space-y-6 sm:space-y-8">
              {/* Quote Section */}
              <div className="relative px-4 sm:px-0">
                <div className="hidden sm:block absolute -top-1 left-2  text-6xl text-amber-200 font-serif">
                  <Quote className="w-8 h-8 sm:w-12 sm:h-12" />
                </div>
                <blockquote className="text-lg sm:text-xl text-gray-700 font-medium italic sm:pl-14 border-l-4 border-amber-400 pl-4">
                  &quot;Every piece tells a story of tradition, passion, and
                  uncompromising quality.&quot;
                </blockquote>
              </div>

              {/* Main Content */}
              <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    For over a decade, we have been dedicated to creating
                    exquisite jewelry and ornaments that celebrate life s most
                    precious moments. Our journey began with a simple belief:
                    that every piece of jewelry should be as unique and
                    beautiful as the person who wears it.
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    From traditional designs rooted in cultural heritage to
                    contemporary pieces that reflect modern aesthetics, our
                    master craftsmen pour their heart and soul into every
                    creation.
                  </p>
                </div>

                {/* Feature Points - Mobile optimized */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                  {[
                    {
                      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Expert Craftsmanship",
                      desc: "Master artisans with decades of experience",
                    },
                    {
                      icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Quality Focus",
                      desc: "Every piece meets our strict standards",
                    },
                    {
                      icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Customer First",
                      desc: "Your satisfaction is our priority",
                    },
                    {
                      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Unique Designs",
                      desc: "Exclusive patterns you won't find elsewhere",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 sm:p-4 bg-white rounded-xl border border-amber-100 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          {feature.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button - Mobile friendly */}
                <div className="pt-4 sm:pt-6 text-center sm:text-left">
                  <button className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                    <span className="font-semibold">Discover Collection</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Statistics - Mobile optimized */}
        </div>
      </div>
    </div>
  );
}
