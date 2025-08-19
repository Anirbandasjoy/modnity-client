import Footer from "@/components/layout/Home/shared/Footer";
import Navbar from "@/components/layout/Home/shared/Navbar";
import Topbar from "@/components/layout/Home/shared/Topbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F5F5F5] text-[#1A1A1A]">
      <Topbar />
      <div className=" max-w-7xl mx-auto">
        <Navbar />
        <div className="min-h-[50vh]">{children}</div>

        
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.05),transparent)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.03),transparent)] pointer-events-none" />

          <Footer />
        </div>
     
    </div>
  );
}
