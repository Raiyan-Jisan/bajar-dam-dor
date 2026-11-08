"use client";

import { IProduct } from "@/types/type";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

const CategoryProducts = ({ products }: { products: IProduct[] }) => {
  const [sortBy, setSortBy] = useState<string>("default");

  const sortedProducts = [...products];
  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200/80 px-4 sm:px-5 py-3 flex items-center justify-end gap-3">
        <span className="text-xs sm:text-sm font-medium text-slate-500">
          সাজান
        </span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl pl-3 pr-9 py-2 focus:outline-none focus:border-[#058a40] cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-500 font-medium">
        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4">
          <p className="text-slate-500 font-medium">
            এই ক্যাটাগরিতে কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#058a40] hover:bg-[#047a38] text-white font-bold rounded-xl text-sm transition-colors"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedProducts.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;