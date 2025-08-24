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
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageViewTracker } from "@/components/GTMPageViewTracker";
import RightClickDisable from "@/components/RightClickDisable";

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
  title: "Modnity | Ornament Shop",
  description:
    "Modnity is your trusted ornament shop offering elegant, handcrafted jewelry and timeless accessories. Perfect for adding beauty and style to every occasion.",

  keywords: [
    "ornaments",
    "jewelry",
    "handmade jewelry",
    "bangles",
    "necklaces",
    "earrings",
    "Modnity ornament shop",
  ],

  authors: [{ name: "Modnity" }],
  creator: "Modnity",
  publisher: "Modnity",

  openGraph: {
    title: "Modnity | Ornament Shop",
    description:
      "Discover timeless ornaments and elegant jewelry at Modnity. Shop handcrafted pieces that bring beauty, tradition, and modern style together.",
    url: "https://modnity.com",
    siteName: "Modnity",
    images: [
      {
        url: "https://i.ibb.co.com/0Vr4fNz5/main-Image-1.webp",
        width: 1200,
        height: 630,
        alt: "Modnity Ornaments",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Modnity | Ornament Shop",
    description:
      "Shop elegant, handcrafted ornaments and jewelry from Modnity. Perfect for every occasion.",
    images: ["https://i.ibb.co.com/0Vr4fNz5/main-Image-1.webp"],
    creator: "@modnity",
  },

  metadataBase: new URL("https://modnity.com"),
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
          className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className} ${roboto.variable} ${caladea.variable} ${tiro_bangla.variable} antialiased  `}
        >
          <GTMPageViewTracker />
          <RightClickDisable />
          <main>{children}</main>
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </ReduxWrapper>
    </html>
  );
}

// cartcard
// carttable
