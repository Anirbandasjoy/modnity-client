import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

export function stripHtmlTags(str: string) {
  if (!str) return "";
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

export default function CartTable({
  cartProducts,
  setCartProducts,
  loading,
}: any) {
  const updateLocalStorage = (updatedCart: any[]) => {
    const simplified = updatedCart.map((item) => ({
      product: item.payload.slug,
      quantity: item.quantity,
    }));
    localStorage.setItem("modnityCart", JSON.stringify(simplified));
    console.log(simplified);
  };

  const updateQuantity = (slug: string, type: "increment" | "decrement") => {
    setCartProducts((prev: any[]) => {
      const updated = prev.map((item) => {
        if (item.payload.slug === slug) {
          if (type === "increment") {
            const product = item.payload;
            const newQuantity = item.quantity + 1;

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
                    unit: stripHtmlTags(product?.unit),
                    buyingReason: {
                      heading: stripHtmlTags(product?.buyingReason?.heading),
                      steps: product?.buyingReason?.steps,
                    },
                    hadith: stripHtmlTags(product?.hadith),
                    benefits: {
                      heading: stripHtmlTags(product?.benefits?.heading),
                      steps: product?.benefits?.steps,
                    },
                    category: product?.category,
                    quantity: newQuantity,
                    prvPrice: product?.prvPrice,
                  },
                ],
              },
            });
          }
          const newQty =
            type === "increment"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQty };
        }
        return item;
      });
      updateLocalStorage(updated);
      return updated;
    });
  };

  const removedFromCart = (slug: string) => {
    const storedCart: { product: string; quantity: number }[] = JSON.parse(
      localStorage.getItem("modnityCart") || "[]"
    );

    const updatedCart = storedCart.filter(
      (product) => product.product !== slug
    );

    localStorage.setItem("modnityCart", JSON.stringify(updatedCart));

    setCartProducts((prev: any[]) =>
      prev.filter((item) => item?.payload?.slug !== slug)
    );
    toast.success("Item removed from cart");

    setTimeout(() => {
      window.dispatchEvent(new Event("cartUpdated"));
    }, 100);
  };

  const SkeletonRow = () => (
    <TableRow className="border-b border-gray-100">
      <TableCell className="py-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg" />
          <div className="space-y-2 flex-1">
            <div className="w-3/4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded" />
            <div className="w-1/2 h-3 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="h-10 w-28 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-full" />
      </TableCell>
      <TableCell>
        <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded" />
      </TableCell>
      <TableCell>
        <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-full" />
      </TableCell>
    </TableRow>
  );

  const MobileSkeleton = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="h-20 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2" />
          <div className="flex items-center justify-between">
            <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
            <div className="h-10 w-28 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full" />
          </div>
        </div>
        <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full" />
      </div>
    </div>
  );

  const EmptyCart = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      <div className="w-32 h-32 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
        <IoCartOutline className="text-6xl text-amber-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Your cart is empty
      </h2>
      <p className="text-gray-500 text-center  mb-6 ">
        Looks like you haven&#39;t <br /> added anything to your cart yet.
        Discover our amazing products and start shopping!
      </p>
      <button
        onClick={() => window.history.back()}
        className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        Continue Shopping
      </button>
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-br  p-3 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Shopping Cart
        </h2>
        <p className="text-gray-600">
          {!loading &&
            cartProducts?.length > 0 &&
            `${cartProducts.length} item${
              cartProducts.length > 1 ? "s" : ""
            } in your cart`}
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200">
                <TableHead className="text-gray-700 font-semibold py-4 px-6">
                  Product
                </TableHead>
                <TableHead className="text-gray-700 font-semibold py-4 px-6 text-center">
                  Quantity
                </TableHead>
                <TableHead className="text-gray-700 font-semibold py-4 px-6 text-center">
                  Price
                </TableHead>
                <TableHead className="text-gray-700 font-semibold py-4 px-6 text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(3)].map((_, idx) => <SkeletonRow key={idx} />)
              ) : cartProducts?.length < 1 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-0">
                    <EmptyCart />
                  </TableCell>
                </TableRow>
              ) : (
                cartProducts.map(({ payload, quantity }: any) => (
                  <TableRow
                    key={payload._id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="py-6 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Image
                            height={64}
                            width={64}
                            src={payload?.productImage?.[0]}
                            alt={payload?.productName}
                            className="rounded-xl object-cover shadow-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-medium text-gray-900 line-clamp-2 leading-5"
                            dangerouslySetInnerHTML={{
                              __html: payload?.productName,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-6">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-1">
                          <button
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-200 active:scale-95"
                            onClick={() =>
                              updateQuantity(payload.slug, "decrement")
                            }
                          >
                            <FaMinus className="text-sm" />
                          </button>
                          <Input
                            className="w-14 h-8 border-none bg-transparent text-center font-semibold text-gray-800"
                            value={quantity}
                            readOnly
                          />
                          <button
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-200 active:scale-95"
                            onClick={() =>
                              updateQuantity(payload.slug, "increment")
                            }
                          >
                            <FaPlus className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-6 text-center">
                      <span className="font-semibold text-lg bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        ৳{payload.price}
                      </span>
                    </TableCell>
                    <TableCell className="py-6 px-6 text-center">
                      <button
                        className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center hover:bg-red-100 hover:border-red-300 transition-all duration-200 active:scale-95 group"
                        onClick={() => removedFromCart(payload.slug)}
                      >
                        <FaTrashAlt className="text-red-500 text-sm group-hover:text-red-600" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {cartProducts && cartProducts.length > 0 && (
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg">Need something else?</h3>
                    <p className="text-amber-100">
                      Explore our full collection of products
                    </p>
                  </div>
                  <button
                    onClick={() => window.history.back()}
                    className="bg-white text-amber-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tablet & Mobile View */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          [...Array(3)].map((_, idx) => <MobileSkeleton key={idx} />)
        ) : cartProducts?.length < 1 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <EmptyCart />
          </div>
        ) : (
          cartProducts.map(({ payload, quantity }: any) => (
            <div
              key={payload._id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-bl-full opacity-50" />

              <div className="flex items-start gap-4 relative">
                <div className="flex-shrink-0">
                  <Image
                    height={80}
                    width={80}
                    src={payload?.productImage}
                    alt={payload?.productName}
                    className="rounded-xl object-cover shadow-sm"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    className="font-medium text-gray-900 line-clamp-2 leading-5 mb-2"
                    dangerouslySetInnerHTML={{ __html: payload?.productName }}
                  />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-500">Price:</span>
                    <span className="font-semibold text-lg bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      ৳{payload.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">
                      Quantity:
                    </span>
                    <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-1">
                      <button
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-200 active:scale-95"
                        onClick={() =>
                          updateQuantity(payload.slug, "decrement")
                        }
                      >
                        <FaMinus className="text-sm" />
                      </button>
                      <Input
                        className="w-12 h-8 border-none bg-transparent text-center font-semibold text-gray-800"
                        value={quantity}
                        readOnly
                      />
                      <button
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-200 active:scale-95"
                        onClick={() =>
                          updateQuantity(payload.slug, "increment")
                        }
                      >
                        <FaPlus className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all duration-200 active:scale-95 group shadow-sm"
                  onClick={() => removedFromCart(payload.slug)}
                >
                  <RxCross2 className="text-gray-400 text-lg group-hover:text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
