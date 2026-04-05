"use client";

import Link from "next/link";
import {
  BookOpen,
  Calculator,
  FilePenLine,
  Headphones,
  NotebookPen,
} from "lucide-react";

const modules = [
  {
    title: "Reading Simulator",
    description:
      "Practice with a real General Reading paper. 40 questions, 60-minute timer, and instant band score.",
    href: "/ielts",
    icon: BookOpen,
    color: "bg-orange-500",
  },
  {
    title: "Listening Practice",
    description:
      "6 full listening tests with audio, question PDFs, and answer keys from IELTS Fever.",
    href: "/ielts/listening",
    icon: Headphones,
    color: "bg-sky-500",
  },
  {
    title: "Writing Task 1",
    description:
      "General Training letter-writing prompts with a 20-minute timer, word counter, and auto-save.",
    href: "/ielts/writing",
    icon: FilePenLine,
    color: "bg-violet-500",
  },
  {
    title: "Writing Task 2",
    description:
      "Essay prompts for General Training Task 2 with a 40-minute timer and 250-word target.",
    href: "/ielts/writing/task-2",
    icon: NotebookPen,
    color: "bg-emerald-500",
  },
  {
    title: "Score Calculator",
    description:
      "Enter raw scores for all four modules and get your estimated overall IELTS band.",
    href: "/ielts/calculator",
    icon: Calculator,
    color: "bg-slate-800",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffedd5_35%,_#f8fafc_75%)]">
      <section className="border-b border-orange-100/80 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">
            <BookOpen className="h-3.5 w-3.5" />
            Free Practice Platform
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
            IELTS PASS
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Everything you need to prepare for the IELTS General Training exam.
            Practice reading, listening, writing, and calculate your band score
            — all in one place.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 transition hover:border-orange-200 hover:shadow-orange-100/60"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${mod.color} text-white`}
              >
                <mod.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-orange-600">
                {mod.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {mod.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
