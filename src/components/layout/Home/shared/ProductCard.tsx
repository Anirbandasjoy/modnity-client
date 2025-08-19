"use client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ShoppingCart, Eye, Star, Sparkles, Crown } from "lucide-react";
import { useState } from "react";

// Utility function to strip HTML tags
function stripHtmlTags(str: string) {
  if (!str) return "";
  return str.replace(/<[^>]+>/g, "");
}

function ProductCard({ product }: any) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    const storedCart = JSON.parse(
      localStorage.getItem("ponnoBariCart") || "[]"
    );

    const existingItemIndex = storedCart.findIndex(
      (item: { product: string }) => item.product === product.slug
    );

    if (existingItemIndex === -1) {
      storedCart.push({ product: product.slug, quantity: 1 });
      localStorage.setItem("ponnoBariCart", JSON.stringify(storedCart));
      toast.success("Added to cart successfully!", {
        icon: "🛍️",
        style: {
          borderRadius: "12px",
          background: "#F59E0B",
          color: "#fff",
          fontWeight: "600",
        },
      });

      // Google Analytics tracking
      window.dataLayer?.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "BDT",
          items: [
            {
              item_id: product?._id,
              item_slug: product?.slug,
              price: Number(product?.price),
              item_name: stripHtmlTags(product.productName),
              item_image: product?.productImage,
              item_tag_line: stripHtmlTags(product?.tagline),
              shipping_cost: product?.shipping,
              category: product?.category,
              quantity: 1,
              prvPrice: product?.prvPrice,
            },
          ],
        },
      });
    } else {
      toast.error("Already in your cart!", {
        icon: "⚠️",
        style: {
          borderRadius: "12px",
          background: "#EF4444",
          color: "#fff",
          fontWeight: "600",
        },
      });
    }

    setTimeout(() => {
      window.dispatchEvent(new Event("cartUpdated"));
    }, 100);
  };

  const handleViewDetails = () => {
    // Google Analytics tracking
    window.dataLayer?.push({
      event: "view_item",
      ecommerce: {
        items: [
          {
            item_id: product?._id,
            item_slug: product?.slug,
            price: Number(product?.price),
            item_name: stripHtmlTags(product.productName),
            item_image: product?.productImage,
            shipping_cost: product?.shipping,
            category: product?.category,
            quantity: product?.quantity,
            prvPrice: product?.prvPrice,
          },
        ],
      },
    });
  };

  const discountPercentage =
    product?.prvPrice > product?.price
      ? Math.round(
          ((product?.prvPrice - product?.price) / product?.prvPrice) * 100
        )
      : 0;

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden  hover:shadow-lg 
                    transition-all duration-300 hover:-translate-y-1 border border-gray-100 
                    hover:border-amber-200 w-full"
      key={product?._id}
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div
          className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-red-600 
                       text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
        >
          -{discountPercentage}%
        </div>
      )}

      {/* Premium Badge */}
      <div className="absolute top-3 right-3 z-20">
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white p-2 rounded-full shadow-lg">
          <Crown className="w-3 h-3" />
        </div>
      </div>

      {/* Product Image Container */}
      <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          width={400}
          height={400}
          src={product?.productImage}
          alt={stripHtmlTags(product?.productName)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Loading Shimmer */}
        {!imageLoaded && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
                         animate-pulse"
          />
        )}

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
        </div>

        {/* Static Action Buttons - Always Visible */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 cursor-pointer bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 
                       hover:to-amber-700 text-white font-semibold py-2.5 px-3 rounded-md 
                       text-sm shadow-lg active:scale-95 transition-all duration-200 
                       flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Add Cart</span>
              <span className="sm:hidden text-xs ">Add</span>
            </button>

            <Link
              href={`/step/${product?.slug}`}
              onClick={handleViewDetails}
              className="flex-shrink-0"
            >
              <button
                className="bg-white/95 backdrop-blur-sm text-gray-800 hover:bg-white
                               font-semibold py-2.5 px-3 rounded-lg text-sm shadow-lg 
                               active:scale-95 transition-all duration-200 
                               flex items-center justify-center"
              >
                <Eye className="w-4 h-4 cursor-pointer" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 pb-16 sm:pb-16">
        {/* Rating Stars - Compact */}
        <div className="flex items-center">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-3 h-3 text-amber-400 fill-current"
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">(5.0)</span>
          </div>
        </div>

        {/* Product Title - More Space Efficient */}
        <div className="min-h-[2rem] sm:min-h-[2.5rem]">
          <h3
            className="text-gray-900 font-semibold leading-tight line-clamp-2 
                     group-hover:text-amber-700 transition-colors duration-200
                     text-sm sm:text-base"
            dangerouslySetInnerHTML={{
              __html: product?.productName,
            }}
          />
        </div>

        {/* Price Section - Compact */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              ৳ {product?.price?.toLocaleString()}
            </span>
            {product?.prvPrice > product?.price && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ৳ {product?.prvPrice?.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex sm:items-center gap-1 mt-4 sm:mt-0 sm:gap-0 justify-between flex-col sm:flex-row text-xs text-gray-600">
            <span>Including all taxes</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span className="text-green-600font-medium">In Stock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 
                     bg-gradient-to-r from-amber-400 to-amber-600 
                     group-hover:w-full transition-all duration-500 rounded-t-full"
      />
    </div>
  );
}

// Example usage with responsive grid container
export default ProductCard;
