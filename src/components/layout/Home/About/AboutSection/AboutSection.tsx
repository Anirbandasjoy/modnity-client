"use client";
import Image from "next/image";
import React from "react";
import aboutImage from "@/../public/about.png";
import { useHandleFindTeamQuery } from "@/redux/features/team/teamApi";

interface IData {
  _id: string; // Unique data ID from MongoDB
  name: string;
  image: string;
  designation: string;
  slug: string;
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}
export default function AboutSection() {
  const { data } = useHandleFindTeamQuery({});
  // Extracting the data list and total pages from the response
  const allData: IData[] = data?.payload || [];
  return (
    <div className="px-[5%] bg-white pb-20">
      <div className="max-w-screen-xl mx-auto  py-10 lg:py-14">
        <Image
          width={1000}
          height={500}
          alt="about"
          src={aboutImage}
          className="w-full h-fit mb-10 max-w-screen-lg mx-auto"
        />
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-center">
          About Us
        </h1>
        <hr className="my-6 border-t border-gray-300" />
        <p className="text-[#656565] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          <br /> <br />
          dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          <br /> <br />
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing{" "}
        </p>
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-center mt-10">
          Our People
        </h1>
        <hr className="my-6 border-t border-gray-300" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allData.map((item) => (
            <div key={item._id} className="">
              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                className="w-full h-full mb-2 object-cover"
              />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
