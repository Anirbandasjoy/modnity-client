"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { MdEmail } from "react-icons/md";
import { GrMenu } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import { Phone, Search, ShoppingBag, X, Clock, TrendingUp } from "lucide-react";

interface IData {
  _id: string;
  slug: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const { data, refetch, isLoading } = useHandleFindProductQuery({
    page: 1,
    limit: 10000,
    search,
  });

  const { data: user } = useLoggedInUserQuery();
  const products: IData[] = data?.payload || [];
  const path = usePathname();

  // Debounced search with better error handling

  const activeLink = (pathValue: string) =>
    path === pathValue
      ? "text-amber-600 font-semibold relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-amber-600"
      : "hover:text-amber-600 transition-all duration-300 relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-4px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gradient-to-r hover:after:from-amber-500 hover:after:to-amber-600";

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(
        localStorage.getItem("modnityCart") || "[]"
      );
      setCartCount(storedCart.length);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Load search history from localStorage
    const loadSearchHistory = () => {
      try {
        const savedSearches = JSON.parse(
          localStorage.getItem("modnitySearchHistory") || "[]"
        );
        const validSearches = Array.isArray(savedSearches)
          ? savedSearches.slice(0, 5)
          : [];
        setSearchHistory(validSearches);
        setRecentSearches(validSearches);
      } catch (error) {
        console.warn("Error loading search history:", error);
        setSearchHistory([]);
        setRecentSearches([]);
      }
    };

    loadSearchHistory();
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle clicks outside search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setIsSearchFocused(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        if (isOpenSearch) {
          setIsOpenSearch(false);
        }
      }
      if (isOpen) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isOpenSearch]);

  // Handle search input change with improved debouncing
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setShowResults(true);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Only search if there's a value, otherwise just show results
    if (value.trim()) {
      debounceRef.current = setTimeout(() => {
        refetch();
      }, 300);
    }
  };

  // Save search to history (using localStorage)
  const saveSearchToHistory = (searchTerm: string) => {
    if (searchTerm.trim()) {
      try {
        const newHistory = [
          searchTerm,
          ...searchHistory.filter((s) => s !== searchTerm),
        ].slice(0, 5);
        setSearchHistory(newHistory);
        setRecentSearches(newHistory);
        localStorage.setItem(
          "modnitySearchHistory",
          JSON.stringify(newHistory)
        );
      } catch (error) {
        console.warn("Error saving search history:", error);
      }
    }
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
    setRecentSearches([]);
    try {
      localStorage.removeItem("modnitySearchHistory");
    } catch (error) {
      console.warn("Error clearing search history:", error);
    }
  };

  // Handle search selection with better state management
  const handleSearchSelect = (productSlug: string) => {
    console.log(productSlug);
    if (search.trim()) {
      saveSearchToHistory(search);
    }
    setSearch("");
    setShowResults(false);
    setIsSearchFocused(false);
    setIsOpenSearch(false);
  };

  // Handle history search with improved functionality
  const handleHistorySearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setShowResults(true);
    setIsSearchFocused(true);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Immediate search for history items
    debounceRef.current = setTimeout(() => {
      refetch();
    }, 100);
  };

  // Trending/Popular searches (you can make this dynamic)
  const trendingSearches = [
    "Gold Ring",
    "Diamond Necklace",
    "Pearl Earrings",
    "Pure Silver Necklace",
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? " backdrop-blur-xl  shadow-amber-500/5 border-b border-amber-100/50"
            : " backdrop-blur-sm"
        }`}
      >
        <div className="">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 px-1 sm:px-4 lg:px-0">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 lg:gap-3 group flex-shrink-0"
            >
              <div className="max-w-[140px] lg:-ml-4 -ml-1 sm:-ml-2 sm:max-w-[160px] transform transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.svg"
                  width={1000}
                  height={1000}
                  alt="logo"
                  className="w-full h-auto"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                ...(user ? [{ href: "/dashboard", label: "Dashboard" }] : []),
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-700 font-medium text-sm xl:text-base transition-all duration-300 hover:scale-105 ${activeLink(
                    item.href
                  )}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:block flex-1 max-w-sm xl:max-w-md 2xl:max-w-lg ml-6 xl:ml-8">
              <div ref={searchRef} className="relative">
                <div className="relative group">
                  <Input
                    className={`w-full pl-10 xl:pl-12 pr-4 py-2 xl:py-3 rounded-full transition-all duration-300 
                             placeholder:text-gray-400 text-sm xl:text-base shadow-sm
                             ${
                               isSearchFocused
                                 ? "bg-white border-2 border-amber-400 shadow-lg shadow-amber-500/20"
                                 : "bg-gray-50/80 backdrop-blur-sm border-2 border-transparent hover:bg-white hover:shadow-md"
                             }`}
                    placeholder="Search premium ornaments..."
                    value={search}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setShowResults(true);
                    }}
                    onBlur={() => {
                      // Delay hiding results to allow clicks on search results
                      setTimeout(() => {
                        if (
                          !searchRef.current?.contains(document.activeElement)
                        ) {
                          setIsSearchFocused(false);
                        }
                      }, 200);
                    }}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  <Search
                    className={`absolute left-3 xl:left-4 top-1/2 -translate-y-1/2 w-4 h-4 xl:w-5 xl:h-5 
                               transition-all duration-300 ${
                                 isSearchFocused
                                   ? "text-amber-500 scale-110"
                                   : "text-gray-400"
                               }`}
                  />
                  {isLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="animate-spin w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Enhanced Search Results Dropdown */}
                {showResults && (isSearchFocused || search) && (
                  <div
                    className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl 
                                border border-gray-100/50 backdrop-blur-xl z-50 overflow-hidden
                                animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    {/* Search Results */}
                    {search && products.length > 0 && (
                      <div className="max-h-80 xl:max-h-96 overflow-y-auto">
                        <div className="p-2">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                            Search Results ({products.length})
                          </div>
                          {products.slice(0, 6).map((product, index) => (
                            <Link
                              key={product._id}
                              href={`/step/${product.slug}`}
                              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r 
                                       hover:from-amber-50 hover:to-orange-50 transition-all duration-300 
                                       group/item transform hover:scale-[1.02] hover:shadow-md mx-2 my-1"
                              onClick={() => handleSearchSelect(product.slug)}
                              style={{
                                animationDelay: `${index * 50}ms`,
                              }}
                            >
                              <div
                                className="w-16 h-16 xl:w-18 xl:h-18 relative rounded-2xl overflow-hidden 
                                            shadow-md group-hover/item:shadow-xl transition-all duration-300 
                                            flex-shrink-0"
                              >
                                <Image
                                  src={
                                    product.productImage?.[0] ||
                                    "/placeholder.jpg"
                                  }
                                  alt={product.productName}
                                  fill
                                  className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                                />
                                <div
                                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                                              opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                                ></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4
                                  className="font-semibold text-gray-800 group-hover/item:text-amber-700 
                                             transition-colors line-clamp-2 text-sm xl:text-base mb-1"
                                  dangerouslySetInnerHTML={{
                                    __html: product.productName,
                                  }}
                                />
                                <div className="flex items-center gap-3">
                                  <p className="text-amber-600 font-bold text-sm xl:text-base">
                                    ৳ {product.price.toLocaleString()}
                                  </p>
                                  {product.sold > 0 && (
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                      {product.sold} sold
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white">
                                  →
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {products.length > 6 && (
                          <div className="border-t border-gray-100 bg-gradient-to-r from-amber-50/50 to-orange-50/50 p-4">
                            <Link
                              href={`/shop?search=${search}`}
                              className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 
                                       font-medium text-sm xl:text-base transition-all duration-300 hover:scale-105"
                              onClick={() => handleSearchSelect("")}
                            >
                              <TrendingUp className="w-4 h-4" />
                              View all {products.length} results
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    {/* No Results */}
                    {search && products.length === 0 && !isLoading && (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500 mb-2">
                          No results found for &quot;{search}&quot;
                        </p>

                        <p className="text-sm text-gray-400">
                          Try different keywords or browse our categories
                        </p>
                      </div>
                    )}

                    {/* Search History & Trending */}
                    {!search &&
                      (recentSearches.length > 0 ||
                        trendingSearches.length > 0) && (
                        <div className="p-4 space-y-4">
                          {recentSearches.length > 0 && (
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm font-medium text-gray-600">
                                    Recent Searches
                                  </span>
                                </div>
                                <button
                                  onClick={clearSearchHistory}
                                  className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-200"
                                >
                                  Clear
                                </button>
                              </div>
                              <div className="space-y-1">
                                {recentSearches.map((item, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleHistorySearch(item)}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-amber-600 
                                           hover:bg-amber-50 rounded-lg transition-all duration-200 flex items-center justify-between group"
                                  >
                                    <span>{item}</span>
                                    <span className="opacity-0 group-hover:opacity-100 text-xs text-gray-400 transition-opacity">
                                      ↵
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <TrendingUp className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-600">
                                Trending Searches
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {trendingSearches.map((item, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleHistorySearch(item)}
                                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-amber-100 text-gray-600 
                                         hover:text-amber-700 rounded-full transition-all duration-200 hover:scale-105"
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Mobile Search Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setIsOpenSearch(true);
                }}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 active:scale-95 
                         transition-all duration-200 hover:shadow-md"
                aria-label="Search"
              >
                <AiOutlineSearch className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>

              {/* Shopping Cart */}
              <Link href="/cart" className="relative group">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full 
                             bg-gradient-to-br from-amber-400 to-amber-600 
                             flex items-center justify-center shadow-lg hover:shadow-xl 
                             transition-all duration-300 hover:scale-110 active:scale-95
                             group-hover:from-amber-500 group-hover:to-amber-700"
                >
                  <ShoppingBag
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform 
                                       group-hover:scale-110 duration-300"
                  />
                </div>
                {cartCount > 0 && (
                  <div
                    className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 min-w-[18px] sm:min-w-[20px] 
                               h-4 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center 
                               justify-center font-bold shadow-lg animate-bounce"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </div>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenSearch(false);
                  setIsOpen(!isOpen);
                }}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 active:scale-95 
                         transition-all duration-300 hover:shadow-md"
                aria-label="Menu"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "rotate-45 translate-y-0" : ""
                    }`}
                  >
                    {isOpen ? (
                      <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                    ) : (
                      <GrMenu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                    )}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="lg:hidden border-t border-gray-100/50 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="flex items-center justify-center gap-4 sm:gap-6 py-2 sm:py-3 overflow-x-auto px-4 sm:px-6">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                ...(user ? [{ href: "/dashboard", label: "Dashboard" }] : []),
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap text-sm font-medium flex-shrink-0 transition-all duration-300 hover:scale-105 ${activeLink(
                    item.href
                  )}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute top-0 right-0 w-72 sm:w-80 max-w-[85vw] h-full bg-white shadow-2xl 
                     transform transition-all duration-300 ease-out overflow-y-auto
                     animate-in slide-in-from-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex-shrink-0">
                  <Image
                    src="/logo.svg"
                    width={160}
                    height={60}
                    alt="logo"
                    className="w-24 sm:w-32 h-auto"
                  />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="space-y-2 mb-8">
                {[
                  { href: "/", label: "Home" },
                  { href: "/shop", label: "Shop" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                  ...(user ? [{ href: "/dashboard", label: "Dashboard" }] : []),
                ].map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 
                              text-base hover:scale-[1.02] active:scale-95 ${
                                path === item.href
                                  ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 shadow-sm"
                                  : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                              }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Contact Information */}
              <div className="pt-6 border-t border-gray-100">
                <div className="space-y-4">
                  <a
                    href="mailto:modnity@gmail.com"
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 
                           border border-amber-100 shadow-sm hover:shadow-md hover:scale-[1.02] 
                           transition-all duration-300 group active:scale-95"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-full 
                                 bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md 
                                 group-hover:scale-110 transition-transform"
                    >
                      <MdEmail size={18} />
                    </div>
                    <span className="font-medium text-gray-800 group-hover:text-amber-700 truncate transition-colors">
                      modnity@gmail.com
                    </span>
                  </a>

                  <a
                    href="tel:01338782711"
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 
                           border border-amber-100 shadow-sm hover:shadow-md hover:scale-[1.02] 
                           transition-all duration-300 group active:scale-95"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-full 
                                 bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md 
                                 group-hover:scale-110 transition-transform"
                    >
                      <Phone size={18} />
                    </div>
                    <span className="font-medium text-gray-800 group-hover:text-amber-700 transition-colors">
                      +880 133-8782711
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Mobile Search Overlay */}
      {isOpenSearch && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300">
          <div
            ref={mobileSearchRef}
            className="p-4 pt-16 sm:pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-md mx-auto">
              {/* Search Input */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="flex-1 relative">
                  <Input
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white rounded-2xl 
                             border-2 border-amber-300 focus:border-amber-500 shadow-lg 
                             text-base sm:text-lg transition-all duration-300"
                    placeholder="Search ornaments..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    autoFocus
                  />
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                  {isLoading && (
                    <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                      <div className="animate-spin w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsOpenSearch(false)}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Mobile Search Results */}
              {search && products.length > 0 && (
                <div className="bg-white rounded-2xl shadow-2xl max-h-80 sm:max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-300">
                  <div className="p-3">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      {products.length} Results
                    </div>
                    {products.slice(0, 8).map((product, index) => (
                      <Link
                        key={product._id}
                        href={`/shop/${product.slug}`}
                        className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl 
                                 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 
                                 transition-all duration-300 group active:scale-95"
                        onClick={() => handleSearchSelect(product.slug)}
                        style={{
                          animationDelay: `${index * 75}ms`,
                        }}
                      >
                        <div
                          className="w-14 h-14 sm:w-16 sm:h-16 relative rounded-xl overflow-hidden 
                                      shadow-md group-hover:shadow-lg transition-all duration-300 flex-shrink-0"
                        >
                          <Image
                            src={
                              product.productImage ||
                              product.productImage?.[0] ||
                              "/placeholder.jpg"
                            }
                            alt={product.productName}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.jpg";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-semibold text-gray-800 group-hover:text-amber-700 
                                       text-sm sm:text-base line-clamp-2 mb-1 transition-colors"
                            dangerouslySetInnerHTML={{
                              __html: product.productName,
                            }}
                          />
                          <div className="flex items-center gap-3">
                            <p className="text-amber-600 font-bold text-sm sm:text-base">
                              ৳ {product.price.toLocaleString()}
                            </p>
                            {product.sold > 0 && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                {product.sold} sold
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm">
                            →
                          </div>
                        </div>
                      </Link>
                    ))}

                    {products.length > 8 && (
                      <div className="text-center p-3 border-t border-gray-100 bg-gradient-to-r from-amber-50/50 to-orange-50/50 mx-3 mt-2 rounded-xl">
                        <Link
                          href={`/shop?search=${search}`}
                          className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 
                                   font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105"
                          onClick={() => handleSearchSelect("")}
                        >
                          <TrendingUp className="w-4 h-4" />
                          View all {products.length} results
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile No Results */}
              {search && products.length === 0 && !isLoading && (
                <div className="bg-white rounded-2xl shadow-2xl p-6 text-center animate-in slide-in-from-top-2 duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-2">No results found</p>
                  <p className="text-sm text-gray-400">
                    Try different keywords
                  </p>
                </div>
              )}

              {/* Mobile Search History & Trending */}
              {!search &&
                (recentSearches.length > 0 || trendingSearches.length > 0) && (
                  <div className="bg-white rounded-2xl shadow-2xl p-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-600">
                              Recent
                            </span>
                          </div>
                          <button
                            onClick={clearSearchHistory}
                            className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-200 px-2 py-1 rounded"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="space-y-1">
                          {recentSearches.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleHistorySearch(item)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-amber-600 
                                     hover:bg-amber-50 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-between group"
                            >
                              <span>{item}</span>
                              <span className="opacity-0 group-hover:opacity-100 text-xs text-gray-400 transition-opacity">
                                ↵
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">
                          Trending
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleHistorySearch(item)}
                            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-amber-100 text-gray-600 
                                   hover:text-amber-700 rounded-full transition-all duration-200 
                                   hover:scale-105 active:scale-95"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
