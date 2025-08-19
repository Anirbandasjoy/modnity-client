import React from "react";
import { CheckCircle, Phone, Leaf, Shield, Heart, Award } from "lucide-react";

export default function ReliableOrganicStore() {
  const features = [
    {
      title: "সুস্থ ও প্রাকৃতিক খাবার, স্বাস্থ্যসচেতনদের জন্য",
    },
    {
      title: "প্রতিদিনের তাজা ও গুণগতমানসম্পন্ন পণ্যের নিশ্চয়তা।",
    },
    {
      title: "রোগপ্রতিরোধে সহায়ক ভেষজ উপাদানসমূহ।",
    },
    {
      title: "বিজ্ঞানসম্মত প্যাকেজিং ও সঠিক সংরক্ষণ।",
    },
    {
      title: "বিশ্বস্ত উৎস থেকে সংগ্রহ করা অরগানিক খাদ্য।",
    },
    {
      title: "সহজ অনলাইন অর্ডার ও দ্রুত হোম ডেলিভারি।",
    },
    {
      title: "পরিবেশবান্ধব ও টেকসই কৃষি পণ্যের সমাহার।",
    },
  ];

  const stats = [
    { icon: Shield, label: "১০০% নিরাপদ", value: "Certified" },
    { icon: Leaf, label: "অর্গানিক", value: "Pure" },
    { icon: Heart, label: "স্বাস্থ্যকর", value: "Natural" },
    { icon: Award, label: "গুণগত মান", value: "Premium" },
  ];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 px-[5%] py-16 lg:py-24"
      style={{ fontFamily: "SolaimanLipi" }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-100 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row-reverse gap-8 lg:gap-10 ">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1 flex-1">
            {/* Stats Grid */}

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-4 py-10 sm:py-[72px] bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-2">
                      <IconComponent className="w-6 h-6 text-gray-200" />
                    </div>
                    <div className="text-lg text-gray-500 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xl font-medium text-gray-800">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-base text-gray-600">
                <Shield className="w-4 h-4 text-green-500" />
                <span>নিরাপদ ডেলিভারি</span>
              </div>
              <div className="flex items-center space-x-2 text-base text-gray-600">
                <Heart className="w-4 h-4 text-red-500" />
                <span>স্বাস্থ্য গ্যারান্টি</span>
              </div>
              <div className="flex items-center space-x-2 text-base text-gray-600">
                <Award className="w-4 h-4 text-amber-500" />
                <span>প্রিমিয়াম মান</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className="order-1 lg:order-2 space-y-3 flex-1 font-tiro_bangla"
            style={{ fontFamily: "SolaimanLipi" }}
          >
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-forest-green text-gray-200 px-4 py-2 rounded-full text-sm font-medium">
                <Leaf className="w-4 h-4" />
                <span>প্রাকৃতিক ও বিশুদ্ধ</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-forest-green">১০০% নির্ভরযোগ্য</span>
                <br />
                <span className="text-gray-800">অর্গানিক ফুড স্টোর</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                প্রকৃতির সেরা উপহার আপনার দোরগোড়ায়। স্বাস্থ্যকর জীবনযাত্রার
                জন্য বেছে নিন আমাদের ১০০% অর্গানিক পণ্য।
              </p>
            </div>

            {/* Features */}
            <div className="space-y-1">
              {features.map((feature, index) => (
                <div className="flex items-start space-x-2" key={index}>
                  <div className="flex-shrink-0 w-4 h-4 bg-forest-green rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-3 h-3 text-white " />
                  </div>
                  <p className="text-gray-800">{feature.title}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="tel:+8801860986633"
                className="inline-flex items-center space-x-3 bg-gradient-to-r bg-forest-green hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium font-montserrat">
                    +8801342-106348
                  </div>
                </div>
              </a>
            </div>

            {/* Trust Indicators */}
          </div>
        </div>
      </div>
    </section>
  );
}
