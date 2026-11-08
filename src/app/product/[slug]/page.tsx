import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { IProduct } from "@/types/type";
import { unitNameBn } from "@/lib/utils";

const formatAvg = (n: number) =>
  n.toLocaleString(
    "bn-BD",
    Number.isInteger(n)
      ? {}
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  );

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  let product: IProduct | undefined;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      cache: "no-store",
    });
    const products: IProduct[] = await res.json();
    product = products.find((item) => item.slug === slug);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  if (!product) notFound();

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const diff = Math.abs(product.today - product.yesterday);
  const unitLabel = unitNameBn[product.unit] ?? product.unit;

  // avg of each market
  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);
  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
  const avgPrice = Math.round(
    rows.reduce((sum, m) => sum + m.avg, 0) / rows.length,
  );

  return (
    <main className="w-full py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
        {/* breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
          <Link href="/" className="hover:text-[#058a40]">
            হোম
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-[#058a40]"
          >
            {product.categoryNameBn}
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-900">{product.nameBn}</span>
        </div>

        {/* top card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
              {product.image}
            </div>
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {product.nameBn}
              </h1>

              {/* tags */}
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#058a40] text-xs font-semibold"
                >
                  {product.categoryNameBn}
                </Link>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  প্রতি {unitLabel}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600">
                গতকালের তুলনায় আজ দাম{" "}
                {isUp && (
                  <>
                    <span className="font-bold text-slate-900">বেড়েছে</span> ·{" "}
                    {diff.toLocaleString("bn-BD")} টাকা
                  </>
                )}
                {isDown && (
                  <>
                    <span className="font-bold text-slate-900">কমেছে</span> ·{" "}
                    {diff.toLocaleString("bn-BD")} টাকা
                  </>
                )}
                {!isUp && !isDown && (
                  <span className="font-bold text-slate-900">অপরিবর্তিত</span>
                )}
              </p>
            </div>
          </div>

          {/* today price */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl px-8 py-4 flex flex-col items-center text-center gap-0.5">
            <span className="text-xs text-slate-500 font-medium">
              আজকের দাম
            </span>
            <span className="text-3xl sm:text-4xl font-black text-slate-900">
              {product.today.toLocaleString("bn-BD")}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              টাকা / {unitLabel}
            </span>
            <span
              className={`mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isUp
                  ? "bg-[#fff1f2] text-[#e11d48]"
                  : isDown
                    ? "bg-[#ecfdf5] text-[#059669]"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {isUp && "▲ "}
              {isDown && "▼ "}
              {!isUp && !isDown && "— "}
              {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </span>
          </div>
        </div>

        {/* summary */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 space-y-5">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200/80 p-4 sm:p-5">
              <p className="text-xs text-slate-500 font-medium">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-[#058a40]">
                <span className="text-2xl sm:text-3xl font-extrabold">
                  {minPrice.toLocaleString("bn-BD")}
                </span>{" "}
                <span className="text-sm font-semibold">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 p-4 sm:p-5">
              <p className="text-xs text-slate-500 font-medium">সর্বাধিক দাম</p>
              <p className="mt-1 text-[#dc2626]">
                <span className="text-2xl sm:text-3xl font-extrabold">
                  {maxPrice.toLocaleString("bn-BD")}
                </span>{" "}
                <span className="text-sm font-semibold">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 p-4 sm:p-5">
              <p className="text-xs text-slate-500 font-medium">গড় দাম</p>
              <p className="mt-1 text-[#058a40]">
                <span className="text-2xl sm:text-3xl font-extrabold">
                  {avgPrice.toLocaleString("bn-BD")}
                </span>{" "}
                <span className="text-sm font-semibold">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                প্রতি {unitLabel}-এর হিসাবে
              </p>
            </div>
          </div>

          {/* market table */}
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 pt-2">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-200/80">
            <table className="w-full min-w-[560px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-xs font-semibold text-slate-500">
                  <th className="py-3 px-4">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4 text-right">সর্বনিম্ন</th>
                  <th className="py-3 px-4 text-right">সর্বাধিক</th>
                  <th className="py-3 px-4 text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {rows.map((m) => (
                  <tr key={m.market}>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {m.market}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{m.division}</td>
                    <td className="py-3.5 px-4 text-right text-slate-700">
                      {m.min.toLocaleString("bn-BD")} টাকা
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-700">
                      {m.max.toLocaleString("bn-BD")} টাকা
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      {formatAvg(m.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;