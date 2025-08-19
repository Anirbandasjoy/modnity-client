import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Roboto,
  Montserrat,
  Caladea,
  Tiro_Bangla,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxWrapper from "@/redux/ReduxWrapper";
// import TawkToChat from "@/components/TawkToChat";
// import CallButton from "@/components/layout/Home/shared/CallButton";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageViewTracker } from "@/components/GTMPageViewTracker";
import RightClickDisable from "@/components/RightClickDisable";
// import FacebookMessengerButton from "@/components/layout/Home/shared/MessengerChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tiro_bangla = Tiro_Bangla({
  variable: "--font-tiro_bangla",
  weight: ["400"],
  subsets: ["latin"],
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const caladea = Caladea({
  variable: "--font-caladea",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Borkotmoy Ponno",
  description:
    "Borkotmoy Ponno is an e-commerce platform that specializes in selling organic and natural products, including food items, cosmetics, and household goods. The platform aims to provide customers with high-quality, eco-friendly products sourced from trusted suppliers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />

      <ReduxWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className} ${roboto.variable} ${caladea.variable} ${tiro_bangla.variable} antialiased `}
        >
          <GTMPageViewTracker />
          <RightClickDisable />
          <main>{children}</main>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="">
            {/* <FacebookMessengerButton />
            <CallButton />
            <TawkToChat /> */}
          </div>
        </body>
      </ReduxWrapper>
    </html>
  );
}

// cartcard
// carttable
