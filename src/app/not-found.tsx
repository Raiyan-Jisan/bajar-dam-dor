import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
      <span className="text-6xl block">🛒</span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="text-sm text-slate-500 max-w-md mx-auto">
        আপনি যে ঠিকানাটি খুঁজছেন সেটি সঠিক নয় অথবা সরিয়ে নেওয়া হয়েছে।
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#058a40] hover:bg-[#047a38] text-white font-bold rounded-xl text-sm shadow-md transition-colors"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}