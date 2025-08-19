"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useHandleFindBannerQuery } from "@/redux/features/banner/bannerApi";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react";
import Link from "next/link";

interface BannerImage {
  _id: string;
  photo: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function Banner() {
  const { data, isLoading } = useHandleFindBannerQuery({});

  const images: BannerImage[] = data?.payload || [];
  console.log(images);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const toggleAutoplay = () => {
    if (isPlaying) {
      plugin.current.stop();
    } else {
      plugin.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="relative w-full mb-16 sm:mb-20">
        <div className="px-4 sm:px-6 lg:px-0">
          <div className="">
            <Skeleton className="w-full h-[300px] sm:h-[450px] lg:h-[600px] rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />

            {/* Loading indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-3 h-3 rounded-full bg-gray-300"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-200/30 rounded-full blur-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative w-full mb-16 sm:mb-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-5 w-24 h-24 bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-5 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-amber-200/10 to-orange-300/10 rounded-full blur-3xl" />

      <div className="px-4 sm:px-6 lg:px-0">
        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              loop: true,
              align: "center",
            }}
            className="relative group"
            onSelect={() => {
              // Update current index for indicators
              const emblaApi = plugin.current.emblaApi;
              if (emblaApi) {
                setCurrentIndex(emblaApi.selectedScrollSnap());
              }
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {images.map((image, index) => (
                <CarouselItem key={image._id} className="pl-2 md:pl-4">
                  <div className="relative group/item overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl">
                    {/* Main Image Container */}
                    <div className="relative h-[300px] sm:h-[450px] lg:h-[600px] bg-gradient-to-br from-amber-50 to-orange-50">
                      <Image
                        height={1200}
                        width={1920}
                        src={image?.photo}
                        alt={image?.title || "Premium Ornament Banner"}
                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700 ease-out"
                        priority={index === 0}
                        quality={95}
                      />

                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-orange-900/20" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-end p-6 sm:p-8 lg:p-12">
                      <div className="w-full max-w-2xl">
                        {image.title && (
                          <h2
                            className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 
                                       drop-shadow-2xl leading-tight"
                          >
                            {image.title}
                          </h2>
                        )}
                        {image.subtitle && (
                          <p
                            className="text-base sm:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 
                                      drop-shadow-lg leading-relaxed"
                          >
                            {image.subtitle}
                          </p>
                        )}
                        {image.buttonText && image.buttonLink && (
                          <Link href={image.buttonLink}>
                            <button
                              className="group/btn bg-gradient-to-r from-amber-500 to-amber-600 
                                           hover:from-amber-600 hover:to-amber-700 text-white 
                                           px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold 
                                           text-sm sm:text-base shadow-xl hover:shadow-2xl 
                                           transition-all duration-300 transform hover:scale-105 
                                           flex items-center gap-2"
                            >
                              <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                              {image.buttonText}
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div
                      className="absolute top-6 right-6 w-12 h-12 border-2 border-white/30 rounded-full 
                                  flex items-center justify-center backdrop-blur-sm bg-white/10"
                    >
                      <Sparkles className="w-6 h-6 text-white/80" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 
                                      bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 
                                      text-white hover:text-white shadow-xl opacity-0 
                                      group-hover:opacity-100 transition-all duration-300 
                                      hover:scale-110 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </CarouselPrevious>

            <CarouselNext
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 
                                   bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 
                                   text-white hover:text-white shadow-xl opacity-0 
                                   group-hover:opacity-100 transition-all duration-300 
                                   hover:scale-110 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </CarouselNext>

            {/* Play/Pause Button */}
            <button
              onClick={toggleAutoplay}
              className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md 
                       border-white/30 hover:bg-white/30 text-white rounded-full 
                       flex items-center justify-center shadow-xl opacity-0 
                       group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </Carousel>

          {/* Slide Indicators */}
          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-3 bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg"
                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => {
                    plugin.current.emblaApi?.scrollTo(index);
                  }}
                />
              ))}
            </div>
          )}

          {/* Stats or Info Cards */}
        </div>
      </div>
    </div>
  );
}
