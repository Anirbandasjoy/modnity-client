import React from "react";
import { AboutBreadcrumb } from "./AboutBreadcrumb/AboutBreadcrumb";
import AboutUs from "@/components/layout/Home/Home/AboutUs/AboutUs";

export default function page() {
  return (
    <div>
      <AboutBreadcrumb />
      <AboutUs />
    </div>
  );
}
