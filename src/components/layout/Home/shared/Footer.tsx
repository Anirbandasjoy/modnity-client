"use client";
import React from "react";
import { FiPhone, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import {
  Crown,
  Star,
  Heart,
  Shield,
  ArrowRight,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  const serviceLinks = [
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns" },
    { href: "/size-guide", label: "Size Guide" },
    { href: "/care", label: "Jewelry Care" },
    { href: "/warranty", label: "Warranty" },
  ];

  const socialLinks = [
    { icon: FiFacebook, href: "#", label: "Facebook" },
    { icon: FiInstagram, href: "#", label: "Instagram" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="text-gray-900  relative overflow-hidden mt-28">
      {/* Background Decorations */}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute top-4 cursor-pointer right-4 sm:top-6 sm:right-6 bg-gradient-to-r from-amber-500 to-amber-600 
                   text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
                   hover:scale-110 hover:from-amber-600 hover:to-amber-700 z-10"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className=" px-4 sm:px-6 lg:px-8  ">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Logo/Brand */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Ornament Store
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Premium Jewelry & Ornaments
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base max-w-md">
                Crafting exceptional jewelry and ornaments with passion and
                precision. Each piece tells a unique story of elegance, quality,
                and timeless beauty that celebrates life precious moments.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {[
                  { icon: Star, text: "Premium Quality" },
                  { icon: Shield, text: "Lifetime Warranty" },
                  { icon: Heart, text: "Handcrafted" },
                  { icon: Sparkles, text: "Unique Designs" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <feature.icon className="w-4 h-4 text-amber-400" />
                    <span className="text-gray-600 text-xs sm:text-sm">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm font-medium">
                  Follow us:
                </span>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 
                                 rounded-lg flex items-center justify-center transition-all duration-300 
                                 hover:scale-110 hover:shadow-lg group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-white" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 relative">
                Quick Links
                <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mt-2"></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-gray-600 hover:text-amber-600 
                                 transition-all duration-300 text-sm sm:text-base hover:translate-x-1"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services & Contact */}
            <div className="space-y-8">
              {/* Services */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 relative">
                  Services
                  <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mt-2"></div>
                </h3>
                <ul className="space-y-3">
                  {serviceLinks.slice(0, 3).map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-gray-600 hover:text-amber-600 
                                   transition-all duration-300 text-sm hover:translate-x-1"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 relative">
                  Contact
                  <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mt-2"></div>
                </h3>
                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-gray-100 group-hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all duration-300">
                      <FiPhone className="w-4 h-4 text-gray-500 group-hover:text-white" />
                    </div>
                    <a
                      href="tel:+310-437-2766"
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm"
                    >
                      310-437-2766
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-gray-100 group-hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all duration-300">
                      <MdOutlineEmail className="w-4 h-4 text-gray-500 group-hover:text-white" />
                    </div>
                    <a
                      href="mailto:unreal@outlook.com"
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm"
                    >
                      unreal@outlook.com
                    </a>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3 group">
                    <div className="w-9 h-9 bg-gray-100 group-hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all duration-300 mt-0.5">
                      <CiLocationOn className="w-4 h-4 text-gray-500 group-hover:text-white" />
                    </div>
                    <a
                      href="https://www.google.com/maps/search/706+Campfire+Ave.+Meriden,+CT+06450"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm leading-relaxed"
                    >
                      706 Campfire Ave. Meriden, CT 06450
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Stay Updated
              </h3>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Subscribe to our newsletter for exclusive offers, new arrivals,
              and jewelry care tips
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent 
                           text-gray-900 placeholder-gray-500 text-sm"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 
                           hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-300 
                           hover:shadow-lg hover:scale-105 text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="text-center sm:text-left">
              <p>&copy; 2024 Ornament Store. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-center">
              <Link
                href="/privacy"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
