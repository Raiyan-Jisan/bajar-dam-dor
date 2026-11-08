"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/type";

export default function AllProductsSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: IProduct[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading all products data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <section id="সব-পণ্য" className="w-full py-8 scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          সব পণ্য
        </h2>
        {!loading && (
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        )}

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? [...Array(9)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-32 rounded-2xl bg-slate-200/60 animate-pulse"
                />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
}