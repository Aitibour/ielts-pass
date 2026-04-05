"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  FilePenLine,
  Headphones,
  NotebookPen,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react";

const heroSlides = [
  "/bg-login.jpg",
  "/bg-slide1.jpg",
  "/bg-slide2.jpg",
  "/bg-slide3.jpg",
  "/bg-slide4.jpg",
  "/bg-slide5.jpg",
];

const modules = [
  {
    title: "Reading Simulator",
    description:
      "Practice with a real General Reading paper. 40 questions, 60-minute countdown, and instant band score calculation.",
    href: "/ielts",
    icon: BookOpen,
    color: "bg-primary",
    lightBg: "bg-primary-light",
    tag: "Reading",
  },
  {
    title: "Listening Practice",
    description:
      "6 full listening tests with original audio, question PDFs, and answer keys sourced from IELTS Fever.",
    href: "/ielts/listening",
    icon: Headphones,
    color: "bg-ielts-listening",
    lightBg: "bg-purple-50",
    tag: "Listening",
  },
  {
    title: "Writing Task 1",
    description:
      "General Training letter-writing prompts with a 20-minute timer, live word counter, and browser auto-save.",
    href: "/ielts/writing",
    icon: FilePenLine,
    color: "bg-accent",
    lightBg: "bg-accent-light",
    tag: "Writing",
  },
  {
    title: "Writing Task 2",
    description:
      "Essay prompts for General Training Task 2 with a 40-minute timer and 250-word minimum target.",
    href: "/ielts/writing/task-2",
    icon: NotebookPen,
    color: "bg-ielts-green",
    lightBg: "bg-emerald-50",
    tag: "Writing",
  },
  {
    title: "Score Calculator",
    description:
      "Enter raw scores for all four modules and get your estimated overall IELTS band instantly.",
    href: "/ielts/calculator",
    icon: Calculator,
    color: "bg-navy",
    lightBg: "bg-slate-50",
    tag: "Tools",
  },
];

const features = [
  {
    icon: Timer,
    title: "Timed Practice",
    description: "Real exam conditions with countdown timers for every module.",
  },
  {
    icon: CheckCircle2,
    title: "Instant Marking",
    description:
      "Submit your answers and see results immediately with band score mapping.",
  },
  {
    icon: Target,
    title: "Real Test Papers",
    description:
      "Practice with authentic IELTS materials sourced from trusted resources.",
  },
  {
    icon: Zap,
    title: "Auto-Save",
    description:
      "Your progress is saved in your browser. Pick up right where you left off.",
  },
  {
    icon: TrendingUp,
    title: "Band Calculation",
    description:
      "Official IELTS band score conversion tables for accurate results.",
  },
  {
    icon: Award,
    title: "All 4 Modules",
    description:
      "Reading, Listening, Writing, and Speaking score tracking in one place.",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Sliding backgrounds */}
        {heroSlides.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${src}')`,
              opacity: i === currentSlide ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-navy/75" />

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ace Your IELTS
              <br />
              <span className="text-red-300">General Training</span> Exam
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/70">
              Practice with real test materials. Timed exercises, instant
              marking, and band score calculation — completely free.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/ielts"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-accent-dark"
              >
                Start Practicing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ielts/calculator"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Score Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Modules */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg-login.jpg')" }} />
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <BookOpen className="h-3.5 w-3.5" />
              Practice Modules
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Everything You Need to Prepare
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-500">
              Five focused modules covering all IELTS General Training skills.
              Each module includes real test materials, timers, and instant
              results.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-card transition duration-300 hover:border-gray-300 hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${mod.color} text-white shadow-lg`}
                  >
                    <mod.icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`rounded-full ${mod.lightBg} px-3 py-1 text-xs font-semibold text-gray-600`}
                  >
                    {mod.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900 group-hover:text-primary">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {mod.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                  Start now
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg-login.jpg')" }} />
        <div className="absolute inset-0 bg-gray-50/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Zap className="h-3.5 w-3.5" />
              Platform Features
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Built for Real IELTS Success
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-gray-100 bg-gray-50 p-7 transition hover:border-gray-200 hover:bg-white hover:shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg-login.jpg')" }} />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to Start Preparing?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/65">
            Jump straight into practice with real IELTS General Training
            materials. No sign-up required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ielts"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-accent-dark"
            >
              Start Reading Practice
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ielts/listening"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
            >
              Try Listening Tests
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
