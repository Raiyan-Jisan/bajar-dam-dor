import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Marque from "@/components/Marque";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body
        className={`${hindSiliguri.className} min-h-full flex flex-col bg-[#f3f6f2]`}
      >
        <Navbar />
        <Marque />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}