"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import Image from "next/image";
import {
  FaMinus,
  FaPlus,
  FaWhatsapp,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { BsHeart, BsShare } from "react-icons/bs";
import { MdVerified, MdLocalShipping, MdSecurity } from "react-icons/md";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  useHandleFindProductQuery,
  useHandleFindSingleProductQuery,
} from "@/redux/features/product/productApi";
import ProductCard from "@/components/layout/Home/shared/ProductCard";
import { useHandleFIndReviewsByProductQuery } from "@/redux/features/review/reviewApi";
import { useHandleAddOrderMutation } from "@/redux/features/order/orderApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CheckCircle,
  User,
  Star,
  ShoppingBag,
  Truck,
  Shield,
  Award,
  Phone,
  ArrowDown,
  Crown,
} from "lucide-react";

type ShippingOption = "dhakaCity" | "dhakaCityOuter" | "outsideDhaka";
type PaymentOption = "cash" | "bkash";

interface FormData {
  name: string;
  phone: string;
  address: string;
  shipping: ShippingOption;
  payment: PaymentOption;
  bkashTransactionId?: string;
  bkashPhone?: string;
  cashPaymentMessage?: string;
}

const ShopDetails = ({ slug }: any) => {
  const [handleAddOrder, { isLoading: placeOrderLoading }] =
    useHandleAddOrderMutation();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("description");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      shipping: "dhakaCity",
      payment: "cash",
    },
  });
  const paymentMethod = watch("payment");

  interface IData {
    _id: string;
    slug: string;
    productName: string;
    productImage: string[];
    price: number;
    quantity: number;
    sold: number;
    createdAt: string;
    updatedAt: string;
  }

  const { data } = useHandleFindSingleProductQuery(slug);
  const {
    _id,
    productName,
    description,
    unit,
    shipping,
    specialty,
    prvPrice,
    category,
    price,
    productImage,
  } = data?.payload || {};

  // Handle productImage array
  const imageArray = Array.isArray(productImage)
    ? productImage
    : [productImage].filter(Boolean);

  const { data: data2 } = useHandleFindProductQuery({
    page: 1,
    limit: 8,
    search: "",
    category,
  });

  const allData2: IData[] = data2?.payload || [];
  const allData = allData2.filter((item) => item?.slug !== slug);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const payload = {
        user: {
          name: data?.name,
          phone: data?.phone,
          address: data?.address,
        },
        products: [
          {
            product: _id,
            quantity,
          },
        ],
        paymentInfo: {
          method: data?.payment,
          bkashPhone: data?.bkashPhone,
          bkashTransactionId: data?.bkashTransactionId,
          cashPaymentMessage: data?.cashPaymentMessage,
        },
        shippingArea: data.shipping,
      };

      const response = await handleAddOrder(payload).unwrap();
      localStorage.setItem("orderData", JSON.stringify(response));
      router.push(`/success`);
      toast.success("Order Placed Successfully!");
      reset({
        name: "",
        phone: "",
        address: "",
        shipping: "dhakaCity",
        payment: "cash",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  const shippingCost: Record<ShippingOption, number> = {
    dhakaCity: shipping?.dhakaCity,
    dhakaCityOuter: shipping?.dhakaCityOuter,
    outsideDhaka: shipping?.outsideDhaka,
  };

  const selectedShipping = watch("shipping", "dhakaCity");
  const subTotal = (price || 0) * quantity;
  const total = (price || 0) * quantity + shippingCost[selectedShipping];

  const { data: reviewData, isLoading } = useHandleFIndReviewsByProductQuery(
    _id,
    {
      skip: !_id,
    }
  );

  const reviews = reviewData?.payload?.reviews || [];

  const ImageModal = () => {
    if (!showImageModal || !imageArray.length) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2">
        <div className="relative w-full h-full max-w-4xl max-h-full flex items-center justify-center">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-60 rounded-full p-3 hover:bg-opacity-80 transition-all"
          >
            <FaTimes />
          </button>

          {imageArray.length > 1 && (
            <>
              <button
                onClick={() =>
                  setSelectedImage(
                    selectedImage > 0
                      ? selectedImage - 1
                      : imageArray.length - 1
                  )
                }
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-xl z-10 bg-black bg-opacity-60 rounded-full p-3 hover:bg-opacity-80 transition-all"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() =>
                  setSelectedImage(
                    selectedImage < imageArray.length - 1
                      ? selectedImage + 1
                      : 0
                  )
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xl z-10 bg-black bg-opacity-60 rounded-full p-3 hover:bg-opacity-80 transition-all"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          <Image
            src={imageArray[selectedImage]}
            alt={productName}
            width={1000}
            height={1000}
            className="max-w-full max-h-[90vh] object-contain"
          />

          {/* Image counter */}
          {imageArray.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {imageArray.length}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <ImageModal />
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Sticky Header */}
        <div className="lg:hidden sticky top-0 bg-white shadow-sm z-40 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1
                className="text-lg font-semibold text-gray-900 line-clamp-1"
                dangerouslySetInnerHTML={{ __html: productName }}
              />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ৳{price}
                </span>
                {prvPrice && prvPrice > price && (
                  <span className="text-sm text-gray-500 line-through">
                    ৳{prvPrice}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById("orderSection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Order
            </button>
          </div>
        </div>

        {/* Product Hero Section */}
        <div className="bg-white">
          <div className=" px-3 sm:px-4 lg:px-0 py-4 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-3 lg:space-y-4">
                <div className="relative group">
                  <Image
                    src={imageArray[selectedImage] || imageArray[0]}
                    alt={productName}
                    width={600}
                    height={600}
                    className="w-full h-72 sm:h-80 lg:h-[500px] object-cover rounded-xl lg:rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setShowImageModal(true)}
                  />

                  {/* Mobile Image Navigation */}
                  {imageArray.length > 1 && (
                    <div className="lg:hidden">
                      <button
                        onClick={() =>
                          setSelectedImage(
                            selectedImage > 0
                              ? selectedImage - 1
                              : imageArray.length - 1
                          )
                        }
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md"
                      >
                        <FaChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImage(
                            selectedImage < imageArray.length - 1
                              ? selectedImage + 1
                              : 0
                          )
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md"
                      >
                        <FaChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Mobile Image Dots */}
                  {imageArray.length > 1 && (
                    <div className="lg:hidden absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {imageArray.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            selectedImage === index
                              ? "bg-white"
                              : "bg-white bg-opacity-50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop Thumbnail Images */}
                {imageArray.length > 1 && (
                  <div className="hidden lg:flex gap-2 overflow-x-auto pb-2">
                    {imageArray.map((img, index) => (
                      <div key={index} className="flex-shrink-0">
                        <Image
                          src={img}
                          alt={`${productName} ${index + 1}`}
                          width={80}
                          height={80}
                          className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                            selectedImage === index
                              ? "border-yellow-500"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedImage(index)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Mobile Thumbnails - Horizontal Scroll */}
                {imageArray.length > 1 && (
                  <div className="lg:hidden">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {imageArray.map((img, index) => (
                        <div key={index} className="flex-shrink-0">
                          <Image
                            src={img}
                            alt={`${productName} ${index + 1}`}
                            width={60}
                            height={60}
                            className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                              selectedImage === index
                                ? "border-yellow-500"
                                : "border-gray-200"
                            }`}
                            onClick={() => setSelectedImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-4 lg:space-y-6">
                <div className="hidden lg:block">
                  <h1
                    className="text-2xl lg:text-3xl font-bold text-gray-700 leading-tight"
                    dangerouslySetInnerHTML={{ __html: productName }}
                  />
                  <p
                    className="text-base lg:text-lg text-gray-600 mt-2"
                    dangerouslySetInnerHTML={{ __html: unit }}
                  />
                </div>

                <div className="lg:hidden">
                  <h1
                    className="text-xl font-bold text-gray-700 leading-tight"
                    dangerouslySetInnerHTML={{ __html: productName }}
                  />
                  <p
                    className="text-sm text-gray-600 mt-1"
                    dangerouslySetInnerHTML={{ __html: unit }}
                  />
                </div>

                {/* Price Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <span className="text-2xl lg:text-3xl font-bold text-gray-700">
                      ৳{price}
                    </span>
                    {prvPrice && prvPrice > price && (
                      <span className="text-lg lg:text-xl text-gray-500 line-through">
                        ৳{prvPrice}
                      </span>
                    )}
                  </div>
                  {prvPrice && prvPrice > price && (
                    <div className="inline-flex items-center px-2 lg:px-3 py-1 bg-red-100 text-red-800 text-xs lg:text-sm font-medium rounded-full">
                      Save ৳{prvPrice - price} (
                      {Math.round(((prvPrice - price) / prvPrice) * 100)}% off)
                    </div>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-4 text-xs lg:text-sm">
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <MdVerified className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                    <span>Authentic Product</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                    <MdLocalShipping className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
                    <MdSecurity className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                    <span>Secure Payment</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-sm lg:text-base font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        type="button"
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                        className="p-3 lg:p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                      >
                        <FaMinus className="w-3 h-3 lg:w-4 lg:h-4" />
                      </button>
                      <span className="px-4 py-2 lg:py-2 text-lg font-medium min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 lg:p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                      >
                        <FaPlus className="w-3 h-3 lg:w-4 lg:h-4" />
                      </button>
                    </div>
                    <span className="text-sm lg:text-base text-gray-600">
                      Total: <span className="font-semibold">৳{subTotal}</span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      document
                        .getElementById("orderSection")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 lg:py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors text-base lg:text-lg"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Order Now
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </button>

                  <div className="flex gap-3">
                    <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 lg:py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors text-sm lg:text-base">
                      <BsHeart className="w-4 h-4" />
                      <span className="hidden sm:inline">Wishlist</span>
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 lg:py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors text-sm lg:text-base">
                      <BsShare className="w-4 h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>

                {/* WhatsApp Contact */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm lg:text-base text-green-800 mb-3">
                    Need help? Contact us on WhatsApp
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href="https://wa.me/+8809638570740"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm lg:text-base"
                    >
                      <FaWhatsapp className="w-4 h-4 lg:w-5 lg:h-5" />
                      WhatsApp
                    </a>
                    <a
                      href="tel:09638570740"
                      className="flex-1 inline-flex items-center justify-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 font-medium py-2.5 px-4 rounded-lg transition-colors text-sm lg:text-base"
                    >
                      <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs - Enhanced Mobile Design */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 lg:py-12">
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm overflow-hidden">
            {/* Tab Navigation - Mobile Optimized */}
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex px-4 lg:px-8 min-w-max lg:min-w-0">
                {[
                  { id: "description", label: "Description" },
                  { id: "features", label: "Key Features" },
                  { id: "reviews", label: "Reviews" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 lg:py-4 px-4 lg:px-1 lg:mr-8 border-b-2 font-medium text-sm lg:text-base whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "border-yellow-500 text-yellow-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-4 lg:p-8">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed text-sm lg:text-base"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              )}

              {activeTab === "features" && (
                <div className="grid gap-3 lg:gap-4">
                  {specialty?.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm lg:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4 lg:space-y-6">
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 lg:p-6 animate-pulse"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full"></div>
                            <div className="space-y-2 flex-1">
                              <div className="h-3 lg:h-4 bg-gray-200 rounded w-32"></div>
                              <div className="h-2 lg:h-3 bg-gray-200 rounded w-24"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 lg:h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 lg:h-4 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review: any, index: number) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 lg:p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-yellow-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                              {review.image ? (
                                <Image
                                  src={review.image}
                                  alt={review.name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                                <h4 className="font-medium text-gray-900 text-sm lg:text-base">
                                  {review.name}
                                </h4>
                                <span className="hidden sm:inline text-gray-500">
                                  •
                                </span>
                                <span className="text-xs lg:text-sm text-gray-500">
                                  {review.designation}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                                {review.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 lg:py-12">
                      <Star className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-sm lg:text-base">
                        No reviews yet
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Form - Enhanced Mobile Experience */}
        <div
          id="orderSection"
          className="bg-gradient-to-br from-gray-100 to-amber-100 py-8 lg:py-16"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 lg:mb-20">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-amber-300 rounded-full mb-4 sm:mb-6">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                <span className="text-xs sm:text-sm font-medium text-amber-700 uppercase tracking-wide">
                  Easy Ordering
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
                Place Your
                <span className="bg-gradient-to-r ml-3 from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Order Now
                </span>
              </h2>

              {/* Divider with star */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="h-px w-8 sm:w-12 bg-gray-300"></div>
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                <div className="h-px w-8 sm:w-12 bg-gray-300"></div>
              </div>

              {/* Sub text */}
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-xl sm:max-w-3xl mx-auto leading-relaxed px-4">
                Fill in the form below to confirm your order. Our team will
                contact you shortly and ensure a smooth delivery of your
                favorite ornaments.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            >
              {/* Billing Details */}
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm p-4 lg:p-8">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">
                  Billing Details
                </h3>

                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter your full name"
                      className="w-full px-3 lg:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm lg:text-base"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs lg:text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^01[0-9]{9}$/,
                          message:
                            "Please enter a valid Bangladeshi mobile number (01XXXXXXXXX)",
                        },
                      })}
                      placeholder="01XXXXXXXXX"
                      type="tel"
                      className="w-full px-3 lg:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm lg:text-base"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs lg:text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      {...register("address", {
                        required: "Address is required",
                      })}
                      placeholder="House/Flat, Road, Area, Thana, District"
                      rows={3}
                      className="w-full px-3 lg:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm lg:text-base resize-none"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs lg:text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm p-4 lg:p-8">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">
                  Order Summary
                </h3>

                {/* Product Details */}
                <div className="border border-gray-200 rounded-lg p-3 lg:p-4 mb-4 lg:mb-6">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <Image
                      src={imageArray[0]}
                      alt={productName}
                      width={80}
                      height={80}
                      className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-medium text-gray-900 text-sm lg:text-base line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: productName }}
                      />
                      <p className="text-gray-600 text-xs lg:text-sm">
                        Quantity: {quantity}
                      </p>
                      <p className="font-semibold text-base lg:text-lg text-yellow-600">
                        ৳{subTotal}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Options - Mobile Optimized */}
                <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                  <h4 className="font-semibold text-gray-900 text-sm lg:text-base">
                    Shipping Options
                  </h4>

                  <div className="space-y-2 lg:space-y-3">
                    <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          value="dhakaCity"
                          {...register("shipping")}
                          className="w-4 h-4 text-yellow-500"
                        />
                        <span className="text-sm lg:text-base">Dhaka City</span>
                      </div>
                      <span className="font-semibold text-sm lg:text-base">
                        ৳{shipping?.dhakaCity}
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          value="dhakaCityOuter"
                          {...register("shipping")}
                          className="w-4 h-4 text-yellow-500"
                        />
                        <span className="text-sm lg:text-base">
                          Dhaka Suburbs
                        </span>
                      </div>
                      <span className="font-semibold text-sm lg:text-base">
                        ৳{shipping?.dhakaCityOuter}
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          value="outsideDhaka"
                          {...register("shipping")}
                          className="w-4 h-4 text-yellow-500"
                        />
                        <span className="text-sm lg:text-base">
                          Outside Dhaka
                        </span>
                      </div>
                      <span className="font-semibold text-sm lg:text-base">
                        ৳{shipping?.outsideDhaka}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Payment Options - Enhanced Mobile Design */}
                <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                  <h4 className="font-semibold text-gray-900 text-sm lg:text-base">
                    Payment Method
                  </h4>

                  <div className="space-y-2 lg:space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        value="cash"
                        {...register("payment")}
                        className="w-4 h-4 text-yellow-500"
                      />
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                        <span className="text-sm lg:text-base">
                          Cash on Delivery
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        value="bkash"
                        {...register("payment")}
                        className="w-4 h-4 text-yellow-500"
                      />
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-pink-600" />
                        <span className="text-sm lg:text-base">
                          bKash Payment
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Payment Method Specific Fields */}
                  {paymentMethod === "cash" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 lg:p-4 mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                        <span className="font-medium text-green-800 text-sm lg:text-base">
                          Cash on Delivery
                        </span>
                      </div>
                      <p className="text-green-700 text-xs lg:text-sm mb-3">
                        Pay when you receive your product. Inspect before
                        payment.
                      </p>
                      <input
                        type="text"
                        placeholder="Special delivery instructions (optional)"
                        {...register("cashPaymentMessage")}
                        className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs lg:text-sm"
                      />
                    </div>
                  )}

                  {paymentMethod === "bkash" && (
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 lg:p-4 mt-3 space-y-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-pink-600" />
                        <span className="font-medium text-pink-800 text-sm lg:text-base">
                          bKash Payment
                        </span>
                      </div>

                      <div className="space-y-3">
                        <input
                          type="tel"
                          placeholder="bKash Mobile Number (01XXXXXXXXX)"
                          {...register("bkashPhone", {
                            required:
                              paymentMethod === "bkash"
                                ? "bKash number is required"
                                : false,
                            pattern: {
                              value: /^01\d{9}$/,
                              message:
                                "Please enter a valid mobile number (01XXXXXXXXX)",
                            },
                          })}
                          className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-xs lg:text-sm"
                        />
                        {errors.bkashPhone && (
                          <p className="text-red-500 text-xs">
                            {errors.bkashPhone.message}
                          </p>
                        )}

                        <input
                          type="text"
                          placeholder="Transaction ID"
                          {...register("bkashTransactionId", {
                            required:
                              paymentMethod === "bkash"
                                ? "Transaction ID is required"
                                : false,
                          })}
                          className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-xs lg:text-sm"
                        />
                        {errors.bkashTransactionId && (
                          <p className="text-red-500 text-xs">
                            {errors.bkashTransactionId.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Total */}
                <div className="border-t border-gray-200 pt-4 space-y-2 mb-4 lg:mb-6">
                  <div className="flex justify-between text-gray-600 text-sm lg:text-base">
                    <span>Subtotal</span>
                    <span>৳{subTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm lg:text-base">
                    <span>Shipping</span>
                    <span>৳{shippingCost[selectedShipping]}</span>
                  </div>
                  <div className="flex justify-between text-lg lg:text-xl font-bold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span className="text-yellow-600">৳{total}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={placeOrderLoading}
                  className={`w-full py-3 lg:py-4 rounded-lg font-semibold text-base lg:text-lg transition-all ${
                    placeOrderLoading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  {placeOrderLoading
                    ? "Processing..."
                    : `Confirm Order - ৳${total}`}
                </button>

                {/* Trust Badges */}
                <div className="mt-4 lg:mt-6 grid grid-cols-3 gap-2 lg:gap-4 text-center text-xs lg:text-sm text-gray-600">
                  <div className="flex flex-col items-center gap-1 p-2 bg-green-50 rounded-lg">
                    <Truck className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-blue-50 rounded-lg">
                    <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-purple-50 rounded-lg">
                    <Award className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500" />
                    <span>Quality Assured</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Related Products - Mobile Optimized */}
        {allData?.length > 0 && (
          <div className="bg-white py-8 lg:py-16">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
              <div className="text-center mb-8 sm:mb-12 lg:mb-20">
                {/* Premium badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-amber-300 rounded-full mb-4 sm:mb-6">
                  <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                  <span className="text-xs sm:text-sm font-medium text-amber-700 uppercase tracking-wide">
                    Modnity
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
                  You Might{" "}
                  <span className="bg-gradient-to-r ml-3 from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Also Like
                  </span>
                </h2>

                {/* Divider with star */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="h-px w-8 sm:w-12 bg-gray-300"></div>
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  <div className="h-px w-8 sm:w-12 bg-gray-300"></div>
                </div>

                {/* Sub text */}
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-xl sm:max-w-3xl mx-auto leading-relaxed px-4">
                  Discover more amazing products from our collection
                </p>
              </div>

              {/* Mobile: Simple Grid, Desktop: Carousel */}
              <div className="block lg:hidden">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {allData.slice(0, 4).map((product, index) => (
                    <div key={index} className="h-full">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                {allData.length > 4 && (
                  <div className="text-center mt-6">
                    <button className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                      View More Products
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop: Carousel */}
              <div className="hidden lg:block">
                <Carousel>
                  <CarouselContent className="-ml-4">
                    {allData.map((product, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
                        <div className="h-full">
                          <ProductCard product={product} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action Section - Mobile Enhanced */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              {/* Heading */}
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-base lg:text-lg text-gray-300 mb-8">
                Our friendly customer service team is available{" "}
                <span className="font-semibold text-yellow-400">24/7</span> to
                assist you.
              </p>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                {/* Phone Button */}
                <a
                  href="tel:09638570740"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm lg:text-base whitespace-nowrap"
                >
                  <Phone className="w-5 h-5" />
                  <span className="whitespace-nowrap">Call: 09638-570740</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/8809638570740"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm lg:text-base whitespace-nowrap"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span className="whitespace-nowrap">WhatsApp Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation - Sticky */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-30">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="text-xs text-gray-600">Total Price</div>
              <div className="font-bold text-lg text-gray-900">৳{total}</div>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById("orderSection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Now
            </button>
          </div>
        </div>

        {/* Add padding bottom for mobile sticky navigation */}
        <div className="lg:hidden h-20"></div>
      </div>
    </>
  );
};

export default ShopDetails;
