"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function HeroSection() {
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="w-full pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 px-6 sm:px-10 py-8 sm:py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          {/* Left Column: Text Content & CTA */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <span
              suppressHydrationWarning
              className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#058a40] text-xs sm:text-sm font-semibold mb-4"
            >
              {formattedDate}
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link href="/#সব-পণ্য" className="mt-6">
              <Button
                type="button"
                variant="primary"
                className="h-11 px-6 rounded-xl bg-[#058a40] hover:bg-[#047a38] text-white font-semibold text-sm shadow-sm transition-colors"
              >
                সব পণ্য দেখুন
              </Button>
            </Link>
          </div>

          {/* Right Column: Hero Image */}
          <Image
            src="/bazar-hero.png"
            alt="সবজির ঝুড়ি"
            width={315}
            height={263}
            priority
            className="w-56 sm:w-72 h-auto shrink-0"
          />
        </div>
      </div>
    </section>
  );
}