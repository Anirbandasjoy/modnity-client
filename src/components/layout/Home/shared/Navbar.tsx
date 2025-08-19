"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { GrMenu } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import { Phone, Search, ShoppingBag, Gem, X } from "lucide-react";

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

  const { data, refetch } = useHandleFindProductQuery({
    page: 1,
    limit: 10000,
    search,
  });

  const { data: user } = useLoggedInUserQuery();
  const products: IData[] = data?.payload || [];
  const path = usePathname();

  const activeLink = (pathValue: string) =>
    path === pathValue
      ? "text-amber-600 font-semibold relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-amber-600"
      : "hover:text-amber-600 transition-all duration-300 relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-4px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gradient-to-r hover:after:from-amber-500 hover:after:to-amber-600";

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(
        localStorage.getItem("ponnoBariCart") || "[]"
      );
      setCartCount(storedCart.length);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
      if (isOpenSearch) setIsOpenSearch(false);
    };

    if (isOpen || isOpenSearch) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, isOpenSearch]);

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-amber-100 backdrop-blur-lg bg-gray-100"
            : ""
        }`}
      >
        <div className="">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 px-4 sm:px-6 lg:px-0">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 lg:gap-3 group flex-shrink-0"
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Gem className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-amber-300 rounded-full animate-pulse"></div>
              </div>
              <div className="block">
                <h1 className="text-[15px] sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  Modnity
                </h1>
                <p className="text-[10px] text-gray-500 font-medium leading-none">
                  Premium Ornaments
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link
                href="/"
                className={`text-gray-700 font-medium text-sm xl:text-base ${activeLink(
                  "/"
                )}`}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className={`text-gray-700 font-medium text-sm xl:text-base ${activeLink(
                  "/shop"
                )}`}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className={`text-gray-700 font-medium text-sm xl:text-base ${activeLink(
                  "/about"
                )}`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-gray-700 font-medium text-sm xl:text-base ${activeLink(
                  "/contact"
                )}`}
              >
                Contact
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  className={`text-gray-700 font-medium text-sm xl:text-base ${activeLink(
                    "/dashboard"
                  )}`}
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:block flex-1 max-w-sm xl:max-w-md 2xl:max-w-lg ml-6 xl:ml-8">
              <div className="relative group">
                <Input
                  className="w-full pl-10 xl:pl-12 pr-4 py-2 xl:py-3 bg-gray-50 border-2 border-transparent rounded-full 
                           focus:border-amber-400 focus:bg-white transition-all duration-300 
                           placeholder:text-gray-400 shadow-sm group-hover:shadow-md text-sm xl:text-base"
                  placeholder="Search premium ornaments..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    refetch();
                  }}
                />
                <Search
                  className="absolute left-3 xl:left-4 top-1/2 -translate-y-1/2 w-4 h-4 xl:w-5 xl:h-5 text-gray-400 
                               group-focus-within:text-amber-500 transition-colors"
                />

                {/* Search Results Dropdown */}
                {search && products.length > 0 && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl 
                               border border-gray-100 max-h-80 xl:max-h-96 overflow-y-auto z-50"
                  >
                    <div className="p-2">
                      {products.slice(0, 5).map((product) => (
                        <Link
                          key={product._id}
                          href={`/step/${product.slug}`}
                          className="flex items-center gap-3 xl:gap-4 p-3 rounded-xl hover:bg-gradient-to-r 
                                   hover:from-amber-50 hover:to-orange-50 transition-all duration-300 
                                   group/item"
                          onClick={() => setSearch("")}
                        >
                          <div
                            className="w-14 h-14 xl:w-16 xl:h-16 relative rounded-xl overflow-hidden shadow-md 
                                        group-hover/item:shadow-lg transition-shadow flex-shrink-0"
                          >
                            <Image
                              src={product.productImage}
                              alt={product.productName}
                              fill
                              className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className="font-semibold text-gray-800 group-hover/item:text-amber-700 
                                       transition-colors line-clamp-2 text-sm xl:text-base"
                              dangerouslySetInnerHTML={{
                                __html: product.productName,
                              }}
                            />
                            <p className="text-amber-600 font-bold mt-1 text-sm xl:text-base">
                              ৳ {product.price.toLocaleString()}
                            </p>
                          </div>
                        </Link>
                      ))}
                      {products.length > 5 && (
                        <div className="text-center p-3 border-t border-gray-100">
                          <Link
                            href={`/shop?search=${search}`}
                            className="text-amber-600 hover:text-amber-700 font-medium text-sm xl:text-base"
                            onClick={() => setSearch("")}
                          >
                            View all {products.length} results →
                          </Link>
                        </div>
                      )}
                    </div>
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
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                aria-label="Search"
              >
                <AiOutlineSearch className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>

              {/* Shopping Cart */}
              <Link href="/cart" className="relative group">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 
                             flex items-center justify-center shadow-lg hover:shadow-xl 
                             transition-all duration-300 hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                {cartCount > 0 && (
                  <div
                    className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 bg-red-500 
                               text-white text-xs rounded-full flex items-center justify-center 
                               font-bold shadow-lg animate-bounce"
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
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                aria-label="Menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                ) : (
                  <GrMenu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="flex items-center justify-center gap-4 sm:gap-6 py-2 sm:py-3 overflow-x-auto px-4 sm:px-6">
              <Link
                href="/"
                className={`whitespace-nowrap text-sm font-medium flex-shrink-0 ${activeLink(
                  "/"
                )}`}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className={`whitespace-nowrap text-sm font-medium flex-shrink-0 ${activeLink(
                  "/shop"
                )}`}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className={`whitespace-nowrap text-sm font-medium flex-shrink-0 ${activeLink(
                  "/about"
                )}`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`whitespace-nowrap text-sm font-medium flex-shrink-0 ${activeLink(
                  "/contact"
                )}`}
              >
                Contact
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  className={`whitespace-nowrap text-sm font-medium flex-shrink-0 ${activeLink(
                    "/dashboard"
                  )}`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute top-0 right-0 w-72 sm:w-80 max-w-[85vw] h-full bg-white shadow-2xl 
                       transform transition-transform duration-300 ease-out overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full 
                               flex items-center justify-center shadow-lg"
                  >
                    <Gem className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Modnity</h2>
                    <p className="text-xs text-gray-500">Premium Ornaments</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="space-y-2">
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
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 text-base ${
                      path === item.href
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="space-y-3 text-sm">
                  <a
                    href="mailto:modnity@gmail.com"
                    className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <MdEmail size={18} className="flex-shrink-0" />
                    <span className="truncate">modnity@gmail.com</span>
                  </a>
                  <a
                    href="tel:0123456789"
                    className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <Phone size={18} className="flex-shrink-0" />
                    <span>01772 838 734</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {isOpenSearch && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden">
          <div
            className="p-4 pt-16 sm:pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="flex-1 relative">
                  <Input
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white rounded-2xl border-2 border-amber-300 
                             focus:border-amber-500 shadow-lg text-base sm:text-lg"
                    placeholder="Search ornaments..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      refetch();
                    }}
                    autoFocus
                  />
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                </div>
                <button
                  onClick={() => setIsOpenSearch(false)}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Mobile Search Results */}
              {search && products.length > 0 && (
                <div className="bg-white rounded-2xl shadow-2xl max-h-80 sm:max-h-96 overflow-y-auto">
                  <div className="p-3">
                    {products.slice(0, 6).map((product) => (
                      <Link
                        key={product._id}
                        href={`/shop/${product.slug}`}
                        className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl hover:bg-gradient-to-r 
                                 hover:from-amber-50 hover:to-orange-50 transition-all duration-300"
                        onClick={() => {
                          setIsOpenSearch(false);
                          setSearch("");
                        }}
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 relative rounded-xl overflow-hidden shadow-md flex-shrink-0">
                          <Image
                            src={product.productImage}
                            alt={product.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: product.productName,
                            }}
                          />
                          <p className="text-amber-600 font-bold mt-1 text-sm sm:text-base">
                            ৳ {product.price.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                    {products.length > 6 && (
                      <div className="text-center p-3 border-t border-gray-100">
                        <Link
                          href={`/shop?search=${search}`}
                          className="text-amber-600 hover:text-amber-700 font-medium text-sm sm:text-base"
                          onClick={() => {
                            setIsOpenSearch(false);
                            setSearch("");
                          }}
                        >
                          View all {products.length} results →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {search && products.length === 0 && (
                <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
                  <div className="text-gray-500 text-sm sm:text-base">
                    No products found for {search}
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
