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

      {/* Practice Modules — Horizontal scroll cards */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            Practice Modules
          </h2>
          <p className="mt-2 text-sm text-gray-500">Choose a skill to start practicing</p>
        </div>
        <div className="mt-8 flex gap-5 overflow-x-auto px-4 pb-4 lg:px-8">
          {modules.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="group relative flex-none w-72 overflow-hidden rounded-2xl shadow-card-lg transition hover:shadow-card-hover"
            >
              {/* Colored top bar */}
              <div className={`${mod.color} px-6 py-5`}>
                <mod.icon className="h-8 w-8 text-white/90" />
                <h3 className="mt-3 text-lg font-bold text-white">{mod.title}</h3>
              </div>
              <div className="bg-white px-6 py-5">
                <p className="text-sm leading-6 text-gray-500">{mod.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                  Start now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg-slide2.jpg')" }} />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-12 sm:grid-cols-4 lg:px-8">
          {[
            { value: "10+", label: "Practice Tests" },
            { value: "16", label: "Writing Prompts" },
            { value: "6", label: "Listening Tests" },
            { value: "$0", label: "100% Free" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold text-white sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features — Alternating rows */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            Why IELTS PASS?
          </h2>
          <div className="mt-10 space-y-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`flex items-center gap-5 rounded-2xl p-5 transition hover:shadow-card ${
                  i % 2 === 0 ? "bg-primary-light" : "bg-gray-50"
                }`}
              >
                <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl text-white ${
                  i % 2 === 0 ? "bg-primary" : "bg-navy"
                }`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{feature.title}</h3>
                  <p className="mt-0.5 text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — Steps */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg-slide3.jpg')" }} />
        <div className="absolute inset-0 bg-white/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            How It Works
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { step: "01", title: "Pick a Module", desc: "Choose Reading, Listening, or Writing to practice." },
              { step: "02", title: "Practice Timed", desc: "Start the timer and complete under real exam conditions." },
              { step: "03", title: "Get Your Band", desc: "Submit and instantly see your raw score and IELTS band." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-extrabold text-white shadow-lg">
                  {item.step}
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Full-width image banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg-slide1.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/70" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to boost your IELTS score?
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
              Start practicing with real materials now. Track your progress across
              all four modules.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ielts"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-accent-dark"
            >
              Start Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ielts/calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Calculator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
