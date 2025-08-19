"use client";
import { useHandleAddOrderMutation } from "@/redux/features/order/orderApi";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

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

// function stripHtmlTags(str: string) {
//   if (!str) return "";
//   return str.replace(/<\/?[^>]+(>|$)/g, "");
// }

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

      // GA4 purchase event push
      // window.dataLayer?.push({
      //   event: "purchase",
      //   ecommerce: {
      //     transaction_id: response._id || response.data?._id || "", // fallback
      //     value: cost,
      //     currency: "BDT",
      //     items: cartProducts.map((item: any) => ({
      //       item_id: item.payload._id,
      //       item_name: stripHtmlTags(item.payload.productName),
      //       price: item.payload.price,
      //       quantity: item.quantity,
      //     })),
      //   },
      //   customer: {
      //     name: data.name,
      //     phone: data.phone,
      //     address: data.address,
      //   },
      // });

      toast.success("Order Placed Successfully!");
      // Store response in localStorage
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
    <div className="w-full lg:w-96 p-4 bg-[#F5F5F5] rounded shadow h-fit">
      <h2 className="text-lg font-bold mb-4 ">Billing Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className=" font-semibold text-sm font-tiro_bangla">
            আপনার নাম *
          </label>
          <input
            {...register("name", { required: "নাম প্রয়োজন" })}
            placeholder="আপনার নাম লিখুন"
            className="w-full border rounded p-2 mt-1 font-tiro_bangla bg-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className=" font-semibold text-sm font-tiro_bangla">
            মোবাইল নাম্বার *
          </label>
          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            {...register("phone", {
              required: "মোবাইল নম্বর প্রয়োজন",
              pattern: {
                value: /^01[0-9]{9}$/,
                message:
                  "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
              },
            })}
            className="w-full border rounded p-2 mt-1 font-tiro_bangla bg-white"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm ">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className=" font-semibold text-sm font-tiro_bangla">
            আপনার ঠিকানা ( এলাকা, থানা, জেলা ) *
          </label>
          <textarea
            {...register("address", { required: "ঠিকানা প্রয়োজন" })}
            placeholder="এলাকা, থানা, জেলা লিখুন"
            className="w-full border rounded p-2 mt-1 font-tiro_bangla bg-white"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* Shipping Options */}
        <div className="pt-2 border-t">
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal</span>
            <span className="font-bold">Tk {cost.toLocaleString()}</span>
          </div>

          <div className="space-y-3 my-5">
            <p className="font-semibold text-gray-700">Shipping</p>
            <label className="block cursor-pointer">
              <span className="flex justify-between items-center gap-5 font-tiro_bangla">
                <p>
                  <input
                    type="radio"
                    value="dhakaCity"
                    {...register("shipping")}
                    defaultChecked
                    className="cursor-pointer w-5 font-tiro_bangla"
                  />
                  ঢাকা সিটি
                </p>
                <p className=" whitespace-nowrap">৳ {shippingCost.dhakaCity}</p>
              </span>
            </label>

            <label className="block cursor-pointer font-tiro_bangla">
              <span className="flex justify-between items-center gap-5">
                <p>
                  <input
                    type="radio"
                    value="dhakaCityOuter"
                    {...register("shipping")}
                    className="cursor-pointer w-5 font-tiro_bangla"
                  />
                  ঢাকা সিটির বাহিরে (গাজীপুর, নারায়ণগঞ্জ, কেরানীগঞ্জ, সাভার,
                  টঙ্গী, দোহার, নবাবগঞ্জ)
                </p>
                <p className="whitespace-nowrap">
                  ৳ {shippingCost.dhakaCityOuter}
                </p>
              </span>
            </label>

            <label className="block cursor-pointer font-tiro_bangla ">
              <span className="flex justify-between items-center gap-5">
                <p className="whitespace-nowrap">
                  <input
                    type="radio"
                    value="outsideDhaka"
                    {...register("shipping")}
                    className="cursor-pointer w-5 font-tiro_bangla"
                  />
                  ঢাকার বাইরে
                </p>
                <p>৳ {shippingCost.outsideDhaka}</p>
              </span>
            </label>
          </div>

          <hr className="my-3" />
          <div className="flex justify-between mt-1">
            <span className="font-semibold">Total</span>
            <span className="font-bold ">Tk {cost.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="my-3">
          <p className="font-medium text-forest-green">Payment Option</p>
          <div className="flex justify-between items-center gap-5">
            <label className="block mt-1">
              <input
                type="radio"
                value="cash"
                {...register("payment")}
                defaultChecked
                className="cursor-pointer"
              />
              <span className="ml-2">Cash on delivery</span>
            </label>
            <label className="block">
              <input
                type="radio"
                value="bkash"
                {...register("payment")}
                className="cursor-pointer"
              />
              <span className="ml-2">Bkash</span>
            </label>
          </div>

          {/* Conditional Fields */}
          {paymentMethod === "cash" && (
            <div className="mt-3">
              <label className="block">
                Delivery Instructions (Optional)
                <input
                  type="text"
                  {...register("cashPaymentMessage")}
                  placeholder="Any special instructions?"
                  className="w-full p-2 border rounded mt-1 bg-white"
                />
              </label>

              <div className="p-5 bg-[#F5F5F5] text-midnight-navy mt-5 font-tiro_bangla">
                <h1 className="text-xl font-medium mb-3">ক্যাশ অন ডেলিভারি</h1>
                <p className="bg-white p-5">
                  আমরা দিচ্ছি হোম ডেলিভারি, পন্য হাতে পেয়ে দেখে রিসিভ করবেন, আশা
                  করছি আপনি আমাদের পণ্যটি রিসিভ করবেন।
                </p>
              </div>
            </div>
          )}

          {paymentMethod === "bkash" && (
            <div className="mt-3 space-y-3">
              <label className="block">
                Bkash Phone Number *
                <input
                  type="tel"
                  {...register("bkashPhone", {
                    required: "Bkash number is required",
                    pattern: {
                      value: /^01[0-9]{9}$/,
                      message:
                        "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
                    },
                  })}
                  placeholder="01XXXXXXXXX"
                  className="w-full p-2 border rounded mt-1 font-tiro_bangla bg-white"
                />
                {errors.bkashPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bkashPhone.message}
                  </p>
                )}
              </label>

              <label className="block">
                Transaction ID *
                <input
                  type="text"
                  {...register("bkashTransactionId", {
                    required: "Transaction ID is required",
                  })}
                  placeholder="Enter transaction ID"
                  className="w-full p-2 border rounded mt-1 bg-white"
                />
                {errors.bkashTransactionId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bkashTransactionId.message}
                  </p>
                )}
              </label>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={placeOrderLoading}
          className={`w-full py-2 rounded cursor-pointer ${
            placeOrderLoading
              ? "bg-gray-400 cursor-not-allowed disabled"
              : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          {placeOrderLoading ? "Place Order.." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
