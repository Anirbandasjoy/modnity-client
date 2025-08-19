import AboutUs from "@/components/layout/Home/Home/AboutUs/AboutUs";
import Banner from "@/components/layout/Home/Home/Banner/Banner";
import FeaturedProduct from "@/components/layout/Home/Home/FeaturedProduct/FeaturedProduct";
// import Review from "@/components/layout/Home/Home/Review/Review";
import Stats from "@/components/layout/Home/Home/Stats/Stats";

export default function Page() {
  return (
    <div className="">
      <Banner />
      <Stats />
      <FeaturedProduct />
      <AboutUs />
      {/* <Review /> */}
    </div>
  );
}
