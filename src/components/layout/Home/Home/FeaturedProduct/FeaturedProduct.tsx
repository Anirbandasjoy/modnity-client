"use client";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";
import ProductCard from "../../shared/ProductCard";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  Sparkles,
  Crown,
  Filter,
  Grid3X3,
  List,
  ArrowRight,
  Star,
  ChevronDown,
} from "lucide-react";

// 📝 Product Interface
interface IData {
  _id: string;
  slug: string;
  productName: string;
  productImage: string;
  price: number;
  prvPrice: number;
  quantity: number;
  sold: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

// Mobile-Optimized Loading Skeleton
const ProductSkeleton = () => (
  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
    <div className="w-full h-36 sm:h-48 bg-gray-100 animate-pulse"></div>
    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className="w-3 h-3 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 sm:h-5 w-16 sm:w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 sm:h-8 w-16 sm:w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Mobile-Friendly Empty State
const EmptyState = ({ selectedCategory }: { selectedCategory: string }) => (
  <div className="col-span-full text-center py-12 sm:py-20 px-4">
    <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
      <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
    </div>
    <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 sm:mb-3">
      No Products Found
    </h3>
    <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-sm sm:max-w-md mx-auto">
      {selectedCategory === "all"
        ? "We couldn't find any products at the moment."
        : `No products found in the "${selectedCategory}" category.`}
    </p>
    <Link
      href="/shop"
      className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white 
               font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base"
    >
      Browse All Products
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

export default function FeaturedProduct() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Query to fetch products
  const { data, isLoading, error } = useHandleFindProductQuery({
    page: 1,
    limit: 16,
    search: "",
  });

  const products: IData[] = data?.payload || [];

  // Extract unique categories
  const categories = [
    "all",
    ...Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(
            (category): category is string =>
              Boolean(category) &&
              typeof category === "string" &&
              category.trim() !== ""
          )
          .map((cat) => cat.trim().toLowerCase())
      )
    ),
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => {
          const productCategory = product.category?.trim().toLowerCase();
          return productCategory === selectedCategory.toLowerCase();
        });

  // Error State
  if (error) {
    return (
      <div className="container mx-auto px-4 ">
        <div className="max-w-sm sm:max-w-md mx-auto text-center">
          <div className="border-2 border-red-200 rounded-lg p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl sm:text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-red-900 mb-3">
              Something went wrong
            </h3>
            <p className="text-sm sm:text-base text-red-700 mb-6">
              Unable to load products. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-medium 
                       rounded-lg transition-colors duration-200 text-sm sm:text-base"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-10 lg:pb-20 pb-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile-Optimized Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-amber-300 rounded-full mb-4 sm:mb-6">
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
            <span className="text-xs sm:text-sm font-medium text-amber-700 uppercase tracking-wide">
              Premium Collection
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            Featured
            <span className="bg-gradient-to-r ml-4 from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Ornaments
            </span>
          </h2>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-gray-300"></div>
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
            <div className="h-px w-8 sm:w-12 bg-gray-300"></div>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4">
            Handcrafted ornaments with exceptional quality and timeless design
          </p>
        </div>

        {/* Mobile-Friendly Controls */}
        <div className="mb-8 sm:mb-12">
          {/* Category Filter - Mobile Optimized */}
          {categories.length > 1 && (
            <div className="mb-6">
              {/* Mobile: Show/Hide Categories Button */}
              <div className="block sm:hidden mb-4">
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="flex items-center gap-2 w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
                >
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700 capitalize flex-1 text-left">
                    {selectedCategory === "all"
                      ? "All Products"
                      : selectedCategory}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      showAllCategories ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Category Pills */}
              <div
                className={`${showAllCategories ? "block" : "hidden"} sm:block`}
              >
                <div className="flex items-start sm:items-center gap-3 mb-4">
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-1 sm:mt-0 hidden sm:block" />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowAllCategories(false); // Hide on mobile after selection
                        }}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border rounded-full transition-all duration-200 capitalize ${
                          selectedCategory === category
                            ? "border-amber-500 text-amber-700 bg-amber-50"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {category === "all" ? "All Products" : category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Info & View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {!isLoading && (
              <span className="text-sm text-gray-600 font-medium order-2 sm:order-1">
                {filteredProducts.length} Product
                {filteredProducts.length !== 1 ? "s" : ""}
              </span>
            )}

            <div className="flex items-center gap-4 order-1 sm:order-2">
              <span className="text-sm text-gray-600 hidden sm:inline">
                View:
              </span>
              <div className="border border-gray-300 rounded-lg p-1 flex">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === "grid"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === "list"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Products Grid */}
        <div
          className={`mb-12 sm:mb-16 ${
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
              : "space-y-4 sm:space-y-6"
          }`}
        >
          {isLoading ? (
            // Loading Skeletons - Mobile Optimized
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : filteredProducts.length === 0 ? (
            // Empty State
            <EmptyState selectedCategory={selectedCategory} />
          ) : (
            // Products
            filteredProducts.slice(0, 16).map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>

        {/* Load More Button - Mobile Friendly */}
        {!isLoading && filteredProducts.length > 16 && (
          <div className="text-center mb-8 sm:mb-12">
            <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 text-sm sm:text-base">
              Load More Products
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Mobile-Optimized Call to Action */}
        <div className="text-center">
          <div className="mx-auto border border-gray-200 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Explore Complete Collection
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {products.length}+ premium ornaments available
                </p>
              </div>
            </div>

            <Link
              href="/shop"
              className="inline-flex cursor-pointer bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 
                       hover:to-amber-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-md 
                       text-sm sm:text-base shadow-lg active:scale-95 transition-all duration-200 
                       items-center justify-center gap-1.5"
            >
              <span>Visit Shop</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

          {/* Mobile-Friendly Stats */}
          <div className="flex  flex-row items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
              <span>Handcrafted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
              <span>In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
