/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Quote, User, Star } from "lucide-react";
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
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`${
            index < rating ? "text-[#FF8A00] fill-[#FF8A00]" : "text-gray-300"
          } transition-colors duration-200`}
        />
      ))}
    </div>
  );
};

export default function Review() {
  const { data, isLoading, error } = useHandleGetAllReviewQuery({ search: "" });
  const reviews = data?.payload?.reviews || [];

  if (isLoading) {
    return <div className="text-center py-20">Loading reviews...</div>;
  }

  if (error || reviews.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 font-tiro_bangla">
        কোনো রিভিউ পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div
      className="relative py-16 px-[5%] bg-gradient-to-br from-gray-50 to-white "
      style={{ fontFamily: "SolaimanLipi" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-[500px] h-[1px] bg-gray-400 mx-auto"></div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 my-4">
            What our customer said
          </h1>
          <div className="w-[500px] h-[1px] bg-gray-400 mx-auto"></div>
        </div>

        {/* Carousel using ShadCN */}
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="">
            {reviews.map((review: any, index: number) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full hover:bg-gray-100 p-5 pt-0">
                  <div className="w-20 h-20 rounded-full bg-forest-green flex items-center justify-center mx-auto mb-5">
                    {review.image ? (
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-full object-cover relative "
                      />
                    ) : (
                      <User className="text-white" size={30} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-base text-center">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500 text-center my-3">
                      {review.designation}
                    </p>
                  </div>
                  {/* <div className="flex justify-between mb-4">
                    <StarRating rating={review.rating} />
                  </div> */}
                  <p className="text-gray-700 text-sm mb-6">
                    &quot;{review.content}&quot;
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPreviousReview/>
            <CarouselNextReview/>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
