"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import { useHandleFindSingleOrderQuery } from "@/redux/features/order/orderApi";
import OrderInvoice from "@/components/OrderInvoice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  FiDownload, 
  FiCheckCircle, 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiCreditCard, 
  FiTruck,
  FiClock,
  FiPackage,
  FiHome
} from "react-icons/fi";
import { 
  IoShieldCheckmarkOutline, 
  IoTimeOutline, 
  IoCallOutline,
  IoReceiptOutline
} from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

// Utility function to strip HTML tags
function stripHtmlTags(str: string) {
  if (!str) return "";
  return str.replace(/<[^>]+>/g, "");
}

export default function ShopCart() {
  const [response, setResponse] = useState<any>(null);
  const [Id, setId] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("orderData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setResponse(parsed);
      setId(parsed?.payload?._id);
    }
  }, []);

  const { data } = useHandleFindSingleOrderQuery(Id, { skip: !Id });
  const products = data?.payload?.products;

  useEffect(() => {
    if (data && products) {
      const items = products.map((item: any) => ({
        item_id: item?.product?._id,
        item_slug: item?.product?.slug,
        price: Number(item?.price),
        item_name: stripHtmlTags(item?.product?.productName),
        item_image: item?.product?.productImage,
        item_tag_line: stripHtmlTags(item?.product?.tagline),
        shipping_cost: item?.product?.shipping,
        unit: stripHtmlTags(item?.product?.unit),
        buyingReason: {
          heading: stripHtmlTags(item?.product?.buyingReason?.heading),
          steps: item?.product?.buyingReason?.steps,
        },
        hadith: stripHtmlTags(item?.product?.hadith),
        benefits: {
          heading: stripHtmlTags(item?.product?.benefits?.heading),
          steps: item?.product?.benefits?.steps,
        },
        category: item?.product?.category,
        quantity: item?.quantity,
        prvPrice: item?.product?.prvPrice,
      }));

      window.dataLayer?.push({
        event: "purchase",
        ecommerce: {
          transaction_id: response?.payload?._id,
          value: response?.payload?.totalAmount,
          tax: 0,
          shipping: response?.payload?.shippingCost,
          currency: "BDT",
          items: items,
          userInfo: {
            name: response?.payload?.user?.name || "N/A",
            phone: response?.payload?.user?.phone || "N/A",
            address: response?.payload?.user?.address || "N/A",
          },
        },
      });
    }
  }, [data, products, response]);

  const handleDownloadInvoice = async () => {
    setLoading(true);
    try {
      const blob = await pdf(
        <OrderInvoice payload={response.payload} products={products} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${response.payload.trackingId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  const SuccessAnimation = () => (
    <div className="relative">
      <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
        <FiCheckCircle className="text-4xl text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse" />
      <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse delay-500" />
    </div>
  );

  const OrderTimeline = () => (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <IoTimeOutline className="text-amber-600 text-xl" />
        Order Timeline
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
          <div>
            <p className="font-semibold text-green-700">Order Confirmed</p>
            <p className="text-sm text-gray-600">
              {response?.payload?.createdAt
                ? format(new Date(response.payload.createdAt), "MMM d, yyyy 'at' h:mm a")
                : "Just now"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-amber-500 rounded-full flex-shrink-0 animate-pulse" />
          <div>
            <p className="font-semibold text-amber-700">Processing</p>
            <p className="text-sm text-gray-600">Preparing your order</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-500">Out for Delivery</p>
            <p className="text-sm text-gray-500">Will be updated soon</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-500">Delivered</p>
            <p className="text-sm text-gray-500">Estimated delivery</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactSupport = () => (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <IoCallOutline className="text-blue-600 text-xl" />
        Need Help?
      </h3>
      <p className="text-gray-600 mb-4 text-sm">
        Our customer service team is here to help you with your order.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="tel:+8801XXXXXXXXX"
          className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          <FiPhone />
          Call Us
        </a>
        <a
          href="https://wa.me/8801XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
        >
          <FaWhatsapp />
          WhatsApp
        </a>
      </div>
    </div>
  );

  if (!response?.payload) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Floating Background Elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-20 animate-float" />
      <div className="fixed bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-20 animate-float delay-1000" />
      <div className="fixed top-1/2 right-20 w-16 h-16 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full opacity-20 animate-float delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <SuccessAnimation />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mt-8 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Thank you for your purchase! We&#39;ve received your order and will process it shortly.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
            <IoShieldCheckmarkOutline className="text-green-500" />
            <span className="text-sm">Your order is secure and protected</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Order Summary</h2>
                    <p className="text-amber-100">Order #{response?.payload?.trackingId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-100 text-sm">Total Amount</p>
                    <p className="text-3xl font-bold">৳{response?.payload?.totalAmount?.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Customer & Order Info */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      <FiUser className="text-amber-600" />
                      Customer Details
                    </h3>
                    <div className="space-y-3 pl-6">
                      <div className="flex items-start gap-3">
                        <FiUser className="text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-semibold text-gray-800">{response?.payload?.user?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiPhone className="text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-semibold text-gray-800">{response?.payload?.user?.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiMapPin className="text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Delivery Address</p>
                          <p className="font-semibold text-gray-800">{response?.payload?.user?.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      <IoReceiptOutline className="text-amber-600" />
                      Order Information
                    </h3>
                    <div className="space-y-3 pl-6">
                      <div className="flex items-start gap-3">
                        <FiClock className="text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Order Date</p>
                          <p className="font-semibold text-gray-800">
                            {response?.payload?.createdAt
                              ? format(new Date(response.payload.createdAt), "MMMM d, yyyy")
                              : "Today"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiCreditCard className="text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Payment Method</p>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              response?.payload?.paymentInfo?.method === "cash"
                                ? "bg-green-100 text-green-700"
                                : "bg-pink-100 text-pink-700"
                            }`}>
                              {response?.payload?.paymentInfo?.method === "cash" ? "Cash on Delivery" : "bKash"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiTruck className="text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Shipping Cost</p>
                          <p className="font-semibold text-gray-800">৳{response?.payload?.shippingCost}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Table */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                    <FiPackage className="text-amber-600" />
                    Ordered Items ({products?.length || 0})
                  </h3>
                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="font-semibold text-gray-700">Product</TableHead>
                          <TableHead className="font-semibold text-gray-700 text-center">Qty</TableHead>
                          <TableHead className="font-semibold text-gray-700 text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products?.map((item: any, i: number) => (
                          <TableRow key={i} className="hover:bg-white">
                            <TableCell className="py-4">
                              <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                                  <Image
                                    src={item.product.productImage}
                                    fill
                                    alt={item.product.productName}
                                    className="object-cover"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p
                                    className="font-semibold text-gray-800 text-sm leading-tight"
                                    dangerouslySetInnerHTML={{
                                      __html: item.product.productName,
                                    }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                                {item.quantity}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="font-bold text-lg text-gray-800">৳{item.price?.toLocaleString()}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Order Total Summary */}
                <div className="border-t border-gray-100 pt-6 mt-6">
                  <div className="max-w-sm ml-auto space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>৳{(response?.payload?.totalAmount - response?.payload?.shippingCost)?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>৳{response?.payload?.shippingCost}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-xl font-bold text-gray-800">
                        <span>Total</span>
                        <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          ৳{response?.payload?.totalAmount?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <OrderTimeline />
            <ContactSupport />

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDownloadInvoice}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-2xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <FiDownload className="text-xl" />
                    <span>Download Invoice</span>
                  </>
                )}
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 py-4 rounded-2xl font-semibold border-2 border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <FiHome className="text-xl" />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">What&#39;s Next?</h3>
          <p className="text-amber-100 mb-4">
            We&#39;ll send you updates about your order via SMS. Keep your phone handy!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-200 rounded-full animate-pulse" />
              <span>Order Processing: 1-2 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-200 rounded-full animate-pulse delay-300" />
              <span>Delivery: 1-3 business days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-200 rounded-full animate-pulse delay-600" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}