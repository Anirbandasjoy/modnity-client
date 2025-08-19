"use client";

import React, { useEffect, useState } from "react";
import { ShopBreadcrumb } from "./ShopBreadcrumb/ShopBreadcrumb";
import FilterCard from "@/components/layout/Home/Shop/FilterCard/FilterCard";
import { FaAngleRight } from "react-icons/fa";
import ProductCard from "@/components/layout/Home/shared/ProductCard";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";

import { useSearchParams } from "next/navigation";

// 📝 data Interface - Defines structure for each data object
interface IData {
  _id: string; // Unique data ID from MongoDB
  slug: string; // SEO-friendly URL slug for the data (used in URL)
  productName: string; // Title of the data
  productImage: string; // URL of the image associated with the data (e.g., thumbnail)
  price: number;
  quantity: number;
  sold: number;
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}

export default function ShopPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [categoryPrice, setCategoryPrice] = useState<string>("");

  const params = useSearchParams();

  // Query to fetch all data based on pagination and search text
  const { data, isLoading, refetch, error } = useHandleFindProductQuery({
    page: 1,
    limit: 10000,
    search: "",
    minPrice: minPrice,
    maxPrice: maxPrice,
    category: categoryPrice,
  });

  const products: IData[] = data?.payload || [];

  useEffect(() => {
    const category = params.get("category");
    if (category) {
      setCategoryPrice(category);
    }
  }, [params]);

  useEffect(() => {
    if (categoryPrice) {
      refetch(); // Refetch when categoryPrice is set
    }
  }, [categoryPrice, refetch]);

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isOpen]);

  return (
    <div>
      <ShopBreadcrumb />
      <div className="px-[5%]  h-full">
        <div className="pt-10 pb-20 max-w-screen-xl mx-auto">
          <div
            className="mb-5 font-medium text-forest-green flex gap-2 items-center  sm:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            Filter
            <FaAngleRight
              className={`text-forest-green mt-1 text-xl transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"
                }`}
            />
          </div>
          <div className="flex gap-5">
            <FilterCard
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              refetch={refetch}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              setCategoryPrice={setCategoryPrice}
              categoryPrice={categoryPrice}
            />
            {isOpen && (
              <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setIsOpen(false)} // overlay ক্লিক করলে ফিল্টার বন্ধ হবে
              ></div>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 h-fit w-full mt-[3px]">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              ) : error ? (
                <div className="col-span-full flex flex-col items-center justify-center text-center p-10 bg-white rounded-lg shadow-md border border-gray-200">
                  {/* <Image
                    src="https://th.bing.com/th/id/OIP.LkzZIjQWsZ47G8M8R-9b2AHaEB?rs=1&pid=ImgDetMain"
                    alt="No products"
                    width={150}
                    height={150}
                    className="mb-4 opacity-80"
                  /> */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              ) : (
                products.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white p-4 rounded animate-pulse">
      <div className="w-full h-40 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded mt-4 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
      <div className="h-10 bg-gray-200 rounded mt-5"></div>
      <div className="h-10 bg-gray-100 rounded mt-2"></div>
    </div>
  );
}
