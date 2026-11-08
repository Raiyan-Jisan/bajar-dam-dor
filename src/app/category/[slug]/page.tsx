import CategoryProducts from "../../../components/CategoryProducts";
import { ICategory, IProduct } from "@/types/type";
import { notFound } from "next/navigation";
import React from "react";

const CategoryDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const resCat = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`,
  );
  if (!resCat.ok) notFound();
  const category: ICategory = await resCat.json();
  if (!category?.nameBn) notFound();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?category=${slug}`,
  );
  const data = await res.json();
  const products: IProduct[] = Array.isArray(data) ? data : [];

  return (
    <main className="w-full py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
        {/* ক্যাটাগরি ব্যানার */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex items-center gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {category.icon}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {category.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </div>

        <CategoryProducts products={products} />
      </div>
    </main>
  );
};

export default CategoryDetailsPage;