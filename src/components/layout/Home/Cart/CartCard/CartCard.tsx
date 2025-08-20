"use client";
import { useHandleAddOrderMutation } from "@/redux/features/order/orderApi";
import { BadgeDollarSign, BookDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaTruck,
  FaCreditCard,
  FaMoneyBillWave,
  FaShoppingBag,
  FaCalculator,
} from "react-icons/fa";

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

export default function CartCard({ cartProducts, setCartProducts }: any) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      shipping: "dhakaCity",
      payment: "cash",
    },
  });

  const paymentMethod = watch("payment");
  const shippingSelected = watch("shipping", "dhakaCity");

  const [handleAddOrder, { isLoading: placeOrderLoading }] =
    useHandleAddOrderMutation();
  const router = useRouter();

  // Calculate shipping cost based on selected option
  const shippingCost: Record<ShippingOption, number> = {
    dhakaCity: cartProducts?.reduce(
      (acc: number, item: any) =>
        acc + (item.payload?.shipping?.dhakaCity || 0),
      0
    ),
    dhakaCityOuter: cartProducts?.reduce(
      (acc: number, item: any) =>
        acc + (item.payload?.shipping?.dhakaCityOuter || 0),
      0
    ),
    outsideDhaka: cartProducts?.reduce(
      (acc: number, item: any) =>
        acc + (item.payload?.shipping?.outsideDhaka || 0),
      0
    ),
  };

  // Calculate total product cost
  const productCost = cartProducts.reduce(
    (total: number, item: any) => total + item?.payload?.price * item?.quantity,
    0
  );

  const cost = productCost + (shippingCost[shippingSelected] || 0);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const payload = {
        user: {
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
        products: cartProducts.map((item: any) => ({
          product: item.payload._id,
          quantity: item.quantity,
        })),
        paymentInfo: {
          method: data.payment,
          bkashPhone: data.bkashPhone,
          bkashTransactionId: data.bkashTransactionId,
          cashPaymentMessage: data.cashPaymentMessage,
        },
        shippingArea: data.shipping,
      };

      const response = await handleAddOrder(payload).unwrap();

      toast.success("Order Placed Successfully!");
      localStorage.setItem("orderData", JSON.stringify(response));
      localStorage.removeItem("ponnoBariCart");
      setCartProducts([]);

      router.push("/success");

      reset({
        name: "",
        phone: "",
        address: "",
        shipping: "dhakaCity",
        payment: "cash",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  return (
    <div className="w-full lg:w-[38rem] mb-8 lg:mb-0">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <FaShoppingBag className="text-2xl" />
            <div>
              <h2 className="text-xl font-bold">Order Summary</h2>
              <p className="text-amber-100 text-sm">Complete your purchase</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <FaUser className="text-amber-600" />
              <span>Personal Information</span>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaPhone className="text-amber-600 text-xs" />
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01[0-9]{9}$/,
                    message:
                      "Please enter a valid Bangladesh mobile number (01XXXXXXXXX)",
                  },
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaMapMarkerAlt className="text-amber-600 text-xs" />
                Delivery Address *
              </label>
              <textarea
                {...register("address", { required: "Address is required" })}
                placeholder="Enter your full address (Area, Thana, District)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
              />
              {errors.address && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <FaCalculator className="text-amber-600" />
              <span>Order Total</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-800">
                ৳{productCost.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-gray-800">
                ৳{(shippingCost[shippingSelected] || 0).toLocaleString()}
              </span>
            </div>

            <div className="border-t border-amber-200 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  ৳{cost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <FaTruck className="text-amber-600" />
              <span>Shipping Options</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 cursor-pointer transition-all duration-200">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="dhakaCity"
                    {...register("shipping")}
                    defaultChecked
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Dhaka City
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  ৳{shippingCost.dhakaCity}
                </span>
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 cursor-pointer transition-all duration-200">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="dhakaCityOuter"
                    {...register("shipping")}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700 block">
                      Dhaka Metro Area
                    </span>
                    <span className="text-xs text-gray-500">
                      Gazipur, Narayanganj, Keraniganj, Savar, etc.
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  ৳{shippingCost.dhakaCityOuter}
                </span>
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 cursor-pointer transition-all duration-200">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="outsideDhaka"
                    {...register("shipping")}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Outside Dhaka
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  ৳{shippingCost.outsideDhaka}
                </span>
              </label>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <FaCreditCard className="text-amber-600" />
              <span>Payment Method</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 cursor-pointer transition-all duration-200 group">
                <input
                  type="radio"
                  value="cash"
                  {...register("payment")}
                  defaultChecked
                  className="sr-only"
                />
                <FaMoneyBillWave className="text-2xl text-green-600 group-hover:text-green-700 mb-2" />
                <span className="text-sm font-medium text-center">
                  Cash on Delivery
                </span>
              </label>

              <label className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 cursor-pointer transition-all duration-200 group">
                <input
                  type="radio"
                  value="bkash"
                  {...register("payment")}
                  className="sr-only"
                />
                <BookDashed className="text-2xl text-pink-600 group-hover:text-pink-700 mb-2" />
                <span className="text-sm font-medium text-center">
                  bKash Payment
                </span>
              </label>
            </div>

            {/* Conditional Fields */}
            {paymentMethod === "cash" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    {...register("cashPaymentMessage")}
                    placeholder="Any special delivery instructions..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <FaMoneyBillWave className="text-green-600 text-lg mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-800 mb-2">
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-green-700 leading-relaxed">
                        We offer home delivery service. You can receive and
                        inspect the product before making payment. We hope you
                        will receive our product with satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "bkash" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <BadgeDollarSign className="text-pink-600 text-xl" />
                    <h3 className="font-semibold text-pink-800">
                      bKash Payment
                    </h3>
                  </div>
                  <p className="text-sm text-pink-700 mb-3">
                    Send money to: <strong>01XXXXXXXXX</strong>
                  </p>
                  <p className="text-sm text-pink-700">
                    Amount: <strong>৳{cost.toLocaleString()}</strong>
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Your bKash Number *
                  </label>
                  <input
                    type="tel"
                    {...register("bkashPhone", {
                      required: "bKash number is required",
                      pattern: {
                        value: /^01[0-9]{9}$/,
                        message:
                          "Please enter a valid Bangladesh mobile number (01XXXXXXXXX)",
                      },
                    })}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                  {errors.bkashPhone && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      {errors.bkashPhone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Transaction ID *
                  </label>
                  <input
                    type="text"
                    {...register("bkashTransactionId", {
                      required: "Transaction ID is required",
                    })}
                    placeholder="Enter bKash transaction ID"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                  {errors.bkashTransactionId && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      {errors.bkashTransactionId.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={placeOrderLoading}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
              placeOrderLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 active:scale-[0.98] shadow-lg hover:shadow-xl"
            }`}
          >
            {placeOrderLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Order...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaShoppingBag className="text-lg" />
                <span>Place Order - ৳{cost.toLocaleString()}</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
