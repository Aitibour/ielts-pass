"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  UserPlus,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = "/home";
  }

  return (
    <main className="relative flex min-h-[calc(100vh-72px)] flex-1 items-center justify-center overflow-hidden">
      {/* Full-page background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-login.svg')" }}
      />

      {/* Animated floating orbs */}
      <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute bottom-[10%] right-[15%] h-96 w-96 rounded-full bg-ielts-green/15 blur-[120px]" />
      <div className="absolute right-[30%] top-[10%] h-48 w-48 rounded-full bg-accent/10 blur-[80px]" />

      <div className="relative z-10 mx-auto w-full max-w-md px-4 py-12">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
            IELTS <span className="text-red-400">PASS</span>
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Free IELTS General Training Practice Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-white">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="mt-1 text-sm text-white/50">
              {isSignUp
                ? "Start your IELTS preparation journey"
                : "Sign in to continue practicing"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                  Full Name
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.06] py-3 pl-11 pr-4 text-sm font-medium text-white outline-none transition placeholder:text-white/25 focus:border-primary/50 focus:bg-white/[0.1] focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] py-3 pl-11 pr-4 text-sm font-medium text-white outline-none transition placeholder:text-white/25 focus:border-primary/50 focus:bg-white/[0.1] focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] py-3 pl-11 pr-12 text-sm font-medium text-white outline-none transition placeholder:text-white/25 focus:border-primary/50 focus:bg-white/[0.1] focus:ring-1 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white/60"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white/50">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-white/20 bg-white/10"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="font-medium text-primary transition hover:text-primary-dark"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-accent-dark"
            >
              <LogIn className="h-4 w-4" />
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-medium text-white/30">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google / Guest */}
          <div className="space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.08]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
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
            </button>

            <Link
              href="/home"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.08]"
            >
              Continue as Guest
            </Link>
          </div>

          {/* Toggle Sign Up / Sign In */}
          <p className="mt-6 text-center text-sm text-white/40">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-primary transition hover:text-primary-dark"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-white/30">
          Free platform for IELTS General Training preparation
        </p>
      </div>
    </main>
  );
}
