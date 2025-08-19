"use client";

import Loading from "@/components/layout/Home/shared/loading";
import PublicRoute from "@/components/layout/shared/PublicRouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHandleForgotPasswordMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

const ForgotPassword = () => {
  const [setForgotPasswordData, { isLoading }] =
    useHandleForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const userInfo = {
      email: data.email,
    };

    try {
      await setForgotPasswordData(userInfo).unwrap();
      toast.success("Forgot password Check your email");
    } catch (error: any) {
      console.error("Error login", error);

      toast.error(error?.data?.message || "failed Forgot Password");
    }
  };


  return (
    <PublicRoute>
      {isLoading && <Loading />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-green-600 text-center mb-4">
            Forgot Your Password
          </h2>
          <p className="text-gray-500 text-center text-[14px] mb-6 mt-1">
            Enter your email below to Forgot in your account password
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs ml-1 text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 mt-5"
              >
                Send Email
              </Button>
            </div>
          </form>
          <div className="text-center mt-2">
            <p className="text-[12px] text-gray-500">
              Back to Login?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default ForgotPassword;
