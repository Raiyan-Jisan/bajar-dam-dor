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
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    const { data: resData, error } = await signIn.email({
      email: data.email as string,
      password: data.password as string,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message as string);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  const handleGithubSignIn = async () => {
    await signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-4">
      {/* Top Header outside card */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
          সাইন ইন
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <Card className="w-full max-w-[440px] p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 bg-white">
        {/* Main Form & Social Section */}
        <Card.Content className="flex flex-col gap-5 p-0">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs sm:text-sm font-medium text-slate-700">
                ইমেইল
              </Label>
              <div className="relative flex items-center">
                <Input
                  placeholder="you@example.com"
                  className="w-full h-11 px-3.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:outline-none transition-colors"
                />
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Password Field */}
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
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="w-full h-11 px-3.5 pr-10 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:outline-none transition-colors"
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

            {/* Submit Button (Green) */}
            <Button
              type="submit"
              className="w-full h-11 mt-1 rounded-xl bg-[#15803d] hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-colors"
            >
              সাইন ইন
            </Button>
          </Form>

          {/* Separator with "অথবা" */}
          <div className="w-full flex items-center gap-3 my-1">
            <Separator className="flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">অথবা</span>
            <Separator className="flex-1 bg-slate-200" />
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-2.5">
            {/* Google Login Button */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm shadow-none transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google দিয়ে চালিয়ে যান</span>
            </Button>

            {/* GitHub Login Button */}
            <Button
              type="button"
              onClick={handleGithubSignIn}
              className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm shadow-none transition-colors"
            >
              <svg className="w-4 h-4 shrink-0 fill-current text-slate-900" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </Button>
          </div>

          {/* Sign Up Redirect */}
          <div className="text-center pt-2">
            <p className="text-xs sm:text-sm text-slate-500">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/signup"
                className="text-emerald-600 font-semibold hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </div>
        </Card.Content>
      </Card>

      {/* Back to Home Footer */}
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