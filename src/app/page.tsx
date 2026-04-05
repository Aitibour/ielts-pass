"use client";

import { useState } from "react";
import { BookOpen, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = "/home";
  }

  function handleGoogle() {
    window.location.href = "/home";
  }

  return (
    <main className="relative flex min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-login.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-[2px]" />

      {/* Card */}
      <div className="relative z-10 m-auto w-full max-w-sm px-4">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-3 text-2xl font-extrabold text-white">
            IELTS <span className="text-red-400">PASS</span>
          </h1>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-4 text-center text-lg font-bold text-white">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] py-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.12]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Gmail
          </button>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] text-white/30">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.1]"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.1]"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 pr-11 text-sm text-white outline-none placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.1]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-accent-dark"
            >
              {isSignUp ? (
                <>
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-white/40">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-primary hover:text-primary-dark"
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </button>
          </p>
        </div>

        <p className="mt-4 text-center text-[11px] text-white/30">
          Free IELTS General Training Practice
        </p>
      </div>
    </main>
  );
}
