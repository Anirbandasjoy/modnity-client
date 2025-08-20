"use client";

import Loading from "@/components/layout/Home/shared/loading";
import PublicRoute from "@/components/layout/shared/PublicRouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHandleLoginMutation } from "@/redux/features/auth/authApi";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [setLoadingData, { isLoading }] = useHandleLoginMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormFocused, setIsFormFocused] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      await setLoadingData(loginInfo).unwrap();
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error login", error);
      toast.error(error?.data?.message || "Failure login");
    }
  };

  return (
    <PublicRoute>
      {isLoading && <Loading />}
      
      {/* Background with animated gradient */}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 right-10 w-24 h-24 bg-gradient-to-r from-yellow-200/30 to-amber-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
          <div className={`w-full max-w-md transition-all duration-500 ${isFormFocused ? 'scale-105' : 'scale-100'}`}>
            
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-ping"></div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-3">
                Welcome Back!
              </h1>
              <p className="text-gray-600 text-base px-4 leading-relaxed">
                Sign in to your account and continue your journey with us
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-amber-500/10 p-8 border border-white/20">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-600" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 pl-12 text-base"
                      onFocus={() => setIsFormFocused(true)}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1 px-2">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-600" />
                    Password
                  </label>
                  <div className="relative group">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 pl-12 pr-12 text-base"
                      onFocus={() => setIsFormFocused(true)}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters long",
                        },
                        onBlur: () => {
                          setIsFormFocused(false);
                        },
                      })}
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1 px-2">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                {/* Forgot Password Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600 text-sm">
                    Forgot your password?{" "}
                    <Link
                      href="/forgot-password"
                      className="text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
                    >
                      Reset it here
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Security Badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/40 shadow-sm">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-gray-700 font-medium">Secure & Protected</span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Bottom Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent backdrop-blur-sm md:hidden"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @media (max-width: 640px) {
          .min-h-screen {
            min-height: 100dvh;
          }
        }
      `}</style>
    </PublicRoute>
  );
};

export default Login;