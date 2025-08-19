"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useHandleFindCategoryQuery } from "@/redux/features/categories/categoriesApi";
import Link from "next/link";

// 📝 data Interface - Defines structure for each data object
interface IData {
  _id: string; // Unique data ID from MongoDB
  slug: string; // SEO-friendly URL slug for the data (used in URL)
  categoryName: string; // Title of the data
  categoryPhoto: string; // URL of the image associated with the data (e.g., thumbnail)
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}

export default function Categories() {
  // Query to fetch all data based on pagination and search text
  const { data } = useHandleFindCategoryQuery({
    page: 1, // Current page for pagination
    limit: 100, // Number of items per page
    search: "", // The search text to filter data
  });

  const categories: IData[] = data?.payload || [];

  return (
    <div
      className="px-3 sm:px-4 md:px-6 lg:px-[5%] bg-gradient-to-b from-gray-50/50 to-white"
      id="categories"
    >
      <div className="max-w-screen-xl mx-auto relative top-10 sm:top-0">
        {/* Section Header */}
        {/* <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-midnight-navy mb-3 sm:mb-4">
            Shop by Categories
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our wide range of premium products organized by categories
          </p>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-[#016707] to-forest-green mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </div> */}

        {/* Categories Carousel */}
        <div className="relative">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-2 sm:-ml-4 py-10 sm:py-14">
              {categories.length === 0
                ? Array.from({ length: 8 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-[85px] xs:basis-[90px] sm:basis-[120px] md:basis-1/5 lg:basis-1/6 pl-2 sm:pl-4"
                    >
                      <div className="animate-pulse flex flex-col items-center gap-3 p-2">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"></div>
                        <div className="w-16 sm:w-20 h-3 sm:h-4 bg-gray-200 rounded-full"></div>
                      </div>
                    </CarouselItem>
                  ))
                : categories.map((category) => (
                    <CarouselItem
                      key={category._id}
                      className="basis-[85px] xs:basis-[90px] sm:basis-[120px] md:basis-1/5 lg:basis-1/6 pl-2 sm:pl-4"
                    >
                      <Link
                        href={{
                          pathname: "/shop",
                          query: { category: category?._id },
                        }}
                        className="group block p-2 sm:p-3 h-full"
                      >
                        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                          {/* Category Image Container */}
                          <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#016707]/20 to-forest-green/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110"></div>

                            {/* Main Image Container */}
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 group-hover:border-[#016707]/30 transform group-hover:scale-110 group-hover:-translate-y-1">
                              {/* Inner Image */}
                              <div className="absolute inset-2 sm:inset-3 rounded-full overflow-hidden bg-white">
                                <Image
                                  height={100}
                                  width={100}
                                  src={category?.categoryPhoto}
                                  alt={category.categoryName}
                                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                                />
                              </div>

                              {/* Shine Effect */}
                              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Pulse Animation */}
                            <div className="absolute inset-0 rounded-full border-2 border-[#016707]/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                          </div>

                          {/* Category Name */}
                          <div className="text-center space-y-1">
                            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-midnight-navy group-hover:text-[#016707] transition-colors duration-200 line-clamp-2 leading-tight">
                              {category?.categoryName}
                            </h3>

                            {/* Animated Underline */}
                            <div className="w-0 h-0.5 bg-gradient-to-r from-[#016707] to-forest-green mx-auto transition-all duration-300 group-hover:w-full rounded-full"></div>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
            </CarouselContent>

            {/* Navigation Arrows - Only show on larger screens */}
            {/* <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white hover:bg-[#016707] hover:text-white border-2 border-gray-200 hover:border-[#016707] shadow-lg transition-all duration-200" />
              <CarouselNext className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white hover:bg-[#016707] hover:text-white border-2 border-gray-200 hover:border-[#016707] shadow-lg transition-all duration-200" />
            </div> */}
          </Carousel>

          {/* Mobile Scroll Indicator */}
          {/* <div className="md:hidden flex justify-center pt-6 space-x-2">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>Swipe to explore</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#016707] to-forest-green hover:from-forest-green hover:to-[#016707] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            View All Products
            <svg
              className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
