"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useState(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-black p-4">
      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-4 left-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center z-20"
        aria-label="Back to home"
      >
        <ArrowLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
      </Link>
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 z-20"
      >
        {mounted && theme === "dark" ? (
          <Sun className="h-6 w-6 text-gray-300" />
        ) : (
          <Moon className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Main Content */}
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link href="/" className="flex items-center gap-3 font-bold text-2xl focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0 active:ring-0" tabIndex={0} style={{boxShadow:'none'}}>
            <div className="size-12 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xl">
              A
            </div>
            <span
              className="text-2xl font-extrabold bg-gradient-to-r from-[#00b3c6] via-[#4f5ac8] via-40% to-[#ff3366] to-80% bg-clip-text text-transparent select-none"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #00b3c6 0%, #4f5ac8 40%, #ff3366 80%, #ff5e62 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AD<span className="font-extrabold">MY</span>BRAND
            </span>
          </Link>
        </div>

        {/* Sign In Form */}
        <div className="bg-gray-50 dark:bg-black p-8 rounded-2xl shadow-lg">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Sign in to your ADmyBRAND account
              </p>
            </div>

            {/* Google Sign In */}
            <Button
              variant="outline"
              className="w-full py-6 border-2 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-transparent text-gray-500 dark:text-gray-400 relative z-10 px-2 bg-white dark:bg-[#18181b]">
            OR CONTINUE WITH
          </span>
        </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full bg-white dark:bg-[#18181b] rounded-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                  Password
                </label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-white dark:bg-[#18181b] rounded-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button className="w-full bg-[#ff1f57] hover:bg-[#ff3366] text-white rounded-full">
              Sign In
            </Button>

            <div className="text-center text-sm">
              <p className="text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/get-started"
                  className="text-[#ff3366] hover:text-[#ff1f57] font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
