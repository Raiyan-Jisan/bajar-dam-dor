"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { IProduct } from "@/types/type";
import { unitNameBn } from "@/lib/utils";

export default function Marque() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data: IProduct[] = await res.json();
        setProducts(data.filter((item) => item.change.dir !== "flat"));
      } catch (error) {
        console.error("Error loading ticker data:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white border-b border-slate-200 h-11 flex items-center overflow-hidden">
      <Marquee pauseOnHover={true} speed={45} gradient={false}>
        {products.map((item) => {
          const isUp = item.change.dir === "up";

          return (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex items-center gap-2 px-5 border-r border-slate-200 whitespace-nowrap text-xs sm:text-sm"
            >
              <span className="text-base leading-none">{item.image}</span>
              <span className="font-semibold text-slate-900">
                {item.nameBn}
              </span>
              <span className="text-slate-500">
                {item.today.toLocaleString("bn-BD")} টাকা/
                {unitNameBn[item.unit] ?? item.unit}
              </span>
              <span
                className={`font-bold ${
                  isUp ? "text-[#e11d48]" : "text-[#059669]"
                }`}
              >
                {isUp ? "▲" : "▼"}{" "}
                {Math.abs(item.change.pct).toLocaleString("bn-BD", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
                %
              </span>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}