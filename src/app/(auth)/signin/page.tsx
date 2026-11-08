"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const socialBtnClass =
  "min-w-0 w-full h-11 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2";

export default function SignInPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "required") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    setLoading(true);
    const { error } = await signIn.email({
      email: data.email as string,
      password: data.password as string,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন ইন করা যায়নি");
      return;
    }

    toast.success("সাইন ইন সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  const handleGithubSignIn = async () => {
    await signIn.social({ provider: "github", callbackURL: "/" });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
          সাইন ইন
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <Card className="w-full max-w-[440px] p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 bg-white">
        <Card.Content className="flex flex-col gap-5 p-0">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs sm:text-sm font-medium text-slate-700">
                ইমেইল
              </Label>
              <Input
                placeholder="you@example.com"
                className="w-full h-11 px-3.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:outline-none transition-colors"
              />
              <FieldError className="text-xs text-red-500" />
            </TextField>

            <TextField
              name="password"
              type={isVisible ? "text" : "password"}
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs sm:text-sm font-medium text-slate-700">
                পাসওয়ার্ড
              </Label>
              <div className="relative flex items-center">
                <Input
                  placeholder="আপনার পাসওয়ার্ড"
                  className="w-full h-11 px-3.5 pr-10 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  aria-label="পাসওয়ার্ড দেখান/লুকান"
                >
                  {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            <Button
              type="submit"
              isDisabled={loading}
              className="w-full h-11 mt-1 rounded-xl bg-[#058a40] hover:bg-[#047a38] text-white font-semibold text-sm shadow-sm transition-colors"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </Button>
          </Form>

          <div className="w-full flex items-center gap-3 my-1">
            <Separator className="flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">অথবা</span>
            <Separator className="flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              type="button"
              onPress={handleGoogleSignIn}
              className={socialBtnClass}
            >
              <FcGoogle size={18} />
              <span>Google</span>
            </Button>
            <Button
              type="button"
              onPress={handleGithubSignIn}
              className={socialBtnClass}
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs sm:text-sm text-slate-500">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/signup"
                className="text-[#058a40] font-semibold hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </div>
        </Card.Content>
      </Card>

      <div className="mt-6">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors text-xs sm:text-sm"
        >
          <ArrowLeft size={14} />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}