"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  ProgressCircle,
  Separator,
} from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { ICategory } from "@/types/type";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { data, isPending } = useSession();

  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.success("সাইন আউট সম্পন্ন হয়েছে");
    router.push("/");
  };

  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Row: Brand & Auth Buttons */}
        <div className="flex items-center justify-between py-3.5">
          {/* Left: Logo & Date */}
          <Link href="/" className="flex items-center gap-3 w-fit">
            <span
              className="w-10 h-10 rounded-xl bg-[#058a40] flex items-center justify-center text-xl"
              role="img"
              aria-label="cart"
            >
              🛒
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                বাজার দর
              </span>
              <span
                suppressHydrationWarning
                className="text-xs text-slate-500 font-medium"
              >
                {formattedDate}
              </span>
            </div>
          </Link>

          {/* Right: Auth Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isPending ? (
              <ProgressCircle aria-label="Loading" value={60}>
                <ProgressCircle.Track>
                  <ProgressCircle.TrackCircle />
                  <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
              </ProgressCircle>
            ) : data?.user.name ? (
              <Dropdown>
                <Button
                  aria-label="Menu"
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Avatar>
                    <Avatar.Image
                      alt={data.user.name}
                      src={data.user.image ?? undefined}
                    />
                    <Avatar.Fallback>
                      {data.user.name[0].toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {data.user.name.split(" ")[0]}
                  </span>
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu>
                    <Dropdown.Item id="profile" textValue="আমার প্রোফাইল">
                      <Link href="/profile">আমার প্রোফাইল</Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="sign-out" textValue="সাইন আউট">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="text-red-600 font-medium"
                      >
                        সাইন আউট
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link href="/signin">
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-9 px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#058a40] transition-colors"
                  >
                    সাইন ইন
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    type="button"
                    variant="primary"
                    className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-[#058a40] hover:bg-[#047a38] text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
                  >
                    সাইন আপ
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Middle Divider */}
        <Separator className="w-full bg-slate-100" />

        {/* Bottom Row: Category Navigation */}
        <nav
          aria-label="Category Navigation"
          className="flex items-center gap-2 sm:gap-3 py-2.5 overflow-x-auto"
        >
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap px-3.5 py-1.5 rounded-xl transition-colors ${
                  isActive
                    ? "bg-[#058a40] text-white font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}