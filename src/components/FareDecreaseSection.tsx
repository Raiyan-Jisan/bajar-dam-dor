"use client";

import { IProduct } from "@/types/type";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const FareDecreaseSection = () => {
  const [topDecreased, setTopDecreased] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data: IProduct[] = await res.json();
        const filteredData = data
          .filter((item) => item.change.dir === "down")
          .sort((a, b) => a.change.pct - b.change.pct)
          .slice(0, 6);
        setTopDecreased(filteredData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      } 
    };
    fetchProducts();
  }, []);

  return (
    <section className="w-full py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2 mb-5">
          <span className="text-[#059669] text-base">▼</span>
          <span>আজ দাম কমেছে</span>
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="h-32 rounded-2xl bg-slate-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topDecreased.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FareDecreaseSection;