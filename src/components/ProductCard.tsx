"use client";

import React from "react";
import { Card, Chip } from "@heroui/react";
import Link from "next/link";
import { IProduct } from "@/types/type";
import { unitNameBn } from "@/lib/utils";

export default function ProductCard({ product }: { product: IProduct }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link href={`/product/${product.slug}`} className="block h-full group">
      <Card className="h-full p-5 rounded-2xl bg-white border border-slate-200/80 shadow-none hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-emerald-200 transition-all">
        <Card.Content className="p-0 flex flex-col gap-4">
          {/* Top: Emoji, Name & Unit */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0">
              {product.image}
            </div>

            <div className="flex flex-col">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#058a40] transition-colors leading-snug">
                {product.nameBn}
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                প্রতি {unitNameBn[product.unit] ?? product.unit}
              </span>
            </div>
          </div>

          {/* Bottom: Today's Price & Change Badge */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] text-slate-400 font-medium">
                আজকের দাম
              </span>
              <span className="text-xl font-extrabold text-slate-900">
                {product.today.toLocaleString("bn-BD")} টাকা
              </span>
            </div>

            <Chip
              size="sm"
              className={`px-2.5 py-0.5 h-6 rounded-full text-xs font-bold flex items-center gap-1 border ${
                isUp
                  ? "bg-[#fff1f2] text-[#e11d48] border-[#ffe4e6]"
                  : isDown
                    ? "bg-[#ecfdf5] text-[#059669] border-[#d1fae5]"
                    : "bg-slate-100 text-slate-600 border-slate-200"
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
            </Chip>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
}