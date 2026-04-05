"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = "/home";
  }

  return (
    <main className="relative flex min-h-screen">
      {/* Background image - full page */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-[2px]" />

      {/* Login card - centered */}
      <div className="relative z-10 m-auto w-full max-w-sm px-4">
        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-3 text-2xl font-extrabold text-white">
            IELTS <span className="text-red-400">PASS</span>
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.1]"
              />
            </div>

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
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] text-white/30">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <Link
            href="/home"
            className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.1]"
          >
            Continue as Guest
          </Link>
        </div>

        <p className="mt-4 text-center text-[11px] text-white/30">
          Free IELTS General Training Practice
        </p>
      </div>
    </main>
  );
}
