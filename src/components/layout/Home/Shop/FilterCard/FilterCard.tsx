"use client";
import {
  ChevronDown,
  ChevronRight,
  Filter,
  X,
  Tag,
  DollarSign,
  Loader2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useHandleFindCategoryQuery } from "@/redux/features/categories/categoriesApi";
import { useEffect, useRef, useState } from "react";

interface FilterCardProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: any;
  setMinPrice: any;
  setMaxPrice: any;
  setCategoryPrice: any;
  categoryPrice: any;
  isLoading?: boolean; // Add loading state prop
}

// 📝 data Interface - Defines structure for each data object
interface IData {
  _id: string; // Unique data ID from MongoDB
  slug: string; // SEO-friendly URL slug for the data (used in URL)
  categoryName: string; // Title of the data
  categoryPhoto: string; // URL of the image associated with the data (e.g., thumbnail)
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}

// Skeleton component for loading states
const CategorySkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-3 animate-pulse">
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded flex-1"></div>
      </div>
    ))}
  </div>
);

const FilterCard: React.FC<FilterCardProps> = ({
  setIsOpen,
  isOpen,
  refetch,
  setMinPrice,
  setMaxPrice,
  setCategoryPrice,
  categoryPrice,
  isLoading = false,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  // Query to fetch all data based on pagination and search text
  const { data, isLoading: categoriesLoading } = useHandleFindCategoryQuery({
    page: 1, // Current page for pagination
    limit: 100, // Number of items per page
    search: "", // The search text to filter data
  });
  const categories: IData[] = data?.payload || [];

  const handleMinPrice = async (data: number) => {
    setIsFiltering(true);
    setMinPrice(data);
    await refetch();
    // Add small delay to show loading state
    setTimeout(() => setIsFiltering(false), 500);
  };

  const handleMaxPrice = async (data: number) => {
    setIsFiltering(true);
    setMaxPrice(data);
    await refetch();
    setTimeout(() => setIsFiltering(false), 500);
  };

  const handleCategoryChange = async (value: string) => {
    setIsFiltering(true);
    setCategoryPrice(value);
    await refetch();
    setTimeout(() => setIsFiltering(false), 500);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Detect outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, setIsOpen]);

  return (
    <>
      {/* Loading Overlay */}
      {(isLoading || isFiltering) && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 flex items-center gap-3 shadow-xl">
            <Loader2 className="w-5 h-5 animate-spin text-orange-400" />
            <span className="text-gray-700 font-medium">
              {isFiltering ? "Filtering..." : "Loading..."}
            </span>
          </div>
        </div>
      )}

      {/* Desktop Filter */}
      <div className="w-80 space-y-4 h-fit hidden sm:block">
        {/* Category Filter */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-200 hover:border-gray-200">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors duration-200"
            disabled={isLoading || isFiltering}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-400 rounded-xl flex items-center justify-center">
                {isLoading || isFiltering ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Tag className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="text-lg font-semibold text-gray-800">
                Categories
              </span>
            </div>
            {isCategoryOpen ? (
              <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-200" />
            )}
          </button>

          {isCategoryOpen && (
            <div className="px-6 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
              {categoriesLoading || isFiltering ? (
                <CategorySkeleton />
              ) : (
                <RadioGroup
                  defaultValue={categoryPrice}
                  value={categoryPrice}
                  onValueChange={handleCategoryChange}
                  className="space-y-3"
                  disabled={isLoading || isFiltering}
                >
                  <div className="flex items-center space-x-3 group">
                    <RadioGroupItem
                      value=""
                      id="all-desktop"
                      className="border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={isLoading || isFiltering}
                    />
                    <Label
                      htmlFor="all-desktop"
                      className="text-gray-700 font-medium cursor-pointer group-hover:text-gray-900 transition-colors"
                    >
                      All Categories
                    </Label>
                  </div>

                  {categories?.map((category) => (
                    <div
                      className="flex items-center space-x-3 group"
                      key={category?._id}
                    >
                      <RadioGroupItem
                        value={category._id}
                        id={`${category._id}-desktop`}
                        className="border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                        disabled={isLoading || isFiltering}
                      />
                      <Label
                        htmlFor={`${category._id}-desktop`}
                        className="text-gray-700 font-medium cursor-pointer group-hover:text-gray-900 transition-colors flex-1"
                      >
                        {category.categoryName}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-200 hover:border-gray-200">
          <button
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors duration-200"
            disabled={isLoading || isFiltering}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-300 rounded-xl flex items-center justify-center">
                {isLoading || isFiltering ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <DollarSign className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="text-lg font-semibold text-gray-800">
                Price Range
              </span>
            </div>
            {isPriceOpen ? (
              <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-200" />
            )}
          </button>

          {isPriceOpen && (
            <div className="px-6 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Minimum Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ৳
                  </span>
                  <Input
                    placeholder="0"
                    type="number"
                    onChange={(e) => handleMinPrice(Number(e.target.value))}
                    className="pl-8 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl transition-all duration-200"
                    disabled={isLoading || isFiltering}
                  />
                  {isFiltering && (
                    <Loader2 className="w-4 h-4 animate-spin text-orange-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Maximum Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ৳
                  </span>
                  <Input
                    placeholder="Any"
                    type="number"
                    onChange={(e) => handleMaxPrice(Number(e.target.value))}
                    className="pl-8 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl transition-all duration-200"
                    disabled={isLoading || isFiltering}
                  />
                  {isFiltering && (
                    <Loader2 className="w-4 h-4 animate-spin text-orange-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter */}
      <div
        ref={wrapperRef}
        className={`w-80 sm:hidden z-50 bg-white fixed top-0 bottom-0 left-0 h-screen overflow-auto transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Mobile Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center">
              {isLoading || isFiltering ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Filter className="w-4 h-4 text-white" />
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {isFiltering ? "Filtering..." : "Filters"}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            disabled={isLoading || isFiltering}
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Category Filter */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center">
                {isLoading || isFiltering ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Tag className="w-4 h-4 text-white" />
                )}
              </div>
              <h3 className="text-base font-semibold text-gray-800">
                Categories
              </h3>
            </div>

            {categoriesLoading || isFiltering ? (
              <CategorySkeleton />
            ) : (
              <RadioGroup
                defaultValue={categoryPrice}
                value={categoryPrice}
                onValueChange={handleCategoryChange}
                className="space-y-3"
                disabled={isLoading || isFiltering}
              >
                <div className="flex items-center space-x-3 px-3 pt-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <RadioGroupItem
                    value=""
                    id="all-mobile"
                    className="border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={isLoading || isFiltering}
                  />
                  <Label
                    htmlFor="all-mobile"
                    className="text-gray-700 font-medium cursor-pointer flex-1"
                  >
                    All Categories
                  </Label>
                </div>

                {categories?.map((category) => (
                  <div
                    className="flex items-center space-x-3 px-3 pb-2 rounded-xl hover:bg-gray-50 transition-colors"
                    key={category?._id}
                  >
                    <RadioGroupItem
                      value={category._id}
                      id={`${category._id}-mobile`}
                      className="border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={isLoading || isFiltering}
                    />
                    <Label
                      htmlFor={`${category._id}-mobile`}
                      className="text-gray-700 font-medium cursor-pointer flex-1"
                    >
                      {category.categoryName}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-300 rounded-lg flex items-center justify-center">
                {isLoading || isFiltering ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <DollarSign className="w-4 h-4 text-white" />
                )}
              </div>
              <h3 className="text-base font-semibold text-gray-800">
                Price Range
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Minimum Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ৳
                  </span>
                  <Input
                    placeholder="0"
                    type="number"
                    onChange={(e) => handleMinPrice(Number(e.target.value))}
                    className="pl-8 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                    disabled={isLoading || isFiltering}
                  />
                  {isFiltering && (
                    <Loader2 className="w-4 h-4 animate-spin text-orange-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Maximum Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ৳
                  </span>
                  <Input
                    placeholder="Any"
                    type="number"
                    onChange={(e) => handleMaxPrice(Number(e.target.value))}
                    className="pl-8 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                    disabled={isLoading || isFiltering}
                  />
                  {isFiltering && (
                    <Loader2 className="w-4 h-4 animate-spin text-orange-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterCard;
