"use client";

import React, { useState } from "react";
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
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      setPasswordError("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    setLoading(true);
    const { data: resData, error } = await signUp.email({
      email: data.email as string,
      password: data.password as string,
      name: data.name as string,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন আপ করা যায়নি");
      return;
    }

    if (resData?.user.name) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
      router.push("/signin");
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await signIn.social({ provider, callbackURL: "/" });
  };

  const inputClass =
    "w-full h-11 px-3.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#058a40] focus:outline-none transition-colors";

  const socialBtnClass =
    "w-full min-w-0 h-11 px-2 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-none transition-colors";

  return (
    <div className="w-full flex flex-col items-center py-10 px-4">
      
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <Card className="w-full max-w-[440px] p-5 sm:p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 bg-white">
        <Card.Content className="flex flex-col gap-5">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <TextField
              name="name"
              type="text"
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs sm:text-sm font-medium text-slate-700">
                নাম
              </Label>
              <Input placeholder="যেমন: রহিম উদ্দিন" className={inputClass} />
              <FieldError className="text-xs text-red-500" />
            </TextField>

           
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs sm:text-sm font-medium text-slate-700">
                ইমেইল
              </Label>
              <Input placeholder="you@example.com" className={inputClass} />
              <FieldError className="text-xs text-red-500" />
            </TextField>

            
            <TextField
              name="password"
              type={isVisible ? "text" : "password"}
              minLength={8}
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs sm:text-sm font-medium text-slate-700">
                পাসওয়ার্ড
              </Label>
              <div className="relative flex items-center">
                <Input
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            <TextField
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
              isRequired
              isInvalid={!!passwordError}
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs sm:text-sm font-medium text-slate-700">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>
              <Input placeholder="আবার লিখুন" className={inputClass} />
              {passwordError ? (
                <span className="text-xs text-red-500">{passwordError}</span>
              ) : (
                <FieldError className="text-xs text-red-500" />
              )}
            </TextField>

            
            <Button
              type="submit"
              variant="primary"
              isDisabled={loading}
              className="w-full h-11 mt-1 rounded-xl bg-[#058a40] hover:bg-[#047a38] text-white font-semibold text-sm shadow-sm transition-colors"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </Form>

          
          <div className="w-full flex items-center gap-3">
            <Separator className="flex-1 bg-slate-100" />
            <span className="text-xs text-slate-400 font-medium">অথবা</span>
            <Separator className="flex-1 bg-slate-100" />
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              variant="outline"
              className={socialBtnClass}
            >
              <FcGoogle size={18} />
              <span>Google দিয়ে চালিয়ে যান</span>
            </Button>
            <Button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              variant="outline"
              className={socialBtnClass}
            >
              <FaGithub size={18} />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </Button>
          </div>
        </Card.Content>

        <Card.Footer className="flex justify-center pt-4 text-xs sm:text-sm">
          <p className="text-slate-500">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="text-[#058a40] font-semibold hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </Card.Footer>
      </Card>

      
      <Link
        href="/"
        className="mt-6 flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors text-xs"
      >
        <ArrowLeft size={14} />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}