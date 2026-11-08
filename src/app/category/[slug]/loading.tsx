import React from "react";

const loading = () => {
  return (
    <main className="w-full py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5 animate-pulse">
        {/* Category Skeleton*/}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex items-center gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-200/80 shrink-0" />
          <div className="flex flex-col gap-2.5 w-full">
            <div className="h-7 w-28 bg-slate-200 rounded-lg" />
            <div className="h-4 w-56 bg-slate-200/70 rounded-md" />
          </div>
        </div>

        {/* Sorting Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 px-5 py-3 flex justify-end">
          <div className="h-9 w-40 bg-slate-200/80 rounded-xl" />
        </div>

        {/* Card Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="h-32 rounded-2xl bg-slate-200/60"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default loading;