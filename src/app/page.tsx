"use client";

import Link from "next/link";
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
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MmgtNHYtMnptMC04aDR2Mmg0di0yem0wIDh2LTRoMnY0aC0yem0tOC04aDR2Mmg0di0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
              <Award className="h-4 w-4" />
              Free IELTS General Training Platform
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ace Your IELTS
              <br />
              <span className="text-red-300">General Training</span> Exam
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
              Practice reading, listening, and writing with real test materials.
              Timed exercises, instant marking, and band score calculation — all
              completely free.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ielts"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-accent-dark"
              >
                Start Practicing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ielts/calculator"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Score Calculator
              </Link>
            </div>
          </div>

          {/* Stats badges */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-3xl">
            {[
              { label: "Practice Tests", value: "10+" },
              { label: "Writing Prompts", value: "16" },
              { label: "Listening Tests", value: "6" },
              { label: "100% Free", value: "$0" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur"
              >
                <div className="text-2xl font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Modules */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
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
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
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
      <section className="gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center lg:px-8">
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
